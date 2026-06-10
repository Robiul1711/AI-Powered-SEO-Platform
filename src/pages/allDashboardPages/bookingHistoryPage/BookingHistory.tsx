import React, { useState } from 'react';
import { History, Eye, Loader2, ChevronLeft, ChevronRight, LayoutGrid, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import useClient from '@/hooks/useClient';

const BookingHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const itemsPerPage = 10;

  const { data: response, isLoading } = useClient({
    queryKey: ["user-bookings"],
    url: "/user/bookings",
    isPrivate: true,
  });

  const allBookings = response?.data || [];
  
  const filteredBookings = allBookings.filter((booking: any) => {
    const search = searchTerm.toLowerCase();
    const id = `BKG-${booking.id}`.toLowerCase();
    const serviceName = (booking.service?.title || booking.campaign_tier?.campaign?.title || booking.pricing_plan?.name || "Service Booking").toLowerCase();
    const status = (booking.status || booking.payment_status || "Active").toLowerCase();
    
    const matchesSearch = id.includes(search) || serviceName.includes(search) || status.includes(search);
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

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'active' || s === 'paid' || s === 'succeeded' || s === 'completed') {
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
        <p className="mt-3 text-gray-500 font-orbitron text-xs tracking-widest uppercase animate-pulse">Loading Bookings...</p>
      </div>
    );
  }

  return (
    <div className="font-inter pb-8">
      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-xl font-medium text-white">Booking History</h2>
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
                <option value="active" className="bg-[#1A1A1A]">Active</option>
                <option value="pending" className="bg-[#1A1A1A]">Pending</option>
                <option value="completed" className="bg-[#1A1A1A]">Completed</option>
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
                <th className="py-3 px-4 font-normal">Status</th>
                <th className="py-3 px-4 font-normal">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {bookings.length > 0 ? (
                bookings.map((booking: any, index: number) => {
                  const serviceName = booking.service?.title || booking.campaign_tier?.campaign?.title || booking.pricing_plan?.name || "Service Booking";
                  const type = booking.is_campaign ? "Campaign" : "Subscription";
                  const date = new Date(booking.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                  });
                  const status = booking.status || booking.payment_status || "Active";
                  
                  return (
                    <tr key={index} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                      <td className="py-2.5 px-4 text-gray-300">{date}</td>
                      <td className="py-2.5 px-4 text-gray-300">
                        <div className="flex flex-col gap-1">
                          <span>{serviceName}</span>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>BKG-{booking.id}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                            <span>{type}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(status)}`}>
                          {status}
                        </span>
                      </td>
                      <td className="py-2.5 px-4">
                        <Link to={`/dashboard/my-campaigns/${booking.id}`} className="bg-gradient-to-r from-[#9056e3] to-[#b47afc] hover:from-[#8046d3] hover:to-[#a46aec] text-white px-4 py-1.5 rounded-md transition-all inline-flex items-center text-[13px] font-medium shadow-md shadow-[#AC6CFF]/20">
                          View
                        </Link>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500 text-sm">No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <p className="text-gray-500 text-sm">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of {filteredBookings.length} entries
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
    </div>
  );
};

export default BookingHistory;
