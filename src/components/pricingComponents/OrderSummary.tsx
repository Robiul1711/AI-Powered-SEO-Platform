import useMutationClient from "@/hooks/useMutationClient";
import React from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface OrderSummaryProps {
  plan?: any;
  isLoading?: boolean;
  setClientSecret: (secret: string | null) => void;
  setBookingData: (data: any) => void;
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
  onPay: () => void;
  clientSecret: string | null;
  isCardComplete: boolean;
  type?: string;
  campaignDetails?: any;
  serviceId?: number;
}

const OrderSummary = ({
  plan,
  isLoading,
  setClientSecret,
  setBookingData,
  isProcessing,
  setIsProcessing,
  onPay,
  clientSecret,
  isCardComplete,
  type = "subscription",
  campaignDetails,
  serviceId,
}: OrderSummaryProps) => {
  const subtotal = plan ? parseFloat(plan.price) : 0;
  const discount = plan?.discount ? parseFloat(plan.discount) : 0;
  const total = plan ? Math.max(0, subtotal - discount) : 0;

  const url = type === "campaign" ? "/campaign-bookings/create" : "/subscription-bookings/create";

  const { mutate: createBooking, isPending } = useMutationClient({
    url,
    method: "post",
    isPrivate: true,
    showToast: false,
  });

  const handlePayClick = () => {
    if (!plan) {
      toast.error("Please select a plan");
      return;
    }

    if (clientSecret) {
      onPay();
      return;
    }

    setIsProcessing(true);

    const payloadData = type === "campaign"
      ? { campaign_tier_id: plan.id, campaign_details: campaignDetails }
      : { pricing_plan_id: plan.id, ...(serviceId ? { service_id: serviceId } : {}) };

    createBooking(
      {
        data: payloadData
      },
      {
        onSuccess: (res: any) => {
          const response = res.data;
          if (response.success) {
            setClientSecret(response.data.client_secret);
            setBookingData(response.data.booking);
            onPay();
          }
        },
        onError: () => {
          setIsProcessing(false);
        }
      }
    );
  };

  return (
    <div className="p-5 rounded-md bg-[#1A1A1A] border border-white/10 min-h-[340px] flex flex-col shadow-2xl">
      <h2 className="text-base font-orbitron font-bold text-white mb-4 underline underline-offset-4 decoration-[#AC6CFF]/40">
        Order Summary
      </h2>

      <div className="space-y-4 mb-4 flex-grow">
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-5 bg-white/5 rounded w-full"></div>
            <div className="h-5 bg-white/5 rounded w-2/3"></div>
          </div>
        ) : plan ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[#AC6CFF]" />
              <span className="text-xs font-inter text-white/80">
                {plan.name} Plan
              </span>
            </div>
            <span className="text-xs font-orbitron text-white font-bold">
              ${subtotal.toLocaleString()}
            </span>
          </div>
        ) : (
          <p className="text-white/40 text-xs font-inter text-center mt-6">
            Select a plan to see order summary
          </p>
        )}
      </div>

      <div className="space-y-2 pt-4 border-t border-white/10">
        <div className="flex justify-between text-white/60 text-xs font-inter">
          <span>Subtotal</span>
          <span>{isLoading ? "..." : `$${subtotal.toLocaleString()}`}</span>
        </div>
        <div className="flex justify-between text-emerald-400 text-xs font-inter">
          <span>Setup Discount</span>
          <span>{isLoading ? "..." : `-$${discount.toLocaleString()}`}</span>
        </div>
        <div className="flex justify-between items-end pt-3 border-t border-white/5">
          <span className="text-white font-inter text-xs font-bold">
            Total Due Today
          </span>
          <span className="text-xl font-orbitron font-bold text-white">
            {isLoading ? "..." : `$${total.toLocaleString()}`}
          </span>
        </div>
      </div>

      <button
        onClick={handlePayClick}
        disabled={isLoading || !plan || isProcessing || isPending || !isCardComplete}
        className="w-full mt-6 py-3 rounded-md bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] text-white font-inter font-bold text-xs hover:opacity-90 transition-all shadow-[0_4px_15px_rgba(172,108,255,0.25)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
      >
        {isProcessing || isPending ? "Processing..." : `Pay $${total.toLocaleString()} Now`}
      </button>

      <p className="mt-4 text-center text-[10px] text-white/40 font-inter uppercase tracking-wider font-bold">
        Secure encrypted payment processing
      </p>
    </div>
  );
};

export default OrderSummary;
