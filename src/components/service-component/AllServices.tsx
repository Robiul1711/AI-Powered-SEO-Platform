import { useParams } from "react-router-dom";
import useClient from "@/hooks/useClient";

// Common Components
import CommonBanner from "../common/CommonBanner";
import StartFreeToday from "../homeComponents/StartFreeToday";
import Newsletter from "../common/Newsletter";

// SEO Campaign Components
import SEOPackages from "./seoCampaignComponents/SEOPackages";
import SeoCapaignPrice from "./seoCampaignComponents/SeoCapaignPrice";
import LocalSEO from "./seoCampaignComponents/LocalSEO";
import OurBenefit from "./seoCampaignComponents/OurBenefit";
import WhyChoose from "./seoCampaignComponents/WhyChoose";
import FAQ from "./seoCampaignComponents/SeoCampignFAQ";

// Link Building / Guest Posting Components
import LinkBuildinPostingPrice from "./linkBuildingComponent/LinkBuildinPostingPrice";
import LinkBuildingOutLocalSEO from "./linkBuildingComponent/LinkBuildingOutLocalSEO";
import LinkBuildingOurBenefit from "./linkBuildingComponent/LinkBuildingOurBenefit";
import LinkBuildingWhyChoose from "./linkBuildingComponent/LinkBuildingWhyChoose";
import LinkOurBenifits from "./linkBuildingComponent/LinkOurBenifits";
import LinkBuildingPostingFAQ from "./linkBuildingComponent/LinkBuildingPostingFAQ";

// SMM Marketing Components
import ContentBusiness from "./marketingcomponents/ContentBusiness";
import SocialMarketing from "./marketingcomponents/SocialMarketing";
import DrivingRealResults from "./marketingcomponents/DrivingRealResults";
import MarketingBrand from "./marketingcomponents/MarketingBrand";
import GooglePartner from "./marketingcomponents/GooglePartner";

export default function AllServices() {
  const { slug = "" } = useParams<{ slug: string }>();

  const { data: response, isLoading } = useClient({
    queryKey: ["services-details", slug],
    url: `/services/${slug}`,
  });

  const serviceData = (response as any)?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#AC6CFF]"></div>
        <p className="mt-4 text-white/60">Loading service details...</p>
      </div>
    );
  }

  if (!serviceData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
        <p className="text-xl font-medium text-white/80">Service not found</p>
      </div>
    );
  }

  // Identify SMM Marketing specifically by slug to keep its custom layout
  const isSmmMarketing = slug === "smm-marketing";

  if (isSmmMarketing) {
    // SMM Marketing Custom Layout
    return (
      <div>
        <CommonBanner
          isLoading={isLoading}
          title={serviceData.title}
          subtitle={serviceData.subtitle || serviceData.description}
          image={serviceData.thumbnail}
          buttonOne="Get a free audit"
        />
        <ContentBusiness
          serviceData={serviceData.what_include || []}
          sectionData={serviceData.banifite}
          isLoading={isLoading}
        />
        {serviceData.campaigns?.map((campaign: any) => (
          <SocialMarketing key={campaign.id} campaign={campaign} isLoading={isLoading} />
        ))}
        {serviceData.expect_results && serviceData.expect_results.length > 0 && (
          <DrivingRealResults serviceData={serviceData.expect_results} isLoading={isLoading} />
        )}
        {serviceData.brands && serviceData.brands.length > 0 && (
          <MarketingBrand serviceData={serviceData.brands} isLoading={isLoading} />
        )}
        <GooglePartner />
        <StartFreeToday />
      </div>
    );
  }

  // Generic dynamic layout based on populated fields in response
  return (
    <>
      <CommonBanner
        isLoading={isLoading}
        title={serviceData.title}
        subtitle={serviceData.subtitle || serviceData.description}
        image={serviceData.thumbnail}
      />

      {/* Campaigns / Packages Section */}
      {serviceData.is_campaign && serviceData.campaigns && serviceData.campaigns.length > 0 && (
        <SEOPackages serviceData={serviceData.campaigns} isLoading={isLoading} />
      )}

      {/* Pricing / Plans Section */}
      {serviceData.pricing && serviceData.pricing.length > 0 && (
        serviceData.is_campaign ? (
          <SeoCapaignPrice serviceData={serviceData.pricing} isLoading={isLoading} />
        ) : (
          <LinkBuildinPostingPrice serviceData={serviceData.pricing} isLoading={isLoading} />
        )
      )}

      {/* What's Included / Local SEO Grid */}
      {serviceData.what_include && serviceData.what_include.length > 0 && (
        serviceData.is_campaign ? (
          <LocalSEO serviceData={serviceData.what_include} isLoading={isLoading} />
        ) : (
          <LinkBuildingOutLocalSEO serviceData={serviceData.what_include} isLoading={isLoading} />
        )
      )}

      {/* Benefits Section */}
      {serviceData.banifite && (
        serviceData.is_campaign ? (
          <OurBenefit serviceData={serviceData.banifite} isLoading={isLoading} />
        ) : (
          <LinkBuildingOurBenefit serviceData={serviceData.banifite} isLoading={isLoading} />
        )
      )}

      {/* Why Choose Us Section */}
      {serviceData.why_chose_us && (
        serviceData.is_campaign ? (
          <WhyChoose serviceData={serviceData.why_chose_us} isLoading={isLoading} />
        ) : (
          <LinkBuildingWhyChoose serviceData={serviceData.why_chose_us} isLoading={isLoading} />
        )
      )}

      {/* Secondary Features Section */}
      {serviceData.secondary_features && serviceData.secondary_features.length > 0 && (
        <LinkOurBenifits serviceData={serviceData.secondary_features} isLoading={isLoading} />
      )}

      {/* SMM-specific results/brands if present (for dynamic campaign additions) */}
      {serviceData.expect_results && serviceData.expect_results.length > 0 && (
        <DrivingRealResults serviceData={serviceData.expect_results} isLoading={isLoading} />
      )}
      {serviceData.brands && serviceData.brands.length > 0 && (
        <MarketingBrand serviceData={serviceData.brands} isLoading={isLoading} />
      )}

      {/* Newsletter */}
      {serviceData.is_campaign && <Newsletter />}

      {/* FAQ Section */}
      {serviceData.faq && serviceData.faq.length > 0 && (
        serviceData.is_campaign ? (
          <FAQ serviceData={serviceData.faq} />
        ) : (
          <LinkBuildingPostingFAQ serviceData={serviceData.faq} isLoading={isLoading} />
        )
      )}

      <StartFreeToday />
    </>
  );
}
