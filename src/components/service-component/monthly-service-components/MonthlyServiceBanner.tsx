import CommonBanner from "@/components/common/CommonBanner";
import { ImageProvider } from "@/components/common/ImageProvider";


export default function MonthlyServiceBanner() {
  return (
    <div className="relative w-full">
        <CommonBanner
  title="Monthly SEO That Grows Revenue"
  image={ImageProvider.monthlyService}
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Service", href: "/services/monthly-seo" }
  ]}
/>
    </div>
  );
}
