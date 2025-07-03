'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { NavItem } from '@/types';

const navItems: NavItem[] = [
  { href: '#services', label: 'Services' },
  { href: '#how-it-works', label: 'How it Works' },
  { href: '#about', label: 'About Us' },
  { href: '#contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleBookTest = () => {
    alert('Booking functionality would be integrated here. This could redirect to a booking form or open a modal.');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/98 shadow-lg backdrop-blur-custom' 
          : 'bg-white/95 shadow-md backdrop-blur-custom'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="https://via.placeholder.com/120x40/00A0A0/FFFFFF?text=MedTest+Pro" 
              alt="MedTest Pro" 
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a 
                    href={item.href}
                    className="text-dark-grey hover:text-primary-500 font-medium transition-colors duration-300"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button onClick={handleBookTest}>
              Book a Test
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-dark-grey" />
            ) : (
              <Menu className="h-6 w-6 text-dark-grey" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 border-t border-gray-200">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a 
                    href={item.href}
                    className="block text-dark-grey hover:text-primary-500 font-medium transition-colors duration-300"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button onClick={handleBookTest} className="w-full">
                Book a Test
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 