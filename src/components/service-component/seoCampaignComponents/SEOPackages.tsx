import React, { useState } from "react";
import GlowText from "@/components/common/GlowText";
import TagLines from "@/components/common/TagLines";
import Title from "@/components/common/Title";
import MonthlyDetails from "../monthly-service-components/MonthlyDetails";
import OrderDetails from "../monthly-service-components/OrderDetails";

const packagesData = [
  {
    price: 5,
    details: [
      { title: "20 Web 2.0 Blogs", description: "Dedicated accounts.", subItems: ["Indexer #2 (Very High Indexer Ratesssssss)"] },
      { title: "10 DA 50+ Backlinks", subItems: ["Indexer #2 (Very High Indexer Rate)"] },
      { title: "2030 Mix Profiles Backlinks", subItems: ["Forum & Social Networks", "Indexer #1 (95%+ Crawled Rate)"] },
      { title: "Tier Project for 1, 2", subItems: [] },
    ],
  },
  {
    price: 10,
    details: [
      { title: "30 Web 2.0 Blogs", description: "Dedicated accounts.", subItems: ["Indexer #2 (Very High Indexer Rate)"] },
      { title: "20 DA 50+ Backlinks", subItems: ["Indexer #2 (Very High Indexer Rate)"] },
      { title: "30 DA 30+ Backlinks", subItems: ["Indexer #2 (Very High Indexer Rate)"] },
      { title: "2150 Mix Profiles Backlinks", subItems: ["Forum & Social Networks", "Indexer #1 (95%+ Crawled Rate)"] },
      { title: "Tier Project for 2, 3", subItems: [] },
    ],
  },
  {
    price: 25,
    details: [
      { title: "1 The Full Monty Premium Edition", subItems: ["High DA Sites List", "Indexer #2 for all links"] },
      { title: "5 Web 2.0 Blogs Premium", subItems: ["Human-Quality Content", "Indexer #3 (Maximum Indexer Rate)"] },
      { title: "25 DA 30+ Backlinks", subItems: ["Indexer #2 (Very High Indexer Rate)"] },
      { title: "10965 Mix Profiles Backlinks", subItems: ["Forum & Social Networks", "Indexer #1 (95%+ Crawled Rate)"] },
      { title: "Tier Project for 2, 3", subItems: [] },
    ],
  },
  {
    price: 50,
    details: [
      { title: "1 The Full Monty Premium Edition", subItems: ["High DA Sites List", "Indexer #2 for all links"] },
      { title: "10 Web 2.0 Blogs Premium", subItems: ["Human-Quality Content", "Indexer #3 (Maximum Indexer Rate)"] },
      { title: "25 DA 50+ Backlinks", subItems: ["Indexer #2 (Very High Indexer Rate)"] },
      { title: "100 DA 30+ Backlinks", subItems: ["Indexer #2 (Very High Indexer Rate)"] },
      { title: "9900 Mix Platforms Backlinks", subItems: ["Indexer #1 (95%+ Crawled Rate)"] },
      { title: "5000 Mix Profiles Backlinks", subItems: ["Forum & Social Networks", "Indexer #1 (95%+ Crawled Rate)"] },
      { title: "Tier Project for 2, 3, 4", subItems: [] },
    ],
  },
  {
    price: 75,
    details: [
      { title: "1 The Full Monty Premium Edition", subItems: ["High DA Sites List", "Indexer #2 for all links"] },
      { title: "20 Web 2.0 Blogs Premium", subItems: ["Human-Quality Content", "Indexer #3 (Maximum Indexer Rate)"] },
      { title: "25 DA 50+ Backlinks", subItems: ["Indexer #2 (Very High Indexer Rate)"] },
      { title: "100 DA 30+ Backlinks", subItems: ["Indexer #2 (Very High Indexer Rate)"] },
      { title: "9870 Mix Platforms Backlinks", subItems: ["Indexer #1 (95%+ Crawled Rate)"] },
      { title: "5000 Mix Profiles Backlinks", subItems: ["Forum & Social Networks", "Indexer #1 (95%+ Crawled Rate)"] },
      { title: "Tier Project for 2, 3, 4", subItems: [] },
    ],
  },
  {
    price: 100,
    details: [
      { title: "1 The Full Monty Premium Edition", subItems: ["High DA Sites List", "Indexer #2 for all links"] },
      { title: "20 Web 2.0 Blogs Premium", subItems: ["Human-Quality Content", "500 Visits each", "100 Social Signals each", "Indexer #3 (Max Rate)"] },
      { title: "25 DA 50+ Backlinks", subItems: ["Indexer #2 (Very High Indexer Rate)"] },
      { title: "100 DA 30+ Backlinks", subItems: ["Indexer #2 (Very High Indexer Rate)"] },
      { title: "13200 Mix Platforms Backlinks", subItems: ["Indexer #1 (95%+ Crawled Rate)"] },
      { title: "5000 Mix Profiles Backlinks", subItems: ["Forum & Social Networks", "Indexer #1 (95%+ Crawled Rate)"] },
      { title: "Tier Project for 2, 3, 4", subItems: [] },
    ],
  },
  {
    price: 150,
    details: [
      { title: "1 The Full Monty Premium Edition", subItems: ["Human-Quality Content (25 articles)", "Indexer #2 for all links"] },
      { title: "25 Web 2.0 Blogs Premium", subItems: ["Human-Quality Content", "500 Visits each", "Indexer #3 (Max Rate)"] },
      { title: "25 DA 50+ Do-follow Backlinks", subItems: ["Human-Quality Content (1 art/2 links)", "Indexer #2 (Very High Rate)"] },
      { title: "170 DA 30+ Backlinks", subItems: ["Indexer #2 (Very High Indexer Rate)"] },
      { title: "14655 Mix Platforms Backlinks", subItems: ["Indexer #1 (95%+ Crawled Rate)"] },
      { title: "10000 Mix Profiles Backlinks", subItems: ["Forum & Social Networks", "Indexer #1 (95%+ Crawled Rate)"] },
      { title: "Tier Project for 2, 3, 4", subItems: [] },
    ],
  },
  {
    price: 200,
    details: [
      { title: "1 The Full Monty Premium Edition", subItems: ["Human-Quality Content (25 articles)", "Indexer #3 (Max Rate)"] },
      { title: "25 Web 2.0 Blogs Premium", subItems: ["Human-Quality Content", "Custom Image Design", "500 Visits each", "Indexer #3 (Max Rate)"] },
      { title: "27 DA 50+ Backlinks", subItems: ["Human-Quality Content (1 art/2 links)", "Indexer #3 (Max Rate)"] },
      { title: "100 DA 30+ Backlinks", subItems: ["Human-Quality Content (1 art/4 links)", "Indexer #3 (Max Rate)"] },
      { title: "20034 Mix Platforms Backlinks", subItems: ["Indexer #1 (95%+ Crawled Rate)"] },
      { title: "10000 Mix Profiles Backlinks", subItems: ["Forum & Social Networks", "Indexer #1 (95%+ Crawled Rate)"] },
      { title: "Tier Project for 2, 3, 4", subItems: [] },
    ],
  },
  {
    price: 250,
    details: [
      { title: "1 The Full Monty Premium Edition", subItems: ["Human-Quality Content (25 articles)", "Indexer #3 (Max Rate)"] },
      { title: "25 Web 2.0 Blogs Premium", subItems: ["Human-Quality Content", "Custom Image Design", "500 Visits each", "Indexer #3 (Max Rate)"] },
      { title: "30 DA 50+ Backlinks", subItems: ["1 Article per link", "Indexer #3 (Max Rate)"] },
      { title: "100 DA 30+ Backlinks", subItems: ["1 art/4 links", "Indexer #3 (Max Rate)"] },
      { title: "22115 URL Shortener Backlinks", subItems: ["Indexer #2 (Very High Rate)"] },
      { title: "15000 Mix Profiles Backlinks", subItems: ["Forum & Social Networks", "Indexer #2 (Very High Rate)"] },
      { title: "Tier Project for 2, 3, 4", subItems: [] },
    ],
  },
  {
    price: 500,
    details: [
      { title: "1 The Full Monty Premium Edition", subItems: ["Human-Quality Content (100 articles)", "500 Visits each", "Indexer #3 (Max Rate)"] },
      { title: "30 Web 2.0 Blogs Premium", subItems: ["Human-Quality Content", "Custom Image Design", "1000 Visits each", "Indexer #3 (Max Rate)"] },
      { title: "50 DA 50+ Backlinks", subItems: ["1 Article per link", "500 Visits each", "Indexer #3 (Max Rate)"] },
      { title: "100 DA 30+ Backlinks", subItems: ["1 art/2 links", "500 Visits each", "Indexer #3 (Max Rate)"] },
      { title: "32967 Mix Platforms Backlinks", subItems: ["Indexer #2 (Very High Rate)"] },
      { title: "20000 Mix Profiles Backlinks", subItems: ["Forum & Social Networks", "Indexer #2 (Very High Rate)"] },
      { title: "Tier Project for 2, 3, 4", subItems: [] },
    ],
  },
  {
    price: 750,
    details: [
      { title: "1 The Full Monty Premium Edition", subItems: ["Human-Quality Content (200 articles)", "500 Visits each", "Indexer #3 (Max Rate)"] },
      { title: "40 Web 2.0 Blogs Premium", subItems: ["Human-Quality Content", "Custom Image Design", "1000 Visits each", "Indexer #3 (Max Rate)"] },
      { title: "60 PR9 - DA 70+ Backlinks", subItems: ["1 Article per link", "500 Visits each", "Indexer #3 (Max Rate)"] },
      { title: "100 DA 50+ Backlinks", subItems: ["1 Article per link", "500 Visits each", "Indexer #3 (Max Rate)"] },
      { title: "100 DA 30+ Backlinks", subItems: ["1 art/2 links", "500 Visits each", "Indexer #3 (Max Rate)"] },
      { title: "27654 Mix Platforms Backlinks", subItems: ["Indexer #2 (Very High Rate)"] },
      { title: "19000 Mix Profiles Backlinks", subItems: ["Forum & Social Networks", "Indexer #2 (Very High Rate)"] },
      { title: "Tier Project for 2, 3, 4, 5", subItems: [] },
    ],
  },
  {
    price: 1000,
    details: [
      { title: "1 The Full Monty Premium Edition", subItems: ["Human-Quality Content (200 articles)", "500 Visits each", "Indexer #3 (Max Rate)"] },
      { title: "55 Web 2.0 Blogs Premium", subItems: ["Human-Quality Content", "Custom Image Design", "1000 Visits each", "Indexer #3 (Max Rate)"] },
      { title: "60 PR9 - DA 70+ Backlinks", subItems: ["1 Article per link", "1000 Visits each", "Indexer #3 (Max Rate)"] },
      { title: "100 DA 50+ Backlinks", subItems: ["1 Article per link", "1000 Visits each", "Indexer #3 (Max Rate)"] },
      { title: "100 DA 30+ Backlinks", subItems: ["1 Article per link", "1000 Visits each", "Indexer #3 (Max Rate)"] },
      { title: "69564 Mix Platforms Backlinks", subItems: ["Indexer #2 (Very High Rate)"] },
      { title: "49900 Mix Profiles Backlinks", subItems: ["Forum & Social Networks", "Indexer #2 (Very High Rate)"] },
      { title: "Tier Project for 2, 3, 4, 5", subItems: [] },
    ],
  },
];

