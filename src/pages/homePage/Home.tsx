import Banner from "@/components/homeComponents/Banner";
import FAQHomePage from "@/components/homeComponents/FAQHomePage";
import PowerfulFeatures from "@/components/homeComponents/PowerfulFeatures";
import SimpleProcess from "@/components/homeComponents/SimpleProcess";
import StartFreeToday from "@/components/homeComponents/StartFreeToday";
import LightRays from "@/components/LightRays";
import PricingSectionHome from "@/components/homeComponents/PricingSectionHome";
import useClient from "@/hooks/useClient";

const Home = () => {
  const { data: pricingPlans, isLoading } = useClient({
    queryKey: ["pricing-plans"],
    url: "/pricing-plans",
  });

  return (
    <div>
      <div className="fixed inset-0">
        <LightRays raysColor="#B57CFF" />
      </div>
      <Banner />
      <SimpleProcess />
      <PowerfulFeatures />
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
