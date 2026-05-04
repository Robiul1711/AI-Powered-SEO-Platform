import Banner from "@/components/homeComponents/Banner";
import FAQ from "@/components/service-component/seoCampaignComponents/SeoCampignFAQ";
import FAQHomePage from "@/components/homeComponents/FAQHomePage";
import PowerfulFeatures from "@/components/homeComponents/PowerfulFeatures";
import PricingSection from "@/components/common/PricingSection";
import SimpleProcess from "@/components/homeComponents/SimpleProcess";
import StartFreeToday from "@/components/homeComponents/StartFreeToday";
import LightRays from "@/components/LightRays";
import PricingSectionHome from "@/components/homeComponents/PricingSectionHome";

const Home = () => {
  return (
    <div>
      <div className="fixed inset-0">
        <LightRays raysColor="#B57CFF" />
      </div>
      <Banner />
      <SimpleProcess />
      <PowerfulFeatures />
      <PricingSectionHome />
      <FAQHomePage />
      <StartFreeToday />
    </div>
  );
};

export default Home;
