'use client';

import { Award, HomeIcon, Shield, Stethoscope, Clock, Phone } from 'lucide-react';
import { Benefit } from '@/types';

const benefits: Benefit[] = [
  {
    id: '1',
    icon: 'Award',
    title: 'Certified and Accredited Labs',
    description: 'All our partner laboratories are internationally certified and accredited for the highest quality standards.',
  },
  {
    id: '2',
    icon: 'HomeIcon',
    title: 'Free At-Home Sample Collection',
    description: 'Enjoy the convenience of professional sample collection at your doorstep at no extra cost.',
  },
  {
    id: '3',
    icon: 'Shield',
    title: 'Secure and Confidential Results',
    description: 'Your health data is protected with bank-level security and complete privacy assurance.',
  },
  {
    id: '4',
    icon: 'Stethoscope',
    title: 'Expert Medical Consultation',
    description: 'Access to qualified medical professionals for result interpretation and health guidance.',
  },
  {
    id: '5',
    icon: 'Clock',
    title: 'Fast Turnaround Time',
    description: 'Get your results quickly with our 24-48 hour processing time for most tests.',
  },
  {
    id: '6',
    icon: 'Phone',
    title: '24/7 Customer Support',
    description: 'Our dedicated support team is available round the clock to assist you with any queries.',
  },
];

const getIcon = (iconName: string) => {
  const iconProps = { className: "w-6 h-6" };
  
  switch (iconName) {
    case 'Award':
      return <Award {...iconProps} />;
    case 'HomeIcon':
      return <HomeIcon {...iconProps} />;
    case 'Shield':
      return <Shield {...iconProps} />;
    case 'Stethoscope':
      return <Stethoscope {...iconProps} />;
    case 'Clock':
      return <Clock {...iconProps} />;
    case 'Phone':
      return <Phone {...iconProps} />;
    default:
      return <Award {...iconProps} />;
  }
};

const WhyChooseUsSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-light-blue">
      <div className="container">
        <h2 className="section-title">Why Choose Our Service?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.id}
              className="bg-white p-8 rounded-2xl flex items-start gap-6 shadow-card hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                {getIcon(benefit.icon)}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-dark-grey">{benefit.title}</h3>
                <p className="text-medium-grey leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection; 