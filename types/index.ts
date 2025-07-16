export interface ServiceCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Step {
  id: string;
  number: number;
  icon: string;
  title: string;
  description: string;
}

export interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

export interface ButtonProps {
  children: any;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  size?: 'default' | 'large';
  className?: string;
  href?: string;
  disabled?: boolean;
}

export interface SectionProps {
  children: any;
  className?: string;
  id?: string;
}

export interface AnimatedSectionProps {
  children: any;
  className?: string;
  delay?: number;
}

export interface TestPackage {
  id: string;
  name: string;
  category: string;
  gender?: string;
  targetGroup?: string;
  price: number;
  originalPrice?: number;
  indicators: number;
  resultTime: string;
  icon: string;
  image?: string;
  featured: boolean;
  description?: string;
}