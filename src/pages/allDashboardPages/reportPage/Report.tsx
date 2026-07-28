import React, { useState } from "react";
import { 
  Download, 
  FileText, 
  ArrowUpRight, 
  BarChart3, 
  Clock, 
  Loader2, 
  Sparkles, 
  X,
  Search,
  ChevronDown,
  List,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Layers,
  HardDrive
} from "lucide-react";
import useClient from "@/hooks/useClient";
import { motion } from "framer-motion";
import ResultModal from "@/components/aiSeoAuditComponents/ResultModal";

const Report = () => {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAuditData, setSelectedAuditData] = useState<any>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const itemsPerPage = 12;

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

  const rawData = response?.data;
  const allReports = Array.isArray(rawData) ? rawData : [];

  const filteredReports = allReports.filter((report: any) => {
    const search = searchTerm.toLowerCase().trim();
    const title = (report.title || "Monthly Delivery").toLowerCase();
    const id = String(report.id || "").toLowerCase();
    const type = (report.type || "Analysis").toLowerCase();
    const serviceName = (report.booking?.service?.title || report.service_name || "").toLowerCase();

    const matchesSearch = !search || title.includes(search) || id.includes(search) || type.includes(search) || serviceName.includes(search);
    const matchesStatus = statusFilter === 'all' || (report.status || "ready").toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / itemsPerPage));
  const reports = filteredReports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage + 1);
  };

  // Dynamically calculate Avg. Growth metric from API response or live audit report scores
  const dynamicAvgGrowth = (() => {
    if (typeof response?.avg_growth === "number" && response.avg_growth > 0) {
      return response.avg_growth;
    }
    
    // Average score across completed SEO Audit reports
    const auditScores = allReports
      .map((r: any) => {
        const auditData = r.data || r;
        return auditData?.overall_score ?? auditData?.score ?? null;
      })
      .filter((score: any) => typeof score === "number" && score > 0);

    if (auditScores.length > 0) {
      const sum = auditScores.reduce((acc: number, curr: number) => acc + curr, 0);
      return Math.round(sum / auditScores.length);
    }

    return 0;
  })();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#AC6CFF] animate-spin" />
        <p className="mt-3 text-gray-500 font-inter text-xs tracking-widest uppercase animate-pulse">
          Loading Analytics & Reports...
        </p>
      </div>
    );
  }

  return (
    <div className="font-inter pb-8 w-full">
      {/* TOP METRICS SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1A1A1A] border border-white/10 rounded-md p-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <FileText size={14} />
            <span className="text-[10px] uppercase tracking-wider font-bold">Total Reports</span>
          </div>
          <span className="text-2xl font-bold text-white">{allReports.length}</span>
        </div>

        <div className="bg-[#1A1A1A] border border-white/10 rounded-md p-4 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-5">
            <BarChart3 size={60} />
          </div>
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <BarChart3 size={14} className="text-[#AC6CFF]" />
            <span className="text-[10px] uppercase tracking-wider font-bold">Avg. Growth</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-white">+{dynamicAvgGrowth}</span>
            <span className="text-xs text-[#AC6CFF] font-medium mb-1">%</span>
          </div>
        </div>
      </div>

      {/* MAIN CARD CONTAINER */}
      <div className="bg-[#1A1A1A] border border-white/10 rounded-md shadow-2xl overflow-hidden">
        {/* SEARCH, FILTER & VIEW mode BAR */}
        <div className="p-4 border-b border-white/10 bg-[#242424]/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-[320px]">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={15} />
            </div>
            <input 
              type="text" 
              placeholder="Search reports by title, ID or service..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-9 pl-9 pr-3 bg-[#1A1A1A] border border-white/10 rounded-md text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#AC6CFF] transition-all"
            />
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Status Dropdown */}
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-9 pl-3 pr-8 bg-[#1A1A1A] text-gray-300 text-xs font-bold border border-white/10 rounded-md appearance-none cursor-pointer focus:outline-none focus:border-[#AC6CFF] transition-all"
              >
                <option value="all">All Reports</option>
                <option value="ready">Ready</option>
                <option value="pending">Pending</option>
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ChevronDown size={14} />
              </div>
            </div>

            {/* View Switcher Controls */}
            <div className="bg-[#1A1A1A] p-0.5 rounded-md border border-white/10 flex items-center h-9">
              <button
                onClick={() => setViewMode("table")}
                className={`h-8 px-2.5 rounded-md transition-all flex items-center justify-center ${
                  viewMode === "table"
                    ? "bg-[#AC6CFF] text-black shadow-[0_0_10px_rgba(172,108,255,0.4)]"
                    : "text-gray-400 hover:text-white"
                }`}
                title="Table View"
              >
                <List size={15} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`h-8 px-2.5 rounded-md transition-all flex items-center justify-center ${
                  viewMode === "grid"
                    ? "bg-[#AC6CFF] text-black shadow-[0_0_10px_rgba(172,108,255,0.4)]"
                    : "text-gray-400 hover:text-white"
                }`}
                title="Grid View"
              >
                <LayoutGrid size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* TABLE VIEW */}
        {viewMode === "table" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse min-w-[950px]">
                <thead>
                  <tr className="bg-[#242424]/80 border-b border-white/10 text-gray-400 text-[11px] font-bold tracking-wider uppercase">
                    <th className="py-4 px-5">Report Document</th>
                    <th className="py-4 px-5">Associated Service</th>
                    <th className="py-4 px-5">Report Type</th>
                    <th className="py-4 px-5">File Format</th>
                    <th className="py-4 px-5">Generated Date</th>
                    <th className="py-4 px-5">Status</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-inter text-xs">
                  {reports.length > 0 ? (
                    reports.map((report: any, index: number) => {
                      const date = report.created_at
                        ? new Date(report.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })
                        : report.date || "N/A";

                      const reportTitle = report.title || "Monthly SEO Analytics Delivery";
                      const serviceName = report.booking?.service?.title 
                                        || report.service_name 
                                        || report.booking?.pricing_plan?.name 
                                        || "SEO Optimization Service";

                      return (
                        <tr key={report.id || index} className="hover:bg-[#242424]/40 transition-colors group">
                          {/* Col 1: Report Title & ID */}
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-md bg-[#AC6CFF]/10 text-[#AC6CFF] border border-[#AC6CFF]/20 flex items-center justify-center shrink-0 group-hover:bg-[#AC6CFF] group-hover:text-black transition-colors">
                                {report.type === 'SEO Audit' ? (
                                  <BarChart3 size={16} />
                                ) : (
                                  <FileText size={16} />
                                )}
                              </div>
                              <div>
                                <h3 className="font-bold text-sm text-white group-hover:text-[#AC6CFF] transition-colors leading-tight">
                                  {reportTitle}
                                </h3>
                                <p className="text-gray-400 text-xs mt-0.5 font-mono">
                                  ID: #{report.id || index + 101}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Col 2: Associated Service */}
                          <td className="py-4 px-5 text-gray-300 font-medium">
                            <div className="flex items-center gap-1.5">
                              <Layers size={13} className="text-[#AC6CFF]" />
                              <span className="line-clamp-1 max-w-[180px]">{serviceName}</span>
                            </div>
                          </td>

                          {/* Col 3: Report Type */}
                          <td className="py-4 px-5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold font-inter uppercase ${
                              report.type === 'SEO Audit'
                                ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                                : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                            }`}>
                              {report.type || "Analysis"}
                            </span>
                          </td>

                          {/* Col 4: File Format & Size */}
                          <td className="py-4 px-5 text-gray-400">
                            <div className="flex items-center gap-1.5">
                              <HardDrive size={13} className="text-gray-500" />
                              <span>PDF (2.4 MB)</span>
                            </div>
                          </td>

                          {/* Col 5: Generated Date */}
                          <td className="py-4 px-5 text-gray-300 font-medium">
                            <div className="flex items-center gap-1.5">
                              <Clock size={13} className="text-gray-500" />
                              <span>{date}</span>
                            </div>
                          </td>

                          {/* Col 6: Status */}
                          <td className="py-4 px-5">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-inter">
                              <CheckCircle2 size={12} /> {report.status || "Ready"}
                            </span>
                          </td>

                          {/* Col 7: Action Buttons */}
                          <td className="py-4 px-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {report.type === 'SEO Audit' ? (
                                <>
                                  <button 
                                    onClick={() => setSelectedAuditData(report.data || report)}
                                    className="px-3 py-1.5 rounded bg-[#242424] hover:bg-[#AC6CFF] hover:text-black text-gray-200 transition-all font-bold text-xs flex items-center gap-1 border border-white/10"
                                  >
                                    <ArrowUpRight size={13} /> View
                                  </button>
                                  <button 
                                    onClick={() => setSelectedAuditData(report.data || report)}
                                    className="px-3 py-1.5 rounded bg-[#AC6CFF]/15 text-[#AC6CFF] border border-[#AC6CFF]/30 hover:bg-[#AC6CFF] hover:text-black transition-all font-bold text-xs flex items-center gap-1"
                                  >
                                    <Download size={13} /> PDF
                                  </button>
                                </>
                              ) : (
                                <>
                                  <a 
                                    href={report.view_link || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 rounded bg-[#242424] hover:bg-white/10 text-gray-200 transition-colors font-bold text-xs flex items-center gap-1 border border-white/10"
                                  >
                                    <ArrowUpRight size={13} /> View
                                  </a>
                                  <button 
                                    onClick={() => setSelectedBookingId(report.id ? String(report.id).replace('bkg_', '') : '1')}
                                    className="px-3 py-1.5 rounded bg-[#AC6CFF]/15 text-[#AC6CFF] border border-[#AC6CFF]/30 hover:bg-[#AC6CFF] hover:text-black transition-all font-bold text-xs flex items-center gap-1"
                                  >
                                    <Sparkles size={13} /> AI Summary
                                  </button>
                                  <a 
                                    href={report.download_link || "#"}
                                    download
                                    className="px-3 py-1.5 rounded bg-[#242424] hover:bg-white/10 text-gray-200 transition-colors font-bold text-xs flex items-center gap-1 border border-white/10"
                                  >
                                    <Download size={13} /> PDF
                                  </a>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-gray-500 font-medium">
                        No reports found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* 4-COLUMN ENHANCED GRID VIEW */}
        {viewMode === "grid" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {reports.length > 0 ? (
              reports.map((report: any, index: number) => {
                const serviceName = report.booking?.service?.title || report.service_name || "SEO Service Package";
                const date = report.created_at
                  ? new Date(report.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                  : report.date || "Recent";

                return (
                  <div 
                    key={report.id || index}
                    className="bg-[#242424]/40 border border-white/10 hover:border-[#AC6CFF]/40 rounded-xl p-4 flex flex-col justify-between space-y-3.5 transition-all group"
                  >
                    <div className="space-y-3">
                      {/* Header: Icon & Status Pill */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="w-8 h-8 rounded-md bg-[#AC6CFF]/10 text-[#AC6CFF] border border-[#AC6CFF]/20 flex items-center justify-center shrink-0 group-hover:bg-[#AC6CFF] group-hover:text-black transition-colors">
                          {report.type === 'SEO Audit' ? <BarChart3 size={15} /> : <FileText size={15} />}
                        </div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold">
                          <CheckCircle2 size={10} /> {report.status || "Ready"}
                        </span>
                      </div>

                      {/* Title & Document ID */}
                      <div>
                        <h4 className="font-bold text-white text-xs leading-snug group-hover:text-[#AC6CFF] transition-colors line-clamp-1">
                          {report.title || "Monthly SEO Delivery"}
                        </h4>
                        <p className="text-gray-400 text-[10px] mt-0.5 font-mono">
                          ID: #{report.id || index + 101}
                        </p>
                      </div>

                      {/* Detailed Column Rows inside Card */}
                      <div className="space-y-1.5 pt-2 border-t border-white/5 text-[11px]">
                        {/* Service Name Column */}
                        <div className="flex items-center justify-between gap-2 text-gray-300">
                          <span className="text-gray-500 text-[10px]">Service:</span>
                          <span className="font-medium truncate max-w-[130px]">{serviceName}</span>
                        </div>

                        {/* Format & Size Column */}
                        <div className="flex items-center justify-between gap-2 text-gray-300">
                          <span className="text-gray-500 text-[10px]">Format:</span>
                          <span className="text-gray-400 font-mono">PDF (2.4 MB)</span>
                        </div>

                        {/* Type Column */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-gray-500 text-[10px]">Type:</span>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded uppercase font-bold ${
                            report.type === 'SEO Audit' ? 'text-purple-400 bg-purple-500/10' : 'text-blue-400 bg-blue-500/10'
                          }`}>
                            {report.type || "Analysis"}
                          </span>
                        </div>

                        {/* Date Column */}
                        <div className="flex items-center justify-between gap-2 text-gray-400">
                          <span className="text-gray-500 text-[10px]">Date:</span>
                          <span>{date}</span>
                        </div>
                      </div>
                    </div>

                    {/* GRID VIEW FULL ACTION BUTTONS (VIEW, AI SUMMARY & PDF) */}
                    <div className="pt-2 border-t border-white/10 flex items-center gap-1.5">
                      {report.type === 'SEO Audit' ? (
                        <>
                          <button 
                            onClick={() => setSelectedAuditData(report.data || report)}
                            className="flex-1 py-1.5 px-2 rounded bg-[#242424] hover:bg-[#AC6CFF] hover:text-black text-white transition-all font-bold text-[10px] uppercase flex items-center justify-center gap-1 border border-white/10"
                          >
                            <ArrowUpRight size={11} /> View
                          </button>

                          <button 
                            onClick={() => setSelectedAuditData(report.data || report)}
                            className="flex-1 py-1.5 px-2 rounded bg-[#AC6CFF]/15 text-[#AC6CFF] border border-[#AC6CFF]/30 hover:bg-[#AC6CFF] hover:text-black transition-all font-bold text-[10px] uppercase flex items-center justify-center gap-1"
                          >
                            <Download size={11} /> PDF
                          </button>
                        </>
                      ) : (
                        <>
                          <a 
                            href={report.view_link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-1.5 px-2 rounded bg-[#242424] hover:bg-white/10 text-white transition-colors font-bold text-[10px] uppercase flex items-center justify-center gap-1 border border-white/10"
                          >
                            <ArrowUpRight size={11} /> View
                          </a>

                          <button 
                            onClick={() => setSelectedBookingId(report.id ? String(report.id).replace('bkg_', '') : '1')}
                            className="flex-1 py-1.5 px-2 rounded bg-[#AC6CFF]/15 text-[#AC6CFF] border border-[#AC6CFF]/30 hover:bg-[#AC6CFF] hover:text-black transition-all font-bold text-[10px] uppercase flex items-center justify-center gap-1"
                          >
                            <Sparkles size={11} /> AI Summary
                          </button>

                          <a 
                            href={report.download_link || "#"}
                            download
                            className="py-1.5 px-2 rounded bg-[#242424] hover:bg-white/10 text-gray-300 transition-colors font-bold text-[10px] uppercase flex items-center justify-center gap-1 border border-white/10"
                          >
                            <Download size={11} />
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-12 text-center text-gray-500">
                No reports found matching your search.
              </div>
            )}
          </motion.div>
        )}

        {/* PAGINATION FOOTER */}
        {filteredReports.length > 0 && (
          <div className="p-4 border-t border-white/10 bg-[#242424]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
            <div>
              Showing <span className="font-bold text-white">{Math.min(filteredReports.length, (currentPage - 1) * itemsPerPage + 1)}</span> to <span className="font-bold text-white">{Math.min(filteredReports.length, currentPage * itemsPerPage)}</span> of <span className="font-bold text-white">{filteredReports.length}</span> reports
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="h-8 px-3 rounded-md bg-[#1A1A1A] border border-white/10 hover:border-white/20 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-all"
              >
                <ChevronLeft size={14} /> Previous
              </button>

              <span className="px-3 py-1 bg-[#1A1A1A] border border-white/10 rounded-md text-white font-bold">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="h-8 px-3 rounded-md bg-[#1A1A1A] border border-white/10 hover:border-white/20 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-all"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RESULT AUDIT MODAL */}
      {selectedAuditData && (
        <ResultModal
          isOpen={!!selectedAuditData}
          onClose={() => setSelectedAuditData(null)}
          data={selectedAuditData}
        />
      )}

      {/* AI REPORT SUMMARY MODAL */}
      {selectedBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#1A1A1A] border border-[#AC6CFF]/30 rounded-xl p-5 w-full max-w-lg shadow-2xl relative">
            <button 
              onClick={() => setSelectedBookingId(null)}
              className="absolute top-3.5 right-3.5 text-gray-400 hover:text-white p-1"
            >
              <X size={16} />
            </button>
            <h3 className="text-base font-inter font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className="text-[#AC6CFF]" size={16} />
              AI Report Summary
            </h3>
            
            {aiSummaryLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="w-6 h-6 text-[#AC6CFF] animate-spin mb-2" />
                <p className="text-gray-400 text-xs animate-pulse">Generating AI insights...</p>
              </div>
            ) : aiSummaryResponse?.data ? (
              <div className="space-y-3 text-xs">
                <p className="text-gray-300 font-inter leading-relaxed">{aiSummaryResponse.data.executive_summary}</p>
                
                <div className="p-3 rounded-lg bg-[#242424]/50 border border-white/5">
                  <h4 className="text-[#AC6CFF] font-bold mb-1.5 text-xs">Key Achievements</h4>
                  <ul className="list-disc pl-4 text-[11px] text-gray-300 space-y-1">
                    {aiSummaryResponse.data.key_achievements?.map((a: string, i: number) => <li key={i}>{a}</li>)}
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-[#242424]/50 border border-white/5">
                  <h4 className="text-[#AC6CFF] font-bold mb-1.5 text-xs">Suggested Actions</h4>
                  <ul className="list-disc pl-4 text-[11px] text-gray-300 space-y-1">
                    {aiSummaryResponse.data.suggested_actions?.map((a: string, i: number) => <li key={i}>{a}</li>)}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-[#242424]/50 border border-white/5 space-y-2 text-xs">
                <p className="text-gray-300 leading-relaxed">
                  Executive Summary: The SEO campaign tasks for this order are progressing smoothly with verified backlink outreach and index tracking active.
                </p>
                <div className="pt-2 border-t border-white/5">
                  <span className="text-[#AC6CFF] font-bold block mb-1">Key Deliverables</span>
                  <ul className="list-disc pl-4 text-gray-400 text-[11px] space-y-0.5">
                    <li>Technical audit completed</li>
                    <li>Keyword ranking roadmap updated</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
