import React from "react";

interface Task {
  name: string;
  desc: string;
  tag: string;
  status: "In Progress" | "Pending" | "Completed";
  progress?: number;
}

interface Section {
  title: string;
  tasks: Task[];
}

const ProgressAndTasks = () => {
  const sections: Section[] = [
    {
      title: "Monthly Reports", // Label used in image for active tasks
      tasks: [
        {
          name: "On-Page SEO Optimization",
          desc: "Optimizing Meta Tags And Content For 15 Pages",
          tag: "SEO Monthly",
          progress: 75,
          status: "In Progress",
        },
        {
          name: "Blog Content Creation",
          desc: "Writing 4 Blog Posts For April",
          tag: "Content Writing",
          progress: 40,
          status: "In Progress",
        },
        {
          name: "PPC Campaign Optimization",
          desc: "A/B Testing New Ad Creatives",
          tag: "PPC Management",
          progress: 10,
          status: "In Progress",
        },
      ],
    },
    {
      title: "Pending",
      tasks: [
        {
          name: "Local Citations Audit",
          desc: "Reviewing And Updating Business Listings",
          tag: "Local SEO",
          status: "Pending",
        },
        {
          name: "Backlink Outreach",
          desc: "Reaching Out To 20 Potential Link Partners",
          tag: "SEO Monthly",
          status: "Pending",
        },
      ],
    },
    {
      title: "Completed",
      tasks: [
        {
          name: "Keyword Research & Analysis",
          desc: "Comprehensive Keyword Research For Q2 2026",
          tag: "SEO Monthly",
          status: "Completed",
        },
        {
          name: "Google Business Profile Update",
          desc: "Updated Photos And Business Information",
          tag: "Local SEO",
          status: "Completed",
        },
      ],
    },
  ];

  return (
    <div className="font-inter">
      <header className="mb-10">
        <h1 className="text-4xl font-orbitron font-bold">Progress & Tasks</h1>
        <p className="text-gray-400 mt-2 text-sm">
          Track Ongoing Work And Completed Deliverables
        </p>
      </header>

      <div className="space-y-12">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] p-8"
          >
            <h2 className="text-xl font-orbitron font-bold mb-8">
              {section.title}
            </h2>

            <div className="space-y-4">
              {section.tasks.map((task, tIdx) => (
                <div
                  key={tIdx}
                  className="bg-[#242424] p-6 rounded-3xl border border-transparent hover:border-white/5 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-orbitron text-lg font-bold">
                        {task.name}
                      </h4>
                      <p className="text-gray-500 text-xs mt-1">{task.desc}</p>
                      <p className="text-[10px] text-gray-600 mt-2 uppercase tracking-widest">
                        {task.tag}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                        task.status === "Completed"
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : task.status === "Pending"
                            ? "bg-gray-500/10 text-gray-400 border-gray-500/20"
                            : "bg-purple-500/10 text-[#AC6CFF] border-purple-500/20"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  {/* Progress Bar (Only show if progress exists) */}
                  {task.progress !== undefined && (
                    <div className="mt-6">
                      <div className="flex justify-between text-[10px] font-orbitron mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#AC6CFF] to-[#6C9AFF] transition-all duration-1000"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressAndTasks;
