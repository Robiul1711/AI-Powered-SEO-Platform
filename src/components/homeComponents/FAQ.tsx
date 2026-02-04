import React, { useState, useRef } from "react";

import { FaPlus } from "react-icons/fa6";
import TagLines from "../common/TagLines";
import Title from "../common/Title";
import GlowText from "../common/GlowText";



const FAQ = () => {
  const accordingData = [
    {
      title: "What is the purpose of wireframing in design?",
      description:
        "Wireframing outlines the basic structure and layout of a design, serving as a visual guide before detailed development. It helps stakeholders focus on functionality before getting distracted by visual aesthetics.",
    },
    {
      title: "Why is user-centered design important?",
      description:
        "User-centered design ensures products meet the needs and preferences of the end-users, enhancing usability and satisfaction. It reduces development costs by fixing issues early in the design process.",
    },
    {
      title: "What role does contrast play in graphic design?",
      description:
        "Contrast in graphic design emphasizes differences, making elements stand out and improving visual hierarchy. It guides the user's eye to the most important information on the page.",
    },
    {
      title: 'Define the term "responsive design" in web development.',
      description:
        "Responsive design ensures web pages adapt to various screen sizes, providing an optimal user experience on different devices, from desktop monitors to mobile phones.",
    },
    {
      title: "What is the significance of color theory in design?",
      description:
        "Color theory guides the selection and combination of colors to evoke specific emotions, enhance readability, and create visually appealing designs that align with brand identity.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);


  const handleToggle = (index: number) =>
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));

  return (
    <section  className="w-full section-padding-x ">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header Section */}
      <div className="flex flex-col items-center gap-4  text-center ">
        <TagLines className="font-inter">FAQ</TagLines>
        <Title level="title48" className="text-white">
          Frequently <GlowText> Asked Questions </GlowText>(FAQ)
        </Title>
        <p className="text-base sm:text-lg text-white/60 mb-4 sm:mb-10 max-w-2xl text-center font-inter">
     Our Al platform combines cutting-edge technology with proven SEO strategies
        </p>
      </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {accordingData.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                onClick={() => handleToggle(index)}
                // Added 'faq-item' class here for GSAP target
                className={` group rounded-2xl p-1 font-inter transition-all duration-300 cursor-pointer   
    border border-[rgba(255,255,255,0.20)]
    bg-[linear-gradient(90deg,rgba(14,14,14,0.02)_3.29%,rgba(172,108,255,0.08)_98.59%)]
    backdrop-blur-[26px]
                 `}
              >
                <div className="sm:p-5 p-3">
                  <div className="flex justify-between items-center gap-4">
                    <h2
                      className={`font-semibold sm:text-lg text-base md:text-xl transition-colors duration-300 ${
                        isActive
                          ? "text-Primary "
                          : "text-white group-hover:text-Primary "
                      }`}
                    >
                      {item.title}
                    </h2>

                    <div
                      className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 shrink-0
                      ${
                        isActive
                          ? " rotate-45"
                          : ""
                      }`}
                    >
                      <FaPlus
                        className={` transition-colors duration-300 
                        ${
                          isActive
                            ? "text-white"
                            : "text-gray-500 dark:text-gray-400 group-hover:text-Primary"
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
                      <p className="pt-4 text-white/60 text-sm sm:text-base leading-relaxed border-t border-dashed border-gray-200  mt-4">
                        {item.description}
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

export default FAQ;