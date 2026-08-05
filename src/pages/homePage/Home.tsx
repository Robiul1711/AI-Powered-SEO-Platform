import { useState, useEffect } from "react";
import Banner from "@/components/homeComponents/Banner";
import FAQHomePage from "@/components/homeComponents/FAQHomePage";
import PowerfulFeatures from "@/components/homeComponents/PowerfulFeatures";
import SimpleProcess from "@/components/homeComponents/SimpleProcess";
import StartFreeToday from "@/components/homeComponents/StartFreeToday";
import LightRays from "@/components/LightRays";
import PricingSectionHome from "@/components/homeComponents/PricingSectionHome";
import SeoOverviewSection from "@/components/homeComponents/SeoOverviewSection";
import WhySeoMatters from "@/components/homeComponents/WhySeoMatters";
import useClient from "@/hooks/useClient";

const Home = () => {
  const [showRays, setShowRays] = useState(false);
  const { data: pricingPlans, isLoading } = useClient({
    queryKey: ["pricing-plans"],
    url: "/pricing-plans",
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowRays(true), 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showRays && (
        <div className="fixed inset-0 hidden md:block">
          <LightRays raysColor="#B57CFF" />
        </div>
      )}
      <Banner />
      <SimpleProcess />
      <SeoOverviewSection />
      <PowerfulFeatures />
      <WhySeoMatters />
      <PricingSectionHome
        pricingPlansData={(pricingPlans as any)?.data}
        isLoading={isLoading}
      />
      <FAQHomePage />
      <StartFreeToday />
    </div>
  );
};

export default Home;
