import { ReactNode } from "react";

export interface HeroButton {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary';
  }
  
  export interface ParallaxImage {
    src: string;
    alt: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    speed?: number;
    width?: string;
  }

  export interface HeroSectionProps {
    variant?: 'parallax' | 'single-image' | 'video' | 'slider'; // Added 'slider'
    brandLabel?: string;
    brandIcon?: string;
    heading: string;
    description: string;
    buttons?: HeroButtonProps[];
    backgroundColor?: string;
    backgroundImage?: string; 
    backgroundImages?: string[]; 
    backgroundVideo?: string;
    parallaxImages?: ParallaxImage[];
    textAlign?: 'center' | 'left';
    overlay?: boolean;
    overlayOpacity?: number;
    minHeight?: string;
    className?: string;
    customContent?: ReactNode;
    sliderInterval?: number; 
    showSliderControls?: boolean; 
    showSliderDots?: boolean;
  }

  export interface HeroButtonProps {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary';
  }
    

  export interface Division {
    id: string;
    title: string;
    tagline: string;
    description: string;
    image: string;
    link: string;
  }
  
  export interface DivisionsSectionProps {
    divisions: Division[];
    title?: string;
    subtitle?: string;
    className?: string;
  }
  
  export interface DivisionsSectionAnimatedProps extends DivisionsSectionProps {
    autoPlay?: boolean;
    autoPlayInterval?: number;
  }
  
  export interface DivisionCardProps {
    division: Division;
    className?: string;
  }

  export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
    bio?: string;
    email?: string;
    linkedin?: string;
  }
  
  export interface TeamSectionAnimatedProps {
    members: TeamMember[];
    title?: string;
    subtitle?: string;
    cardsPerView?: number;
    autoPlay?: boolean;
    autoPlayInterval?: number;
    className?: string;
  }

  export interface FAQItem {
    id: string;
    question: string;
    answer: string;
  }
  
  export interface FAQSectionAnimatedProps {
    faqs: FAQItem[];
    title?: string;
    subtitle?: string;
    contactText?: string;
    contactLink?: string;
    contactLinkText?: string;
    phone?: string;
    supportText?: string;
    allowMultipleOpen?: boolean;
    animationDuration?: number;
    className?: string;
  }