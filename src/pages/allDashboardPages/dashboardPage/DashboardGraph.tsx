import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Award, Target, Activity, ChevronRight, Zap } from "lucide-react";

interface ChartDataProps {
  labels?: string[];
  overview?: {
    bookings?: number[];
    payments?: number[];
    tasks?: number[];
    traffic?: number[];
    keywords?: number[];
  };
  kpis?: {
    growth_rate?: string;
    total_bookings?: string;
    total_spent?: string;
    completed_tasks?: string;
    health_score?: string;
    total_reach?: string;
    completed_milestones?: string;
  };
}

const DashboardGraph: React.FC<{ data?: ChartDataProps }> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<"bookings" | "payments">("bookings");
  const [hoveredPoint, setHoveredPoint] = useState<{ index: number; x: number; y: number; val: number } | null>(null);
  const [timeRange, setTimeRange] = useState<"7D" | "1M" | "6M" | "1Y">("6M");

  // Dynamic timeframe & tab dataset calculation
  const getDynamicDataset = () => {
    const rawLabels = data?.labels && data.labels.length > 0 ? data.labels : ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    const zeroSeries = [0, 0, 0, 0, 0, 0];
    const rawValues =
      activeTab === "bookings"
        ? data?.overview?.bookings || zeroSeries
        : data?.overview?.payments || zeroSeries;

    if (timeRange === "7D") {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const lastVal = rawValues[rawValues.length - 1] || 0;
      const dayValues = days.map((_, i) => (lastVal > 0 ? Math.round(lastVal * (0.65 + i * 0.06)) : 0));
      return { labels: days, values: dayValues };
    }

    if (timeRange === "1M") {
      const weeks = ["Wk 1", "Wk 2", "Wk 3", "Wk 4"];
      const sliceVal = rawValues.slice(-4);
      return {
        labels: weeks,
        values: sliceVal.length === 4 ? sliceVal : [0, 0, 0, 0],
      };
    }

    if (timeRange === "1Y") {
      const quarters = ["Q1", "Q2", "Q3", "Q4"];
      const qValues = [
        rawValues[0] || 0,
        rawValues[1] || 0,
        rawValues[3] || 0,
        rawValues[rawValues.length - 1] || 0,
      ];
      return { labels: quarters, values: qValues };
    }

    // Default 6M
    return { labels: rawLabels, values: rawValues };
  };

  const { labels, values: currentValues } = getDynamicDataset();

  const maxVal = Math.max(...currentValues, 10);
  const minVal = Math.min(...currentValues, 0);

  // SVG dimensions
  const svgWidth = 800;
  const svgHeight = 260;
  const paddingX = 40;
  const paddingY = 30;
  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  // Calculate coordinates for SVG points
  const points = currentValues.map((val, idx) => {
    const x = paddingX + (idx / (currentValues.length - 1 || 1)) * chartW;
    const normalizedY = (val - minVal) / (maxVal - minVal || 1);
    const y = svgHeight - paddingY - normalizedY * chartH;
    return { x, y, val, label: labels[idx] || `Point ${idx + 1}` };
  });

  // Create smooth Bezier curve path string
  const createBezierPath = (pts: typeof points) => {
    if (pts.length === 0) return "";
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cpX = (p0.x + p1.x) / 2;
      path += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return path;
  };

  const linePath = createBezierPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  const kpis = {
    growth: data?.kpis?.growth_rate ?? "0%",
    bookings: data?.kpis?.total_bookings ?? "0",
    spent: data?.kpis?.total_spent ?? "$0.00",
    health: data?.kpis?.health_score ?? "0%",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-[#1A1A1A] border border-white/10 p-5 sm:p-7 rounded-md shadow-2xl relative overflow-hidden mb-8"
    >
      {/* Background Glow Overlay */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#AC6CFF]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#6C9AFF]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-md bg-[#AC6CFF]/15 text-[#AC6CFF]">
              <Activity size={18} />
            </span>
            <h2 className="text-lg sm:text-xl font-inter font-bold text-white tracking-tight">
              Booking & Order Analytics
            </h2>
          </div>
          <p className="text-xs text-gray-400 font-inter">
            Real-time tracking of service bookings, order growth & total expenditure.
          </p>
        </div>

        {/* Filters & Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Metrics Switcher */}
          <div className="bg-[#242424] p-1 rounded-md border border-white/5 flex items-center gap-1">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-3 py-1.5 rounded-sm text-xs font-inter font-bold transition-all ${
                activeTab === "bookings"
                  ? "bg-[#AC6CFF] text-black shadow-[0_0_12px_rgba(172,108,255,0.4)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Bookings & Orders
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`px-3 py-1.5 rounded-sm text-xs font-inter font-bold transition-all ${
                activeTab === "payments"
                  ? "bg-[#AC6CFF] text-black shadow-[0_0_12px_rgba(172,108,255,0.4)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Total Spent
            </button>
          </div>

          {/* Timeframe Selector */}
          <div className="bg-[#242424] p-1 rounded-md border border-white/5 flex items-center text-xs">
            {(["7D", "1M", "6M", "1Y"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1 rounded-md font-inter text-[10px] font-bold transition-colors ${
                  timeRange === range
                    ? "bg-white/10 text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 relative z-10">
        <div className="bg-[#242424]/60 border border-white/5 p-3 rounded-md backdrop-blur-sm">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[10px] font-inter font-bold tracking-wider">Booking Growth</span>
            <TrendingUp size={14} className="text-emerald-400" />
          </div>
          <div className="text-lg font-inter font-bold text-emerald-400 flex items-center gap-1">
            {kpis.growth}
          </div>
        </div>

        <div className="bg-[#242424]/60 border border-white/5 p-3 rounded-md backdrop-blur-sm">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[10px] font-inter font-bold tracking-wider">Total Bookings</span>
            <Zap size={14} className="text-[#AC6CFF]" />
          </div>
          <div className="text-lg font-inter font-bold text-white">
            {kpis.bookings}
          </div>
        </div>

        <div className="bg-[#242424]/60 border border-white/5 p-3 rounded-md backdrop-blur-sm">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[10px] font-inter font-bold tracking-wider">Total Spent</span>
            <Award size={14} className="text-[#6C9AFF]" />
          </div>
          <div className="text-lg font-inter font-bold text-white">
            {kpis.spent}
          </div>
        </div>

        <div className="bg-[#242424]/60 border border-white/5 p-3 rounded-md backdrop-blur-sm">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[10px] font-inter font-bold tracking-wider">Service Progress</span>
            <Target size={14} className="text-purple-400" />
          </div>
          <div className="text-lg font-inter font-bold text-[#AC6CFF]">
            {kpis.health}
          </div>
        </div>
      </div>

      {/* SVG Interactive Chart Canvas */}
      <div className="relative w-full overflow-x-auto no-scrollbar z-10">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto min-w-[550px] overflow-visible"
        >
          <defs>
            {/* Linear Gradient for Area Fill */}
            <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#AC6CFF" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#6C9AFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0" />
            </linearGradient>

            {/* Stroke Line Gradient */}
            <linearGradient id="chartLineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#AC6CFF" />
              <stop offset="50%" stopColor="#8A80FF" />
              <stop offset="100%" stopColor="#6C9AFF" />
            </linearGradient>

            {/* Drop Shadow for Line */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#AC6CFF" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Horizontal Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = paddingY + pct * chartH;
            return (
              <g key={idx}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={svgWidth - paddingX}
                  y2={y}
                  stroke="#ffffff"
                  strokeOpacity="0.06"
                  strokeDasharray="4 4"
                />
              </g>
            );
          })}

          {/* Area Path */}
          <motion.path
            key={`area-${activeTab}-${timeRange}`}
            initial={{ d: areaPath, opacity: 0 }}
            animate={{ d: areaPath, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            fill="url(#chartAreaGradient)"
          />

          {/* Line Path */}
          <motion.path
            key={`line-${activeTab}-${timeRange}`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            d={linePath}
            fill="none"
            stroke="url(#chartLineGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />

          {/* Data Points */}
          {points.map((pt, idx) => (
            <g key={idx} className="cursor-pointer group">
              {/* Invisible Hover Hitbox */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="18"
                fill="transparent"
                onMouseEnter={() => setHoveredPoint({ index: idx, x: pt.x, y: pt.y, val: pt.val })}
                onMouseLeave={() => setHoveredPoint(null)}
              />

              {/* Visible Point Circle */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="5"
                className="fill-[#1A1A1A] stroke-[#AC6CFF] group-hover:stroke-white transition-all duration-200"
                strokeWidth="3"
              />

              {/* Inner Glowing Core */}
              {hoveredPoint?.index === idx && (
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="9"
                  className="fill-[#AC6CFF]/30 stroke-[#AC6CFF] animate-ping"
                  strokeWidth="1.5"
                />
              )}

              {/* X-Axis Label */}
              <text
                x={pt.x}
                y={svgHeight - 8}
                textAnchor="middle"
                className="fill-gray-400 text-[10px] font-inter font-bold"
              >
                {pt.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Dynamic Tooltip */}
        <AnimatePresence>
          {hoveredPoint && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                left: `${(hoveredPoint.x / svgWidth) * 100}%`,
                top: `${(hoveredPoint.y / svgHeight) * 100}%`,
              }}
              className="absolute pointer-events-none -translate-x-1/2 -translate-y-14 z-30 bg-[#242424] border border-[#AC6CFF]/40 px-3 py-1.5 rounded-md shadow-xl backdrop-blur-md flex flex-col items-center"
            >
              <span className="text-[10px] font-inter font-bold text-gray-400">
                {labels[hoveredPoint.index]}
              </span>
              <span className="text-xs font-inter font-black text-white flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#AC6CFF]" />
                {activeTab === "payments" ? `$${hoveredPoint.val}` : `${hoveredPoint.val} ${activeTab === "bookings" ? "orders" : "tasks"}`}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DashboardGraph;
