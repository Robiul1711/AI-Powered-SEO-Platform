import CommonBanner from "../common/CommonBanner";
import CommonBusiness from "./local-service-components/CommonBusiness";
import { ImageProvider } from "@/components/common/ImageProvider";
import VideoBannr from "../common/VideoBannr";
import PricingSection from "../homeComponents/PricingSection";
import FAQ from "../homeComponents/FAQ";
import StartFreeToday from "../homeComponents/StartFreeToday";
import WhyChoose from "./monthly-service-components/WhyChoose";
import Results from "./local-service-components/Results";
import OutLocalSEO from "./local-service-components/OutLocalSEO";
import LocalBenifit from "./local-service-components/LocalBenifit";
import LocalWhyChoose from "./local-service-components/LocalWhyChoose";
export default function LocalService() {
  return (
    <>
      <CommonBanner
        title="Rank Your Business at
the Top of Local Search"
        image={ImageProvider.localService}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "services", href: "/services" },
        ]}
      />

      <CommonBusiness />
      <OutLocalSEO />
      <LocalBenifit/>
      <LocalWhyChoose />
      {/* <Results /> */}
      <VideoBannr />
      <PricingSection />
      <FAQ />
      <StartFreeToday />
    </>
  );
}
