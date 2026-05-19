import CommonBanner from "../common/CommonBanner";
import { ImageProvider } from "@/components/common/ImageProvider";
import StartFreeToday from "../homeComponents/StartFreeToday";
import ContentBusiness from "./marketingcomponents/ContentBusiness";
import GooglePartner from "./marketingcomponents/GooglePartner";
import MarketingBrand from "./marketingcomponents/MarketingBrand";
import DrivingRealResults from "./marketingcomponents/DrivingRealResults";
import SocialMarketing from "./marketingcomponents/SocialMarketing";
import useClient from "@/hooks/useClient";

export default function MarketingSolutions() {
  const { data: contentWritingData, isLoading } = useClient({
    queryKey: ["content-writing"],
    url: "/services/content-writing",
  });
  console.log(contentWritingData?.data);
  return (
    <div>
      <CommonBanner
        title={contentWritingData?.data?.title || "Solutions for business growth"}
        subtitle={contentWritingData?.data?.subtitle || "Social Media Marketing is the intersection between creative and performance. Our team delivers the perfect combination of creative and paid media expertise to maximize results."}
        image={
          contentWritingData?.data?.thumbnail || ImageProvider.contentWriting
        }
        buttonOne="Get a free audit"
        // breadcrumbs={[
        //   { label: "Home", href: "/" },
        //   { label: "services", href: "/services" },
        // ]}
      />
      <ContentBusiness />
      {isLoading ? (
         <div className="text-center text-white py-20">Loading Campaigns...</div>
      ) : (
         contentWritingData?.data?.campaigns?.map((campaign: any) => (
           <SocialMarketing key={campaign.id} campaign={campaign} isLoading={isLoading} />
         ))
      )}
      <DrivingRealResults serviceData={contentWritingData?.data?.expect_results || []} isLoading={isLoading} />
      <MarketingBrand serviceData={contentWritingData?.data?.brands || []} isLoading={isLoading}/>
      <GooglePartner />
      <StartFreeToday />
    </div>
  );
}
