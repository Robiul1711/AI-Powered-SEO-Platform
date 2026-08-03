import OrderSummary from "@/components/pricingComponents/OrderSummary";
import PaymentDetails from "@/components/pricingComponents/PaymentDetails";
import OrderWhatsIncluded from "@/components/pricingComponents/OrderWhatsIncluded";
import authBg from "@/assets/images/authBg1.webp";
import React, { useMemo, useState } from "react";
import TagLines from "@/components/common/TagLines";
import GlowText from "@/components/common/GlowText";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { decryptId } from "@/lib/encryption";
import useClient from "@/hooks/useClient";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAuthStore } from "@/providers/useAuthStore";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/redux/slices/authSlice";
import { selectCurrentUser } from "@/redux/slices/uiSlice";

// Lazy Load Stripe only when checkout page is rendered
let stripePromise: Promise<any> | null = null;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
        "pk_test_51Pq3HnRvN5gEyL4xv8jY5Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y"
    );
  }
  return stripePromise;
};

const SimpleCheckout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const type = searchParams.get("type") || "subscription";
  const encryptedPlanId = searchParams.get("plan");
  const encryptedServiceId = searchParams.get("service");
  const planFromState = location.state?.plan;
  const campaignDetails = location.state?.campaignDetails;
  
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [triggerConfirm, setTriggerConfirm] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);

  // Dynamically fetch Stripe Publishable Key strictly from Laravel Backend API
  useEffect(() => {
    const fetchStripeKey = async () => {
      try {
        const res = await axiosPublic.get("/payments/stripe-key");
        const activeKey = res.data?.publishable_key || res.data?.stripe_key;
        if (activeKey) {
          setStripePromise(loadStripe(activeKey));
        }
      } catch (e) {
        console.error("Failed to fetch Stripe key from backend API", e);
      }
    };

    fetchStripeKey();
  }, [axiosPublic]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login", { state: { from: window.location.pathname + window.location.search } });
    }
  }, [isAuthenticated, navigate]);

  const planId = useMemo(() => {
    if (!encryptedPlanId) return null;
    try {
      return decryptId(encryptedPlanId);
    } catch (e) {
      console.error("Failed to decrypt plan ID", e);
      return null;
    }
  }, [encryptedPlanId]);

  const serviceId = useMemo(() => {
    if (!encryptedServiceId) return null;
    try {
      return decryptId(encryptedServiceId);
    } catch (e) {
      console.error("Failed to decrypt service ID", e);
      return null;
    }
  }, [encryptedServiceId]);

  const { data: pricingPlans, isLoading } = useClient({
    queryKey: ["pricing-plans"],
    url: `/pricing-plans`,
  });

  const selectedPlan = useMemo(() => {
    if (type === "campaign" && planFromState) {
      return planFromState;
    }
    if (!planId || !(pricingPlans as any)?.data) return null;
    return (pricingPlans as any).data.find((p: any) => p.id.toString() === planId.toString());
  }, [type, planFromState, planId, pricingPlans]);

  const isPlanLoading = type === "subscription" ? isLoading : false;

  if (!isAuthenticated) return null;

  if (!stripePromise) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#111111]">
        <Loader2 className="w-8 h-8 text-[#AC6CFF] animate-spin" />
        <p className="mt-3 text-gray-400 font-inter text-xs uppercase tracking-widest animate-pulse">
          Initializing Payment Gateway...
        </p>
      </div>
    );
  }

  const handlePaymentTrigger = () => {
    setTriggerConfirm(true);
  };

  return (
    <Elements stripe={getStripe()}>
      <div className="relative w-full pt-40 pb-20 overflow-hidden min-h-screen">
        {/* Background Image */}
        <div className="fixed inset-0 -z-10">
          <img src={authBg} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Badge */}
        <div className="flex justify-center mb-3">
          <TagLines>Secure Checkout</TagLines>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold mb-2 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
            <span className="text-white">Simple</span>
            <GlowText className="uppercase">Checkout</GlowText>
          </h1>
          <p className="text-white/50 font-inter text-xs md:text-sm max-w-xl mx-auto uppercase tracking-wider">
            Complete your order to get started with your SEO growth plan
          </p>
        </div>

        <div className="section-padding-x flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
          {/* Left: Payment Form */}
          <div className="flex-1">
            <PaymentDetails 
              clientSecret={clientSecret} 
              bookingData={bookingData}
              plan={selectedPlan}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              triggerConfirm={triggerConfirm}
              onConfirmStarted={() => setTriggerConfirm(false)}
              onCardComplete={setIsCardComplete}
              isLoading={isPlanLoading}
            />
          </div>

          {/* Right: Summary Modules */}
          <div className="flex flex-col gap-6 w-full lg:w-[450px]">
            <OrderSummary 
              plan={selectedPlan} 
              isLoading={isPlanLoading} 
              setClientSecret={setClientSecret}
              setBookingData={setBookingData}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              onPay={handlePaymentTrigger}
              clientSecret={clientSecret}
              isCardComplete={isCardComplete}
              type={type}
              campaignDetails={campaignDetails}
              serviceId={serviceId ? Number(serviceId) : undefined}
            />
            <OrderWhatsIncluded plan={selectedPlan} isLoading={isPlanLoading} />
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default SimpleCheckout;
