
import CommonBanner from "../common/CommonBanner";
import { ImageProvider } from "@/components/common/ImageProvider";
import VideoBannr from "../common/VideoBannr";
import PricingSection from "../homeComponents/PricingSection";
import FAQ from "../homeComponents/FAQ";
import StartFreeToday from "../homeComponents/StartFreeToday";
export default function PpcService() {
  return (
    <>
            <CommonBanner
  title="Profitable PPC Campaignss"
  image={ImageProvider.ppcService}
  buttonOne="Start Campaign"
  buttonTwo="Learn More"
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "services", href: "/services" }

  ]}
/>
      <VideoBannr />
      <PricingSection />
      <FAQ />
      <StartFreeToday />
    </>
  );
}
