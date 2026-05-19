import React from "react";
import { Proposal, Reports, Payment } from "@/components/common/SVG";
import Title from "@/components/common/Title";

const LinkOurBenifits = ({
  serviceData = [],
  isLoading = false
}: {
  serviceData?: any;
  isLoading?: boolean;
} = {}) => {
  const benefits = serviceData;


  return (
    <div className="section-padding-x">
      <div className="flex flex-col items-center gap-4 font-inter max-w-4xl mx-auto text-center mb-16">
        <Title level="title48" className="text-white uppercase font-orbitron tracking-wider">
          OUR BENEFITS
        </Title>
        <p className="text-base sm:text-lg text-white/60 max-w-3xl font-inter leading-relaxed">
          Drive traffic your way with high-quality links We are the masters of SEO
          and know the kind of links that can benefit you. Hence, we work on
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto font-inter pb-12">
        {benefits.map((benefit:any) => (
          <div
            key={benefit.id}
            className="
              group relative p-8
              rounded-[24px]
              bg-[linear-gradient(162deg,#2D2D2D_0.9%,#060606_99.1%)]
              border border-white/10
              shadow-[inset_2px_2px_22px_0_rgba(255,255,255,0.05)]
              transition-all duration-500 hover:border-Primary/50 hover:shadow-[0_0_30px_rgba(172,108,255,0.2)]
              flex flex-col items-center text-center
            "
          >
                <div className="p-4 rounded-2xl bg-[linear-gradient(112deg,#5C2B9C_32.9%,#3E7AB3_120.42%)] shadow-[inset_4px_4px_4px_-2px_rgba(255,255,255,0.20),2px_2px_12px_0_rgba(172,108,255,0.34)] mb-2">
                {benefit?.icon && 
                  <img src={benefit?.icon} alt={benefit?.title} className="w-[20px] h-[20px] object-contain invert" />
                }
              </div>

            <Title level="title24" className="text-white mb-4 font-semibold uppercase tracking-wide">
              {benefit.title}
            </Title>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkOurBenifits;
