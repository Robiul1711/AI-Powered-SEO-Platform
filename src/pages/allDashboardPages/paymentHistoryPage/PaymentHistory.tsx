import React, { useState } from 'react';
import { CreditCard, Eye, Loader2, ChevronLeft, ChevronRight, LayoutGrid, Search, X, CheckCircle2, Calendar, FileText, Activity, Download } from 'lucide-react';
import useClient from '@/hooks/useClient';

const PaymentHistory = () => {
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

  const allPayments = response?.data || [];
  
  const filteredPayments = allPayments.filter((payment: any) => {
    const search = searchTerm.toLowerCase();
    const id = (payment.transaction_id || `PAY-${payment.id}`).toLowerCase();
    const amount = payment.amount ? payment.amount.toString() : "0.00";
    const status = (payment.status || "Pending").toLowerCase();
    
    const matchesSearch = id.includes(search) || amount.includes(search) || status.includes(search);
    
    const displayStatus = status === 'succeeded' ? 'paid' : status;
    const matchesStatus = statusFilter === 'all' || displayStatus === statusFilter;
    
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

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'paid' || s === 'succeeded' || s === 'active' || s === 'completed') {
      return 'bg-green-500/10 text-green-400 border border-green-500/20';
    }
    if (s === 'ongoing') {
      return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
    }
    if (s === 'pending') {
      return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
    }
    if (s === 'cancelled' || s === 'failed') {
      return 'bg-red-500/10 text-red-400 border border-red-500/20';
    }
    return 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#AC6CFF] animate-spin" />
        <p className="mt-3 text-gray-500 font-orbitron text-xs tracking-widest uppercase animate-pulse">Loading Payments...</p>
      </div>
    );
  }

  return (
    <div className="font-inter pb-8">
      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-xl font-medium text-white">Payment History</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-transparent text-gray-400 text-sm border border-gray-700 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:border-gray-500 cursor-pointer"
              >
                <option value="all" className="bg-[#1A1A1A]">All Status</option>
                <option value="paid" className="bg-[#1A1A1A]">Paid</option>
                <option value="pending" className="bg-[#1A1A1A]">Pending</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent border border-gray-700 rounded-lg pl-4 pr-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400">
                <th className="py-3 px-4 font-normal">Date</th>
                <th className="py-3 px-4 font-normal">Description</th>
                <th className="py-3 px-4 font-normal">Amount</th>
                <th className="py-3 px-4 font-normal">Status</th>
                <th className="py-3 px-4 font-normal">Receipt</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {payments.length > 0 ? (
                payments.map((payment: any, index: number) => {
                  const date = new Date(payment.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                  });
                  
                  // Format currency properly
                  const currencySymbol = payment.currency?.toLowerCase() === 'eur' ? '€' : '$';
                  const amount = payment.amount ? `${currencySymbol}${parseFloat(payment.amount).toFixed(2)}` : `${currencySymbol}0.00`;
                  
                  const displayStatus = payment.status === 'succeeded' ? 'Paid' : (payment.status || 'Pending');
                  const invoiceId = payment.transaction_id || `INV-2026-00${payment.id}`;
                  
                  const planName = payment.booking?.pricing_plan?.name 
                                  || payment.booking?.campaign_tier?.campaign?.title 
                                  || 'Custom Service';
                  
                  return (
                    <tr key={index} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                      <td className="py-2.5 px-4 text-gray-300">{date}</td>
                      <td className="py-2.5 px-4 text-gray-300">
                        <div className="flex flex-col gap-1">
                          <span>{planName}</span>
                          <span className="text-gray-500 text-xs">{invoiceId}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-4 text-white font-medium">{amount}</td>
                      <td className="py-2.5 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          displayStatus.toLowerCase() === 'paid' 
                            ? 'bg-green-500/10 text-green-400' 
                            : getStatusColor(displayStatus)
                        }`}>
                          {displayStatus}
                        </span>
                      </td>
                      <td className="py-2.5 px-4">
                        <button 
                          onClick={() => setSelectedPayment(payment)}
                          className="bg-gradient-to-r from-[#9056e3] to-[#b47afc] hover:from-[#8046d3] hover:to-[#a46aec] text-white px-4 py-1.5 rounded-md transition-all inline-flex items-center text-[13px] font-medium shadow-md shadow-[#AC6CFF]/20"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500 text-sm">No payments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <p className="text-gray-500 text-sm">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredPayments.length)} of {filteredPayments.length} entries
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 rounded hover:bg-white/5 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded flex items-center justify-center text-sm transition-colors ${
                    currentPage === page
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:bg-white/5"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded hover:bg-white/5 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="bg-[#AC6CFF]/10 p-2.5 rounded-xl border border-[#AC6CFF]/20">
                  <FileText className="text-[#AC6CFF] w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-orbitron font-bold text-white">Payment Details</h3>
                  <p className="text-xs text-gray-400">Transaction summary and information</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPayment(null)}
                className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-6">
              {/* Amount & Status Card */}
              <div className="bg-white/5 border border-white/5 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Total Amount Paid</p>
                  <p className="text-2xl font-bold text-white">
                    {selectedPayment.amount ? `$${parseFloat(selectedPayment.amount).toFixed(2)}` : "$0.00"}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase ${getStatusColor(selectedPayment.status === 'succeeded' ? 'Paid' : (selectedPayment.status || 'Pending'))}`}>
                    {selectedPayment.status === 'succeeded' ? 'Paid' : (selectedPayment.status || 'Pending')}
                  </span>
                  <p className="text-xs text-gray-500 mt-2">
                    {selectedPayment.currency?.toUpperCase() || 'USD'}
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                    <Activity size={14} /> Transaction ID
                  </div>
                  <p className="text-sm font-medium text-white break-all">
                    {selectedPayment.transaction_id || `PAY-${selectedPayment.id}`}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                    <Calendar size={14} /> Date & Time
                  </div>
                  <p className="text-sm font-medium text-white">
                    {new Date(selectedPayment.created_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                    <CreditCard size={14} /> Payment Method
                  </div>
                  <p className="text-sm font-medium text-white capitalize">
                    {selectedPayment.payment_method || 'Stripe'}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                    <CheckCircle2 size={14} /> Associated Booking
                  </div>
                  <p className="text-sm font-medium text-[#AC6CFF]">
                    {selectedPayment.booking_id ? `BKG-${selectedPayment.booking_id}` : 'N/A'}
                  </p>
                </div>
              </div>
              
              {selectedPayment.booking && (
                <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                  <h4 className="text-sm font-bold text-white mb-2 font-orbitron">Service Details</h4>
                  <div className="bg-white/5 rounded-lg p-3 text-sm">
                    <span className="text-gray-400">Plan / Service: </span>
                    <span className="text-white font-medium">
                      {selectedPayment.booking.pricing_plan?.name || 
                       selectedPayment.booking.campaign_tier?.campaign?.title || 
                       'Custom Service'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 border-t border-white/5 bg-white/[0.02] flex justify-end">
              <button 
                onClick={() => setSelectedPayment(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
