# MedTest Pro - Medical Landing Page (React + Next.js + Tailwind CSS)

A professional, modern, and responsive landing page for medical testing services built with **React**, **Next.js**, and **Tailwind CSS**. Inspired by the design aesthetics of labhouse.vn, this landing page follows clean design principles with a focus on trust, professionalism, and user experience.

## 🚀 Technology Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library with functional components and hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **Responsive Design** - Mobile-first approach

## 🎨 Design Features

### Visual Design

- **Color Palette**: Predominantly white background with teal (#00A0A0) and turquoise accents
- **Typography**: Clean Lato font family for excellent readability
- **Professional Aesthetic**: Medical-focused design that conveys trust and reliability
- **Modern Layout**: Clean lines, ample whitespace, and intuitive navigation

### User Experience

- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion powered scroll-triggered animations and hover effects
- **Intuitive Navigation**: Fixed header with smooth scroll to sections
- **Clear Call-to-Actions**: Prominent "Book a Test" buttons throughout

## 📱 Responsive Features

- **Mobile-First Approach**: Optimized for mobile devices with animated hamburger menu
- **Tablet Optimization**: Proper grid layouts that adapt to medium screens
- **Desktop Enhancement**: Full-featured experience with hover states and animations

## 🎯 Sections Included

### 1. Header

- Fixed navigation with scroll effects
- Logo placement and professional styling
- Mobile hamburger menu with smooth animations
- Prominent "Book a Test" call-to-action

### 2. Hero Section

- Full-screen hero with medical professional imagery
- Compelling headline and sub-headline with Framer Motion animations
- Primary call-to-action button
- Animated scroll indicator

### 3. Services Section

- Grid layout of 6 testing packages
- Service cards with Lucide React icons and descriptions
- Hover effects for enhanced interactivity
- "View All Packages" secondary CTA

### 4. How It Works

- 4-step process visualization with numbered badges
- Step cards with icons and clear explanations
- Professional iconography from Lucide React
- Staggered animations on scroll

### 5. Why Choose Us

- 6 key benefits with icons in horizontal card layout
- Trust-building content with professional credentials
- Hover effects and smooth transitions
- Mobile-responsive card stacking

### 6. Call-to-Action Section

- Full-width CTA with gradient background
- Compelling headline and description
- Final "Book a Test" opportunity with enhanced styling

### 7. Footer

- Comprehensive company information
- Quick links navigation with hover effects
- Contact details with Lucide React icons
- Social media integration with working share functionality
- Legal links (Privacy Policy, Terms of Service)

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ installed on your system
- npm or yarn package manager

### Installation

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Run Development Server**

   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Open [http://localhost:3000](http://localhost:3000) to view the landing page

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

### Additional Scripts

- `npm run lint` - Run ESLint for code quality
- `npm run type-check` - Check TypeScript types

## 📋 Project Structure

```
landing_page/
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main home page
├── components/
│   ├── ui/
│   │   └── Button.tsx       # Reusable button component
│   ├── Header.tsx           # Navigation header
│   ├── HeroSection.tsx      # Hero section with animation
│   ├── ServicesSection.tsx  # Services grid
│   ├── HowItWorksSection.tsx # Process steps
│   ├── WhyChooseUsSection.tsx # Benefits section
│   ├── CTASection.tsx       # Call-to-action
│   └── Footer.tsx           # Footer with links
├── types/
│   └── index.ts             # TypeScript type definitions
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.js           # Next.js configuration
└── postcss.config.js        # PostCSS configuration
```

## 🌐 Browser Support

- **Chrome**: 60+
- **Firefox**: 60+
- **Safari**: 12+
- **Edge**: 79+
- **Mobile Browsers**: iOS Safari, Chrome Mobile

## 🎨 Color Palette

```css
Primary Teal: #00A0A0
Light Blue/White: #F0F8FF
Dark Grey Text: #333333
Medium Grey: #666666
White: #FFFFFF
Dark Footer: #2c3e50
```

## 📝 Customization

### Content Updates

- Edit component files in the `components/` directory
- Update text content directly in each component
- Replace placeholder images with actual medical photos
- Modify service packages to match your offerings

### Styling Changes

- Primary colors can be changed in `tailwind.config.js`
- Font family can be updated in `app/globals.css`
- Layout adjustments available through Tailwind classes
- Animation timing and effects customizable in component files

### Functionality Extensions

- Add actual booking form integration
- Implement real contact form functionality
- Connect social media links to real profiles
- Add analytics tracking (Google Analytics, etc.)
- Integrate with backend services

## 🚀 Technical Features

### Performance

- Next.js 14 with App Router for optimal performance
- Server-side rendering (SSR) capabilities
- Static site generation (SSG) ready
- Optimized images with Next.js Image component
- Efficient Tailwind CSS with purging

### Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Focus management for mobile menu
- Screen reader friendly content
- Reduced motion support for accessibility

### Interactivity

- Smooth scrolling navigation
- Mobile menu with animations
- Framer Motion scroll-triggered animations
- Button hover effects and transitions
- Social media sharing functionality
- TypeScript for type safety

## 📊 Features Implemented

- ✅ Next.js 14 with App Router
- ✅ React 18 with functional components and hooks
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Framer Motion animations
- ✅ Lucide React icons
- ✅ Fixed header with scroll effects
- ✅ Mobile responsive navigation
- ✅ Hero section with background image and animations
- ✅ Service cards grid layout
- ✅ Step-by-step process visualization
- ✅ Benefits section with icons
- ✅ Call-to-action sections
- ✅ Comprehensive footer
- ✅ Smooth scroll animations
- ✅ Hover effects and transitions
- ✅ Mobile hamburger menu
- ✅ Social media integration
- ✅ SEO-friendly HTML structure
- ✅ Accessibility features

## 🔗 Integration Ready

The landing page is designed to be easily integrated with:

- **Booking Systems**: CRM or appointment scheduling tools
- **Analytics**: Google Analytics, Facebook Pixel, etc.
- **Email Marketing**: Newsletter signups and lead capture
- **Payment Processing**: For online test purchases
- **Backend APIs**: For dynamic content and data

## 📞 Next Steps

1. **Content Review**: Replace placeholder content with actual medical service information
2. **Image Updates**: Use high-quality, professional medical images
3. **Integration**: Connect booking functionality to your preferred system
4. **Testing**: Ensure all features work with your target audience
5. **Deployment**: Deploy to Vercel, Netlify, or your preferred hosting platform

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload the .next folder to Netlify
```

### Traditional Hosting

```bash
npm run build
npm start
```

## 🔒 HIPAA Compliance Note

When implementing this for actual medical services, ensure:

- Secure data transmission (HTTPS)
- Patient information protection
- Compliance with medical advertising regulations
- Privacy policy updates for medical data handling

---

**Built with modern React, Next.js, and TypeScript best practices for medical service providers.**
