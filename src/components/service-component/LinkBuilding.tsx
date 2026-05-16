import CommonBanner from "../common/CommonBanner";
import { ImageProvider } from "@/components/common/ImageProvider";
import LinkBuildingPostingFAQ from "./linkBuildingComponent/LinkBuildingPostingFAQ";
import LinkBuildingOutLocalSEO from "./linkBuildingComponent/LinkBuildingOutLocalSEO";
import LinkBuildinPostingPrice from "./linkBuildingComponent/LinkBuildinPostingPrice";
import LinkBuildingOurBenefit from "./linkBuildingComponent/LinkBuildingOurBenefit";
import LinkBuildingWhyChoose from "./linkBuildingComponent/LinkBuildingWhyChoose";
import StartFreeToday from "../homeComponents/StartFreeToday";
import LinkOurBenifits from "./linkBuildingComponent/LinkOurBenifits";


export default function LinkBuilding() {
  return (
    <>
      <CommonBanner
        title="We Offer Link Building Strategies That Actually Deliver!"
        subtitle="Link building is crucial to make your website credible, both for search engines and for users. And we excel in providing you with quality backlinks that will enhance your website's quality manifold. Our strategies will ensure that your website gets the prominence it needs by featuring in the right kind of places. We use"
        image={ImageProvider.ppcService}
        // buttonOne="Start Campaign"
        // buttonTwo="Learn More"
        // breadcrumbs={[
        //   { label: "Home", href: "/" },
        //   { label: "services", href: "/services" },
        // ]}
      />
      <LinkBuildinPostingPrice/>
      <LinkBuildingOutLocalSEO/>
      <LinkBuildingOurBenefit />
      <LinkBuildingWhyChoose/>
      <LinkOurBenifits/>
      <LinkBuildingPostingFAQ/>
      <StartFreeToday/>  
    </>
  );
}
