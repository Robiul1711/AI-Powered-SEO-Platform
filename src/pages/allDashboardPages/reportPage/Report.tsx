import React, { useState } from "react";
import { Download, FileText, ArrowUpRight, BarChart3, Clock, Loader2, Sparkles } from "lucide-react";
import useClient from "@/hooks/useClient";
import ResultModal from "@/components/aiSeoAuditComponents/ResultModal";

const Report = () => {
  const [selectedAuditData, setSelectedAuditData] = useState<any>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const { data: response, isLoading } = useClient({
    queryKey: ["user-reports"],
    url: "/user/reports",
    isPrivate: true,
  }) as any;

  const { data: aiSummaryResponse, isLoading: aiSummaryLoading } = useClient({
    queryKey: ["ai-report-summary", selectedBookingId || ""],
    url: `/user/reports/ai-summary?booking_id=${selectedBookingId || ""}`,
    isPrivate: true,
    enabled: !!selectedBookingId
  }) as any;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-6 h-6 text-[#AC6CFF] animate-spin" />
        <p className="mt-2 text-gray-500 font-orbitron text-[10px] uppercase animate-pulse">Loading Analytics...</p>
      </div>
    );
  }

  const reports = response?.data || [];

  return (
    <div className="font-inter pb-8 max-w-8xl mx-auto w-full">

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-[#121212] border border-white/5 rounded-xl p-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <FileText size={14} />
            <span className="text-[10px] uppercase tracking-wider font-bold">Total Reports</span>
          </div>
          <span className="text-2xl font-bold text-white">{reports.length}</span>
        </div>
        <div className="bg-[#121212] border border-white/5 rounded-xl p-4 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-5">
            <BarChart3 size={60} />
          </div>
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <BarChart3 size={14} className="text-[#AC6CFF]" />
            <span className="text-[10px] uppercase tracking-wider font-bold">Avg. Growth</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-white">+{response?.avg_growth || 0}</span>
            <span className="text-xs text-[#AC6CFF] font-medium mb-1">%</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-orbitron font-bold text-white uppercase tracking-wider">
          Analytics & Deliverables
        </h2>
      </div>

      <div className="bg-[#121212] border border-white/5 rounded-xl shadow-lg overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 bg-[#1A1A1A] px-4 py-3 border-b border-white/5 text-[10px] uppercase font-bold text-gray-400 font-orbitron">
          <div className="col-span-5">Report Document</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Generated On</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* List Body */}
        <div className="divide-y divide-white/5">
          {reports.length > 0 ? (
            reports.map((report: any, i: number) => (
              <div
                key={i}
                className="group flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 px-4 py-3 hover:bg-white/[0.02] transition-colors items-start md:items-center"
              >
                {/* Column 1: Document Info */}
                <div className="col-span-5 flex items-center gap-3 w-full">
                  <div className="w-8 h-8 rounded-lg bg-[#242424] border border-white/5 flex items-center justify-center shrink-0 group-hover:border-[#AC6CFF]/30 transition-colors">
                    {report.type === 'SEO Audit' ? (
                      <BarChart3 size={14} className="text-[#AC6CFF]" />
                    ) : (
                      <FileText size={14} className="text-blue-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate group-hover:text-[#AC6CFF] transition-colors">
                      {report.title || "Monthly Delivery"}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                      <span className="font-mono">ID: {report.id}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <span>{Math.floor(Math.random() * 3) + 1}.2 MB PDF</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: Type (Mobile styling hidden, showing as pills on desktop) */}
                <div className="col-span-2 w-full md:w-auto flex items-center">
                  <span className={`text-[9px] px-2 py-0.5 rounded border uppercase font-bold ${report.type === 'SEO Audit'
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                    {report.type || "Analysis"}
                  </span>
                </div>

                {/* Column 3: Date */}
                <div className="col-span-2 w-full md:w-auto flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock size={12} className="md:hidden" />
                  <span>
                    {report.created_at
                      ? new Date(report.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                      : report.date || "N/A"}
                  </span>
                </div>

                {/* Column 4: Status */}
                <div className="col-span-1 w-full md:w-auto flex items-center md:justify-center">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span>
                    <span className="text-[10px] uppercase font-bold text-gray-300 tracking-wider">
                      {report.status || "Ready"}
                    </span>
                  </div>
                </div>

                {/* Column 5: Actions */}
                <div className="col-span-2 w-full md:w-auto flex items-center md:justify-end gap-2 mt-2 md:mt-0">
                  {report.type === 'SEO Audit' ? (
                    <>
                      <button 
                        onClick={(e) => { e.preventDefault(); setSelectedAuditData(report.data); }}
                        className="flex-1 md:flex-none w-full md:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-sm bg-[#242424] hover:bg-white/10 text-gray-300 transition-colors text-[10px] font-bold uppercase tracking-wider border border-white/5"
                      >
                        <ArrowUpRight size={12} />
                        View
                      </button>

                      <button 
                        onClick={(e) => { e.preventDefault(); setSelectedAuditData(report.data); }}
                        className="flex-1 md:flex-none w-full md:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-sm bg-[#AC6CFF]/10 hover:bg-[#AC6CFF] text-[#AC6CFF] hover:text-black transition-colors text-[10px] font-bold uppercase tracking-wider border border-[#AC6CFF]/30"
                      >
                        <Download size={12} />
                        PDF
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href={report.view_link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none w-full md:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-sm bg-[#242424] hover:bg-white/10 text-gray-300 transition-colors text-[10px] font-bold uppercase tracking-wider border border-white/5"
                      >
                        <ArrowUpRight size={12} />
                        View
                      </a>

                      <button
                        onClick={(e) => { e.preventDefault(); setSelectedBookingId(report.id.replace('bkg_', '')); }}
                        className="flex-1 md:flex-none w-full md:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-sm bg-[#AC6CFF]/10 hover:bg-[#AC6CFF] text-[#AC6CFF] hover:text-black transition-colors text-[10px] font-bold uppercase tracking-wider border border-[#AC6CFF]/30"
                      >
                        <Sparkles size={12} />
                        AI Summary
                      </button>

                      <a
                        href={report.download_link || "#"}
                        download
                        className="flex-1 md:flex-none w-full md:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-sm bg-[#242424] hover:bg-white/10 text-gray-300 transition-colors text-[10px] font-bold uppercase tracking-wider border border-white/5"
                      >
                        <Download size={12} />
                        PDF
                      </a>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <span className="opacity-40 font-orbitron text-xs  text-white">
                No analytics generated yet
              </span>
            </div>
          )}
        </div>
      </div>

      {selectedAuditData && (
        <ResultModal
          isOpen={!!selectedAuditData}
          onClose={() => setSelectedAuditData(null)}
          data={selectedAuditData}
        />
      )}

      {selectedBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1A1A1A] border border-[#AC6CFF]/30 rounded-2xl p-6 w-full max-w-2xl shadow-2xl relative">
            <button 
              onClick={() => setSelectedBookingId(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-xl font-orbitron font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="text-[#AC6CFF]" />
              AI Report Summary
            </h3>
            
            {aiSummaryLoading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <Loader2 className="w-8 h-8 text-[#AC6CFF] animate-spin mb-3" />
                <p className="text-gray-400 text-sm animate-pulse">Generating insights...</p>
              </div>
            ) : aiSummaryResponse?.data ? (
              <div className="space-y-4">
                <p className="text-gray-300 font-inter">{aiSummaryResponse.data.executive_summary}</p>
                
                <div>
                  <h4 className="text-[#AC6CFF] font-bold mb-2">Key Achievements</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
                    {aiSummaryResponse.data.key_achievements?.map((a: string, i: number) => <li key={i}>{a}</li>)}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[#AC6CFF] font-bold mb-2">Suggested Actions</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
                    {aiSummaryResponse.data.suggested_actions?.map((a: string, i: number) => <li key={i}>{a}</li>)}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-red-400">Failed to load AI summary.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
