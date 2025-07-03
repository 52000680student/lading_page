'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const HeroSection: React.FC = () => {
  const handleBookTest = () => {
    alert('Booking functionality would be integrated here. This could redirect to a booking form or open a modal.');
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Medical Professional"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-gradient"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="text-center text-white max-w-4xl mx-auto px-8">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-shadow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Reliable Medical Testing at Your Convenience
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl mb-8 opacity-95 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Get accurate results from the comfort of your home with our professional medical testing services
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Button 
              onClick={handleBookTest}
              size="large"
              className="text-lg px-12 py-4 bg-white text-primary-500 hover:bg-light-blue hover:text-primary-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Book a Test Now
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection; 