import React from "react";
import p1 from "@/assets/images/p1.webp";
import p2 from "@/assets/images/p2.webp";
import p3 from "@/assets/images/p3.webp";
import p4 from "@/assets/images/p4.webp";
import p5 from "@/assets/images/p5.webp";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import { Link } from "react-router-dom";
const projectsData = [
  {
    id: 1,
    image: p1,
    category: "E-commerce",
    title: "SEO Monthly + Content Writing",
    stats: "+120% Organic Traffic in 6 Months",
  },
  {
    id: 2,
    image: p2,
    category: "SaaS",
    title: "Google Ads PPC Campaign",
    stats: "+85% Conversion Rate Increase",
  },
  {
    id: 3,
    image: p3,
    category: "Real Estate",
    title: "Social Media Marketing",
    stats: "20k+ Leads Generated in Year",
  },
  {
    id: 4,
    image: p4,
    category: "Fintech",
    title: "UI/UX Design Revamp",
    stats: "Award Winning App Design",
  },
  {
    id: 5,
    image: p5,
    category: "Healthcare",
    title: "Local SEO Strategy",
    stats: "Top 3 Ranking for Keywords",
  },
  {
    id: 6,
    image: p1,
    category: "E-commerce",
    title: "SEO Monthly + Content Writing",
    stats: "+120% Organic Traffic in 6 Months",
  },

  {
    id: 7,
    image: p2,
    category: "SaaS",
    title: "Google Ads PPC Campaign",
    stats: "+85% Conversion Rate Increase",
  },
  {
    id: 8,
    image: p3,
    category: "Real Estate",
    title: "Social Media Marketing",
    stats: "20k+ Leads Generated in Year",
  },
];

const ProjectCard = () => {
  return (
    <>
      {projectsData.map((project) => (
        <Link
          key={project.id}
          to={`/case-studies-details/${project.id}`}
          className="group flex flex-col rounded-2xl border border-[#AC6CFF]/20 overflow-hidden    bg-[linear-gradient(90deg,rgba(14,14,14,0.02)_3.29%,rgba(172,108,255,0.08)_98.59%)]
    backdrop-blur-[26px] hover:border-[#AC6CFF]/60 hover:shadow-[0_0_20px_rgba(172,108,255,0.2)]"
        >
          {/* Image Container with Zoom effect */}
          <div className="overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <div className="p-5 flex flex-col flex-1 gap-4 items-start">
            <p className="text-[#AC6CFF] text-xs px-4 py-1 rounded-full border bg-[#36313D] border-[#AC6CFF]/26 transition-colors duration-300 group-hover:bg-[#AC6CFF] group-hover:text-white">
              {project.category}
            </p>

            <Title
              level="title16"
              className="transition-colors duration-300 group-hover:text-[#AC6CFF]"
            >
              {project.title}
            </Title>

            <Title level="title20" className="font-orbitron">
              {project.stats}
            </Title>

            <CommonButton className="bg-bg-custom w-full font-orbitron mt-auto transition-all duration-300 group-hover:shadow-[0_0_15px_#AC6CFF]">
              View Case Study
            </CommonButton>
          </div>
        </Link>
      ))}
    </>
  );
};

export default ProjectCard;
