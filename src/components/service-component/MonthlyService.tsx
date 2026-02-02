import VideoBannr from "../common/VideoBannr";
import MonthlyServiceBanner from "./monthly-service-components/MonthlyServiceBanner";
import PricingSection from "../homeComponents/PricingSection";
import FAQ from "../homeComponents/FAQ";
import StartFreeToday from "../homeComponents/StartFreeToday";
import Inclusions from "./monthly-service-components/Inclusions";
import TopPerformingKeywords from "./monthly-service-components/TopPerformingKeywords";
import OurBenefit from "./monthly-service-components/OurBenefit";
import WhyChoose from "./monthly-service-components/WhyChoose";

export default function MonthlyService() {
  return (
    <>
      <MonthlyServiceBanner />
      <Inclusions />
      
      <TopPerformingKeywords />
      <OurBenefit />
      <WhyChoose />
      <VideoBannr />
      <PricingSection />
      <FAQ />
      <StartFreeToday />
    </>
  );
}
