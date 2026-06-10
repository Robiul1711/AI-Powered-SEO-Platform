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

const Dashboard = () => {
  const user = useSelector((state: any) => state.ui.user);
  
  const { data: response, isLoading } = useClient({
    queryKey: ["user-dashboard"],
    url: "/user/dashboard",
    isPrivate: true,
  }) as any;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#AC6CFF] animate-spin" />
        <p className="mt-3 text-gray-500 font-orbitron text-xs tracking-widest uppercase animate-pulse">Syncing Matrix...</p>
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
            className="bg-[#1A1A1A] border border-white/5 p-5 rounded-2xl relative overflow-hidden group hover:border-[#AC6CFF]/30 transition-all duration-300 shadow-lg flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-orbitron text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {stat.title}
              </h3>
              <div
                className={`p-2.5 rounded-lg bg-[#242424] text-[#AC6CFF] border border-white/5 group-hover:bg-[#AC6CFF] group-hover:text-black transition-all duration-300`}
              >
                {getIcon(stat.icon)}
              </div>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-orbitron font-black text-white">
                {stat.value}{stat.title.includes("Progress") ? "%" : ""}
              </span>
              <p className="text-gray-500 text-[10px] font-orbitron font-bold mt-1 uppercase tracking-widest">
                {stat.subtitle}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] transition-all duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-[#1A1A1A] border border-white/5 p-5 sm:p-8 rounded-2xl shadow-xl overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#AC6CFF]/5 blur-[80px] rounded-full -mr-24 -mt-24" />
        
        <h2 className="text-lg sm:text-xl font-orbitron font-bold mb-6 text-white uppercase tracking-tight flex items-center justify-between">
          <span>Recent Activity</span>
        </h2>

        <div className="space-y-3">
          {dashboardData.activities.map((item: any, i: number) => (
            <motion.div
              key={i}
              whileHover={{ x: 5 }}
              className="bg-[#242424]/50 backdrop-blur-sm p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-white/5 hover:border-white/10 hover:bg-[#2A2A2A] transition-all"
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
              <div className="text-center py-8 border border-dashed border-white/10 rounded-xl bg-white/5">
                <span className="opacity-40 italic font-orbitron text-xs uppercase tracking-widest text-white">
                    No activity recorded recently
                </span>
              </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
