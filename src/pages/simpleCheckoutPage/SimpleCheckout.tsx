import OrderSummary from "@/components/pricingComponents/OrderSummary";
import PaymentDetails from "@/components/pricingComponents/PaymentDetails";
import OrderWhatsIncluded from "@/components/pricingComponents/OrderWhatsIncluded";
import authBg from "@/assets/images/authBg1.png";
import React, { useMemo, useState } from "react";
import TagLines from "@/components/common/TagLines";
import GlowText from "@/components/common/GlowText";
import { useSearchParams } from "react-router-dom";
import { decryptId } from "@/lib/encryption";
import useClient from "@/hooks/useClient";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAuthStore } from "@/providers/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/redux/slices/authSlice";
import { selectCurrentUser } from "@/redux/slices/uiSlice";

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_51Pq3HnRvN5gEyL4xv8jY5Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y");

const SimpleCheckout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const encryptedPlanId = searchParams.get("plan");
  
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [triggerConfirm, setTriggerConfirm] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

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

  const { data: pricingPlans, isLoading } = useClient({
    queryKey: ["pricing-plans"],
    url: `/pricing-plans`,
  });

  const selectedPlan = useMemo(() => {
    if (!planId || !(pricingPlans as any)?.data) return null;
    return (pricingPlans as any).data.find((p: any) => p.id.toString() === planId.toString());
  }, [planId, pricingPlans]);

  if (!isAuthenticated) return null;

  const handlePaymentTrigger = () => {
    setTriggerConfirm(true);
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="relative w-full pt-40 pb-20 overflow-hidden min-h-screen">
        {/* Background Image */}
        <div className="fixed inset-0 -z-10">
          <img src={authBg} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Badge */}
        <div className="flex justify-center mb-4">
          <TagLines>Secure Checkout</TagLines>
        </div>

        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <span className="text-white">Simple</span>
            <GlowText className="uppercase">Checkout</GlowText>
          </h1>
          <p className="text-white/50 font-inter text-sm md:text-base max-w-2xl mx-auto uppercase tracking-wider">
            Complete your order to get started with your SEO growth plan
          </p>
        </div>

        <div className="section-padding-x flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
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
              isLoading={isLoading}
            />
          </div>

          {/* Right: Summary Modules */}
          <div className="flex flex-col gap-6 w-full lg:w-[450px]">
            <OrderSummary 
              plan={selectedPlan} 
              isLoading={isLoading} 
              setClientSecret={setClientSecret}
              setBookingData={setBookingData}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              onPay={handlePaymentTrigger}
              clientSecret={clientSecret}
              isCardComplete={isCardComplete}
            />
            <OrderWhatsIncluded plan={selectedPlan} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default SimpleCheckout;
