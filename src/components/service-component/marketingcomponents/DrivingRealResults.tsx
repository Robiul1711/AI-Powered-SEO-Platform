import React from "react";
import Title from "@/components/common/Title";
import { FaArrowUp } from "react-icons/fa";

const DrivingRealResults = ({ serviceData, isLoading }: any) => {
  const stats = [
    { value: "3%", label: "Increase" },
    { value: "100%", label: "Growth" },
    { value: "15m", label: "Reach" },
  ];

  return (
    <div className="section-padding-x section-padding-y">
 
        <div className="bg-[#1a1a1c] rounded-[32px] p-8 md:p-12 lg:p-16 border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Section: Stats Grid */}
            <div className="flex-1 w-full">
              <Title level="title32" className="text-white font-orbitron mb-12 text-left">
                Driving Real Results
              </Title>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12">
                {serviceData?.map((stat: any, index: any) => (
                  <div key={index} className="flex flex-col items-center gap-4">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex flex-col items-center justify-center border border-white/10 bg-gradient-to-b from-white/5 to-transparent shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
                      {/* Outer Ring Decoration */}
                      <div className="absolute inset-[-10px] rounded-full border border-white/5" />
                      
                      <span className="md:text-2xl text-xl font-orbitron text-white font-bold">
                        {stat.value}
                      </span>
                      <FaArrowUp className="text-white/60 mt-2 text-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section: Lead Counter */}
            <div className="w-full lg:w-2/5">
              <div className="bg-[#242426] rounded-3xl p-8 md:p-12 border border-white/10 flex flex-col items-center text-center gap-6 shadow-xl">
                <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white tracking-tight">
                  282,000+
                </h2>
                <p className="text-white/40 font-inter text-sm md:text-base">
                  Leads generated so far...
                </p>
                <button className="bg-bg-custom text-white font-inter font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_#ac6cff] active:scale-95 text-xs uppercase tracking-widest mt-4">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
     
    </div>
  );
};

export default DrivingRealResults;
