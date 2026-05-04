import CommonBanner from "../common/CommonBanner";
import { ImageProvider } from "@/components/common/ImageProvider";
import StartFreeToday from "../homeComponents/StartFreeToday";
import ContentBusiness from "./marketingcomponents/ContentBusiness";
import GooglePartner from "./marketingcomponents/GooglePartner";
import MarketingBrand from "./marketingcomponents/MarketingBrand";
import DrivingRealResults from "./marketingcomponents/DrivingRealResults";
import FacebookMarketing from "./marketingcomponents/FacebookMarketing";
import InstagramMarketing from "./marketingcomponents/InstagramMarketing";
import YouTubeMarketing from "./marketingcomponents/YouTubeMarketing";

export default function MarketingSolutions() {
  return (
    <div>
      <CommonBanner
        title="Solutions for business growth"
        subtitle="Social Media Marketing is the intersection between creative and performance. Our team delivers the perfect combination of creative and paid media expertise to maximize results."
        image={ImageProvider.contentWriting}
        buttonOne="Get a free audit"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "services", href: "/services" },
        ]}
      />
      <ContentBusiness />
      <FacebookMarketing />
      <InstagramMarketing />
      <YouTubeMarketing />
      <DrivingRealResults />
      <MarketingBrand />
      <GooglePartner />
      <StartFreeToday />
    </div>
  );
}
