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
    <div className="p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-md min-h-[400px] flex flex-col shadow-2xl">
      <h2 className="text-xl font-orbitron font-bold text-white mb-8 underline underline-offset-8 decoration-[#AC6CFF]/30">
        Order Summary
      </h2>

      <div className="space-y-6 mb-8 flex-grow">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-white/5 rounded w-full"></div>
            <div className="h-6 bg-white/5 rounded w-2/3"></div>
          </div>
        ) : plan ? (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-[#AC6CFF]" />
              <span className="text-sm font-inter text-white/70">
                {plan.name} Plan
              </span>
            </div>
            <span className="text-sm font-orbitron text-white">
              ${subtotal.toLocaleString()}
            </span>
          </div>
        ) : (
          <p className="text-white/30 text-sm font-inter text-center mt-10">
            Select a plan to see order summary
          </p>
        )}
      </div>

      <div className="space-y-3 pt-6 ">
        <div className="flex justify-between text-white/50 text-sm font-inter">
          <span>Subtotal</span>
          <span>{isLoading ? "..." : `$${subtotal.toLocaleString()}`}</span>
        </div>
        <div className="flex justify-between text-green-500/80 text-sm font-inter">
          <span>Setup Discount</span>
          <span>{isLoading ? "..." : `-$${discount.toLocaleString()}`}</span>
        </div>
        <div className="flex justify-between items-end pt-4">
          <span className="text-white font-inter text-base">
            Total Due Today
          </span>
          <span className="text-2xl font-orbitron font-bold text-white">
            {isLoading ? "..." : `$${total.toLocaleString()}`}
          </span>
        </div>
      </div>

      <button
        onClick={handlePayClick}
        disabled={isLoading || !plan || isProcessing || isPending || !isCardComplete}
        className="w-full mt-10 py-4 rounded-sm bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] text-white font-inter font-semibold text-sm hover:opacity-90 transition-all shadow-[0_4px_20px_rgba(172,108,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
      >
        {isProcessing || isPending ? "Processing..." : `Pay $${total.toLocaleString()} Now`}
      </button>

      <p className="mt-6 text-center text-[10px] text-white/30 font-inter uppercase tracking-wider">
        Secure encrypted payment processing
      </p>
    </div>
  );
};

export default OrderSummary;
