import React from "react";
import {
  Website,
  Proposal,
  Payment,
  Dashboard,
  AiStars,
} from "@/components/common/SVG";
import TagLines from "@/components/common/TagLines";
import Title from "@/components/common/Title";

const TopPerformingKeywords = ({ serviceData }: { serviceData: any }) => {
  // 1. Get dynamic data from API
  const dynamicProgress = serviceData?.our_monthly_process || [];

  // 2. Icon Mapper: Links step number to your local SVG components
  const getIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return <Website />;
      case 2: return <AiStars />;
      case 3: return <Proposal />;
      case 4: return <Payment />;
      case 5: return <Dashboard />;
      default: return <Website />; // Fallback
    }
  };

  return (
    <div className="section-padding-x">
      <div className="flex flex-col items-center gap-4 font-inter">
        {/* Dynamic Tagline based on service title if available */}
        <TagLines>{serviceData?.title || "Process"}</TagLines>
        <Title level="title48" className="text-white">
          Our Monthly SEO Progress
        </Title>
        <p className="text-base sm:text-lg text-white/60 mb-10 max-w-2xl text-center font-inter">
          See how we've helped businesses dominate their markets with a structured process
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 py-16 font-inter">
        {dynamicProgress.map((step: any) => (
          <div
            key={step.step_number}
            className="group relative p-6 rounded-[24px] bg-[#27242B] border border-[rgba(255,255,255,0.21)] shadow-[2px_2px_22px_0_rgba(255,255,255,0.12)_inset,4px_4px_4px_0_rgba(210,146,242,0.11)] transition-all duration-300 hover:border-[#AC6CFF] hover:shadow-[inset_2px_2px_22px_0_rgba(255,255,255,0.12),0_0_26px_0_rgba(172,108,255,0.47)]"
          >
            {/* Step Number Overlay - Formatting to '01', '02', etc. */}
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#38353D] px-4 py-1 rounded-xl text-white text-sm font-medium transition-colors group-hover:bg-[#AC6CFF]">
              {step.step_number < 10 ? `0${step.step_number}` : step.step_number}
            </span>

            <div className="flex flex-col items-center gap-3 mt-4 text-center">
              {/* Icon Container using the mapper function */}
              <div className="p-4 rounded-xl bg-[linear-gradient(112deg,#5C2B9C_32.9%,#3E7AB3_120.42%)] shadow-[inset_4px_4px_4px_-2px_rgba(255,255,255,0.20),2px_2px_12px_0_rgba(172,108,255,0.34)] mb-2">
                {getIcon(step.step_number)}
              </div>

              <Title level="title20" className="text-white font-semibold">
                {step.title}
              </Title>
              <p className="text-white/50 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformingKeywords;