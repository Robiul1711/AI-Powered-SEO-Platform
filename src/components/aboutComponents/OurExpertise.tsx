import React from "react";
import TagLines from "../common/TagLines";
import Title from "../common/Title";
import { FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const OurExpertise = () => {
  const socialLinks = [
    { icon: <FaTwitter />, link: "#" },
    { icon: <FaLinkedinIn />, link: "#" },
    { icon: <FaGithub />, link: "#" },
  ];

  const mainSkills = [
    "Sales/Marketing Strategy",
    "Researching Audience Needs",
    "Search Marketing SEO & PPC",
    "Strong Communication Skills",
    "Event Planning",
    "Presenting Ideas And Copy To Clients",
    "Email Marketing, Design & Dev",
    "Social Media (Paid & Organic)",
  ];

  const values = [
    "Good Design Is Good Business",
    "Share Knowledge, Ideas And Skills",
    "Cultivate Love For Education",
    "Get To The Root Of The Problem",
    "Listen Attentively",
    "Keep It Simple (My Favourite)",
    "Learn And Be Curious",
    "Focus On The Key Inputs",
  ];

  return (
    <div className=" section-padding-y">
      {/* header section */}
      <div className="flex flex-col items-center gap-4 font-inter  text-center ">
        <TagLines>Our Expertise</TagLines>
        <Title level="title48" className="text-white">
          Our Expertise
        </Title>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-12 md:pt-20 font-inter text-white">
        {/* Column 1: Personal Info */}
        <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 flex flex-col gap-6">
          <h3 className="text-2xl font-orbitron font-medium tracking-wide">
            Personal Info
          </h3>
          <div className="bg-[#1A1A1A] rounded-2xl p-6 flex-1 flex flex-col gap-8 border border-white/5">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                Contact Adress
              </span>
              <p className="text-gray-300 font-medium">
                36 East 20th Street, 6th Floor
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                General Inquiries
              </span>
              <p className="text-gray-300 font-medium break-all">
                Borgholm@qodeinteractive.com
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                Social Media
              </span>
              <div className="flex gap-3">
                {socialLinks.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#2A2A2A] hover:bg-[#A855F7] text-[#A855F7] hover:text-white flex items-center justify-center transition-all duration-300"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Main Skills */}
        <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 flex flex-col gap-6">
          <h3 className="text-2xl font-orbitron font-medium tracking-wide">
            Main Skills
          </h3>
          <div className="bg-[#1A1A1A] rounded-2xl p-6 flex-1 border border-white/5">
            <ul className="space-y-4">
              {mainSkills.map((skill, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-[#A855F7] shrink-0" />
                  <span className="text-gray-300 leading-snug">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 3: Values */}
        <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 flex flex-col gap-6">
          <h3 className="text-2xl font-orbitron font-medium tracking-wide">
            Values
          </h3>
          <div className="bg-[#1A1A1A] rounded-2xl p-6 flex-1 border border-white/5">
            <ul className="space-y-4">
              {values.map((value, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-[#A855F7] shrink-0" />
                  <span className="text-gray-300 leading-snug">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurExpertise;
