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

const OutLocalSEO = () => {
const steps = [
  {
    id: "01",
    icon: <Proposal />,
    title: "High-Quality Sites",
    desc: "Not every website is the same. It won’t do your business much good if you guest post on low-quality websites. Trust us to find the place your content deserves.",
  },
  {
    id: "02",
    icon: <Reports />,
    title: "Contextual Links",
    desc: "We realize the value of link placement and how it can benefit your business. We ensure that your content gets the links that enhance its value.",
  },
  {
    id: "03",
    icon: <Payment />,
    title: "Content That Works",
    desc: "Your readers will be put off with your business if they don’t find your content appealing. We are here to ensure that your business is represented by high-quality content.",
  },
  {
    id: "04",
    icon: <Proposal />,
    title: "Rapid Turn-Around",
    desc: "It’s our job to yield results within the shortest possible time. We will ensure that we find you the best sites, reach out to them, create ideas and write unique content without taking much time for the purpose.",
  },
  {
    id: "05",
    icon: <Reports />,
    title: "No Networks",
    desc: "We know how guest posting on low quality or fake websites can cost you. Hence, we only work with authentic blogging websites that will work to make your website search engine optimized.",
  },
  {
    id: "06",
    icon: <Payment />,
    title: "Customer Satisfaction",
    desc: "We intend to provide you with long-term benefits. Hence, you don’t have to worry about your post being taken down within a short span.",
  },

  // second section
  {
    id: "07",
    icon: <Proposal />,
    title: "Research",
    desc: "We will conduct detailed research to find blogging websites that attract an audience related to your niche.",
  },
  {
    id: "08",
    icon: <Reports />,
    title: "Contextual Links",
    desc: "We will reach out to them manually and pitch your blog to them, encouraging them to feature it on their site.",
  },
  {
    id: "09",
    icon: <Payment />,
    title: "Content That Works",
    desc: "We will work with you to create content that will make a compelling case in favor of your business and reek of quality.",
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

export default OutLocalSEO;