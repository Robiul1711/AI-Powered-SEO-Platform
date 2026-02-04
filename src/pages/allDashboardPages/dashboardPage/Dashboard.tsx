import React from "react";
import { User, TrendingUp, FileText, MessageSquare } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Active Services",
      value: "4",
      sub: "All Running Smoothly",
      icon: <User size={20} />,
      color: "bg-purple-500/20",
    },
    {
      title: "Current Month Progress",
      value: "78",
      sub: "On Click",
      icon: <TrendingUp size={20} />,
      color: "bg-purple-500/20",
    },
    {
      title: "Latest Report Status",
      value: "Available",
      sub: "March 2026",
      icon: <FileText size={20} />,
      color: "bg-purple-500/20",
    },
    {
      title: "Support Messages",
      value: "2",
      sub: "New Message",
      icon: <MessageSquare size={20} />,
      color: "bg-purple-500/20",
    },
  ];

  const activities = [
    {
      title: "SEO Monthly Report Published",
      desc: "March 2026 Report Is Now Available For Download",
      time: "2 Hours Ago",
    },
    {
      title: "SEO Monthly Report Published",
      desc: "March 2026 Report Is Now Available For Download",
      time: "2 Hours Ago",
    },
    {
      title: "Content Published",
      desc: "3 New Blog Posts Published On Your Website",
      time: "2 Hours Ago",
    },
    {
      title: "PPC Campaign Optimized",
      desc: "Ad Spend Adjusted For Better Performance",
      time: "2 Hours Ago",
    },
    {
      title: "Monthly Strategy Call Scheduled",
      desc: "Meeting Scheduled For April 5th At 2:00 PM",
      time: "2 Hours Ago",
    },
  ];

  return (
    <div className=" font-inter pb-10">
      {/* Header */}
      <header className="mb-8 sm:mb-10">
        <h1 className="text-2xl xs:text-3xl font-orbitron font-bold tracking-tight">
          Welcome back, John Doe
        </h1>
        <p className="text-gray-400 mt-2 text-xs sm:text-sm">
          Here's What's Happening With Your Marketing Campaigns
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xmd:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-[#1A1A1A] border border-white/5 p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] relative overflow-hidden group hover:border-[#AC6CFF]/30 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-orbitron text-xs sm:text-sm font-semibold text-gray-200">
                {stat.title}
              </h3>
              <div
                className={`p-2 sm:p-3 rounded-full ${stat.color} text-purple-400`}
              >
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 sm:mt-8">
              <span className="text-3xl sm:text-4xl font-orbitron font-bold">
                {stat.value}
              </span>
              <p className="text-gray-500 text-[10px] sm:text-xs mt-2">
                {stat.sub}
              </p>
            </div>
            {/* Subtle bottom glow effect on hover */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#AC6CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-[#1A1A1A] border border-white/5 p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem]">
        <h2 className="text-lg sm:text-xl font-orbitron font-bold mb-6 sm:mb-8">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {activities.map((item, i) => (
            <div
              key={i}
              className="bg-[#242424] p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-[#2a2a2a] transition-colors"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#AC6CFF] mt-1.5 shadow-[0_0_10px_rgba(172,108,255,0.5)] shrink-0" />
                <div>
                  <h4 className="font-orbitron text-[13px] sm:text-sm font-bold">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-[11px] sm:text-xs mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
              <span className="text-gray-500 text-[10px] sm:text-xs whitespace-nowrap sm:ml-4">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
