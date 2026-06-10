import React, { useState } from "react";
import Title from "@/components/common/Title";
import GlowText from "@/components/common/GlowText";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { encryptId } from "@/lib/encryption";

const SocialMarketing = ({ campaign, isLoading }: { campaign?: any; isLoading?: boolean }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [url, setUrl] = useState("");
  const [goal, setGoal] = useState("");
  const [target, setTarget] = useState("");
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="text-center text-white py-20">Loading Campaign...</div>;
  }

  if (!campaign || !campaign.tiers || campaign.tiers.length === 0) {
    return null;
  }

  const tiers = campaign.tiers;
  const selectedPackage = tiers[selectedIndex] || null;
  const prices = tiers.map((p: any) => p.price);

  const titleLower = campaign.title?.toLowerCase() || "";
  const isFacebook = titleLower.includes("facebook");
  const isInstagram = titleLower.includes("instagram");
  const isYouTube = titleLower.includes("youtube");

  const platformName = isFacebook ? "Facebook" : isInstagram ? "Instagram" : isYouTube ? "YouTube" : "Platform";

  const urlLabel = isFacebook
    ? "Facebook Page URL"
    : isInstagram
    ? "Instagram Account Details (Username/URL)"
    : isYouTube
    ? "YouTube Channel URL"
    : "URL Details";

  const urlPlaceholder = isFacebook
    ? "Https://Www.Facebook.Com/YourPage"
    : isInstagram
    ? "Https://Www.Instagram.Com/YourAccount"
    : isYouTube
    ? "Https://Www.Youtube.Com/@YourChannel"
    : "https://...";

  const targetLabel = isFacebook
    ? "Target audience / interests (optional)"
    : isInstagram
    ? "Target audience / hashtags (optional)"
    : isYouTube
    ? "Target audience / keywords (optional)"
    : "Target audience (optional)";

  const targetPlaceholder = isFacebook
    ? "Countries, Interests, Age Ranges, Behavior ..."
    : isInstagram
    ? "Countries, Interests, Age Ranges, Example Hashtags ..."
    : isYouTube
    ? "Countries, Interests, Age Ranges, Focus Keywords ..."
    : "Countries, Interests, Age Ranges ...";
    
  const marketingGoalPlaceholder = isFacebook
    ? "Engagement (Likes, Comments, Shares)"
    : isInstagram
    ? "Engagement (Likes, Comments, Story Views)"
    : isYouTube
    ? "Engagement (Likes, Comments, Subscribers)"
    : "Engagement Goals";

  const renderTitle = (title: string) => {
    const splitIndex = title.toLowerCase().indexOf("marketing");
    if (splitIndex !== -1) {
      return (
        <>
          {title.substring(0, splitIndex)} <GlowText>{title.substring(splitIndex)}</GlowText>
        </>
      );
    }
    return <GlowText>{title}</GlowText>;
  };

  const handleCheckout = () => {
    if (!selectedPackage) return;
    
    if (!url.trim()) {
      toast.error(`Please enter your ${platformName} URL`);
      return;
    }

    const tierTitle = campaign.title ? `${campaign.title} - $${selectedPackage.price}` : `Campaign Package - $${selectedPackage.price}`;

    navigate(`/simple-checkout?plan=${encryptId(selectedPackage.id)}&type=campaign`, {
      state: {
        plan: {
          id: selectedPackage.id,
          name: tierTitle,
          price: selectedPackage.price,
          discount: 0,
        },
        campaignDetails: {
          url: url,
          marketing_goal: goal,
          target_audience: target
        }
      }
    });
  };

  return (
    <div className="section-padding-x section-padding-y">
      <div className="flex flex-col items-center gap-4 max-w-7xl mx-auto text-center mb-10 md:mb-16">
        <Title level="title48" className="text-white font-orbitron">
          {renderTitle(campaign.title || "Marketing Campaign")}
        </Title>
        <p className="text-base sm:text-lg text-white/60 max-w-2xl font-inter">
          {campaign.subtitle || `Choose a plan, enter your ${platformName} details and goals, then checkout securely.`}
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

          <div className="flex justify-between mt-2 sm:mt-4 overflow-x-auto gap-2 scrollbar-hide py-2">
            {prices.map((price: number, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`text-[9px] sm:text-xs md:text-sm font-orbitron transition-all duration-300 min-w-max ${
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
          <p className="text-white/30 text-[10px] md:text-xs text-center font-inter uppercase tracking-wider mt-5">
            Note: Ad spend on {platformName} is separate from our service fee unless otherwise agreed.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-[#111111] border border-white/10 rounded-[30px] p-6 sm:p-10 flex flex-col">
          <Title level="title32" className="text-white mb-8 font-orbitron">
            Order details
          </Title>

          <div className="space-y-6 flex-grow">
            <div className="space-y-3">
              <label className="text-white/80 font-inter text-sm md:text-base block">
                {urlLabel}
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white font-inter text-sm focus:outline-none focus:border-Primary/50 transition-all"
                placeholder={urlPlaceholder}
              />
            </div>

            <div className="space-y-3">
              <label className="text-white/80 font-inter text-sm md:text-base block">
                Marketing Goal
              </label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white font-inter text-sm focus:outline-none focus:border-Primary/50 transition-all"
                placeholder={marketingGoalPlaceholder}
              />
            </div>

            <div className="space-y-3">
              <label className="text-white/80 font-inter text-sm md:text-base block">
                {targetLabel}
              </label>
              <textarea
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white font-inter text-sm focus:outline-none focus:border-Primary/50 transition-all min-h-[150px] resize-none"
                placeholder={targetPlaceholder}
              />
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button 
              onClick={handleCheckout}
              className="w-full py-4 rounded-xl bg-bg-custom text-white font-orbitron font-bold text-base md:text-lg shadow-lg hover:shadow-Primary/20 transition-all transform hover:-translate-y-1">
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

export default SocialMarketing;
