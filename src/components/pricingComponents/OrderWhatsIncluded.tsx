import React from "react";
import { CheckCircle2 } from "lucide-react";

interface OrderWhatsIncludedProps {
  plan?: any;
  isLoading?: boolean;
}

const OrderWhatsIncluded = ({ plan, isLoading }: OrderWhatsIncludedProps) => {
  const features = plan?.features || [];

  return (
    <div className="p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-md min-h-[300px] shadow-2xl">
      <h2 className="text-xl font-orbitron font-bold text-white mb-8">
        Order What's Included
      </h2>

      <div className="space-y-6">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-white/5"></div>
                <div className="h-4 bg-white/5 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : plan ? (
          features.map((feature: string, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2
                  size={16}
                  className="text-[#AC6CFF] opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <span className="text-sm font-inter text-white/70 group-hover:text-white transition-colors">
                  {feature}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white/30 text-sm font-inter text-center mt-10">
            Features will appear once a plan is selected
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderWhatsIncluded;
