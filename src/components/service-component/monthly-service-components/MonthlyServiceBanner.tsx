import CommonBanner from "@/components/common/CommonBanner";
import { ImageProvider } from "@/components/common/ImageProvider";

export default function MonthlyServiceBanner({
  serviceData,
  isLoading,
}: {
  serviceData: any;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="relative w-full">
        <div className="relative w-full overflow-hidden animate-pulse">
          {/* Skeleton image background */}
          <div className="w-full h-[350px] md:h-[400px] lg:h-[500px] bg-[#1a1a1a]" />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20" />
          {/* Centered skeleton content */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
            {/* Breadcrumb skeleton */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-4 w-12 bg-white/10 rounded" />
              <div className="h-4 w-3 bg-white/5 rounded" />
              <div className="h-4 w-24 bg-white/10 rounded" />
            </div>
            {/* Title skeleton */}
            <div className="h-10 md:h-14 w-[70%] max-w-2xl bg-white/10 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <CommonBanner
        title={serviceData?.subtitle}
        image={serviceData?.thumbnail || ImageProvider.monthlyService}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: serviceData?.title, href: `/services/${serviceData?.slug}` },
        ]}
      />
    </div>
  );
}
