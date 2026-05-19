import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import TagLines from "../../common/TagLines";
import Title from "../../common/Title";
import GlowText from "../../common/GlowText";

const GestPostingFAQ = ({ serviceData = [], isLoading = false }: { serviceData?: any; isLoading?: boolean; } = {}) => {
  // Content extracted from the provided images

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) =>
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));

  return (
    <section className="w-full section-padding-x section-padding-y">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 text-center">
          <TagLines className="font-inter">FAQ</TagLines>
          <Title level="title48" className="text-white">
            Frequently <GlowText> Asked Questions </GlowText>(FAQ)
          </Title>
          <p className="text-base sm:text-lg text-white/60 mb-4 sm:mb-10 max-w-2xl text-center font-inter">
            Our AI platform combines cutting-edge technology with proven SEO
            strategies
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {serviceData?.map((item: any, index: number) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                onClick={() => handleToggle(index)}
                className={`group rounded-2xl p-1 font-inter transition-all duration-300 cursor-pointer   
                border border-[rgba(255,255,255,0.20)]
                bg-[linear-gradient(90deg,rgba(14,14,14,0.02)_3.29%,rgba(172,108,255,0.08)_98.59%)]
                backdrop-blur-[26px]`}
              >
                <div className="sm:p-5 p-3">
                  <div className="flex justify-between items-center gap-4">
                    <h2
                      className={`font-semibold sm:text-lg text-base md:text-xl transition-colors duration-300 ${
                        isActive
                          ? "text-[#AC6CFF]" // Matching your brand Primary color
                          : "text-white group-hover:text-[#AC6CFF]"
                      }`}
                    >
                      {item.question}
                    </h2>

                    <div
                      className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 shrink-0
                      ${isActive ? " rotate-45" : ""}`}
                    >
                      <FaPlus
                        className={` transition-colors duration-300 
                        ${
                          isActive
                            ? "text-white"
                            : "text-gray-500 dark:text-gray-400 group-hover:text-[#AC6CFF]"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Grid Animation for Accordion Content */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-4 text-white/60 text-sm sm:text-base leading-relaxed border-t border-dashed border-white/10 mt-4">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GestPostingFAQ;
