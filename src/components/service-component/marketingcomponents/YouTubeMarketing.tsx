import React, { useState } from "react";
import Title from "@/components/common/Title";
import GlowText from "@/components/common/GlowText";

const YouTubeMarketing = ({ serviceData = [], isLoading }: { serviceData?: any[], isLoading?: boolean }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const campaign = serviceData?.find((c: any) => c.title.toLowerCase().includes("youtube"));
  const tiers = campaign?.tiers || [];
  
  const selectedPackage = tiers[selectedIndex] || null;
  const prices = tiers.map((p: any) => p.price);

  if (isLoading) {
    return <div className="text-center text-white py-20">Loading YouTube Marketing...</div>;
  }

  if (!campaign || tiers.length === 0) {
    return null;
  }

  return (
    <div className="section-padding-x section-padding-y ">
      <div className="flex flex-col items-center gap-4 max-w-7xl mx-auto text-center mb-10 md:mb-16">
        <Title level="title48" className="text-white font-orbitron">
          Submit YouTube <GlowText>Marketing Campaign</GlowText>
        </Title>
        <p className="text-base sm:text-lg text-white/60 max-w-2xl font-inter">
          {campaign.subtitle || "Choose a plan, enter your channel and goals, then checkout securely."}
        </p>

        <div className="w-full mt-8 sm:mt-12 px-4">
          <div className="flex justify-between items-center mb-4 sm:mb-8">
            <span className="text-white font-orbitron text-sm">€{prices[0]}</span>
            <div className="text-white font-orbitron text-lg">
              Selected: <GlowText>€{prices[selectedIndex]}</GlowText>
            </div>
            <span className="text-white font-orbitron text-sm">€{prices[prices.length - 1]}</span>
          </div>

          <div className="relative w-full h-12 flex items-center">
            <div className="absolute w-full h-2 bg-white/10 rounded-full" />
            <div
              className="absolute h-2 bg-Primary rounded-full shadow-[0_0_15px_#ac6cff]"
              style={{ width: `${prices.length > 1 ? (selectedIndex / (prices.length - 1)) * 100 : 0}%` }}
            />
            <input
              type="range"
              min="0"
              max={prices.length > 0 ? prices.length - 1 : 0}
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(parseInt(e.target.value))}
              className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer z-10 
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white 
              [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-Primary
              [&::-webkit-slider-thumb]:shadow-[0_0_10px_#ac6cff]"
            />
          </div>

          <div className="flex justify-between mt-2 sm:mt-4">
            {prices.map((price: number, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`text-[9px] sm:text-xs md:text-sm font-orbitron transition-all duration-300 ${
                  idx === selectedIndex ? "text-Primary scale-110" : "text-white/40 hover:text-white/60"
                }`}
              >
                €{price}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Plan Details */}
        <div className="bg-[#111111] border border-white/10 rounded-[30px] p-6 sm:p-10 flex flex-col min-h-[500px]">
          <Title level="title32" className="text-white mb-8 font-orbitron">
            Plan Details
          </Title>
          <div className="space-y-4">
            {selectedPackage?.features?.map((feature: any, idx: number) => (
              <div
                key={idx}
                className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 border-l-4 border-l-Primary"
              >
                <h4 className="text-white/90 font-inter text-sm md:text-base font-medium">
                  {feature.text}
                </h4>
                {feature.sub_items && feature.sub_items.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {feature.sub_items.map((sub: string, i: number) => (
                      <li key={i} className="text-white/60 text-xs md:text-sm font-inter flex items-start gap-2">
                         <span className="text-Primary mt-1">•</span>
                         <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
                    <p className="text-white/30 text-[10px] md:text-xs text-center font-inter uppercase tracking-wider mt-5">Note: Ad spend on Meta/Facebook is separate from our service fee unless otherwise agreed.</p>

        </div>

        {/* Order Details */}
        <div className="bg-[#111111] border border-white/10 rounded-[30px] p-6 sm:p-10 flex flex-col">
          <Title level="title32" className="text-white mb-8 font-orbitron">
            Order details
          </Title>

          <div className="space-y-6 flex-grow">
            <div className="space-y-3">
              <label className="text-white/80 font-inter text-sm md:text-base block">
                YouTube Channel URL
              </label>
              <input
                type="text"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white font-inter text-sm focus:outline-none focus:border-Primary/50 transition-all"
                placeholder="Https://Www.Youtube.Com/@YourChannel"
              />
            </div>

            <div className="space-y-3">
              <label className="text-white/80 font-inter text-sm md:text-base block">
                Marketing Goal
              </label>
              <input
                type="text"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white font-inter text-sm focus:outline-none focus:border-Primary/50 transition-all"
                placeholder="Engagement (Likes, Comments, Subscribers)"
              />
            </div>

            <div className="space-y-3">
              <label className="text-white/80 font-inter text-sm md:text-base block">
                Target audience / keywords (optional)
              </label>
              <textarea
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white font-inter text-sm focus:outline-none focus:border-Primary/50 transition-all min-h-[150px] resize-none"
                placeholder="Countries, Interests, Age Ranges, Focus Keywords ..."
              />
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button className="w-full py-4 rounded-xl bg-bg-custom text-white font-orbitron font-bold text-base md:text-lg shadow-lg hover:shadow-Primary/20 transition-all transform hover:-translate-y-1">
              Submit Monthly
            </button>
            <p className="text-white/30 text-[10px] md:text-xs text-center font-inter uppercase tracking-wider">
              You'll Be Taken To Checkout To Complete Payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeMarketing;
