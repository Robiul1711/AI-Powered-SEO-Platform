import Marquee from "react-fast-marquee";
import Title from '../common/Title';

// Import your images
import b1 from '@/assets/images/b1.png';
import b2 from '@/assets/images/b2.png';
import b3 from '@/assets/images/b3.png';
import b4 from '@/assets/images/b4.png';
import b5 from '@/assets/images/b5.png';

const logos = [b1, b2, b3, b4, b5];

const TrustedBy = () => {
  return (
    <div className='section-padding-y max-w-7xl mx-auto'>
      <Title level='title24' className='text-center mb-20'>
        Trusted by the world’s most innovative teams
      </Title>

      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        {logos.map((logo, index) => (
          <div key={index} className="mx-8 lg:mx-12">
            <img 
              src={logo} // Use .src if using Next.js Image imports
              alt={`Partner logo ${index + 1}`} 
              className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default TrustedBy;