import React, { useState } from "react";
import useClient from "@/hooks/useClient";
import { CheckCircle2, CircleDashed, ChevronDown, ChevronUp, Clock, Target, Activity } from "lucide-react";

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
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);

  const { data: response, isLoading } = useClient({
    queryKey: ["user-tasks"],
    url: "/user/tasks",
    isPrivate: true,
  }) as any;

  const services: ServiceData[] = response?.data || [];

  // Initially expand all projects if there are few, otherwise expand first
  React.useEffect(() => {
    if (services.length > 0 && expandedProjects.length === 0) {
      setExpandedProjects(services.length <= 3 ? services.map(s => s.booking_id) : [services[0].booking_id]);
    }
  }, [services]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative w-16 h-16 flex items-center justify-center mb-4">
          <div className="absolute inset-0 rounded-full border-t-2 border-[#AC6CFF] animate-spin"></div>
          <Activity className="w-6 h-6 text-[#AC6CFF] animate-pulse" />
        </div>
        <p className="text-gray-500 font-inter text-[10px] tracking-widest uppercase animate-pulse">Syncing Roadmaps...</p>
      </div>
    );
  }

  const getStatusStyle = (s: string) => {
      const status = (s || "").toLowerCase();
      if (status === "ongoing" || status === "active") return "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]";
      if (status === "completed") return "bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]";
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.1)]";
  };

  const toggleProject = (id: number) => {
    setExpandedProjects(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="font-inter pb-8 w-full">
      {/* Top Stat Bar */}
      <div className="mb-4 flex items-center justify-between gap-3 p-3.5 rounded-md bg-[#1A1A1A] border border-white/10 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#AC6CFF]/15 text-[#AC6CFF] border border-[#AC6CFF]/30 flex items-center justify-center shrink-0">
            <Target size={16} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white leading-tight">Live Milestone Pipelines</h3>
            <p className="text-gray-400 text-[11px] mt-0.5">Real-time status tracking across active service orders</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-[#242424] border border-white/10 px-2.5 py-1 rounded-md flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#AC6CFF] animate-pulse"></div>
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">{services.length} Pipelines</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {services.length > 0 ? (
          services.map((service) => {
            const isExpanded = expandedProjects.includes(service.booking_id);
            const completedTasks = service.items.filter(t => t.progress >= 100).length;
            const totalTasks = service.items.length;

            return (
              <div
                key={service.booking_id}
                className="bg-[#1A1A1A] border border-white/10 rounded-md overflow-hidden shadow-xl transition-all duration-300 hover:border-white/20"
              >
                {/* Project Header (Clickable) */}
                <div 
                  className="p-4 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden group"
                  onClick={() => toggleProject(service.booking_id)}
                >
                  {/* Subtle Background Glow based on progress */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-[#AC6CFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ width: `${service.overall_progress}%` }}
                  />

                  <div className="flex items-center gap-3 relative z-10">
                    <div className="px-2 h-10 min-w-[46px] rounded-md bg-gradient-to-br from-[#AC6CFF]/20 to-[#6C9AFF]/20 border border-[#AC6CFF]/30 flex items-center justify-center shrink-0">
                      <span className="text-[#AC6CFF] font-inter font-bold text-xs">
                        {Math.round(service.overall_progress)}%
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-[#AC6CFF] transition-colors">
                          {service.service_title}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider border ${getStatusStyle(service.status)}`}>
                          {service.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-gray-400">
                        <span className="font-medium text-gray-300">{service.plan_name}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                        <span className="font-mono text-[11px]">ID: BKG-{service.booking_id}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                        <span className={`text-[11px] font-bold uppercase ${service.payment_status?.toLowerCase() === 'paid' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {service.payment_status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 relative z-10 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex flex-col items-end gap-1 hidden md:flex">
                      <span className="text-xs font-medium text-gray-400">
                        <strong className="text-white">{completedTasks}</strong> of {totalTasks} Tasks Completed
                      </span>
                      <div className="w-36 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] rounded-full transition-all duration-700"
                          style={{ width: `${service.overall_progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <button className="w-7 h-7 rounded-md bg-[#242424] flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10 group-hover:border-[#AC6CFF]/30">
                      {isExpanded ? <ChevronUp size={15} className="text-gray-300" /> : <ChevronDown size={15} className="text-gray-300" />}
                    </button>
                  </div>
                </div>

                {/* Detailed Timeline View */}
                <div 
                  className={`border-t border-white/10 bg-[#121212] transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                >
                  <div className="p-4 sm:p-5">
                    <div className="relative">
                      {/* Vertical Timeline Line */}
                      <div className="absolute top-3 bottom-3 left-[18px] w-0.5 bg-white/5 rounded-full hidden md:block"></div>

                      <div className="space-y-4">
                        {service.items.map((task, tIdx) => {
                          const isComplete = task.progress >= 100;
                          const inProgress = task.progress > 0 && task.progress < 100;
                          
                          return (
                            <div key={task.id} className="relative flex flex-col md:flex-row gap-3 md:gap-4 group">
                              {/* Timeline Node */}
                              <div className="hidden md:flex flex-col items-center z-10 shrink-0">
                                <div className={`w-9 h-9 rounded-full border-2 border-[#121212] flex items-center justify-center shadow-md transition-transform group-hover:scale-105 ${
                                  isComplete ? 'bg-emerald-500 text-white' : 
                                  inProgress ? 'bg-[#AC6CFF] text-white' : 
                                  'bg-[#242424] text-gray-400 border-dashed'
                                }`}>
                                  {isComplete ? <CheckCircle2 size={16} /> : inProgress ? <Activity size={16} /> : <Clock size={16} />}
                                </div>
                              </div>

                              {/* Task Card */}
                              <div className={`flex-1 p-3.5 rounded-md border transition-all duration-300 ${
                                isComplete ? 'bg-emerald-500/5 border-emerald-500/15' :
                                inProgress ? 'bg-[#AC6CFF]/5 border-[#AC6CFF]/20 shadow-[0_4px_15px_rgba(172,108,255,0.05)]' :
                                'bg-[#1A1A1A] border-white/5 hover:border-white/10'
                              }`}>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                                  <div className="flex items-center gap-2.5">
                                    {/* Mobile Node Icon */}
                                    <div className={`md:hidden w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                                      isComplete ? 'bg-emerald-500/20 text-emerald-400' : 
                                      inProgress ? 'bg-[#AC6CFF]/20 text-[#AC6CFF]' : 
                                      'bg-white/10 text-gray-400'
                                    }`}>
                                      {isComplete ? <CheckCircle2 size={13} /> : inProgress ? <Activity size={13} /> : <Clock size={13} />}
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                                          Phase {tIdx + 1}
                                        </span>
                                        {inProgress && (
                                          <span className="text-[9px] font-bold uppercase bg-[#AC6CFF] text-black px-1.5 py-0.2 rounded-xs animate-pulse">
                                            Active
                                          </span>
                                        )}
                                      </div>
                                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#AC6CFF] transition-colors leading-tight">
                                        {task.title}
                                      </h4>
                                    </div>
                                  </div>

                                  {/* Right side Task Progress */}
                                  <div className="flex items-center gap-3 bg-[#242424] px-2.5 py-1.5 rounded-md shrink-0">
                                    <div className="flex flex-col items-end gap-1 w-20 sm:w-28">
                                      <div className="flex justify-between w-full text-[9px] font-bold uppercase tracking-wider">
                                        <span className="text-gray-400">Progress</span>
                                        <span className={isComplete ? 'text-emerald-400' : 'text-[#AC6CFF]'}>{task.progress}%</span>
                                      </div>
                                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div 
                                          className={`h-full rounded-full transition-all duration-700 ${
                                            isComplete ? 'bg-emerald-500' : 'bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF]'
                                          }`} 
                                          style={{ width: `${task.progress}%` }} 
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <p className="text-xs text-gray-400 leading-relaxed">
                                  {task.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-12 bg-[#1A1A1A] border border-dashed border-white/10 rounded-md">
            <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-3">
              <CircleDashed className="w-7 h-7 text-gray-500" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">No Active Task Roadmaps</h3>
            <p className="text-gray-400 text-xs max-w-sm text-center">
              Task pipelines are created automatically when you order a service package.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressAndTasks;
