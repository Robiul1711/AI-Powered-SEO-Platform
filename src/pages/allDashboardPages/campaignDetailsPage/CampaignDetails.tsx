import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Loader2, Tag, CalendarDays, CreditCard, Layers } from 'lucide-react';
import useClient from '@/hooks/useClient';

// Status badge colors
const statusColors: Record<string, string> = {
  paid:      'bg-green-500/15 text-green-400 border-green-500/30',
  active:    'bg-green-500/15 text-green-400 border-green-500/30',
  pending:   'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  failed:    'bg-red-500/15 text-red-400 border-red-500/30',
  cancelled: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
  completed: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
};

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-0">
    <span className="text-gray-400 text-sm">{label}</span>
    <span className="text-white text-sm font-medium text-right">{value}</span>
  </div>
);

const CampaignDetails = () => {
  const { id } = useParams();

  const { data: response, isLoading } = useClient({
    queryKey: ['booking-details', id || ""],
    url: `/user/bookings/${id}`,
    isPrivate: true,
  });

  const booking = (response as any)?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-[#AC6CFF] animate-spin" />
        <p className="mt-4 text-gray-400 font-inter animate-pulse text-sm">Loading Details...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-20 font-inter text-gray-400">
        Campaign details not found.
      </div>
    );
  }

  // --- Derive values strictly from API ---
  const campaignName =
    booking.campaign_tier?.campaign?.title ||
    booking.service?.title ||
    booking.pricing_plan?.name ||
    booking.plan_name ||
    'Campaign';

  const paymentStatus = (booking.payment_status || 'pending').toLowerCase();
  const bookingStatus  = (booking.status || 'pending').toLowerCase();

  const startDate = booking.created_at
    ? new Date(booking.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '—';

  // Features — prefer pricing_plan > campaign > service
  const features: any[] =
    booking.pricing_plan?.features ||
    booking.campaign_tier?.campaign?.features ||
    booking.service?.features ||
    [];

  // Campaign details object (keyword, target URL, etc.)
  const campaignDetails: Record<string, any> | null = booking.campaign_details || null;

  return (
    <div className="font-inter pb-10">
      <Link
        to="/dashboard/my-campaigns"
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors w-fit"
      >
        <ArrowLeft size={16} />
        <span className="text-sm font-medium">Back to Campaigns</span>
      </Link>

      <div className="space-y-6">

        {/* ── Header Card ── */}
        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-inter font-bold text-white mb-1">{campaignName}</h2>
            <p className="text-gray-500 text-xs font-mono">Booking ID: BKG-{booking.id}</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider ${statusColors[bookingStatus] || statusColors['pending']}`}>
              {bookingStatus}
            </span>
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider ${statusColors[paymentStatus] || statusColors['pending']}`}>
              Payment: {paymentStatus}
            </span>
          </div>
        </div>

        {/* ── Info Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Booking Info */}
          <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6">
            <h3 className="text-xs font-inter font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Tag size={14} className="text-[#AC6CFF]" />
              Booking Info
            </h3>
            <div>
              <InfoRow label="Booking ID"    value={`BKG-${booking.id}`} />
              <InfoRow label="Plan / Service" value={campaignName} />
              <InfoRow
                label="Price"
                value={
                  booking.price
                    ? `$${parseFloat(booking.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                    : '—'
                }
              />
              {booking.service && (
                <InfoRow label="Service" value={booking.service.title} />
              )}
              {booking.campaign_tier?.campaign && (
                <InfoRow label="Campaign" value={booking.campaign_tier.campaign.title} />
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6">
            <h3 className="text-xs font-inter font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <CalendarDays size={14} className="text-[#AC6CFF]" />
              Timeline
            </h3>
            <div>
              <InfoRow label="Start Date" value={startDate} />
              <InfoRow
                label="Payment Status"
                value={
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${statusColors[paymentStatus] || statusColors['pending']}`}>
                    {paymentStatus}
                  </span>
                }
              />
              {booking.payments?.length > 0 && (
                <InfoRow label="Transactions" value={`${booking.payments.length} payment(s)`} />
              )}
            </div>
          </div>
        </div>

        {/* ── Campaign Details (dynamic key/value) ── */}
        {campaignDetails && Object.keys(campaignDetails).length > 0 && (
          <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6">
            <h3 className="text-xs font-inter font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <CreditCard size={14} className="text-[#AC6CFF]" />
              Campaign Details
            </h3>
            <div>
              {Object.entries(campaignDetails).map(([key, value]) => (
                <InfoRow
                  key={key}
                  label={key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  value={String(value)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── What's Included (from plan/service) ── */}
        {features.length > 0 && (
          <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-6">
            <h3 className="text-xs font-inter font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Layers size={14} className="text-[#AC6CFF]" />
              What's Included
            </h3>
            <ul className="space-y-3">
              {features.map((feature: any, index: number) => {
                const text =
                  typeof feature === 'string'
                    ? feature
                    : feature?.title || feature?.name || JSON.stringify(feature);
                return (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#AC6CFF]/15 text-[#AC6CFF] flex items-center justify-center shrink-0">
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="text-gray-300 text-sm">{text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default CampaignDetails;
