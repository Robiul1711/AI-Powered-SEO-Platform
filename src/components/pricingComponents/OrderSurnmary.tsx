import React from "react";
import { CheckCircle2 } from "lucide-react";

const OrderSurnmary = () => {
  const items = [
    { name: "Technical Foundation (Phase 1)", price: "$1,500" },
    { name: "Technical Foundation (Phase 1)", price: "$2,500" },
    { name: "First Month - Growth & Authority (Phase 1)", price: "$3,000" },
  ];

  return (
    <div className="  p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-md">
      <h2 className="text-xl font-orbitron font-bold text-white mb-8 underline underline-offset-8 decoration-[#AC6CFF]/30">
        Order Surnmary
      </h2>

      <div className="space-y-6 mb-8">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-[#AC6CFF]" />
              <span className="text-sm font-inter text-white/70">
                {item.name}
              </span>
            </div>
            <span className="text-sm font-orbitron text-white">
              {item.price}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-6 border-t border-white/5">
        <div className="flex justify-between text-white/50 text-sm font-inter">
          <span>Subtotal</span>
          <span>$7,000</span>
        </div>
        <div className="flex justify-between text-green-500/80 text-sm font-inter">
          <span>Setup Discount</span>
          <span>-$500</span>
        </div>
        <div className="flex justify-between items-end pt-4">
          <span className="text-white font-inter text-base">
            Total Due Today
          </span>
          <span className="text-2xl font-orbitron font-bold text-white">
            $6,500
          </span>
        </div>
      </div>

      <button className="w-full mt-8 py-4 rounded-xl bg-linear-to-r from-[#AC6CFF] to-[#6C9AFF] text-white font-inter font-semibold text-sm hover:opacity-90 transition-all shadow-[0_4px_20px_rgba(172,108,255,0.2)]">
        Complete Payment
      </button>

      <p className="mt-6 text-center text-[10px] text-white/30 font-inter">
        By Completing This Purchase, You Agree To Our{" "}
        <span className="text-white/50 hover:text-white cursor-pointer transition-colors">
          Terms Of Sen.Rice
        </span>
      </p>
    </div>
  );
};

export default OrderSurnmary;
