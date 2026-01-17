'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useScrollParallax } from '@/hooks/useScrollParallx';
import { HeroSectionProps, ParallaxImage, HeroButtonProps } from '@/lib/types';
import { divisionButtons } from '@/lib/const';
import heroImage from '@/assets/hero/dot.svg';


export function HeroSection({
  variant = 'single-image',
  brandLabel,
  brandIcon,
  heading,
  description,
  buttons,
  backgroundColor = '#0A1236',
  backgroundImage,
  backgroundImages, 
  backgroundVideo,
  parallaxImages,
  textAlign = 'center',
  overlay = true,
  overlayOpacity = 50,
  minHeight = 'min-h-screen',
  className = '',
  customContent,
  sliderInterval = 5000,
  showSliderControls = true,
  showSliderDots = true, 
}: HeroSectionProps) {
  const scrollY = useScrollParallax();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const textAlignClass = textAlign === 'center' ? 'text-center' : 'text-left';
  const justifyClass = textAlign === 'center' ? 'justify-center' : 'justify-start';


  useEffect(() => {
    if (variant === 'slider' && backgroundImages && backgroundImages.length > 1) {
      const timer = setInterval(() => {
        nextSlide();
      }, sliderInterval);

      return () => clearInterval(timer);
    }
  }, [currentSlide, variant, backgroundImages, sliderInterval]);

  const nextSlide = () => {
    if (!backgroundImages || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const previousSlide = () => {
    if (!backgroundImages || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section
      className={`relative ${minHeight} overflow-hidden flex items-center ${className}`}
      style={{ backgroundColor }}
    >
      {/* Slider Variant */}
      {variant === 'slider' && backgroundImages && (
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Slider Controls */}
          {showSliderControls && backgroundImages.length > 1 && (
            <>
              <button
                onClick={previousSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-200"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-200"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Slider Dots */}
          {showSliderDots && backgroundImages.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
              {backgroundImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? 'bg-white w-8 h-3'
                      : 'bg-white/50 hover:bg-white/70 w-3 h-3'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Parallax Variant */}
      {variant === 'parallax' && parallaxImages && (
        <div className="absolute inset-0 pointer-events-none">
          {parallaxImages.map((img, index) => (
            <ParallaxImageElement
              key={index}
              image={img}
              scrollY={scrollY}
            />
          ))}
        </div>
      )}

      {/* Single Image Variant */}
      {variant === 'single-image' && backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Video Variant */}
      {variant === 'video' && backgroundVideo && (
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60 pointer-events-none"
          style={{ opacity: overlayOpacity / 100 }}
        />
      )}

      {/* Content */}
      <div className={`relative bg-black/50 p-4 rounded-lg z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${textAlignClass}`}>
        <div className={`flex flex-col items-${textAlign === 'center' ? 'center' : 'start'} max-w-5xl ${textAlign === 'center' ? 'mx-auto' : ''}`}>

          {brandLabel && (
            <div className={`flex items-center gap-2 mb-8 ${textAlign === 'center' ? 'justify-center' : ''}`}>
              {brandIcon && (
                <Image src={brandIcon} alt="Brand icon" width={14} height={14} />
              )}
              <span className="text-white text-sm font-medium tracking-wide">
                {brandLabel}
              </span>
            </div>
          )}

          <h1 className="text-xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {heading}
          </h1>

          <p className={`text-sm md:text-xl text-white mb-10 leading-relaxed ${textAlign === 'center' ? 'max-w-3xl mx-auto' : 'max-w-2xl'}`}>
            {description}
          </p>

          {buttons && buttons.length > 0 && (
            <div className={`flex flex-col sm:flex-row items-center gap-4 ${justifyClass}`}>
              {buttons.map((button, index) => (
                <HeroButton key={index} {...button} />
              ))}
            </div>
          )}

          {customContent && (
            <div className="mt-8">
              {customContent}
            </div>
          )}
        </div>
      </div>

      {variant === 'parallax' && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-current pointer-events-none"
          style={{ color: backgroundColor }}
        />
      )}
    </section>
  );
}

function ParallaxImageElement({
  image,
  scrollY,
}: {
  image: ParallaxImage;
  scrollY: number;
}) {
  const positions = {
    'top-left': 'top-32 left-[-30]',
    'top-right': 'top-24 right-[-30]',
    'bottom-left': 'bottom-0 left-40',
    'bottom-right': 'bottom-[-30] right-36',
  };

  const defaultSizes = {
    'top-left': 'w-72 h-80',
    'top-right': 'w-80 h-64',
    'bottom-left': 'w-1/3 h-72',
    'bottom-right': 'w-80 h-96',
  };

  const speed = image.speed || 0.2;
  const isBottom = image.position.includes('bottom');
  const transform = isBottom
    ? `translateY(${scrollY * -speed}px)`
    : `translateY(${scrollY * speed}px)`;

  return (
    <div
      className={`absolute ${positions[image.position]} ${image.width || defaultSizes[image.position]}`}
      style={{ transform }}
    >
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

function HeroButton({ text, href, variant = 'primary' }: HeroButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Button
      asChild
      size="lg"
      className={
        isPrimary
          ? 'bg-[#E53935] hover:bg-[#C62828] text-white rounded-full px-8 py-6 text-base font-semibold min-w-[200px]'
          : 'border-2 border-white/30 bg-transparent text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-semibold min-w-[200px]'
      }
    >
      <Link href={href}>{text}</Link>
    </Button>
  );
}

// Example usage with slider
export function HeroSliderExample() {
  return (
    <HeroSection
      variant="slider"
      brandLabel="Esthoj Consulting"
      brandIcon="/assets/logo.svg"
      heading="Transforming Projects. Delivering Solutions."
      description="Esthoj Consulting provides expert advisory services that help clients navigate complex construction and infrastructure challenges. From project planning and risk management to claims consultancy and expert witness support, we deliver strategic insights that drive successful project outcomes."
      buttons={divisionButtons}
      backgroundColor="#1A1F4E"
      backgroundImages={[
        '/assets/home/hero-image1.webp',
        '/assets/home/hero-image2.webp',
        '/assets/home/hero-image3.webp',
        '/assets/home/hero-image4.webp',
      ]}
      textAlign="center"
      overlay={true}
      overlayOpacity={60}
      sliderInterval={5000}
      showSliderControls={true}
      showSliderDots={true}
    />
  );
}

