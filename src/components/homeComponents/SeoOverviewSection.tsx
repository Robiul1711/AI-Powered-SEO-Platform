import React from "react";
import TagLines from "../common/TagLines";
import Title from "../common/Title";
import GlowText from "../common/GlowText";
import featureCardBg from "@/assets/images/featureCardBg.webp";
import iconBg from "@/assets/images/iconBg.png";
import { Website, SmartKeyword, Automated, Security } from "../common/SVG";

const SeoOverviewSection = () => {
  const seoServices = [
    {
      id: "01",
      icon: <Website className="w-6 h-6 text-white" />,
      title: "On-Page & Technical SEO Optimization",
      desc: "Our automated AI audit examines over 200+ ranking factors including site speed, core web vitals, mobile responsiveness, XML sitemaps, and canonical structures. We optimize title tags, meta descriptions, header tags (H1-H3), and structured schema markups so search engines easily crawl and cite your pages.",
      highlights: ["Core Web Vitals Optimization", "Schema & Microdata Markup", "Meta Tag & Header Strategy"],
    },
    {
      id: "02",
      icon: <SmartKeyword className="w-6 h-6 text-white" />,
      title: "High-Intent Keyword & Competitor Analysis",
      desc: "We perform deep algorithmic keyword research to discover high-value search terms with maximum commercial intent. By targeting long-tail keywords, competitor gap opportunities, and buyer query patterns, your site attracts targeted visitors ready to convert into paying customers.",
      highlights: ["Competitor Gap Analysis", "Long-Tail Keyword Targeting", "Search Intent Optimization"],
    },
    {
      id: "03",
      icon: <Automated className="w-6 h-6 text-white" />,
      title: "High-Authority Link Building & Citations",
      desc: "Domain authority is the cornerstone of sustainable Google rankings. We execute Google-safe white-hat link building strategies, acquiring contextual backlinks from relevant, trusted domain sources and local business citations that establish maximum brand credibility.",
      highlights: ["White-Hat Contextual Links", "Local Citation Building", "Domain Authority Growth"],
    },
    {
      id: "04",
      icon: <Security className="w-6 h-6 text-white" />,
      title: "Rank-Driven Content & Citation Strategy",
      desc: "Search engines prioritize websites with authoritative, well-structured text. We expand your site's content footprint with E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) compliant articles, detailed service breakdowns, and clear informative boxes that earn top Google citations.",
      highlights: ["E-E-A-T Compliant Content", "Topic Clusters & Silos", "Google Citation Ready"],
    },
  ];

  return (
    <section className="section-padding-x pb-12 sm:pb-16 md:pb-20 relative ">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 text-center mb-10 sm:mb-16">
        <TagLines>Comprehensive SEO Solutions</TagLines>
        <Title level="title48" className="text-white">
          Complete Search Engine <GlowText>Optimization & Citation</GlowText>
        </Title>
        <p className="text-base sm:text-lg text-white/70 max-w-3xl text-center leading-relaxed">
          Higher Google rankings start with structured, comprehensive content and technical excellence. Our AI-driven platform delivers full-spectrum SEO services designed to increase search visibility and organic traffic.
        </p>
      </div>

      {/* Grid of SEO Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {seoServices.map((service) => (
          <div
            key={service.id}
            className="group relative p-5 sm:p-8 lg:p-10 rounded-[24px] sm:rounded-[28px] border border-white/15 transition-all duration-500 hover:border-[#AC6CFF]/60 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-15px_rgba(172,108,255,0.25)] backdrop-blur-md overflow-hidden flex flex-col justify-between"
            style={{
              backgroundImage: `url(${featureCardBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Top Row: Icon and ID */}
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div
                  className="p-3 sm:p-4 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${iconBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {service.icon}
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white/20 group-hover:text-[#AC6CFF]/80 transition-colors">
                  {service.id}
                </span>
              </div>

              {/* Title & Description */}
              <Title
                level="title24"
                className="text-white font-semibold mb-3 sm:mb-4 group-hover:text-[#AC6CFF] transition-colors"
              >
                {service.title}
              </Title>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                {service.desc}
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="pt-4 sm:pt-6 border-t border-white/10 flex flex-wrap gap-2 sm:gap-2.5">
              {service.highlights.map((highlight, idx) => (
                <span
                  key={idx}
                  className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-medium bg-[#AC6CFF]/15 text-[#D8B4FE] border border-[#AC6CFF]/30"
                >
                  ✓ {highlight}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SeoOverviewSection;
