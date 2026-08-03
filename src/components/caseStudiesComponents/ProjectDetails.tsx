import React from "react";
import videoBg from "@/assets/images/videoBg.webp";
import p3 from "@/assets/images/p3.webp";
import VideoButton from "../common/VideoButton";
import Title from "../common/Title";
import {
  Search,
  RefreshCw,
  Layers,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";

const ProjectDetails = () => {
  return (
    <div className="mt-20">
      {/* Main Card */}
      <div className="rounded-[32px] overflow-hidden bg-[#FFFFFF]/7 border border-white/5 relative z-10 p-8 font-inter">
        {/* Video Section */}
        <div className="relative w-full h-[300px] md:h-[500px] group">
          <img
            src={videoBg}
            alt="Video Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <VideoButton onClick={() => {}} />
          </div>
        </div>

        {/* Content Body */}
        <div className="flex flex-col items-center text-center">
          {/* Pill */}
          <span className="px-6 py-2 rounded-full border border-[#AC6CFF]/30 bg-[#AC6CFF]/10 text-[#AC6CFF] mt-8 text-sm font-medium mb-8">
            E-commerce
          </span>

          {/* Main Heading */}
          <Title level="title48" className="font-orbitron mb-4 text-white">
            +120% Organic Traffic In 6 Months
          </Title>

          {/* Subtitle */}
          <p className="text-white/60 text-lg mb-14">
            SEO Monthly + Content Writing
          </p>

          {/* Info Grid */}
          <div className="w-full max-w-4xl bg-[#1E1B22] border border-white/5 rounded-2xl p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <div className="flex flex-col gap-2">
              <p className="text-white/40 text-sm">Client Type</p>
              <p className="text-white font-medium text-lg leading-relaxed">
                Online Retailer
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white/40 text-sm">Location</p>
              <p className="text-white font-medium text-lg leading-relaxed">
                United States
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white/40 text-sm">Service Provided</p>
              <p className="text-white font-medium text-lg leading-relaxed">
                SEO Monthly + Content Writing
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white/40 text-sm">Duration</p>
              <p className="text-white font-medium text-lg leading-relaxed">
                6 Months
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Challenge Section */}
      <div className="mt-20  grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-20 font-inter">
        <div className="flex flex-col">
          <Title
            level="title48"
            className="font-orbitron text-white leading-tight"
          >
            Our <br /> Challenge
          </Title>
        </div>

        <div className="flex flex-col">
          <p className="text-white/70 leading-relaxed text-lg mb-10">
            The client was struggling with low organic visibility in a
            competitive e-commerce niche. Their product pages weren't ranking
            for key commercial keywords, and blog traffic was minimal. They
            needed a comprehensive SEO strategy to increase qualified traffic
            and improve conversion rates.
          </p>

          <div className="space-y-6">
            <ChallengeItem
              icon={<Search className="w-5 h-5 text-[#5289FF]" />}
              text="Low keyword rankings for high-intent commercial search terms"
            />
            <ChallengeItem
              icon={<RefreshCw className="w-5 h-5 text-[#AC6CFF]" />}
              text="Minimal organic traffic to product and category pages"
            />
            <ChallengeItem
              icon={<Layers className="w-5 h-5 text-[#FFB053]" />}
              text="Under-optimized content structure (blogs & on-page SEO gaps)"
            />
            <ChallengeItem
              icon={<ShoppingCart className="w-5 h-5 text-[#FF6C6C]" />}
              text="Low conversion rate despite existing traffic"
            />
          </div>
        </div>
      </div>

      {/* Our Approach Section */}
      <div className="mt-20 bg-[#151318] rounded-[32px] p-8 md:p-12 lg:p-20 font-inter border border-white/5">
        <div className="">
          <Title level="title48" className="font-orbitron text-white mb-6">
            Our Approach
          </Title>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            We followed a structured, insight-driven SEO process tailored to the
            client's business goals. Each step focused on improving search
            visibility, attracting high-intent users, and optimizing the journey
            from discovery to conversion.
          </p>
          <div className="space-y-4">
            {[
              "Conducted Detailed Keyword Research Focusing On Commercial Intent And Long-Tail Opportunities",
              "Optimized Product Pages With Improved Meta Data, Descriptions, And Schema Markup",
              "Created A Content Calendar With 20+ High-Quality Blog Posts Targeting Buyer Journey Keywords",
              "Built High-Authority Backlinks Through Strategic Outreach And Content Partnerships",
              "Implemented Technical SEO Improvements Including Site Speed Optimization And Mobile Enhancements",
            ].map((item, index) => (
              <CheckListItem key={index} text={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Team Image Section */}
      <div className="mt-20 rounded-[32px] overflow-hidden border border-white/10 h-[300px] md:h-[500px]">
        <img
          src={videoBg}
          alt="Team Working"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Results Section */}
      <div className="mt-20 bg-[#151318] rounded-[32px] p-8 md:p-12 lg:p-20 font-inter border border-white/5">
        <div className="">
          <Title level="title48" className="font-orbitron text-white mb-6">
            Results
          </Title>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            Our strategic execution delivered consistent and measurable growth
            across key performance metrics. The client experienced significant
            improvements in traffic quality, keyword rankings, revenue, and
            overall site performance within a short timeframe.
          </p>
          <div className="space-y-4">
            {[
              "120% Increase In Organic Traffic Within 6 Months",
              "45 Keywords Ranking In Top 3 Positions On Google",
              "85% Increase In Organic Revenue",
              "Page Load Time Reduced By 40%",
              "Mobile Conversion Rate Improved By 32%",
            ].map((item, index) => (
              <CheckListItem key={index} text={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChallengeItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 min-w-8 min-h-8 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
      {icon}
    </div>
    <p className="text-white/90 text-lg">{text}</p>
  </div>
);

const CheckListItem = ({ text }: { text: string }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 min-w-6 min-h-6 w-6 h-6 rounded-full border border-green-500/50 flex items-center justify-center">
      <CheckCircle className="w-4 h-4 text-green-500" />
    </div>
    <p className="text-white/80 text-base md:text-lg">{text}</p>
  </div>
);

export default ProjectDetails;
