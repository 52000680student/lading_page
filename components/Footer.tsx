'use client';

import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (platform: string) => {
    const url = window.location.href;
    const title = document.title;

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <footer id="contact" className="bg-dark-footer text-white py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">About Us</h3>
            <p className="text-gray-300 leading-relaxed">
              MedTest Pro is a leading provider of convenient, reliable medical testing services.
              We're committed to making healthcare accessible and convenient for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-300 hover:text-primary-400 transition-colors">Gói xét nghiệm</a></li>
              {/* <li><a href="#how-it-works" className="text-gray-300 hover:text-primary-400 transition-colors">How It Works</a></li> */}
              <li><a href="#about" className="text-gray-300 hover:text-primary-400 transition-colors">Về Med Nova</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-primary-400 transition-colors">Liên hệ</a></li>
              {/* <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">FAQs</a></li> */}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Liên hệ MedNova</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <p className="text-gray-300">STH 39.11 Đường Thích Quảng Đức, Hà Quang 1, phường Phước Hải ,Nha Trang , Khánh Hòa</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <p className="text-gray-300">0843 179 579</p>
              </div>
              {/* <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <p className="text-gray-300">info@medtestpro.com</p>
              </div> */}
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Theo dõi MedNova</h3>
            <div className="flex gap-4">
              <button
                onClick={() => handleSocialClick('facebook')}
                className="w-11 h-11 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-primary-500 hover:-translate-y-1 transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSocialClick('twitter')}
                className="w-11 h-11 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-primary-500 hover:-translate-y-1 transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSocialClick('instagram')}
                className="w-11 h-11 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-primary-500 hover:-translate-y-1 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSocialClick('linkedin')}
                className="w-11 h-11 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-primary-500 hover:-translate-y-1 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-300">
            &copy; {currentYear} bản quyền thuộc về MedNova
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Chính sách bảo mật</a>
            <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 