const SEOPackages = ({
  serviceData = [],
  isLoading = false
}: {
  serviceData?: any[];
  isLoading?: boolean;
} = {}) => {
  const currentCampaign = serviceData[0] || {};
  const tiers = currentCampaign.tiers || [];

  const dynamicPackagesData = tiers.length > 0 
    ? tiers.map((tier: any) => ({
        id: tier.id,
        price: tier.price,
        details: tier.features?.map((feature: any) => ({
          title: feature.text,
          subItems: feature.sub_items || [],
        })) || [],
      }))
    : packagesData;

  const [selectedIndex, setSelectedIndex] = useState(() => {
    // Try to find index of 100, or default to middle or first
    const index100 = dynamicPackagesData.findIndex((p: any) => p.price === 100);
    if (index100 !== -1) return index100;
    return Math.min(5, dynamicPackagesData.length - 1);
  });

  const prices = dynamicPackagesData.map((pkg: any) => pkg.price);
  const selectedPackage = dynamicPackagesData[selectedIndex] || dynamicPackagesData[0];

  return (
    <div className="section-padding-x section-padding-y">
      <div className="flex flex-col items-center gap-4 max-w-7xl mx-auto text-center mb-10 md:mb-16">
        <TagLines>Packages</TagLines>
        <Title level="title48" className="text-white">
          {currentCampaign.title ? (
            <>
              Choose Package and <GlowText>{currentCampaign.title}</GlowText>
            </>
          ) : (
            <>
              Choose Package and <GlowText>Submit SEO Campaign</GlowText>
            </>
          )}
        </Title>
        <p className="text-base sm:text-lg text-white/60 max-w-2xl font-inter">
          {currentCampaign.subtitle || "Capture More Traffic & Revenue From Search"}
        </p>
     {/* <div className="my-8">
          <Title level="title32" className="text-white">
            Submit Monthly SEO Campaign
          </Title>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl font-inter">
            Choose a tier, enter your details, and checkout securely.
          </p>
        </div> */}

   
        <div className="w-full mt-4 sm:mt-8">
          <div className="flex justify-between items-center mb-4 sm:mb-8">
            <span className="text-white font-orbitron text-sm">€{prices[0]}</span>
            <div className="text-white font-orbitron text-lg">
              Selected: <GlowText>€{prices[selectedIndex]}</GlowText>
            </div>
            <span className="text-white font-orbitron text-sm">€{prices[prices.length - 1]}</span>
          </div>

          <div className="relative w-full h-12 flex items-center">
            {/* Timeline track */}
            <div className="absolute w-full h-2 bg-white/10 rounded-full"></div>
            
            {/* Progress bar */}
            <div 
              className="absolute h-2 bg-Primary rounded-full shadow-[0_0_15px_#ac6cff]" 
              style={{ width: `${(selectedIndex / (prices.length - 1)) * 100}%` }}
            ></div>

            {/* Range input */}
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

          {/* Labels */}
          <div className="flex justify-between mt-2 sm:mt-4">
            {prices.map((price: number, idx: number) => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        <div className="h-full">
          <MonthlyDetails details={selectedPackage.details} />
        </div>

        <div className="h-full">
          <OrderDetails 
            price={selectedPackage.price} 
            tierId={selectedPackage.id}
            tierTitle={currentCampaign.title ? `${currentCampaign.title} - €${selectedPackage.price}` : `Campaign Package - €${selectedPackage.price}`}
            features={selectedPackage.details}
          />
        </div>
      </div>
    </div>
  );
};


export default SEOPackages;

