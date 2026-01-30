import Banner from "@/components/homeComponents/Banner";
import FAQ from "@/components/homeComponents/FAQ";
import PowerfulFeatures from "@/components/homeComponents/PowerfulFeatures";
import PricingSection from "@/components/homeComponents/PricingSection";
import SimpleProcess from "@/components/homeComponents/SimpleProcess";
import StartFreeToday from "@/components/homeComponents/StartFreeToday";
import LightRays from "@/components/LightRays";

const Home = () => {
  return (
    <div>
      <div className="fixed inset-0">
        <LightRays raysColor="#B57CFF" />
      </div>
      <Banner />
      <SimpleProcess />
      <PowerfulFeatures />
      <PricingSection />
      <FAQ />
      <StartFreeToday />
    </div>
  );
};

export default Home;
