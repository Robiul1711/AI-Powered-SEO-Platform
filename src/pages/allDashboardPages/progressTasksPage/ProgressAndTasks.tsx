import React from "react";
import useClient from "@/hooks/useClient";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface TaskItem {
  id: number;
  title: string;
  description: string;
  progress: number;
}

interface ServiceData {
  booking_id: number;
  plan_name: string;
  service_title: string;
  overall_progress: number;
  status: string;
  payment_status: string;
  items: TaskItem[];
}

const ProgressAndTasks = () => {
  const { data: response, isLoading } = useClient({
    queryKey: ["user-tasks"],
    url: "/user/tasks",
    isPrivate: true,
  }) as any;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-[#AC6CFF] animate-spin" />
        <p className="mt-4 text-gray-400 font-orbitron animate-pulse uppercase tracking-[0.2em] text-xs">Syncing Performance Roadmaps...</p>
      </div>
    );
  }

  const services: ServiceData[] = response?.data || [];
  
  // Helper for status badge colors (Service Level)
  const getStatusStyle = (s: string) => {
      const status = (s || "").toLowerCase();
      if (status === "ongoing") return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      if (status === "completed") return "bg-green-500/10 text-green-400 border-green-500/20";
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
  };

  return (
    <div className="font-inter pb-16">
      <header className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-white tracking-tight uppercase">
          Progress & <span className="text-[#AC6CFF]">Tasks</span>
        </h1>
        <p className="text-gray-400 mt-2 text-xs sm:text-sm font-light uppercase tracking-widest">
          Track Ongoing Work And Completed Deliverables Across Your Services
        </p>
      </header>

      <div className="space-y-8 sm:space-y-12">
        {services.length > 0 ? (
          services.map((service, sIdx) => (
            <div
              key={service.booking_id}
              className="bg-[#1A1A1A] border border-white/5 rounded-[1.5rem] sm:rounded-[2.5rem] p-5 sm:p-10 relative overflow-hidden"
            >
              {/* Subtle top gradient line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#AC6CFF]/30 to-transparent" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-gradient-to-b from-[#AC6CFF] to-[#6C9AFF] rounded-full shadow-[0_0_10px_rgba(172,108,255,0.4)]" />
                    <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h2 className="text-xl sm:text-3xl font-orbitron font-bold text-[#AC6CFF] tracking-tight uppercase">
                            {service.service_title}
                            </h2>
                            <span className="text-[9px] font-orbitron font-bold text-gray-600 bg-white/5 px-2 py-0.5 rounded border border-white/5 uppercase tracking-widest">
                                ID-{service.booking_id}
                            </span>
                        </div>
                        <p className="text-gray-500 text-[11px] font-orbitron font-bold uppercase tracking-[0.2em]">Active Plan: {service.plan_name}</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Payment Status Badge */}
                    <div className={`px-4 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-orbitron font-bold uppercase tracking-[0.15em] border ${
                        service.payment_status?.toLowerCase() === 'paid' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-100 border-red-500/20'
                    }`}>
                        Payment: {service.payment_status}
                    </div>
                    {/* Status Badge */}
                    <div className={`px-4 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-orbitron font-bold uppercase tracking-[0.15em] border ${getStatusStyle(service.status)}`}>
                        Status: {service.status}
                    </div>
                </div>
              </div>

              <div className="space-y-6">
                {(service.items || []).map((task, tIdx) => (
                    <div
                      key={task.id}
                      className="bg-[#242424] p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-transparent hover:border-white/5 transition-all group"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-5">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                             <h4 className="font-orbitron text-base sm:text-lg font-bold text-white group-hover:text-[#AC6CFF] transition-colors leading-tight uppercase tracking-tight">
                               {task.title}
                             </h4>
                             <span className="text-gray-600 text-[9px] font-orbitron font-bold uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
                               Phase 0{tIdx + 1}
                             </span>
                          </div>
                          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-4xl font-light">
                            {task.description}
                          </p>
                        </div>
                      </div>

                      {/* Task Progress Bar */}
                      <div className="mt-auto">
                        <div className="flex justify-between items-center text-[10px] font-orbitron mb-3 tracking-widest uppercase font-bold text-gray-600">
                          <span>Progress</span>
                          <span className={`${task.progress >= 100 ? "text-green-500" : "text-white"} font-bold tracking-normal`}>{task.progress}%</span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${task.progress}%` }}
                            transition={{ duration: 0.8 }}
                            className={`h-full transition-all duration-300 ${
                              task.progress >= 100 
                                ? "bg-green-500" 
                                : "bg-[#AC6CFF]"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24 bg-[#1A1A1A] border border-white/5 rounded-[2.5rem]">
            <p className="text-gray-400 font-orbitron text-lg font-bold uppercase tracking-widest animate-pulse">Scanning Service Matrix...</p>
            <p className="text-gray-600 text-xs sm:text-sm mt-2 italic uppercase">No active service roadmaps found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressAndTasks;
