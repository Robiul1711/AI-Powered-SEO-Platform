import CommonBanner from "../common/CommonBanner";
import { ImageProvider } from "@/components/common/ImageProvider";
import VideoBannr from "../common/VideoBannr";
import PricingSection from "../homeComponents/PricingSection";
import FAQ from "../homeComponents/FAQ";
import StartFreeToday from "../homeComponents/StartFreeToday";
export default function ContentWriting() {
  return (
    <div>
              <CommonBanner
  title="SEO Content That Converts"
  image={ImageProvider.contentWriting}
    buttonOne=" SEO Content That Converts"

  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "services", href: "/services" }
  ]}
/>
      <VideoBannr />
      <PricingSection />
      <FAQ />
      <StartFreeToday />
    </div>
  );
}
