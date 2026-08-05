import React from "react";
import TagLines from "../common/TagLines";
import Title from "../common/Title";
import GlowText from "../common/GlowText";

const WhySeoMatters = () => {
  const benefits = [
    {
      title: "Sustainable 24/7 Organic Growth",
      description:
        "Unlike paid ads that stop generating leads the moment your budget runs out, Search Engine Optimization builds compounding digital authority. Ranking on top of Google search results generates continuous, high-quality organic traffic day and night.",
      badge: "24/7 Traffic Engine",
    },
    {
      title: "Targeted High-Intent Leads",
      description:
        "People searching on Google are actively looking for solutions to their exact problems. By optimizing for user intent and relevant search queries, your business reaches qualified buyers at the exact moment they are ready to engage or purchase.",
      badge: "High Conversion Intent",
    },
    {
      title: "Enhanced Brand Credibility & Citation",
      description:
        "Users naturally trust websites that appear organically on the first page of Google. Complete on-page structure, informative content boxes, and authoritative backlink profiles ensure search algorithms cite your brand as an industry leader.",
      badge: "Google Citation Ready",
    },
    {
      title: "Algorithmic & AI Search Resilience",
      description:
        "Modern search engines constantly evolve with Google Core Updates and AI Overviews (SGE). Our data-driven SEO approach focuses on technical health, structured schema, and authentic content depth that keeps your rankings safe through algorithm shifts.",
      badge: "Future-Proof Strategy",
    },
  ];

  return (
    <section className="section-padding-x pt-12 sm:pt-16 md:pt-20 relative  bg-gradient-to-b from-transparent via-[#130d1d]/50 to-transparent">
      <div>
        {/* Section Header */}
        <div className="flex flex-col items-center gap-4 text-center mb-10 sm:mb-16">
          <TagLines>Why SEO Matters</TagLines>
          <Title level="title48" className="text-white">
            Unlock Long-Term Business Value with <GlowText>Proven SEO</GlowText>
          </Title>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl text-center leading-relaxed">
            Search engine optimization is not just about ranking keywords—it's about building a robust digital asset that dominates search results and outperforms competition consistently.
          </p>
        </div>

        {/* 2x2 Grid of In-depth Explanatory Text Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-5 sm:p-8 lg:p-10 rounded-[24px] bg-[#27242B]/80 border border-white/10 backdrop-blur-md hover:border-[#AC6CFF]/50 transition-all duration-300 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="mb-4">
                  <span className="inline-block px-3 sm:px-3.5 py-1 rounded-full text-xs font-semibold bg-[#AC6CFF]/20 text-[#D8B4FE] border border-[#AC6CFF]/40">
                    {benefit.badge}
                  </span>
                </div>
                <Title level="title24" className="text-white font-semibold mb-3">
                  {benefit.title}
                </Title>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySeoMatters;
