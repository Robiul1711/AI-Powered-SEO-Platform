import CommonBanner from "../common/CommonBanner";
import { ImageProvider } from "@/components/common/ImageProvider";
import StartFreeToday from "../homeComponents/StartFreeToday";
import WhyChoose from "./seoCampaignComponents/WhyChoose";
import OutLocalSEO from "./guestPostingcomponents/OutLocalSEO";
import OurBenefit from "./seoCampaignComponents/OurBenefit";
import Newsletter from "../common/Newsletter";
import GestPostingFAQ from "./guestPostingcomponents/GestPostingFAQ";
import GuestPostingPrice from "./guestPostingcomponents/GuestPostingPrice";
import GuestWhyChoose from "./guestPostingcomponents/GuestWhyChoose";
import GuesstOurBenefit from "./guestPostingcomponents/GuesstOurBenefit";
import useClient from "@/hooks/useClient";
export default function GuestPostingServices() {
      const { data:localSeoData, isLoading } = useClient({
    queryKey: ["local-seo"],
    url: "/services/local-seo",
  });
  return (
    <>
      <CommonBanner
        title={localSeoData?.data?.title || "Guest Posting Services"}
        subtitle={localSeoData?.data?.subtitle || "Guest posting is a great way to build backlinks and improve your website's SEO. Our team can help you get high-quality guest posts on authoritative websites in your niche. We offer a range of guest posting packages to suit your needs and budget."}
        image={localSeoData?.data?.thumbnail || ImageProvider.localService}
        // breadcrumbs={[
        //   { label: "Home", href: "/" },
        //   { label: "services", href: "/services" },
        // ]}
      />

      <GuestPostingPrice serviceData={localSeoData?.data?.pricing || []} isLoading={isLoading} />
      <OutLocalSEO serviceData={localSeoData?.data?.what_include || []} isLoading={isLoading} />
      <GuesstOurBenefit serviceData={localSeoData?.data?.banifite || []} isLoading={isLoading} />
      <GuestWhyChoose serviceData={localSeoData?.data?.why_chose_us || []} isLoading={isLoading} />
      <Newsletter />
      <GestPostingFAQ serviceData={localSeoData?.data?.faq || []} />
      <StartFreeToday />
    </>
  );
}
