import React from "react";
import { CheckCircle2 } from "lucide-react";

const OrderWhatsIncluded = () => {
  const items = [
    { name: "Immediate Access To Client Dashboard", price: "$1,500" },
    { name: "Kickoff Call Within 24 Hours", price: "$2,500" },
    { name: "First Month - Growth & Authority (Phase 1)", price: "$3,000" },
  ];

  return (
    <div className=" p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-md">
      <h2 className="text-xl font-orbitron font-bold text-white mb-8">
        Order What's Included
      </h2>

      <div className="space-y-6">
        {items.map((item, index) => (
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
                {item.name}
              </span>
            </div>
            <span className="text-sm font-orbitron text-white">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderWhatsIncluded;
