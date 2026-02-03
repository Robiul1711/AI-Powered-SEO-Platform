import React from "react";
import TagLines from "@/components/common/TagLines";
import Title from "@/components/common/Title";
import { FaCheck } from "react-icons/fa";
import GlowText from "@/components/common/GlowText";

interface ContentCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  wordCount: string;
  features: string[];
}

const Business = () => {
  const contentTypes: ContentCard[] = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: "Blog Posts",
      description: "SEO-optimized articles that rank and convert",
      wordCount: "1000-2,500 Words",
      features: ["Keyword research", "Engaging headlines", "Internal linking"],
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: "Web Copy",
      description: "Homepage, about, and service pages that sell",
      wordCount: "500-1,500 Words",
      features: ["Conversion-focused", "Brand voice", "CTA optimization"],
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Product Descriptions",
      description: "Compelling COPY that drives purchases",
      wordCount: "150-500 Words",
      features: ["Benefit-driven", "SEO keywords", "Persuasive copy"],
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: "Landing Pages",
      description: "High-converting pages for campaigns",
      wordCount: "800-1,500 Words",
      features: ["A/B tested copy", "Clear messaging", "Strong CTAs"],
    },
  ];

  return (
    <section className="section-padding-x section-padding-y relative overflow-hidden ">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#AC6CFF]/5 blur-[150px] rounded-full -z-10" />

      <div className="">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center mb-12 sm:mb-16">
          <TagLines>Business</TagLines>
          <Title level="title48" className="text-white">
            Content <GlowText>Types</GlowText>  We Create
          </Title>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl font-inter">
            Everything You Need To Dominate Local Search
          </p>
        </div>

        {/* Content Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {contentTypes.map((content, index) => (
            <div
              key={index}
              className="group relative p-6 sm:p-8 bg-[linear-gradient(90deg,rgba(14,14,14,0.02)_3.29%,rgba(172,108,255,0.08)_98.59%)]
    backdrop-blur-[26px] rounded-3xl flex flex-col border border-zinc-800 shadow-2xl transition-transform hover:scale-[1.02] gap-6"
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[12px] bg-[#AC6CFF]/10 border border-[#AC6CFF]/20 flex items-center justify-center text-[#AC6CFF] group-hover:bg-[#AC6CFF]/20 group-hover:scale-110 transition-all duration-300">
                {content.icon}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold font-orbitron">
                  {content.title}
                </h3>
                <p className="text-white/60 text-sm sm:text-base md:text-lg    font-inter leading-relaxed">
                  {content.description}
                </p>
              </div>

              {/* Word Count Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#AC6CFF]/10 border border-[#AC6CFF]/20 self-start">
                <span className="text-[#48EB79] text-xs sm:text-sm font-semibold font-inter">
                  {content.wordCount}
                </span>
              </div>

              {/* Features List */}
              <ul className="flex flex-col gap-3 shadow bg-[#202023] rounded-2xl p-6 space-y-2 border border-gray-600">
                {content.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center gap-3 text-white/70 text-sm font-inter"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#AC6CFF]/20 flex items-center justify-center shrink-0">
                      <FaCheck className="w-3 h-3 text-[#AC6CFF]" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Hover Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-[#AC6CFF]/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-[24px]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Business;
