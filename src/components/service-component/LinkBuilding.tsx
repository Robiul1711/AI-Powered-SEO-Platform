import CommonBanner from "../common/CommonBanner";
import { ImageProvider } from "@/components/common/ImageProvider";
import LinkBuildingPostingFAQ from "./linkBuildingComponent/LinkBuildingPostingFAQ";
import LinkBuildingOutLocalSEO from "./linkBuildingComponent/LinkBuildingOutLocalSEO";
import LinkBuildinPostingPrice from "./linkBuildingComponent/LinkBuildinPostingPrice";
import LinkBuildingOurBenefit from "./linkBuildingComponent/LinkBuildingOurBenefit";
import LinkBuildingWhyChoose from "./linkBuildingComponent/LinkBuildingWhyChoose";
import StartFreeToday from "../homeComponents/StartFreeToday";
import LinkOurBenifits from "./linkBuildingComponent/LinkOurBenifits";
import useClient from "@/hooks/useClient";


export default function LinkBuilding() {
        const { data:PPCSeoData, isLoading } = useClient({
    queryKey: ["link-building"],
    url: "/services/link-building",
  });
  return (
    <>
      <CommonBanner
        isLoading={isLoading}
        title={PPCSeoData?.data?.title ||"We Offer Link Building Strategies That Actually Deliver!"}
        subtitle={PPCSeoData?.data?.description ||"Link building is crucial to make your website credible, both for search engines and for users. And we excel in providing you with quality backlinks that will enhance your website's quality manifold. Our strategies will ensure that your website gets the prominence it needs by featuring in the right kind of places. We use"}
        image={ PPCSeoData?.data?.thumbnail ||ImageProvider.ppcService}
        // buttonOne="Start Campaign"
        // buttonTwo="Learn More"
        // breadcrumbs={[
        //   { label: "Home", href: "/" },
        //   { label: "services", href: "/services" },
        // ]}
      />
      <LinkBuildinPostingPrice serviceData={PPCSeoData?.data?.pricing || []} isLoading={isLoading}/>
      <LinkBuildingOutLocalSEO serviceData={PPCSeoData?.data?.what_include || []} isLoading={isLoading}/>
      <LinkBuildingOurBenefit serviceData={PPCSeoData?.data?.banifite || []} isLoading={isLoading}/>
      <LinkBuildingWhyChoose serviceData={PPCSeoData?.data?.why_chose_us || []} isLoading={isLoading}/>
      <LinkOurBenifits serviceData={PPCSeoData?.data?.secondary_features || []} isLoading={isLoading}/>
      <LinkBuildingPostingFAQ serviceData={PPCSeoData?.data?.faq || []} isLoading={isLoading}/>
      <StartFreeToday/>  
    </>
  );
}
