import VideoBannr from "../common/VideoBannr";
import StartFreeToday from "../homeComponents/StartFreeToday";
import OurBenefit from "./seoCampaignComponents/OurBenefit";
import WhyChoose from "./seoCampaignComponents/WhyChoose";
import FAQ from "./seoCampaignComponents/SeoCampignFAQ";
import Newsletter from "../common/Newsletter";
import SeoCapaignPrice from "./seoCampaignComponents/SeoCapaignPrice";
import LocalSEO from "./seoCampaignComponents/LocalSEO";
import SEOPackages from "./seoCampaignComponents/SEOPackages";
import CommonBanner from "../common/CommonBanner";
import { ImageProvider } from "../common/ImageProvider";

export default function SEOCampaign() {
  return (
    <>
      <CommonBanner
        title="SEO Packages"
        subtitle="Unlock Sustainable Growth with Our Expert-Crafted SEO Packages. Every Strategy is a Promise: Visible, Measurable, and Built for Real Business Impact."
        image={ImageProvider.monthlyService}
      />
      <SEOPackages />
      <SeoCapaignPrice />
      <LocalSEO />
      <OurBenefit serviceData="" />
      <WhyChoose serviceData="" />
      <Newsletter />
      {/* <VideoBannr /> */}
      <FAQ serviceData="" />
      <StartFreeToday />
    </>
  );
}
