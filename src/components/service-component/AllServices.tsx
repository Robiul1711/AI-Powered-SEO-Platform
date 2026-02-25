import VideoBannr from "../common/VideoBannr";
import MonthlyServiceBanner from "./monthly-service-components/MonthlyServiceBanner";
import FAQ from "../homeComponents/FAQ";
import StartFreeToday from "../homeComponents/StartFreeToday";
import Inclusions from "./monthly-service-components/Inclusions";
import TopPerformingKeywords from "./monthly-service-components/TopPerformingKeywords";
import OurBenefit from "./monthly-service-components/OurBenefit";
import WhyChoose from "./monthly-service-components/WhyChoose";
import useClient from "@/hooks/useClient";
import { useParams } from "react-router-dom";
import ServicePricing from "../homeComponents/ServicePricing";

export default function AllServices() {
const { slug } = useParams();
  const { data: response, isLoading } = useClient({
    queryKey: ["services-details", slug], // Add slug to key to refetch on route change
    url: `/services/${slug}`,
  });



  const serviceData = response?.data;
  // console.log(serviceData)
  return (
    <>
      <MonthlyServiceBanner serviceData={serviceData} isLoading={isLoading}/>
      <Inclusions serviceData={serviceData} />
      <TopPerformingKeywords serviceData={serviceData} />
      <OurBenefit serviceData={serviceData} />
      <WhyChoose serviceData={serviceData} />
      <VideoBannr serviceData={serviceData} />
      <ServicePricing serviceData={serviceData} />
      <FAQ serviceData={serviceData} />
      <StartFreeToday/>
    </>
  );
}
