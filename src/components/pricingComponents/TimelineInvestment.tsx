import React from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2 } from "lucide-react";

const phases = [
  {
    id: "01",
    label: "Phase 01",
    title: "Technical Foundation",
    timeline: "Week 1-2",
    investment: "$1,500",
    tasks: [
      "Technical SEO Audit & Fixes",
      "Site Speed Optimization",
      "Mobile Responsiveness Improvement",
      "Core Web Vitals Optimization",
    ],
  },
  {
    id: "02",
    label: "Phase 02",
    title: "Content Strategy",
    timeline: "Week 3-6",
    investment: "$2,500",
    tasks: [
      "Keyword Research & Mapping",
      "Content Gap Analysis",
      "On-Page Optimization (20 Pages)",
      "Meta Tags & Schema Markup",
    ],
  },
  {
    id: "03",
    label: "Phase 03",
    title: "Growth & Authority",
    timeline: "Week 7-12",
    investment: "$3,000/Mo",
    tasks: [
      "Link Building Campaign",
      "Local SEO Optimization",
      "Monthly Performance Reports",
      "Ongoing AI Recommendations",
    ],
  },
];

const TimelineInvestment = () => {
  return (
    <div className="section-padding-x py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-white uppercase tracking-wider">
          Proposed Timeline & Investment
        </h2>
      </div>

      <div className=" flex flex-col gap-6">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative p-6 md:p-8 rounded-2xl bg-[#111111]/60 border border-white/5 hover:border-[#AC6CFF]/30 transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
              {/* Phase Number */}
              <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-orbitron text-white font-bold group-hover:text-[#AC6CFF] transition-colors">
                  {phase.id}
                </span>
              </div>

              {/* Content */}
              <div className="grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {/* Titles */}
                <div className="flex flex-col space-y-2">
                  <span className="text-[#AC6CFF] text-[10px] uppercase font-bold tracking-widest">
                    {phase.label}
                  </span>
                  <h3 className="text-white font-orbitron text-xl leading-tight">
                    {phase.title}
                  </h3>
                </div>

                {/* Timeline & Tasks */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-2 text-white/60">
                    <Clock size={16} className="text-white/40" />
                    <span className="text-xs font-inter lowercase">
                      {phase.timeline}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                    {phase.tasks.map((task, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 group/task"
                      >
                        <CheckCircle2
                          size={14}
                          className="mt-0.5 text-[#AC6CFF] opacity-70 group-hover/task:opacity-100 transition-opacity"
                        />
                        <span className="text-white/70 text-xs font-inter">
                          {task}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="lg:w-32 lg:text-right flex flex-col justify-center items-start lg:items-end border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-8 w-full">
                <span className="text-white/40 text-[10px] uppercase tracking-widest mb-1">
                  Investment
                </span>
                <span className="text-white font-orbitron text-xl font-bold">
                  {phase.investment}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TimelineInvestment;
