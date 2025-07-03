'use client';

import { Heart, Dna, Shield, Scale, User, UserCheck } from 'lucide-react';
import Button from '@/components/ui/Button';
import { ServiceCard } from '@/types';

const services: ServiceCard[] = [
  {
    id: '1',
    icon: 'Heart',
    title: 'Complete Health Check',
    description: 'Comprehensive health screening including blood work, vitals, and organ function tests.',
  },
  {
    id: '2',
    icon: 'Dna',
    title: 'Genetic Testing',
    description: 'Advanced genetic analysis to understand your predisposition to various health conditions.',
  },
  {
    id: '3',
    icon: 'Shield',
    title: 'Infectious Disease Panel',
    description: 'Rapid testing for common infectious diseases including COVID-19, flu, and other viruses.',
  },
  {
    id: '4',
    icon: 'Scale',
    title: 'Metabolic Profile',
    description: 'Complete metabolic analysis including diabetes, thyroid, and nutritional assessments.',
  },
  {
    id: '5',
    icon: 'User',
    title: "Women's Health",
    description: 'Specialized testing for women\'s health including hormonal balance and reproductive health.',
  },
  {
    id: '6',
    icon: 'UserCheck',
    title: "Men's Health",
    description: 'Comprehensive men\'s health screening including prostate health and testosterone levels.',
  },
];

const getIcon = (iconName: string) => {
  const iconProps = { className: "w-8 h-8" };
  
  switch (iconName) {
    case 'Heart':
      return <Heart {...iconProps} />;
    case 'Dna':
      return <Dna {...iconProps} />;
    case 'Shield':
      return <Shield {...iconProps} />;
    case 'Scale':
      return <Scale {...iconProps} />;
    case 'User':
      return <User {...iconProps} />;
    case 'UserCheck':
      return <UserCheck {...iconProps} />;
    default:
      return <Heart {...iconProps} />;
  }
};

const ServicesSection: React.FC = () => {
  const handleViewAll = () => {
    alert('This would redirect to a comprehensive packages page.');
  };

  return (
    <section id="services" className="py-20 bg-light-blue">
      <div className="container">
        <h2 className="section-title">Our Popular Testing Packages</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-primary-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                {getIcon(service.icon)}
              </div>
              <h3 className="text-xl font-bold mb-4 text-dark-grey">{service.title}</h3>
              <p className="text-medium-grey leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" onClick={handleViewAll}>
            View All Packages
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 