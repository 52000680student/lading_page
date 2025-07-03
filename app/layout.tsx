import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MedTest Pro - Reliable Medical Testing at Your Convenience',
  description: 'Get accurate medical test results from the comfort of your home with our professional medical testing services. Certified labs, expert consultation, and convenient at-home sample collection.',
  keywords: 'medical testing, health screening, at-home testing, lab tests, medical consultation',
  authors: [{ name: 'MedTest Pro' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'MedTest Pro - Reliable Medical Testing at Your Convenience',
    description: 'Professional medical testing services with at-home sample collection and expert consultation.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MedTest Pro - Reliable Medical Testing at Your Convenience',
    description: 'Professional medical testing services with at-home sample collection and expert consultation.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="font-lato antialiased bg-white text-dark-grey overflow-x-hidden">
        {children}
      </body>
    </html>
  );
} 