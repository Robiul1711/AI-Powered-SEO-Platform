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
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <Loader2 className="w-12 h-12 text-[#AC6CFF] animate-spin" />
        <p className="mt-4 text-gray-500 font-orbitron text-sm tracking-widest uppercase animate-pulse">Syncing Matrix...</p>
      </div>
    );
  }

  const dashboardData = response?.data || { stats: [], activities: [] };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Briefcase": return <Briefcase size={20} />;
      case "BarChart": return <BarChart size={20} />;
      case "FileText": return <FileText size={20} />;
      case "MessageSquare": return <MessageSquare size={20} />;
      default: return <Activity size={20} />;
    }
  };

  return (
    <div className="font-inter pb-10">
      {/* Header */}
      <header className="mb-10">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-3xl md:text-4xl font-orbitron font-bold tracking-tight text-white uppercase">
            Welcome back, <span className="text-[#AC6CFF]">{user?.name || user?.full_name || "User"}</span>
            </h1>
            <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest font-light">
            Performance analytics and operational synchronization
            </p>
        </motion.div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xmd:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {dashboardData.stats.map((stat: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-[#1A1A1A] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-[#AC6CFF]/30 transition-all duration-300 shadow-xl"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-orbitron text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {stat.title}
              </h3>
              <div
                className={`p-3 rounded-xl bg-[#242424] text-[#AC6CFF] border border-white/5 group-hover:bg-[#AC6CFF] group-hover:text-black transition-all duration-500`}
              >
                {getIcon(stat.icon)}
              </div>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-orbitron font-black text-white">
                {stat.value}{stat.title.includes("Progress") ? "%" : ""}
              </span>
              <p className="text-gray-500 text-[10px] font-orbitron font-bold mt-2 uppercase tracking-widest">
                {stat.subtitle}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] transition-all duration-700" />
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-[#1A1A1A] border border-white/5 p-6 sm:p-10 rounded-[2.5rem] shadow-2xl overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#AC6CFF]/5 blur-[100px] rounded-full -mr-32 -mt-32" />
        
        <h2 className="text-xl sm:text-2xl font-orbitron font-bold mb-8 text-white uppercase tracking-tight">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {dashboardData.activities.map((item: any, i: number) => (
            <motion.div
              key={i}
              whileHover={{ x: 10 }}
              className="bg-[#242424]/50 backdrop-blur-sm p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`w-3 h-3 rounded-full ${item.color || 'bg-[#AC6CFF]'} mt-1.5 shadow-[0_0_10px_rgba(172,108,255,0.4)]`} />
                <div>
                  <h4 className="font-orbitron text-sm font-bold text-white uppercase tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-xs mt-1 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
              <span className="text-gray-600 text-[10px] font-orbitron font-bold uppercase tracking-widest whitespace-nowrap md:ml-6">
                {item.time}
              </span>
            </motion.div>
          ))}
          
          {dashboardData.activities.length === 0 && (
              <div className="text-center py-10 opacity-30 italic font-orbitron text-sm uppercase tracking-widest">
                  No activity sequences recorded
              </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
