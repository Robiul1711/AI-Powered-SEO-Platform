import React from 'react';
import { Eye, Download } from 'lucide-react';
import CommonButton from '@/components/common/CommonButton';

const Report = () => {
  const reports = [
    { title: "March 2026 SEO Report", type: "SEO Monthly", date: "April 1, 2026", status: "Available" },
    { title: "March 2026 PPC Performance", type: "PPC Management", date: "April 1, 2026", status: "Available" },
    { title: "February 2026 SEO Report", type: "Content Writing", date: "March 1, 2026", status: "Available" },
    { title: "February 2026 Content Performance", type: "PPC Management", date: "March 1, 2026", status: "Available" },
    { title: "January 2026 SEO Report", type: "SEO Monthly", date: "April 1, 2026", status: "Available" },
  ];

  return (
    <div className="">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-4xl font-orbitron font-bold tracking-tight">Reports</h1>
        <p className="text-gray-400 mt-2 text-sm font-inter">Access Your Monthly Performance Reports</p>
      </header>

      {/* Reports Container */}
      <div className="bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] p-8">
        <h2 className="text-xl font-orbitron font-bold mb-8">Monthly Reports</h2>
        
        <div className="space-y-4">
          {reports.map((report, i) => (
            <div 
              key={i} 
              className="bg-[#242424] p-6 rounded-3xl flex items-center justify-between group hover:bg-[#2a2a2a] transition-all border border-transparent hover:border-white/5"
            >
              {/* Report Info */}
              <div className="flex flex-col">
                <h4 className=" text-lg font-bold tracking-wide font-inter">{report.title}</h4>
                <div className="flex items-center gap-2 mt-1 text-gray-500 text-xs">
                  <span className="font-inter">{report.type}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span className="font-inter">{report.date}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <span className="px-4 py-1.5 rounded-lg font-inter bg-purple-500/10 text-[#AC6CFF] border border-purple-500/20 text-[10px] font-bold uppercase tracking-wider">
                  {report.status}
                </span>
                
                <button className="flex items-center gap-2 bg-[#333333] hover:bg-[#444444] text-white px-5 py-2.5 rounded-xl transition-colors text-sm font-medium">
                  <Eye size={18} />
                  View
                </button>

                <CommonButton className="flex items-center gap-2 bg-bg-custom">
                  <Download size={18} />
                  Download
                </CommonButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Report;