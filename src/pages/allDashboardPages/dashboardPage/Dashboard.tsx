import React from "react";
import { 
  User, 
  TrendingUp, 
  FileText, 
  MessageSquare, 
  Briefcase, 
  BarChart, 
  Loader2,
  Activity
} from "lucide-react";
import { useSelector } from "react-redux";
import useClient from "@/hooks/useClient";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

import DashboardGraph from "./DashboardGraph";

const Dashboard = () => {
  const user = useSelector((state: any) => state.ui.user);
  
  const { data: response, isLoading } = useClient({
    queryKey: ["user-dashboard"],
    url: "/user/dashboard",
    isPrivate: true,
    options: { staleTime: 0 },
  }) as any;

  const { data: aiInsightsResponse, isLoading: aiLoading } = useClient({
    queryKey: ["user-dashboard-ai-insights"],
    url: "/user/dashboard/ai-insights",
    isPrivate: true,
  }) as any;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#AC6CFF] animate-spin" />
        <p className="mt-3 text-gray-500 font-inter text-xs tracking-widest animate-pulse">Syncing Matrix...</p>
      </div>
    );
  }

  const dashboardData = response?.data || { stats: [], activities: [] };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Briefcase": return <Briefcase size={18} />;
      case "BarChart": return <BarChart size={18} />;
      case "FileText": return <FileText size={18} />;
      case "MessageSquare": return <MessageSquare size={18} />;
      default: return <Activity size={18} />;
    }
  };

  return (
    <div className="font-inter pb-8">
      {/* Header */}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {dashboardData.stats.map((stat: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="bg-[#1A1A1A] border border-white/5 p-5 rounded-md relative overflow-hidden group hover:border-[#AC6CFF]/30 transition-all duration-300 shadow-lg flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-inter text-[10px] font-bold text-gray-400 tracking-widest">
                {stat.title}
              </h3>
              <div
                className={`p-2.5 rounded-md bg-[#242424] text-[#AC6CFF] border border-white/5 group-hover:bg-[#AC6CFF] group-hover:text-black transition-all duration-300`}
              >
                {getIcon(stat.icon)}
              </div>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-inter font-black text-white">
                {stat.value}{stat.title.includes("Progress") ? "%" : ""}
              </span>
              <p className="text-gray-500 text-[10px] font-inter font-bold mt-1 tracking-widest">
                {stat.subtitle}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] transition-all duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Analytics Graph */}
      <DashboardGraph data={dashboardData.chart} />

      {/* Recent Activity Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-[#1A1A1A] border border-white/5 p-5 sm:p-8 rounded-md shadow-xl overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#AC6CFF]/5 blur-[80px] rounded-full -mr-24 -mt-24" />
        
        <h2 className="text-lg sm:text-xl font-inter font-bold mb-6 text-white tracking-tight flex items-center justify-between">
          <span>Recent Activity</span>
        </h2>

        <div className="space-y-3">
          {dashboardData.activities.map((item: any, i: number) => (
            <motion.div
              key={i}
              whileHover={{ x: 5 }}
              className="bg-[#242424]/50 backdrop-blur-sm p-4 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-white/5 hover:border-white/10 hover:bg-[#2A2A2A] transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full ${item.color || 'bg-[#AC6CFF]'} mt-1.5 shadow-[0_0_8px_rgba(172,108,255,0.4)] shrink-0`} />
                <div>
                  <h4 className="font-inter text-sm font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-xs mt-0.5 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
              <span className="text-gray-500 text-[10px] font-inter font-bold bg-[#1A1A1A] px-2 py-1 rounded-md sm:ml-4 whitespace-nowrap">
                {item.time}
              </span>
            </motion.div>
          ))}
          
          {dashboardData.activities.length === 0 && (
              <div className="text-center py-8 border border-dashed border-white/10 rounded-md bg-white/5">
                <span className="opacity-40 italic font-inter text-xs tracking-widest text-white">
                    No activity recorded recently
                </span>
              </div>
          )}
        </div>
      </motion.div>
      {/* AI Insights Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-gradient-to-br from-[#1A1A1A] to-[#241A3A] border border-[#AC6CFF]/30 p-5 sm:p-8 rounded-md shadow-[0_0_30px_rgba(172,108,255,0.1)] overflow-hidden relative mt-8"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#AC6CFF]/10 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" />
        
        <h2 className="text-lg sm:text-xl font-inter font-bold mb-6 text-white tracking-tight flex items-center gap-3">
          <div className="p-2 bg-[#AC6CFF]/20 rounded-md text-[#AC6CFF]">
            <Sparkles size={20} className={aiLoading ? "animate-pulse" : ""} />
          </div>
          AI Dashboard Insights
        </h2>

        {aiLoading ? (
          <div className="py-8 flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#AC6CFF] animate-spin mb-3" />
            <p className="text-gray-400 font-inter text-sm animate-pulse">Our AI is analyzing your progress...</p>
          </div>
        ) : aiInsightsResponse?.data ? (
          <div className="space-y-6 relative z-10">
            <div className="bg-black/40 border border-white/5 p-4 rounded-md">
              <p className="text-[#AC6CFF] font-inter text-lg font-medium leading-relaxed">
                "{aiInsightsResponse.data.summary}"
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-inter text-xs text-gray-400 tracking-widest mb-4">Key Insights</h3>
                <ul className="space-y-3">
                  {aiInsightsResponse.data.insights?.map((insight: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 font-inter">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#AC6CFF] mt-1.5 shrink-0" />
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-inter text-xs text-gray-400 tracking-widest mb-4">Recommended Next Steps</h3>
                <ul className="space-y-3">
                  {aiInsightsResponse.data.next_steps?.map((step: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 font-inter bg-white/5 p-3 rounded-md border border-white/5 hover:border-[#AC6CFF]/30 transition-colors">
                      <ArrowRight size={16} className="text-[#AC6CFF] shrink-0 mt-0.5" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500 font-inter">
            Unable to generate insights at this moment.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
