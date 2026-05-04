import React from "react";
import bannerShadow from "@/assets/images/bannerShadow.png";
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

const LocalSEO = () => {
  const steps = [
    {
      id: "01",
      icon: <Proposal />, // Megaphone icon style
      title: "Competitor Analysis",
      desc: "It's Vital To Keep Tabs On What The Competitors Up To. How Else Will You Be Able To Prepareyour Strategy? We Will Not Only Work On Your Website But Also Find Out What Makes Your Competitors' Websites Click With The Audience.",
    },
    {
      id: "02",
      icon: <Reports />, // Magnifying glass/chart icon style
      title: "Website Audit",
      desc: "Get Every Aspect Of Your Website Scrutinized And Analyzed To Figure Out Your Strength And Weaknesses. This Will Enable You To Take Measures Timely And Make A Difference!",
    },
    {
      id: "03",
      icon: <Payment />, // Dollar icon style
      title: "Speed Optimization",
      desc: "Your Site's Responsiveness Is A Key Aspect Of User Experience. No One Has The Time To Browse Through A Website That Takes Ages To Load. Let Us Work On Ensuring That Your Website's Speed Doesn't Leave Much To Desire.",
    },
    {
      id: "04",
      icon: <Proposal />, // Megaphone icon style
      title: "Traffic Analysis",
      desc: "Figure Out What Your Targeted Audience Likes. A Lot Can Be Revealed By Analyzing The Behavior Of Your Target Audience. An SEO Campaign That Caters To The Target Audience's Requirements Isbound To Succeed.",
    },
    {
      id: "05",
      icon: <Reports />, // Magnifying glass/chart icon style
      title: "Website Migration",
      desc: "Upgrading A Website For Search Engine Optimization Can Be Confusing. There's So Much To Focus On, Including The Site's Location, Structure, Design, Content, And So Much More. Trust Us To Ensure That Nothing's Left Out!",
    },
    {
      id: "06",
      icon: <Payment />, // Dollar icon style
      title: "Technical SEO",
      desc: "If You Want To Improve The Organic Ranking Of Your Website, You Must Adhere To The Technical Requirements Of Modern Search Engines. Andth Is Is Where We Can Help You.",
    },
  ];

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
        {steps.map((step) => (
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
                <div className="w-8 h-8 flex items-center justify-center text-white">
                    {step.icon}
                </div>
              </div>

              <Title level="title24" className="text-white font-semibold">
                {step.title}
              </Title>
              <p className="text-white/70 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalSEO;