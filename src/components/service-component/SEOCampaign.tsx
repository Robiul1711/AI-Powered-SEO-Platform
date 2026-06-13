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
import useClient from "@/hooks/useClient";

export default function SEOCampaign() {
  const { data: monthlySeoData, isLoading } = useClient({
    queryKey: ["seo-campaign"],
    url: "/services/seo-campaign",
  });
  return (
    <>
      <CommonBanner
        title={monthlySeoData?.data?.title || "Monthly SEO Service"}
        subtitle={monthlySeoData?.data?.subtitle || "Unlock Sustainable Growth with Our Expert-Crafted SEO Packages. Every Strategy is a Promise: Visible, Measurable, and Built for Real Business Impact."}
        image={monthlySeoData?.data?.thumbnail || ImageProvider.monthlyService}
      />
      <SEOPackages serviceData={monthlySeoData?.data?.campaigns || []} isLoading={isLoading}/>
      <SeoCapaignPrice serviceData={monthlySeoData?.data?.pricing || []} isLoading={isLoading} />
      <LocalSEO serviceData={monthlySeoData?.data?.what_include || []} isLoading={isLoading} />
      <OurBenefit serviceData={monthlySeoData?.data?.banifite || []} isLoading={isLoading} />
      <WhyChoose serviceData={monthlySeoData?.data?.why_chose_us || []} isLoading={isLoading} />
      <Newsletter />
      {/* <VideoBannr /> */}
      <FAQ serviceData={monthlySeoData?.data?.faq || []}/>
      <StartFreeToday />
    </>
  );
}
