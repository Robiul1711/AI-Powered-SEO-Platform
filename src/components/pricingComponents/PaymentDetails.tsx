import React, { useEffect, useState, useRef } from "react";
import { User, Mail, CreditCard, Lock, ShieldCheck, Calendar, Hash } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slices/uiSlice";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import useMutationClient from "@/hooks/useMutationClient";
import { useNavigate } from "react-router-dom";

interface PaymentDetailsProps {
  clientSecret: string | null;
  bookingData: any;
  plan?: any;
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
  triggerConfirm: boolean;
  onConfirmStarted: () => void;
  onCardComplete: (status: boolean) => void;
  isLoading?: boolean;
}

const PaymentDetails = ({
  clientSecret,
  bookingData,
  plan,
  isProcessing,
  setIsProcessing,
  triggerConfirm,
  onConfirmStarted,
  onCardComplete,
  isLoading
}: PaymentDetailsProps) => {
  const user = useSelector(selectCurrentUser);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const processingPayment = useRef(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [cardStatus, setCardStatus] = useState({
    number: false,
    expiry: false,
    cvc: false,
  });

  useEffect(() => {
    const isReady = cardStatus.number && cardStatus.expiry && cardStatus.cvc;
    onCardComplete(isReady);
  }, [cardStatus, onCardComplete]);

  const handleCardChange = (event: any, type: 'number' | 'expiry' | 'cvc') => {
    setCardStatus(prev => ({
      ...prev,
      [type]: event.complete && !event.error
    }));
  };



  useEffect(() => {
    if (user) {
      const name = user.name || user.full_name || user.data?.name || user.data?.full_name || user.userdata?.name || "";
      const email = user.email || user.data?.email || user.userdata?.email || "";

      setFormData({
        name: name,
        email: email,
      });
    }
  }, [user]);

  useEffect(() => {
    if (triggerConfirm && clientSecret && stripe && elements) {
      onConfirmStarted();
      confirmPayment();
    }
  }, [triggerConfirm, clientSecret, stripe, elements]);

  const confirmPayment = async () => {
    if (!stripe || !elements || !clientSecret) {
      setIsProcessing(false);
      return;
    }

    setIsProcessing(true);
    const cardNumberElement = elements.getElement(CardNumberElement);

    if (!cardNumberElement) {
      setIsProcessing(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: {
          name: formData.name,
          email: formData.email,
        },
      },
    });

    if (error) {
      toast.error(error.message || "Payment confirmation failed");
      setIsProcessing(false);
      processingPayment.current = false;
    } else if (paymentIntent.status === "succeeded") {
      if (processingPayment.current) return;
      processingPayment.current = true;

      toast.success("Payment Successful!", { id: "payment-success" });
      navigate("/checkout-success");
    }
  };

  const ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#ffffff",
        fontFamily: "Inter, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "rgba(255, 255, 255, 0.3)",
        },
      },
      invalid: {
        color: "#ff8a8a",
        iconColor: "#ff8a8a",
      },
    },
  };

  return (
    <div className="p-5 rounded-md bg-[#1A1A1A] border border-white/10 shadow-2xl">
      <h2 className="text-lg font-orbitron font-bold text-white mb-5">
        Payment Details
      </h2>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-3 bg-white/10 rounded w-20"></div>
              <div className="h-10 bg-white/5 border border-white/10 rounded-md w-full"></div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <div className="h-3 bg-white/10 rounded w-20"></div>
              <div className="h-10 bg-white/5 border border-white/10 rounded-md w-full"></div>
            </div>
            <div className="space-y-1.5">
              <div className="h-3 bg-white/10 rounded w-20"></div>
              <div className="h-10 bg-white/5 border border-white/10 rounded-md w-full"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-inter font-medium text-white/70 block">
              Full Name
            </label>
            <div className="relative group">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#AC6CFF] transition-colors"
                size={15}
              />
              <input
                type="text"
                name="name"
                readOnly
                value={formData.name}
                placeholder="John Smith"
                className="w-full bg-white/5 border border-white/10 rounded-md py-2.5 pl-10 pr-3 text-xs text-white font-inter focus:outline-none focus:border-[#AC6CFF]/50 transition-all opacity-70"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-inter font-medium text-white/70 block">
              Email Address
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#AC6CFF] transition-colors"
                size={15}
              />
              <input
                type="email"
                name="email"
                readOnly
                value={formData.email}
                placeholder="john@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-md py-2.5 pl-10 pr-3 text-xs text-white font-inter focus:outline-none focus:border-[#AC6CFF]/50 transition-all opacity-70"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-inter font-medium text-white/70 block">
              Card Number
            </label>
            <div className="relative group">
              <CreditCard
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#AC6CFF] transition-colors"
                size={15}
              />
              <div className="w-full bg-white/5 border border-white/10 rounded-md py-2.5 pl-10 pr-3 text-xs text-white font-inter focus-within:border-[#AC6CFF]/50 transition-all">
                <CardNumberElement
                  options={ELEMENT_OPTIONS}
                  onChange={(e) => handleCardChange(e, 'number')}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-inter font-medium text-white/70 block">
                Expiry Date
              </label>
              <div className="relative group">
                <Calendar
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#AC6CFF] transition-colors"
                  size={15}
                />
                <div className="w-full bg-white/5 border border-white/10 rounded-md py-2.5 pl-10 pr-3 text-xs text-white font-inter focus-within:border-[#AC6CFF]/50 transition-all">
                  <CardExpiryElement
                    options={ELEMENT_OPTIONS}
                    onChange={(e) => handleCardChange(e, 'expiry')}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-inter font-medium text-white/70 block">
                CVC
              </label>
              <div className="relative group">
                <Hash
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#AC6CFF] transition-colors"
                  size={15}
                />
                <div className="w-full bg-white/5 border border-white/10 rounded-md py-2.5 pl-10 pr-3 text-xs text-white font-inter focus-within:border-[#AC6CFF]/50 transition-all">
                  <CardCvcElement
                    options={ELEMENT_OPTIONS}
                    onChange={(e) => handleCardChange(e, 'cvc')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isProcessing && (
        <div className="mt-6 text-center text-[#AC6CFF] font-inter text-xs animate-pulse flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#AC6CFF] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-1.5 h-1.5 bg-[#AC6CFF] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-1.5 h-1.5 bg-[#AC6CFF] rounded-full animate-bounce"></span>
          Securely processing payment...
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-white/40">
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={14} />
          <span className="text-[10px] uppercase tracking-widest font-bold">
            SSL Secured
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Lock size={14} />
          <span className="text-[10px] uppercase tracking-widest font-bold">
            256-Bit Encryption
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
