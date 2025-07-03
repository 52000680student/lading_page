'use client';

import { UserPlus, Home, FlaskConical, Stethoscope } from 'lucide-react';
import { Step } from '@/types';

const steps: Step[] = [
  {
    id: '1',
    number: 1,
    icon: 'UserPlus',
    title: 'Register',
    description: 'Sign up online and choose your test package that best fits your health needs.',
  },
  {
    id: '2',
    number: 2,
    icon: 'Home',
    title: 'Sample Collection',
    description: 'We\'ll send a certified professional to collect your sample at your home or office.',
  },
  {
    id: '3',
    number: 3,
    icon: 'FlaskConical',
    title: 'Get Results',
    description: 'Receive your detailed test results securely within 24-48 hours via our portal.',
  },
  {
    id: '4',
    number: 4,
    icon: 'Stethoscope',
    title: 'Consultation',
    description: 'Our qualified doctors will help you understand your results and next steps.',
  },
];

const getIcon = (iconName: string) => {
  const iconProps = { className: "w-10 h-10" };
  
  switch (iconName) {
    case 'UserPlus':
      return <UserPlus {...iconProps} />;
    case 'Home':
      return <Home {...iconProps} />;
    case 'FlaskConical':
      return <FlaskConical {...iconProps} />;
    case 'Stethoscope':
      return <Stethoscope {...iconProps} />;
    default:
      return <UserPlus {...iconProps} />;
  }
};

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container">
        <h2 className="section-title">Four Simple Steps to Better Health</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className="text-center relative"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto bg-light-blue border-4 border-primary-500 rounded-full flex items-center justify-center text-primary-500 relative z-10">
                  {getIcon(step.icon)}
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg z-20">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-dark-grey">{step.title}</h3>
              <p className="text-medium-grey leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 