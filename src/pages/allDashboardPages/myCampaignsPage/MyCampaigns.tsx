import React, { useState } from 'react';
import { 
  Megaphone, 
  Loader2, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Search, 
  Calendar, 
  DollarSign, 
  Layers, 
  ArrowRight,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useClient from '@/hooks/useClient';

const MyCampaigns = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const itemsPerPage = 10;

  const { data: response, isLoading } = useClient({
    queryKey: ["user-campaigns"],
    url: "/user/bookings",
    params: { is_campaign: true },
    isPrivate: true,
  });

  const allCampaigns = response?.data || [];

  const filteredCampaigns = allCampaigns.filter((campaign: any) => {
    const search = searchTerm.toLowerCase();
    const id = `cmp-${campaign.id}`.toLowerCase();
    const name = (campaign.campaign_tier?.campaign?.title || campaign.pricing_plan?.name || "Campaign").toLowerCase();
    const serviceTitle = (campaign.service?.title || "").toLowerCase();
    const status = (campaign.status || "Active").toLowerCase();
    
    const matchesSearch = id.includes(search) || name.includes(search) || serviceTitle.includes(search);
    const matchesStatus = statusFilter === 'all' || status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredCampaigns.length / itemsPerPage));
  const campaigns = filteredCampaigns.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
          Loading Your Campaigns...
        </p>
      </div>
    );
  }

  return (
    <div className="font-inter pb-8">
      {/* MAIN CONTAINER */}
      <div className="bg-[#1A1A1A] border border-white/10 rounded-md shadow-2xl overflow-hidden">
        {/* CONTROLS & FILTER BAR */}
        <div className="p-4 border-b border-white/10 bg-[#242424]/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-[320px]">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={15} />
            </div>
            <input 
              type="text" 
              placeholder="Search campaigns by name or ID..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-9 pl-9 pr-3 bg-[#1A1A1A] border border-white/10 rounded-md text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#AC6CFF] transition-all"
            />
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-9 pl-3 pr-8 bg-[#1A1A1A] text-gray-300 text-xs font-inter font-bold border border-white/10 rounded-md appearance-none cursor-pointer focus:outline-none focus:border-[#AC6CFF] transition-all"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* TABLE WITH STYLED INLINE EMPTY STATE */}
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-[#242424]/80 border-b border-white/10 text-gray-400 font-inter text-[11px] font-bold tracking-wider uppercase">
                <th className="py-3.5 px-4">Campaign Title & ID</th>
                <th className="py-3.5 px-4">Service Package</th>
                <th className="py-3.5 px-4">Price / Tier</th>
                <th className="py-3.5 px-4">Order Date</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-inter text-xs">
              {campaigns.length > 0 ? (
                campaigns.map((campaign: any, index: number) => {
                  const campaignName = campaign.campaign_tier?.campaign?.title || campaign.pricing_plan?.name || "Promotional Campaign";
                  const subtitle = campaign.campaign_tier?.campaign?.subtitle || campaign.plan_name || "";
                  const serviceName = campaign.service?.title || "Custom Marketing Service";
                  const date = campaign.created_at
                    ? new Date(campaign.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })
                    : 'N/A';
                  const price = campaign.price ? `$${Number(campaign.price).toFixed(2)}` : (campaign.campaign_tier?.price ? `$${Number(campaign.campaign_tier.price).toFixed(2)}` : '$0.00');

                  return (
                    <tr key={campaign.id || index} className="hover:bg-[#242424]/40 transition-colors group">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-[#AC6CFF]/10 text-[#AC6CFF] border border-[#AC6CFF]/20 flex items-center justify-center shrink-0 group-hover:bg-[#AC6CFF] group-hover:text-black transition-colors">
                            <Sparkles size={15} />
                          </div>
                          <div>
                            <h3 className="font-inter font-bold text-white group-hover:text-[#AC6CFF] transition-colors leading-tight text-xs">
                              {campaignName}
                            </h3>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-gray-400 font-mono">
                                CMP-#{campaign.id}
                              </span>
                              {subtitle && (
                                <span className="text-[10px] text-gray-500 truncate max-w-[160px]">
                                  • {subtitle}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-gray-300">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#242424] text-gray-300 text-[11px] border border-white/5 font-inter">
                          <Layers size={12} className="text-[#AC6CFF]" />
                          {serviceName}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-inter font-bold text-white text-xs">
                        {price}
                      </td>
                      <td className="py-3.5 px-4 text-gray-400 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar size={13} className="text-gray-500" />
                          {date}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold font-inter border ${
                          campaign.payment_status === 'paid' || campaign.payment_status === 'succeeded'
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                        }`}>
                          {campaign.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {getStatusBadge(campaign.status || "Active")}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <Link 
                          to={`/dashboard/my-campaigns/${campaign.id}`} 
                          className="px-3 py-1.5 rounded-md bg-[#242424] text-white border border-white/10 hover:bg-[#AC6CFF] hover:text-black hover:border-[#AC6CFF] transition-all text-xs font-inter font-bold inline-flex items-center gap-1.5 shadow-2xs"
                        >
                          <span>View Details</span>
                          <ArrowRight size={12} />
                        </Link>
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
                        <Megaphone size={26} />
                      </div>
                      <h3 className="text-base font-bold text-white mb-1">No Campaigns Found</h3>
                      <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                        {searchTerm || statusFilter !== 'all'
                          ? `No campaigns match your filter "${searchTerm || statusFilter}".`
                          : "You haven't launched any promotional campaigns yet. Explore our packages to boost domain authority."}
                      </p>
                      {searchTerm || statusFilter !== 'all' ? (
                        <button
                          onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
                          className="px-3.5 py-1.5 rounded-md bg-[#242424] text-[#AC6CFF] border border-[#AC6CFF]/30 hover:bg-[#AC6CFF] hover:text-black transition-all text-xs font-bold"
                        >
                          Clear Filters
                        </button>
                      ) : (
                        <Link to="/services/seo-campaign">
                          <button className="px-4 py-2 rounded-md bg-gradient-to-r from-[#AC6CFF] to-[#8E37FF] text-white transition-all text-xs font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(172,108,255,0.3)]">
                            <Sparkles size={14} />
                            <span>Explore Campaigns</span>
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

        {/* PAGINATION FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-white/10 bg-[#242424]/50">
          <p className="text-gray-400 text-xs font-inter">
            Showing {filteredCampaigns.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredCampaigns.length)} of {filteredCampaigns.length} campaigns
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-md bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1 text-xs font-inter font-bold">
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
    </div>
  );
};

export default MyCampaigns;
