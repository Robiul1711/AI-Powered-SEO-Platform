import CommonBanner from "../common/CommonBanner";
import { ImageProvider } from "@/components/common/ImageProvider";
import VideoBannr from "../common/VideoBannr";
import PricingSection from "../homeComponents/PricingSection";
import FAQ from "../homeComponents/FAQ";
import StartFreeToday from "../homeComponents/StartFreeToday";
import Business from "./content-writing-components/ContentBusiness";
import AIAssisted from "./content-writing-components/AIAssisted";
import ContentTypes from "./content-writing-components/ContentTypes";
import ContentBusiness from "./content-writing-components/ContentBusiness";
import ContentWhyChoose from "./content-writing-components/ContentWhyChoose";
import ContentBenifit from "./content-writing-components/ContentBenifit";
export default function ContentWriting() {
  return (
    <div>
      <CommonBanner
        title="SEO Content That Converts"
        image={ImageProvider.contentWriting}
        buttonOne=" SEO Content That Converts"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "services", href: "/services" },
        ]}
      />
      <ContentBusiness />
      {/* <AIAssisted /> */}
      <ContentTypes />
      <ContentBenifit/>
      <ContentWhyChoose/>
      <VideoBannr />
      <PricingSection />
      <FAQ />
      <StartFreeToday />
    </div>
  );
}
