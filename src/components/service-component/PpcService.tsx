import CommonBanner from "../common/CommonBanner";
import { ImageProvider } from "@/components/common/ImageProvider";
import VideoBannr from "../common/VideoBannr";
import PricingSection from "../homeComponents/PricingSection";
import FAQ from "../homeComponents/FAQ";
import StartFreeToday from "../homeComponents/StartFreeToday";
import PPCWhyChoose from "./ppcService/PPCWhyChoose";
import PPCOurBenefit from "./ppcService/PPCOurBenefit";
import PPCInclude from "./ppcService/PPCInclude";
import PPCProcess from "./ppcService/PPCProcess";
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
          { label: "services", href: "/services" },
        ]}
      />
      <PPCInclude />
      <PPCProcess />
      <PPCOurBenefit />
      <PPCWhyChoose />
      <VideoBannr />
      <PricingSection />
      <FAQ />
      <StartFreeToday />
    </>
  );
}
