import CommonBanner from '@/components/common/CommonBanner'
import aboutBg from '@/assets/images/aboutBg.png'
import TrustedBy from '@/components/aboutComponents/TrustedBy'
import AboutMe from '@/components/aboutComponents/AboutMe'
import OurValues from '@/components/aboutComponents/OurValues'
import Bioghraphy from '@/components/aboutComponents/Bioghraphy'
import Testimonials from '@/components/aboutComponents/Testimonials'
import StartFreeToday from '@/components/homeComponents/StartFreeToday'
import OurExpertise from '@/components/aboutComponents/OurExpertise'

const AboutPage = () => {
  return (
    <div>
        <CommonBanner
  title="About Us"
  image={aboutBg}
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" }
  ]}
/>
<div className='section-padding-x'>
  <TrustedBy/>
  <AboutMe/>
  <OurValues/>  
  <Bioghraphy/>
  <OurExpertise/>
  <Testimonials/>
    <StartFreeToday/>   
</div>
    </div>
  ) 
}

export default AboutPage