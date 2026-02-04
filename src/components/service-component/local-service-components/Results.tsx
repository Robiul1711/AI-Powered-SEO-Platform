import React from "react";
import TagLines from "@/components/common/TagLines";
import Title from "@/components/common/Title";
import GlowText from "@/components/common/GlowText";
import { Users, MapPin } from "lucide-react";

const resultsData = [
  {
    id: 1,
    businessName: "Downtown Dental",
    location: "Chicago, IL",
    achievement: "Ranked #1 for 'dentist downtown Chicago' in 45 days",
    resultValue: "+215%",
    resultType: "local traffic",
    timeframe: "in 90 days",
    testimonialName: "Dr. Sarah Mitchell",
  },
  {
    id: 2,
    businessName: "Peak Performance Gym",
    location: "Austin, TX",
    achievement: "Top 3 for all major gym-related searches",
    resultValue: "+180%",
    resultType: "phone calls",
    timeframe: "in 90 days",
    testimonialName: "Mike Rodriguez",
  },
  {
    id: 3,
    businessName: "Green Leaf Landscaping",
    location: "Portland, ORZ",
    achievement: "Dominating local pack for 15+ keywords",
    resultValue: "+340%",
    resultType: "leads",
    timeframe: "in 90 days",
    testimonialName: "Tom Jensen",
  },
];

const Results = () => {
  return (
    <section className="relative section-padding-x section-padding-y text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#AC6CFF]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center mb-16">
        <TagLines className="mb-6">Results</TagLines>

        <Title level="title56" className="max-w-4xl mx-auto mb-6">
          Real <GlowText>Results</GlowText> From Real Businesses
        </Title>

        <p className="text-white/60 text-lg max-w-2xl mx-auto font-inter">
          See How We've Helped Local Businesses Dominate Their Markets
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resultsData.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col rounded-[32px] border border-[#AC6CFF]/20 overflow-hidden bg-[linear-gradient(180deg,rgba(172,108,255,0.05)_0%,rgba(0,0,0,0)_100%)] backdrop-blur-[26px] md:p-8 sm:p-6 p-4 transition-all duration-500 hover:border-[#AC6CFF]/50 hover:shadow-[0_0_30px_rgba(172,108,255,0.15)]"
          >
            {/* Header with Icon and Decorative element */}
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                <Users className="text-[#AC6CFF]" size={28} />
              </div>
              <div className="w-6 h-6 bg-[#AC6CFF]/10 rounded-md rotate-45 border border-[#AC6CFF]/20"></div>
            </div>

            {/* Business Info */}
            <h3 className="text-2xl font-bold mb-2 font-orbitron">
              {item.businessName}
            </h3>
            <div className="flex items-center gap-2 text-white/60 text-sm mb-6 font-inter">
              <MapPin size={16} className="text-[#AC6CFF]" />
              {item.location}
            </div>

            {/* Achievement Paragraph */}
            <p className="text-white/80 mb-4 sm:mb-6 md:mb-8 font-inter leading-relaxed">
              {item.achievement}
            </p>

            {/* Large Highlight Box */}
            <div className="mt-auto bg-zinc-900/60 border border-white/5 sm:rounded-3xl rounded-2xl sm:p-6 p-4 mb-6">
              <div className="flex flex-col">
                <GlowText className="md:text-4xl text-2xl font-bold mb-1">
                  {item.resultValue} {item.resultType}
                </GlowText>
                <span className="text-white/40 text-sm font-inter">
                  {item.timeframe}
                </span>
              </div>
            </div>

            {/* Testimonial Author */}
            <div className="md:mt-4 flex items-center gap-2">
              <span className="text-white/40 font-inter">__</span>
              <span className="text-white/90 font-medium font-inter">
                {item.testimonialName}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Results;
