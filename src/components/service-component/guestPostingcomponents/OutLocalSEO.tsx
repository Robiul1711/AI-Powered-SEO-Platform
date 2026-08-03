import React from "react";
import bannerShadow from "@/assets/images/bannerShadow.webp";
import {
  Website,
  Proposal,
  Payment,
  Dashboard,
  AiStars,
  Reports,
} from "@/components/common/SVG";
import TagLines from "@/components/common/TagLines";
import Title from "@/components/common/Title";

const OutLocalSEO = ({serviceData = [], isLoading = false,}: {
  serviceData?: any[];
  isLoading?: boolean;
}) => {


  return (
    <div className="section-padding-x">
      {/* <div className="flex flex-col items-center gap-4 font-inter">
        <TagLines>Local SEO</TagLines>
        <Title level="title48" className="text-white">
          Our Monthly SEO Progress
        </Title>
        <p className="text-base sm:text-lg text-white/60 mb-10 max-w-2xl text-center font-inter">
          See how we've helped local businesses dominate their markets
        </p>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-16 font-inter">
        {serviceData?.map((step: any) => (
          <div
            key={step.id}
            className="
              group relative p-8
              rounded-[24px]
              bg-[#27242B]
              border border-[rgba(255,255,255,0.21)]
              shadow-[2px_2px_22px_0_rgba(255,255,255,0.12)_inset,4px_4px_4px_0_rgba(210,146,242,0.11)]
              transition-all duration-300 hover:border-[#AC6CFF] hover:shadow-[inset_2px_2px_22px_0_rgba(255,255,255,0.12),0_0_26px_0_rgba(172,108,255,0.47)]
            "
          >
            {/* Step Number Overlay */}
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#38353D] px-4 py-1 rounded-xl text-white text-sm font-medium transition-colors group-hover:bg-[#AC6CFF]">
              {step.id}
            </span>

            <div className="flex flex-col items-center gap-4 mt-4 text-center">
              {/* Icon Container */}
            <div className="p-4 rounded-2xl bg-[linear-gradient(112deg,#5C2B9C_32.9%,#3E7AB3_120.42%)] shadow-[inset_4px_4px_4px_-2px_rgba(255,255,255,0.20),2px_2px_12px_0_rgba(172,108,255,0.34)] mb-2">
                {step?.icon && 
                  <img src={step?.icon} alt={step?.title} className="w-[20px] h-[20px] object-contain invert" />
                }
              </div>
              <Title level="title24" className="text-white font-semibold">
                {step.title}
              </Title>
              <p className="text-white/70 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutLocalSEO;