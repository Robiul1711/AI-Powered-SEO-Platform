import React from 'react';
import TagLines from '../common/TagLines';
import Title from '../common/Title';
import { Values } from '../common/SVG';

const valuesData = [
  {
    id: 1,
    title: "Who We Are",
    description: "We are a team of professionals who understand SEO on a much deeper level than most people. We also realize how frustrating it can be to put in so much hard work yet see your website struggling. We are here to change that We are accessible to all those who want to turn things around for their business. Anyone who wants to use the online traffic to give their business a boost canturn to us. and we will help them in the best way possible",
    icon: <Values />
  },
  {
    id: 2,
    title: "Client Success First",
    description: "We put our clients at the center of every decision we make. Every strategy, design, and solution we create is carefully built to solve real business challenges not just to look good, but to deliver meaningful results. We focus on understanding your goals, your users, and your market to craft experiences that drive measurable growth, stronger engagement, and long-term success. Because to us, your progress is personal  when you succeed, we succeed right alongside you.",
    icon: <Values /> // Replace with specific icons if you have them
  },
  {
    id: 3,
    title: " Data-Driven Strategy",
    description: "Every step we take is backed by in-depth research, actionable insights, and real performance data  not assumptions. We carefully analyze user behavior, market trends, and design logic to understand what truly works for a brand and its audience. This allows us to craft solutions that are not only smart and effective today, but also scalable, optimized, and future-ready for tomorrow’s digital challenges. Our approach ensures meaningful results, long-term growth, and experiences that feel intuitive, modern, and purposeful.",
    icon: <Values />
  },
  {
    id: 4,
    title: "Reliable & Transparent Work",
    description: "We believe great work starts with clear communication and honest delivery. Our process is always transparent no hidden steps, no confusion. From UI/UX to full development, we ensure steady progress, regular updates, and smart decisions aligned with real business goals. The result is a smooth workflow and quality output you can trust at every stage.",
    icon: <Values />
  }
];

const OurValues = () => {
  return (
    <section className="section-padding-y ">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-12">
        <TagLines>Our Values</TagLines>
        <Title level="title48" className="text-white font-orbitron mt-2">
          Our Values
        </Title>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {valuesData.map((item) => (
          <div 
            key={item.id} 
            className="p-1 bg-[#3C3C3C]/30 rounded-2xl border border-[#3C3C3C]/40 transition-all hover:border-white/20"
          >
            <div className="h-full p-8 bg-[#1A1A1A]/60 rounded-[calc(1rem-1px)] flex flex-col items-start gap-6">
              {/* Icon Container */}
              <div className="flex items-center justify-center p-4 bg-[#3C3C3C]/80 rounded-2xl text-white">
                {item.icon}
              </div>

              <div className="space-y-3">
                <Title level="title24" className="text-white font-orbitron uppercase tracking-wide">
                  {item.title}
                </Title>
                <p className="font-inter text-white/70 leading-relaxed text-sm md:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurValues;