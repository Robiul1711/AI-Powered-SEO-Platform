import React, { useState } from "react";
import Title from "@/components/common/Title";
import GlowText from "@/components/common/GlowText";

const packagesData = [
  {
    price: 5,
    details: [
      { title: "Profile Optimization Check", description: "" },
      { title: "1 Custom Post Image", description: "" },
      { title: "Basic Hashtag Research", description: "" },
      { title: "24-Hour Growth Boost", description: "" },
    ],
  },
  {
    price: 10,
    details: [
      { title: "Grid Layout Consultation", description: "" },
      { title: "3 Themed Feed Posts", description: "" },
      { title: "Niche Engagement Strategy", description: "" },
      { title: "3-Day Active Monitoring", description: "" },
    ],
  },
  {
    price: 25,
    details: [
      { title: "Story Branding Package", description: "" },
      { title: "5 Custom Graphic Posts", description: "" },
      { title: "Advanced Hashtag Strategy", description: "" },
      { title: "7-Day Content Scheduling", description: "" },
      { title: "Weekly Insights Review", description: "" },
    ],
  },
  {
    price: 50,
    details: [
      { title: "Reels Content Strategy", description: "" },
      { title: "10 High-Impact Posts", description: "" },
      { title: "Automated DM Responses", description: "" },
      { title: "15-Day Account Management", description: "" },
      { title: "Engagement Analysis Report", description: "" },
    ],
  },
  {
    price: 75,
    details: [
      { title: "Influencer Outreach Intro", description: "" },
      { title: "15 Multi-Format Posts", description: "" },
      { title: "Community Management", description: "" },
      { title: "Full Month Strategy", description: "" },
      { title: "Competitor Grid Analysis", description: "" },
    ],
  },
  {
    price: 100,
    details: [
      { title: "Brand Identity Workshop", description: "" },
      { title: "20 Custom Design Assets", description: "" },
      { title: "Reels Viral Optimization", description: "" },
      { title: "Daily Stories Setup", description: "" },
      { title: "Monthly Growth Summary", description: "" },
    ],
  },
  {
    price: 150,
    details: [
      { title: "Elite Aesthetic Overhaul", description: "" },
      { title: "30-Day Content Calendar", description: "" },
      { title: "UGC Campaign Management", description: "" },
      { title: "Influencer Whitelisting", description: "" },
      { title: "Deep-Dive Trend Analysis", description: "" },
    ],
  },
  {
    price: 200,
    details: [
      { title: "Master Growth Engine", description: "" },
      { title: "Professional Video Editing", description: "" },
      { title: "Shop & Catalog Setup", description: "" },
      { title: "Dedicated Content Creator", description: "" },
      { title: "Advanced Conversion Tracking", description: "" },
    ],
  },
  {
    price: 250,
    details: [
      { title: "Viral Loop Strategy", description: "" },
      { title: "Infinite Content Loop", description: "" },
      { title: "Cross-Platform Syncing", description: "" },
      { title: "Priority Support (24/7)", description: "" },
      { title: "Live Streaming Strategy", description: "" },
    ],
  },
  {
    price: 500,
    details: [
      { title: "Prestige Branding Tier", description: "" },
      { title: "Cinema-Grade Reels", description: "" },
      { title: "Major Influencer Collabs", description: "" },
      { title: "Global Reach Campaigns", description: "" },
      { title: "Custom AR Filter Design", description: "" },
    ],
  },
  {
    price: 750,
    details: [
      { title: "Imperial Growth Suite", description: "" },
      { title: "Full Team Access", description: "" },
      { title: "Brand Ambassadorships", description: "" },
      { title: "Quarterly ROI Mapping", description: "" },
      { title: "Automation Ecosystem", description: "" },
    ],
  },
  {
    price: 1000,
    details: [
      { title: "Legendary Presence Kit", description: "" },
      { title: "Total Market Dominance", description: "" },
      { title: "PR & Media Integration", description: "" },
      { title: "CMO-Level Directorship", description: "" },
      { title: "Legacy Brand Building", description: "" },
    ],
  },
];


const InstagramMarketing = () => {
  const [selectedIndex, setSelectedIndex] = useState(5); // Default to €100
  const selectedPackage = packagesData[selectedIndex];
  const prices = packagesData.map((p) => p.price);

  return (
    <div className="section-padding-x section-padding-y ">
      <div className="flex flex-col items-center gap-4 max-w-7xl mx-auto text-center mb-10 md:mb-16">
        <Title level="title48" className="text-white font-orbitron">
          Submit Instagram <GlowText>Marketing Campaign</GlowText>
        </Title>
        <p className="text-base sm:text-lg text-white/60 max-w-2xl font-inter">
          Choose a plan, enter your account details and goals, then checkout securely.
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
              style={{ width: `${(selectedIndex / (prices.length - 1)) * 100}%` }}
            />
            <input
              type="range"
              min="0"
              max={prices.length - 1}
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
            {prices.map((price, idx) => (
              <button
                key={price}
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
            {selectedPackage.details.map((detail, idx) => (
              <div
                key={idx}
                className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 border-l-4 border-l-Primary"
              >
                <h4 className="text-white/90 font-inter text-sm md:text-base font-medium">
                  {detail.title}
                </h4>
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
                Instagram Account Details (Username/URL)
              </label>
              <input
                type="text"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white font-inter text-sm focus:outline-none focus:border-Primary/50 transition-all"
                placeholder="Https://Www.Instagram.Com/YourAccount"
              />
            </div>

            <div className="space-y-3">
              <label className="text-white/80 font-inter text-sm md:text-base block">
                Marketing Goal
              </label>
              <input
                type="text"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white font-inter text-sm focus:outline-none focus:border-Primary/50 transition-all"
                placeholder="Engagement (Likes, Comments, Story Views)"
              />
            </div>

            <div className="space-y-3">
              <label className="text-white/80 font-inter text-sm md:text-base block">
                Target audience / hashtags (optional)
              </label>
              <textarea
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white font-inter text-sm focus:outline-none focus:border-Primary/50 transition-all min-h-[150px] resize-none"
                placeholder="Countries, Interests, Age Ranges, Example Hashtags ..."
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

export default InstagramMarketing;
