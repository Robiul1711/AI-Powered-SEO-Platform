import Banner from "@/components/homeComponents/Banner"
import FAQ from "@/components/homeComponents/FAQ"
import PowerfulFeatures from "@/components/homeComponents/PowerfulFeatures"
import PricingSection from "@/components/homeComponents/PricingSection"
import SimpleProcess from "@/components/homeComponents/SimpleProcess"
import StartFreeToday from "@/components/homeComponents/StartFreeToday"

const Home = () => {
  return (
    <div>
        <Banner />
        <SimpleProcess />
        <PowerfulFeatures  />
        <PricingSection />
        <FAQ/>
        <StartFreeToday/>
    </div>
  )
}

export default Home