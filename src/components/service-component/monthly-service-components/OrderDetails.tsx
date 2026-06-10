import React, { useState } from "react";
import Title from "@/components/common/Title";
import { useNavigate } from "react-router-dom";
import { encryptId } from "@/lib/encryption";
import { toast } from "react-hot-toast";

interface OrderDetailsProps {
  price: number;
  tierId?: number | string;
  tierTitle?: string;
  features?: any[];
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ price, tierId, tierTitle = "Campaign Package", features = [] }) => {
  const [links, setLinks] = useState("");
  const [keywords, setKeywords] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!tierId) {
      toast.error("Please select a package first");
      return;
    }
    if (!links.trim() || !keywords.trim()) {
      toast.error("Please provide both links and keywords");
      return;
    }

    const campaignDetails = { links, keywords };
    
    navigate(`/simple-checkout?plan=${encryptId(tierId)}&type=campaign`, {
      state: {
        campaignDetails,
        plan: {
          id: tierId,
          name: tierTitle,
          price: price,
          features: features,
        }
      }
    });
  };

  return (
    <div className="bg-[#111111] border border-white/10 rounded-[30px] p-6 h-full flex flex-col">
      <Title level="title32" className="text-white mb-8">
        Order details
      </Title>

      <div className="space-y-6 flex-grow">
        {/* Links Textarea */}
        <div className="space-y-3">
          <label className="text-white/80 font-inter text-sm md:text-base block">
            Links (one per line):
          </label>
          <div className="relative group">
            <textarea
              value={links}
              onChange={(e) => setLinks(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white/60 font-inter text-sm focus:outline-none focus:border-Primary/50 transition-all duration-300 min-h-[150px] resize-none"
              placeholder="Https://Example.Com/Page-One&#10;Https://Example.Com/Page-Two"
            />
            <div className="absolute inset-0 rounded-xl bg-Primary/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-300" />
          </div>
        </div>

        {/* Keywords Textarea */}
        <div className="space-y-3">
          <label className="text-white/80 font-inter text-sm md:text-base block">
            Keywords (one per line):
          </label>
          <div className="relative group">
            <textarea
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white/60 font-inter text-sm focus:outline-none focus:border-Primary/50 transition-all duration-300 min-h-[120px] resize-none"
              placeholder="Keyword One&#10;Keyword Two"
            />
            <div className="absolute inset-0 rounded-xl bg-Primary/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-300" />
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <button 
          onClick={handleSubmit}
          className="w-full py-4 rounded-xl bg-bg-custom text-white font-orbitron font-bold text-base md:text-lg shadow-[0_4px_15px_rgba(172,108,255,0.3)] hover:shadow-[0_6px_25px_rgba(172,108,255,0.5)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
        >
          Submit Monthly
        </button>
        <p className="text-white/30 text-[10px] md:text-xs text-center font-inter">
          You'll Be Taken To Checkout To Complete Payment.
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;