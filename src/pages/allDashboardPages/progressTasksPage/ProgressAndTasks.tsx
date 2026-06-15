import React, { useState } from "react";
import useClient from "@/hooks/useClient";
import { Loader2, CheckCircle2, CircleDashed, ChevronDown, ChevronUp, Clock, Target, ArrowRight, Activity } from "lucide-react";

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
        <p className="text-gray-500 font-orbitron text-[10px] tracking-widest uppercase animate-pulse">Syncing Roadmaps...</p>
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
    <div className="font-inter pb-12 max-w-8xl mx-auto w-full">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-orbitron font-bold text-white tracking-wide flex items-center gap-3">
            <Target className="text-[#AC6CFF]" />
            Active Pipelines
          </h2>
          <p className="text-gray-400 text-sm mt-1">Track the real-time progress and milestones of your ongoing projects.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-[#121212] border border-white/5 px-4 py-2 rounded-lg flex items-center gap-3 shadow-lg">
            <div className="w-2 h-2 rounded-full bg-[#AC6CFF] animate-pulse"></div>
            <span className="text-xs font-bold text-white uppercase tracking-wider">{services.length} Total Projects</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {services.length > 0 ? (
          services.map((service) => {
            const isExpanded = expandedProjects.includes(service.booking_id);
            const completedTasks = service.items.filter(t => t.progress >= 100).length;
            const totalTasks = service.items.length;

            return (
              <div
                key={service.booking_id}
                className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-white/20"
              >
                {/* Project Header (Clickable) */}
                <div 
                  className="p-5 md:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden group"
                  onClick={() => toggleProject(service.booking_id)}
                >
                  {/* Subtle Background Glow based on progress */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-[#AC6CFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ width: `${service.overall_progress}%` }}
                  />

                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#AC6CFF]/20 to-[#6C9AFF]/20 border border-[#AC6CFF]/30 flex items-center justify-center shrink-0">
                      <span className="text-[#AC6CFF] font-orbitron font-bold text-lg">
                        {service.overall_progress}%
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#AC6CFF] transition-colors">
                          {service.service_title}
                        </h3>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(service.status)}`}>
                          {service.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="font-medium text-gray-300">{service.plan_name}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                        <span className="font-mono text-xs">ID: BKG-{service.booking_id}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                        <span className={`text-xs font-medium uppercase ${service.payment_status?.toLowerCase() === 'paid' ? 'text-green-400' : 'text-red-400'}`}>
                          {service.payment_status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 relative z-10 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex flex-col items-end gap-1.5 hidden md:flex">
                      <span className="text-xs font-medium text-gray-400">
                        <strong className="text-white">{completedTasks}</strong> of {totalTasks} Tasks Completed
                      </span>
                      <div className="w-48 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] rounded-full transition-all duration-1000"
                          style={{ width: `${service.overall_progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10 group-hover:border-[#AC6CFF]/30">
                      {isExpanded ? <ChevronUp size={18} className="text-gray-300" /> : <ChevronDown size={18} className="text-gray-300" />}
                    </button>
                  </div>
                </div>

                {/* Detailed Timeline View */}
                <div 
                  className={`border-t border-white/5 bg-[#121212] transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-6 md:p-8">
                    <div className="relative">
                      {/* Vertical Timeline Line */}
                      <div className="absolute top-4 bottom-4 left-[23px] w-0.5 bg-white/5 rounded-full hidden md:block"></div>

                      <div className="space-y-6">
                        {service.items.map((task, tIdx) => {
                          const isComplete = task.progress >= 100;
                          const inProgress = task.progress > 0 && task.progress < 100;
                          
                          return (
                            <div key={task.id} className="relative flex flex-col md:flex-row gap-4 md:gap-6 group">
                              {/* Timeline Node */}
                              <div className="hidden md:flex flex-col items-center z-10 shrink-0">
                                <div className={`w-12 h-12 rounded-full border-4 border-[#121212] flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                                  isComplete ? 'bg-green-500 text-white' : 
                                  inProgress ? 'bg-[#AC6CFF] text-white' : 
                                  'bg-[#2A2A2A] text-gray-400 border-dashed'
                                }`}>
                                  {isComplete ? <CheckCircle2 size={20} /> : inProgress ? <Activity size={20} /> : <Clock size={20} />}
                                </div>
                              </div>

                              {/* Task Card */}
                              <div className={`flex-1 p-5 rounded-xl border transition-all duration-300 ${
                                isComplete ? 'bg-green-500/5 border-green-500/10' :
                                inProgress ? 'bg-[#AC6CFF]/5 border-[#AC6CFF]/20 shadow-[0_4px_20px_rgba(172,108,255,0.05)]' :
                                'bg-white/5 border-white/5 hover:border-white/10'
                              }`}>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                                  <div className="flex items-center gap-3">
                                    {/* Mobile Node Icon */}
                                    <div className={`md:hidden w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                      isComplete ? 'bg-green-500/20 text-green-400' : 
                                      inProgress ? 'bg-[#AC6CFF]/20 text-[#AC6CFF]' : 
                                      'bg-white/10 text-gray-400'
                                    }`}>
                                      {isComplete ? <CheckCircle2 size={14} /> : inProgress ? <Activity size={14} /> : <Clock size={14} />}
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                                          Phase {tIdx + 1}
                                        </span>
                                        {inProgress && (
                                          <span className="text-[9px] font-bold uppercase bg-[#AC6CFF] text-black px-1.5 py-0.5 rounded-sm animate-pulse">
                                            Active
                                          </span>
                                        )}
                                      </div>
                                      <h4 className="text-base font-semibold text-white group-hover:text-[#AC6CFF] transition-colors leading-tight">
                                        {task.title}
                                      </h4>
                                    </div>
                                  </div>

                                  {/* Right side Task Progress */}
                                  <div className="flex items-center gap-4 bg-black/40 px-3 py-2 rounded-lg shrink-0">
                                    <div className="flex flex-col items-end gap-1.5 w-24 md:w-32">
                                      <div className="flex justify-between w-full text-[10px] font-bold uppercase tracking-wider">
                                        <span className="text-gray-400">Progress</span>
                                        <span className={isComplete ? 'text-green-400' : 'text-[#AC6CFF]'}>{task.progress}%</span>
                                      </div>
                                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div 
                                          className={`h-full rounded-full transition-all duration-1000 ${
                                            isComplete ? 'bg-green-500' : 'bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF]'
                                          }`} 
                                          style={{ width: `${task.progress}%` }} 
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <p className="text-sm text-gray-400 leading-relaxed md:ml-[3.25rem]">
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
          <div className="flex flex-col items-center justify-center py-20 bg-[#0A0A0A] border border-dashed border-white/10 rounded-2xl">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <CircleDashed className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Active Projects</h3>
            <p className="text-gray-400 text-sm max-w-sm text-center">You don't have any ongoing pipelines or tasks at the moment. Purchase a plan to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressAndTasks;
