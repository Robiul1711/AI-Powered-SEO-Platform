import React from "react";

interface KeywordStat {
  keyword: string;
  visits: string;
  rank: string;
}

const TopPerformingKeywords = () => {
  const stats = [
    {
      label: "Organic Traffic",
      value: "24,567",
      trend: "+32% This Month",
      gradient: "from-[#1a1c2e] to-[#4c78a0]",
      textColor: "text-white",
    },
    {
      label: "Keywords Ranking",
      value: "127",
      trend: "+18 New",
      gradient: "from-[#a855f7] to-[#e9d5ff]",
      textColor: "text-white",
    },
    {
      label: "Conversions",
      value: "892",
      trend: "+28% This Month",
      gradient: "from-[#60a5fa] to-gray-300",
      textColor: "text-white",
    },
  ];

  const keywords: KeywordStat[] = [
    { keyword: "Best Seo Services", visits: "1240 Visits", rank: "#3" },
    { keyword: "Local Seo Company", visits: "1240 Visits", rank: "#5" },
    { keyword: "Seo Agency Near Me", visits: "1240 Visits", rank: "#7" },
    { keyword: "Professional Seo", visits: "1240 Visits", rank: "#9" },
  ];

  return (
    <div className="section-padding-x section-padding-y font-inter">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`md:p-10 p-6 md:rounded-[2.5rem] rounded-[1.5rem] bg-gradient-to-br ${stat.gradient} ${stat.textColor} flex flex-col justify-between md:h-56 h-40 transition-all duration-300 hover:-translate-y-1 shadow-2xl relative overflow-hidden group`}
          >
            {/* Subtle glow effect */}
            <div className="absolute -inset-1 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-[2.5rem]" />

            <div className="relative z-10">
              <p className="text-xs font-semibold opacity-80 uppercase tracking-[0.2em]">
                {stat.label}
              </p>
              <h3 className="text-5xl font-orbitron font-bold mt-3 tracking-tighter">
                {stat.value}
              </h3>
            </div>
            <p className="relative z-10 text-xs font-bold opacity-90 tracking-wide">
              {stat.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Keywords List Section */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-[3rem] section-padding-x section-padding-y shadow-2xl">
        <h2 className="text-2xl font-orbitron font-bold text-white mb-12 tracking-wide text-center md:text-left">
          Top Performing Keywords
        </h2>

        <div className="space-y-4">
          {keywords.map((kw, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between group p-5 rounded-[1.5rem] bg-[#111111] border border-white/5 hover:bg-[#1A1A1A] hover:border-purple-500/20 transition-all duration-400"
            >
              <div className="flex items-center gap-6">
                <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)] group-hover:scale-125 transition-transform" />
                <span className="text-gray-300 group-hover:text-white transition-colors text-lg font-medium">
                  {kw.keyword}
                </span>
              </div>

              <div className="flex items-center gap-8 md:gap-16">
                <span className="text-gray-500 text-sm font-semibold whitespace-nowrap hidden sm:block">
                  {kw.visits}
                </span>
                <span className="bg-[#1F1F1F] text-purple-400 min-w-[48px] h-10 flex items-center justify-center rounded-xl text-sm font-black border border-white/10 shadow-lg group-hover:border-purple-500/30 group-hover:text-purple-300 transition-all">
                  {kw.rank}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPerformingKeywords;
