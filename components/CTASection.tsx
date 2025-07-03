'use client';

import Button from '@/components/ui/Button';

const CTASection: React.FC = () => {
  const handleBookTest = () => {
    alert('Booking functionality would be integrated here. This could redirect to a booking form or open a modal.');
  };

  return (
    <section className="py-20 bg-cta-gradient text-white text-center">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Take Control of Your Health Today
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
            Join thousands of satisfied customers who trust us with their health monitoring needs
          </p>
          <Button 
            onClick={handleBookTest}
            size="large"
            className="bg-white text-primary-500 hover:bg-light-blue hover:text-primary-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Book a Test
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 