import { useState } from 'react';
import { 
  CreditCard, 
  Loader2, 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  List, 
  Search, 
  X, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  Activity, 
  ArrowRight,
  ChevronDown,
  Sparkles,
  AlertCircle,
  Clock
} from 'lucide-react';
import useClient from '@/hooks/useClient';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const PaymentHistory = () => {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const itemsPerPage = 10;

  const { data: response, isLoading } = useClient({
    queryKey: ["user-payments"],
    url: "/payments/list",
    isPrivate: true,
  });

  const rawData = response?.data;
  const allPayments = Array.isArray(rawData) 
    ? rawData 
    : (Array.isArray(rawData?.data) ? rawData.data : []);

  const filteredPayments = allPayments.filter((payment: any) => {
    const search = searchTerm.toLowerCase().trim();

    const id = (payment.transaction_id || `PAY-${payment.id}`).toLowerCase();
    const amount = payment.amount ? payment.amount.toString() : "0.00";
    const status = (payment.status || "pending").toLowerCase();
    const description = (
      payment.booking?.service?.title ||
      payment.booking?.pricing_plan?.name ||
      payment.booking?.campaign_tier?.campaign?.title ||
      payment.booking?.plan_name ||
      "Marketing Service Payment"
    ).toLowerCase();

    const matchesSearch = !search || id.includes(search) || amount.includes(search) || status.includes(search) || description.includes(search);

    const normStatus = status === 'succeeded' ? 'paid' : status;
    const matchesStatus = statusFilter === 'all' || normStatus === statusFilter || status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPayments.length / itemsPerPage));
  const payments = filteredPayments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getStatusBadge = (statusStr: string) => {
    const s = (statusStr || "pending").toLowerCase();
    if (s === 'paid' || s === 'succeeded' || s === 'completed') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-inter">
          <CheckCircle2 size={12} /> Paid
        </span>
      );
    }
    if (s === 'pending') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-bold font-inter">
          <Clock size={12} className="animate-pulse" /> Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/15 text-rose-400 border border-rose-500/30 text-xs font-bold font-inter">
        <AlertCircle size={12} /> {statusStr || "Unpaid"}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#AC6CFF] animate-spin" />
        <p className="mt-3 text-gray-500 font-inter text-xs tracking-widest uppercase animate-pulse">Loading Payments...</p>
      </div>
    );
  }

  return (
    <div className="font-inter pb-8">
      {/* MAIN CARD CONTAINER */}
      <div className="bg-[#1A1A1A] border border-white/10 rounded-md shadow-2xl overflow-hidden">
        {/* SEARCH, FILTER & VIEW BAR */}
        <div className="p-4 border-b border-white/10 bg-[#242424]/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-[320px]">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={15} />
            </div>
            <input 
              type="text" 
              placeholder="Search transactions, amount or ID..." 
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
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="unpaid">Unpaid</option>
                <option value="failed">Failed</option>
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
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-[#242424]/80 border-b border-white/10 text-gray-400 text-[11px] font-bold tracking-wider uppercase">
                      <th className="py-4 px-5">Description / Service</th>
                      <th className="py-4 px-5">Transaction ID & Date</th>
                      <th className="py-4 px-5">Amount</th>
                      <th className="py-4 px-5">Method</th>
                      <th className="py-4 px-5">Status</th>
                      <th className="py-4 px-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-inter text-xs">
                    {payments.length > 0 ? (
                      payments.map((payment: any, index: number) => {
                        const date = payment.created_at
                          ? new Date(payment.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })
                          : 'N/A';
                        
                        const currencySymbol = payment.currency?.toLowerCase() === 'eur' ? '€' : '$';
                        const amount = payment.amount ? `${currencySymbol}${parseFloat(payment.amount).toFixed(2)}` : `${currencySymbol}0.00`;
                        const invoiceId = payment.transaction_id || `TXN-#${payment.id}`;
                        const planName = payment.booking?.service?.title 
                                        || payment.booking?.pricing_plan?.name 
                                        || payment.booking?.campaign_tier?.campaign?.title 
                                        || payment.booking?.plan_name 
                                        || 'Marketing Service Order';
                        
                        return (
                          <tr key={payment.id || index} className="hover:bg-[#242424]/40 transition-colors group">
                            {/* Description / Service Title */}
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-md bg-[#AC6CFF]/10 text-[#AC6CFF] border border-[#AC6CFF]/20 flex items-center justify-center shrink-0 group-hover:bg-[#AC6CFF] group-hover:text-black transition-colors">
                                  <Sparkles size={16} />
                                </div>
                                <div>
                                  <h3 className="font-bold text-sm text-white group-hover:text-[#AC6CFF] transition-colors leading-tight">
                                    {planName}
                                  </h3>
                                  <p className="text-gray-400 text-xs mt-0.5">
                                    Order #{payment.booking_id || payment.id}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Transaction ID & Date */}
                            <td className="py-4 px-5 whitespace-nowrap">
                              <div className="flex items-center gap-1.5 text-gray-300 font-medium text-xs">
                                <Calendar size={14} className="text-[#AC6CFF]" />
                                <span className="font-bold text-white">{date}</span>
                              </div>
                              <span className="text-[10px] text-gray-500 font-mono block mt-0.5">
                                {invoiceId}
                              </span>
                            </td>

                            {/* Amount */}
                            <td className="py-4 px-5 whitespace-nowrap">
                              <span className="font-bold text-white text-sm">
                                {amount}
                              </span>
                              <span className="text-[10px] text-gray-400 block font-medium">
                                {payment.currency?.toUpperCase() || 'USD'}
                              </span>
                            </td>

                            {/* Payment Method */}
                            <td className="py-4 px-5 whitespace-nowrap text-gray-300">
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#242424] text-gray-300 text-[11px] border border-white/5">
                                <CreditCard size={12} className="text-[#AC6CFF]" />
                                {payment.payment_method || 'Stripe Card'}
                              </span>
                            </td>

                            {/* Status Pill */}
                            <td className="py-4 px-5 whitespace-nowrap">
                              {getStatusBadge(payment.status)}
                            </td>

                            {/* Action Link */}
                            <td className="py-4 px-5 text-right whitespace-nowrap">
                              <button 
                                onClick={() => setSelectedPayment(payment)}
                                className="px-3 py-1.5 rounded-md bg-[#242424] text-white border border-white/10 hover:bg-[#AC6CFF] hover:text-black hover:border-[#AC6CFF] transition-all text-xs font-bold inline-flex items-center gap-1.5"
                              >
                                <span>Details</span>
                                <ArrowRight size={12} />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      /* STYLED INLINE TABLE EMPTY STATE */
                      <tr>
                        <td colSpan={6} className="py-14 px-4 text-center">
                          <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                            <div className="w-14 h-14 rounded-2xl bg-[#AC6CFF]/10 text-[#AC6CFF] border border-[#AC6CFF]/20 flex items-center justify-center mb-3">
                              <CreditCard size={26} />
                            </div>
                            <h3 className="text-base font-bold text-white mb-1">No Transactions Found</h3>
                            <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                              {searchTerm || statusFilter !== 'all'
                                ? `No payments match your filter "${searchTerm || statusFilter}".`
                                : "You haven't made any payment transactions yet."}
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
                                  <span>Explore Packages</span>
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
              {payments.length > 0 ? (
                payments.map((payment: any, index: number) => {
                const date = payment.created_at
                  ? new Date(payment.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                  : 'N/A';
                const currencySymbol = payment.currency?.toLowerCase() === 'eur' ? '€' : '$';
                const amount = payment.amount ? `${currencySymbol}${parseFloat(payment.amount).toFixed(2)}` : `${currencySymbol}0.00`;
                const planName = payment.booking?.service?.title 
                                || payment.booking?.pricing_plan?.name 
                                || payment.booking?.campaign_tier?.campaign?.title 
                                || payment.booking?.plan_name 
                                || 'Marketing Service Order';

                return (
                  <div
                    key={payment.id || index}
                    className="bg-[#1A1A1A] border border-white/10 rounded-md p-5 hover:border-[#AC6CFF]/40 transition-all duration-300 shadow-xl flex flex-col justify-between group"
                  >
                    <div>
                      {/* Card Top */}
                      <div className="flex justify-between items-start mb-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#AC6CFF]/10 text-[#AC6CFF] border border-[#AC6CFF]/20 text-[10px] font-bold">
                          <Calendar size={12} />
                          {date}
                        </span>
                        {getStatusBadge(payment.status)}
                      </div>

                      <h3 className="text-base font-bold mb-2 leading-snug text-white group-hover:text-[#AC6CFF] transition-colors">
                        {planName}
                      </h3>
                      <p className="text-gray-400 text-xs mb-4 font-mono">
                        {payment.transaction_id || `TXN-#${payment.id}`}
                      </p>

                      {/* Info Box */}
                      <div className="bg-[#242424]/60 border border-white/5 p-3 rounded-md mb-4 space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Total Amount:</span>
                          <span className="font-bold text-white text-sm">{amount}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Payment Method:</span>
                          <span className="text-gray-300">{payment.payment_method || 'Stripe Card'}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedPayment(payment)}
                      className="w-full py-2.5 rounded-md bg-[#242424] text-white border border-white/10 hover:bg-[#AC6CFF] hover:text-black hover:border-[#AC6CFF] transition-all text-xs font-bold inline-flex items-center justify-center gap-2 group/btn"
                    >
                      <span>View Receipt Details</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                );
              })
              ) : (
                <div className="col-span-full py-14 px-4 text-center">
                  <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                    <div className="w-14 h-14 rounded-2xl bg-[#AC6CFF]/10 text-[#AC6CFF] border border-[#AC6CFF]/20 flex items-center justify-center mb-3">
                      <CreditCard size={26} />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">No Transactions Found</h3>
                    <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                      {searchTerm || statusFilter !== 'all'
                        ? `No payments match your filter "${searchTerm || statusFilter}".`
                        : "You haven't made any payment transactions yet."}
                    </p>
                    <Link to="/services">
                      <button className="px-4 py-2 rounded-md bg-gradient-to-r from-[#AC6CFF] to-[#8E37FF] text-white transition-all text-xs font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(172,108,255,0.3)]">
                        <Sparkles size={14} />
                        <span>Explore Packages</span>
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
              Showing {filteredPayments.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredPayments.length)} of {filteredPayments.length} entries
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

      {/* PAYMENT DETAILS MODAL */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1A1A1A] border border-white/10 rounded-md w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#242424]/80">
              <div className="flex items-center gap-3">
                <div className="bg-[#AC6CFF]/15 p-2 rounded-md border border-[#AC6CFF]/20 text-[#AC6CFF]">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Payment Receipt Details</h3>
                  <p className="text-xs text-gray-400">Transaction summary & order breakdown</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPayment(null)}
                className="p-1.5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              {/* Amount & Status Card */}
              <div className="bg-[#242424]/60 border border-white/10 rounded-md p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 mb-1 font-inter">Total Amount Paid</p>
                  <p className="text-2xl font-bold text-white">
                    {selectedPayment.amount ? `$${parseFloat(selectedPayment.amount).toFixed(2)}` : "$0.00"}
                  </p>
                </div>
                <div className="text-right">
                  {getStatusBadge(selectedPayment.status)}
                  <p className="text-xs text-gray-500 mt-2 font-mono">
                    {selectedPayment.currency?.toUpperCase() || 'USD'}
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#242424]/40 p-3 rounded-md border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-gray-400 mb-0.5">
                    <Activity size={13} className="text-[#AC6CFF]" /> Transaction ID
                  </div>
                  <p className="font-mono font-medium text-white break-all">
                    {selectedPayment.transaction_id || `TXN-#${selectedPayment.id}`}
                  </p>
                </div>

                <div className="bg-[#242424]/40 p-3 rounded-md border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-gray-400 mb-0.5">
                    <Calendar size={13} className="text-[#AC6CFF]" /> Date & Time
                  </div>
                  <p className="font-medium text-white">
                    {new Date(selectedPayment.created_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                <div className="bg-[#242424]/40 p-3 rounded-md border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-gray-400 mb-0.5">
                    <CreditCard size={13} className="text-[#AC6CFF]" /> Payment Method
                  </div>
                  <p className="font-medium text-white capitalize">
                    {selectedPayment.payment_method || 'Stripe Card'}
                  </p>
                </div>

                <div className="bg-[#242424]/40 p-3 rounded-md border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-gray-400 mb-0.5">
                    <CheckCircle2 size={13} className="text-[#AC6CFF]" /> Booking Order
                  </div>
                  <p className="font-medium text-[#AC6CFF]">
                    {selectedPayment.booking_id ? `BKG-#${selectedPayment.booking_id}` : 'Direct Transaction'}
                  </p>
                </div>
              </div>

              {/* Service Info */}
              {selectedPayment.booking && (
                <div className="bg-[#242424]/60 rounded-md p-3.5 border border-white/5 space-y-1.5 text-xs">
                  <h4 className="font-bold text-white mb-1">Associated Package / Service</h4>
                  <div className="flex justify-between items-center text-gray-300">
                    <span className="text-gray-400">Plan Title:</span>
                    <span className="text-white font-medium">
                      {selectedPayment.booking.pricing_plan?.name || 
                       selectedPayment.booking.service?.title ||
                       selectedPayment.booking.campaign_tier?.campaign?.title || 
                       selectedPayment.booking.plan_name || 
                       'Custom Marketing Service'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/10 bg-[#242424]/50 flex justify-between items-center">
              <button
                onClick={() => {
                  const bookingId = selectedPayment.booking_id || selectedPayment.booking?.id || selectedPayment.id;
                  const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
                  const authData = localStorage.getItem('auth-storage');
                  let token = '';
                  if (authData) {
                    try {
                      token = JSON.parse(authData)?.state?.token || '';
                    } catch (e) {}
                  }
                  const downloadUrl = `${baseUrl}/payments/${bookingId}/invoice${token ? `?token=${encodeURIComponent(token)}` : ''}`;
                  window.open(downloadUrl, '_blank');
                }}
                className="px-3.5 py-1.5 rounded-md text-xs font-bold text-[#AC6CFF] bg-[#AC6CFF]/15 border border-[#AC6CFF]/30 hover:bg-[#AC6CFF] hover:text-black transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FileText size={14} />
                <span>Download Invoice PDF</span>
              </button>
              <button 
                onClick={() => setSelectedPayment(null)}
                className="px-4 py-2 rounded-md text-xs font-bold text-white bg-white/10 hover:bg-white/20 transition-colors"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
