import React, { useState } from 'react';
import { 
  Loader2, 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  List,
  Search, 
  Calendar, 
  ArrowRight,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  Layers,
  X,
  CreditCard,
  Briefcase,
  Activity,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useClient from '@/hooks/useClient';
import { motion, AnimatePresence } from 'framer-motion';

const BookingHistory = () => {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const itemsPerPage = 10;

  const { data: response, isLoading } = useClient({
    queryKey: ["user-bookings"],
    url: "/user/bookings",
    isPrivate: true,
  });

  const allBookings = response?.data || [];

  const filteredBookings = allBookings.filter((booking: any) => {
    const search = searchTerm.toLowerCase().trim();
    const id = `bkg-${booking.id}`.toLowerCase();
    const serviceName = (booking.service?.title || booking.campaign_tier?.campaign?.title || booking.pricing_plan?.name || booking.plan_name || "Service Booking").toLowerCase();
    const status = (booking.status || "Active").toLowerCase();
    
    const matchesSearch = !search || id.includes(search) || serviceName.includes(search) || status.includes(search);
    const matchesStatus = statusFilter === 'all' || status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / itemsPerPage));
  const bookings = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getStatusBadge = (statusStr: string) => {
    const s = (statusStr || "active").toLowerCase();
    if (s === 'completed') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-inter">
          <CheckCircle2 size={12} /> Completed
        </span>
      );
    }
    if (s === 'pending') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-bold font-inter">
          <AlertCircle size={12} className="animate-pulse" /> Pending
        </span>
      );
    }
    if (s === 'ongoing' || s === 'active') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#AC6CFF]/15 text-[#AC6CFF] border border-[#AC6CFF]/30 text-xs font-bold font-inter">
          <Clock size={12} className="animate-pulse" /> Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/15 text-rose-400 border border-rose-500/30 text-xs font-bold font-inter">
        <AlertCircle size={12} /> {statusStr || "Inactive"}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#AC6CFF] animate-spin" />
        <p className="mt-3 text-gray-400 font-inter text-xs tracking-widest animate-pulse">
          Loading Booking History...
        </p>
      </div>
    );
  }

  return (
    <div className="font-inter pb-8 w-full">
      {/* MAIN CONTAINER */}
      <div className="bg-[#1A1A1A] border border-white/10 rounded-md shadow-2xl overflow-hidden">
        
        {/* CONTROL BAR */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#242424]/50 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Search & Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input 
                type="text"
                placeholder="Search booking orders..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full h-9 pl-9 pr-3 bg-[#1A1A1A] border border-white/10 rounded-md text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#AC6CFF] transition-all font-inter"
              />
            </div>

            {/* Status Filter Dropdown */}
            <div className="relative w-full sm:w-40">
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="w-full h-9 pl-3 pr-8 bg-[#1A1A1A] border border-white/10 rounded-md text-xs text-gray-300 focus:outline-none focus:border-[#AC6CFF] transition-all appearance-none cursor-pointer font-inter"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active / Ongoing</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
            </div>
          </div>

          {/* Right: View Switcher */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-xs text-gray-400 font-medium">
              Total Orders: <strong className="text-white font-bold">{filteredBookings.length}</strong>
            </span>
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full overflow-hidden"
          >
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#242424]/30 text-gray-400 text-[11px] uppercase tracking-wider font-semibold font-inter">
                    <th className="py-3 px-4">Order Title & ID</th>
                    <th className="py-3 px-4">Service Type</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Order Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs font-inter">
                  {bookings.length > 0 ? (
                    bookings.map((booking: any, index: number) => {
                      const serviceName = booking.service?.title || booking.campaign_tier?.campaign?.title || booking.pricing_plan?.name || booking.plan_name || "Service Booking Order";
                      const type = booking.is_campaign ? "Campaign Growth" : (booking.pricing_plan?.name || booking.plan_name || "Service Package");
                      const date = booking.created_at
                        ? new Date(booking.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        : 'N/A';
                      const price = booking.price ? `$${Number(booking.price).toFixed(2)}` : '$0.00';

                      return (
                        <tr key={booking.id || index} className="hover:bg-[#242424]/40 transition-colors group">
                          {/* Title & BKG ID */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-md bg-[#AC6CFF]/10 text-[#AC6CFF] border border-[#AC6CFF]/20 flex items-center justify-center shrink-0 group-hover:bg-[#AC6CFF] group-hover:text-black transition-colors">
                                <Sparkles size={15} />
                              </div>
                              <div>
                                <h3 className="font-bold text-white group-hover:text-[#AC6CFF] transition-colors leading-tight text-xs">
                                  {serviceName}
                                </h3>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[10px] text-gray-400 font-mono">
                                    BKG-#{booking.id}
                                  </span>
                                  <span className="text-[10px] text-gray-500">
                                    • {type}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Service Package */}
                          <td className="py-3.5 px-4 font-medium text-gray-300">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#242424] text-gray-300 text-[11px] border border-white/5">
                              <Layers size={12} className="text-[#AC6CFF]" />
                              {type}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="py-3.5 px-4 font-bold text-white text-xs">
                            {price}
                          </td>

                          {/* Date */}
                          <td className="py-3.5 px-4 text-gray-400 whitespace-nowrap">
                            <div className="flex items-center gap-1 text-xs">
                              <Calendar size={13} className="text-gray-500" />
                              {date}
                            </div>
                          </td>

                          {/* Payment Status */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                              booking.payment_status === 'paid' || booking.payment_status === 'succeeded'
                                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                                : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                            }`}>
                              {booking.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                            </span>
                          </td>

                          {/* Booking Status */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {getStatusBadge(booking.status || "Active")}
                          </td>

                          {/* Action Button */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <button 
                              onClick={() => setSelectedOrder(booking)}
                              className="px-3 py-1.5 rounded-md bg-[#242424] text-white border border-white/10 hover:bg-[#AC6CFF] hover:text-black hover:border-[#AC6CFF] transition-all text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
                            >
                              <span>View Order</span>
                              <ArrowRight size={12} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    /* STYLED INLINE TABLE EMPTY STATE */
                    <tr>
                      <td colSpan={7} className="py-14 px-4 text-center">
                        <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                          <div className="w-14 h-14 rounded-2xl bg-[#AC6CFF]/10 text-[#AC6CFF] border border-[#AC6CFF]/20 flex items-center justify-center mb-3">
                            <Layers size={26} />
                          </div>
                          <h3 className="text-base font-bold text-white mb-1">No Booking Orders Found</h3>
                          <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                            {searchTerm || statusFilter !== 'all'
                              ? `No orders match your filter "${searchTerm || statusFilter}".`
                              : "You haven't placed any service or campaign orders yet."}
                          </p>
                          {searchTerm || statusFilter !== 'all' ? (
                            <button
                              onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
                              className="px-3.5 py-1.5 rounded-md bg-[#242424] text-[#AC6CFF] border border-[#AC6CFF]/30 hover:bg-[#AC6CFF] hover:text-black transition-all text-xs font-bold"
                            >
                              Clear Filters
                            </button>
                          ) : (
                            <Link to="/services">
                              <button className="px-4 py-2 rounded-md bg-gradient-to-r from-[#AC6CFF] to-[#8E37FF] text-white transition-all text-xs font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(172,108,255,0.3)]">
                                <Sparkles size={14} />
                                <span>Browse Available Services</span>
                              </button>
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* GRID VIEW */}
        {viewMode === "grid" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {bookings.length > 0 ? (
              bookings.map((booking: any, index: number) => {
                const serviceName = booking.service?.title || booking.campaign_tier?.campaign?.title || booking.pricing_plan?.name || booking.plan_name || "Service Booking Order";
                const date = booking.created_at
                  ? new Date(booking.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                  : 'N/A';
                const price = booking.price ? `$${Number(booking.price).toFixed(2)}` : '$0.00';

                return (
                  <div
                    key={booking.id || index}
                    className="bg-[#1A1A1A] border border-white/10 rounded-md p-5 hover:border-[#AC6CFF]/40 transition-all duration-300 shadow-xl flex flex-col justify-between group"
                  >
                    <div>
                      {/* Card Top */}
                      <div className="flex justify-between items-start mb-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#AC6CFF]/10 text-[#AC6CFF] border border-[#AC6CFF]/20 text-[10px] font-bold">
                          <Calendar size={12} />
                          {date}
                        </span>
                        {getStatusBadge(booking.status || "Active")}
                      </div>

                      <h3 className="text-base font-bold mb-2 leading-snug text-white group-hover:text-[#AC6CFF] transition-colors">
                        {serviceName}
                      </h3>
                      <p className="text-gray-400 text-xs mb-4 font-mono">
                        BKG-#{booking.id}
                      </p>

                      {/* Info Box */}
                      <div className="bg-[#242424]/60 border border-white/5 p-3 rounded-md mb-4 space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Price Amount:</span>
                          <span className="font-bold text-white text-sm">{price}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Payment Status:</span>
                          <span className={`font-bold ${booking.payment_status === 'paid' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {booking.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedOrder(booking)}
                      className="w-full py-2.5 rounded-md bg-[#242424] text-white border border-white/10 hover:bg-[#AC6CFF] hover:text-black hover:border-[#AC6CFF] transition-all text-xs font-bold inline-flex items-center justify-center gap-2 group/btn cursor-pointer"
                    >
                      <span>View Order Details</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-14 px-4 text-center">
                <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                  <div className="w-14 h-14 rounded-2xl bg-[#AC6CFF]/10 text-[#AC6CFF] border border-[#AC6CFF]/20 flex items-center justify-center mb-3">
                    <Layers size={26} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">No Booking Orders Found</h3>
                  <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                    {searchTerm || statusFilter !== 'all'
                      ? `No orders match your filter "${searchTerm || statusFilter}".`
                      : "You haven't placed any service or campaign orders yet."}
                  </p>
                  <Link to="/services">
                    <button className="px-4 py-2 rounded-md bg-gradient-to-r from-[#AC6CFF] to-[#8E37FF] text-white transition-all text-xs font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(172,108,255,0.3)]">
                      <Sparkles size={14} />
                      <span>Browse Available Services</span>
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* PAGINATION FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-white/10 bg-[#242424]/50">
          <p className="text-gray-400 text-xs">
            Showing {filteredBookings.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of {filteredBookings.length} entries
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-md bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1 text-xs font-bold">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${
                    currentPage === page
                      ? "bg-[#AC6CFF] text-black shadow-[0_0_10px_rgba(172,108,255,0.4)]"
                      : "bg-[#1A1A1A] text-gray-400 border border-white/10 hover:text-white"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-md bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* VIEW ORDER DETAILS MODAL */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#1A1A1A] border border-white/15 rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden font-inter"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute right-5 top-5 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#AC6CFF]/15 text-[#AC6CFF] border border-[#AC6CFF]/30 flex items-center justify-center shadow-[0_0_15px_rgba(172,108,255,0.2)] shrink-0">
                  <Sparkles size={24} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                    Order Details • BKG-#{selectedOrder.id}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-tight mt-0.5">
                    {selectedOrder.service?.title || selectedOrder.campaign_tier?.campaign?.title || selectedOrder.pricing_plan?.name || selectedOrder.plan_name || "Service Booking Order"}
                  </h3>
                </div>
              </div>

              {/* Order Metadata Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-[#242424] border border-white/5 p-3.5 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                    <CreditCard size={14} className="text-[#AC6CFF]" />
                    <span>Price Amount</span>
                  </div>
                  <p className="text-base font-bold text-white">
                    ${Number(selectedOrder.price || 0).toFixed(2)}
                  </p>
                </div>

                <div className="bg-[#242424] border border-white/5 p-3.5 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                    <Activity size={14} className="text-[#AC6CFF]" />
                    <span>Payment Status</span>
                  </div>
                  <div className="mt-0.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold border ${
                      selectedOrder.payment_status === 'paid' || selectedOrder.payment_status === 'succeeded'
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                    }`}>
                      {selectedOrder.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                    </span>
                  </div>
                </div>

                <div className="bg-[#242424] border border-white/5 p-3.5 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                    <Calendar size={14} className="text-[#AC6CFF]" />
                    <span>Booking Date</span>
                  </div>
                  <p className="text-xs font-bold text-gray-200">
                    {selectedOrder.created_at ? new Date(selectedOrder.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                  </p>
                </div>

                <div className="bg-[#242424] border border-white/5 p-3.5 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                    <Briefcase size={14} className="text-[#AC6CFF]" />
                    <span>Project Status</span>
                  </div>
                  <div className="mt-0.5">
                    {getStatusBadge(selectedOrder.status || "Active")}
                  </div>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="bg-[#242424]/60 border border-white/10 p-4 rounded-xl mb-6 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-gray-300">Project Milestone Progress</span>
                  <span className="text-[#AC6CFF]">
                    {selectedOrder.tasks && selectedOrder.tasks.length > 0 
                      ? Math.round(selectedOrder.tasks.reduce((acc: number, t: any) => acc + Number(t.progress || 0), 0) / selectedOrder.tasks.length) 
                      : (selectedOrder.status === 'completed' ? 100 : 45)}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#AC6CFF] to-[#8E37FF] rounded-full transition-all duration-500"
                    style={{ width: `${selectedOrder.tasks && selectedOrder.tasks.length > 0 ? Math.round(selectedOrder.tasks.reduce((acc: number, t: any) => acc + Number(t.progress || 0), 0) / selectedOrder.tasks.length) : (selectedOrder.status === 'completed' ? 100 : 45)}%` }}
                  />
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => {
                    const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
                    const authData = localStorage.getItem('auth-storage');
                    let token = '';
                    if (authData) {
                      try {
                        token = JSON.parse(authData)?.state?.token || '';
                      } catch (e) {}
                    }
                    const downloadUrl = `${baseUrl}/payments/${selectedOrder.id}/invoice${token ? `?token=${encodeURIComponent(token)}` : ''}`;
                    window.open(downloadUrl, '_blank');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#242424] hover:bg-[#2a2a2a] text-[#AC6CFF] text-xs font-bold transition-all border border-[#AC6CFF]/30 flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download Invoice PDF</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold transition-all border border-white/10"
                  >
                    Close
                  </button>
                  <Link to="/dashboard/progress-and-tasks" onClick={() => setSelectedOrder(null)}>
                    <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#AC6CFF] to-[#8E37FF] text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(172,108,255,0.4)] hover:brightness-110 flex items-center gap-2">
                      <Activity size={15} />
                      <span>View Progress</span>
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingHistory;
