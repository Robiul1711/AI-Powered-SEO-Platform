import CommonBanner from "../common/CommonBanner";
import CommonBusiness from "./local-service-components/CommonBusiness";
  import { ImageProvider } from "@/components/common/ImageProvider";
import VideoBannr from "../common/VideoBannr";
import PricingSection from "../homeComponents/PricingSection";
import FAQ from "../homeComponents/FAQ";
import StartFreeToday from "../homeComponents/StartFreeToday";
export default function LocalService() {
  return (
    <>
            <CommonBanner
  title="Rank Your Business at
the Top of Local Search"
  image={ImageProvider.localService}
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "services", href: "/services" }
  ]}
/>

      <CommonBusiness />
            <VideoBannr />
      <PricingSection />
      <FAQ />
      <StartFreeToday />
    </>
  );
}
