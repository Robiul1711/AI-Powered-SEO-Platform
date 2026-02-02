import React from 'react';
import { User, TrendingUp, FileText, MessageSquare } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: "Active Services", value: "4", sub: "All Running Smoothly", icon: <User size={20} />, color: "bg-purple-500/20" },
    { title: "Current Month Progress", value: "78", sub: "On Click", icon: <TrendingUp size={20} />, color: "bg-purple-500/20" },
    { title: "Latest Report Status", value: "Available", sub: "March 2026", icon: <FileText size={20} />, color: "bg-purple-500/20" },
    { title: "Support Messages", value: "2", sub: "New Message", icon: <MessageSquare size={20} />, color: "bg-purple-500/20" },
  ];

  const activities = [
    { title: "SEO Monthly Report Published", desc: "March 2026 Report Is Now Available For Download", time: "2 Hours Ago" },
    { title: "SEO Monthly Report Published", desc: "March 2026 Report Is Now Available For Download", time: "2 Hours Ago" },
    { title: "Content Published", desc: "3 New Blog Posts Published On Your Website", time: "2 Hours Ago" },
    { title: "PPC Campaign Optimized", desc: "Ad Spend Adjusted For Better Performance", time: "2 Hours Ago" },
    { title: "Monthly Strategy Call Scheduled", desc: "Meeting Scheduled For April 5th At 2:00 PM", time: "2 Hours Ago" },
  ];

  return (
    <div className="  font-inter">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-orbitron font-bold tracking-tight">Welcome back, John Doe</h1>
        <p className="text-gray-400 mt-2 text-sm">Here's What's Happening With Your Marketing Campaigns</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#1A1A1A] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-orbitron text-sm font-semibold text-gray-200">{stat.title}</h3>
              <div className={`p-3 rounded-full ${stat.color} text-purple-400`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-8">
              <span className="text-4xl font-orbitron font-bold">{stat.value}</span>
              <p className="text-gray-500 text-xs mt-2">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-[#1A1A1A] border border-white/5 p-8 rounded-[2rem]">
        <h2 className="text-xl font-orbitron font-bold mb-8">Recent Activity</h2>
        
        <div className="space-y-4">
          {activities.map((item, i) => (
            <div key={i} className="bg-[#242424] p-5 rounded-2xl flex items-center justify-between group hover:bg-[#2a2a2a] transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-[#AC6CFF] mt-1.5 shadow-[0_0_10px_rgba(172,108,255,0.5)]" />
                <div>
                  <h4 className="font-orbitron text-sm font-bold">{item.title}</h4>
                  <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                </div>
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;