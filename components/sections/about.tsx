"use client"
import React, { useEffect, useRef, useState } from "react";

const AboutSection = ({
  textheading="text-primary",
  textcontent="text-gray-600",
  backgroundColor="bg-white",

}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-scroll animation for images
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(prev => {
        const container = scrollContainerRef.current;
        if (container) {
          const maxScroll = container.scrollWidth - container.clientWidth;
          const newPosition = prev + 1;
          if (newPosition >= maxScroll) {
            return 0; // Reset to start
          }
          return newPosition;
        }
        return prev;
      });
    }, 30); // Smooth 30fps animation

    return () => clearInterval(interval);
  }, []);

  // Apply scroll position
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  const images = [
    "/assets/projects/bima/image1.webp",
    "/assets/projects/enclave/image12.webp",
    "/assets/projects/phmansion/image5.webp",
    "/assets/projects/ethanolfactory/image1.webp",
    "/assets/projects/hotr/image1.webp",
    "/assets/projects/phmansion/image1.webp",
 
  ];

  // Duplicate images for seamless infinite scroll
  const duplicatedImages = [...images, ...images];

  return (
    <div ref={sectionRef} className={`w-full min-h-screen px-8 py-24 overflow-hidden ${backgroundColor}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className={`text-5xl ${textheading} mb-12 transition-all duration-1000 ${
            isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}>
            About Us
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible 
                ? 'opacity-100 transform translate-x-0' 
                : 'opacity-0 transform -translate-x-8'
            }`}>
              <p className={`${textcontent} leading-relaxed`}>
              ESTHOJ Consulting delivers independent advisory, claims management, 
              and project consultancy services to clients navigating complex construction and infrastructure projects.
               With nearly two decades of experience, we bring technical rigour, commercial insight, and proven methodologies to every engagement.
              </p>
            </div>

            <div className={`space-y-8 transition-all duration-1000 delay-500 ${
              isVisible 
                ? 'opacity-100 transform translate-x-0' 
                : 'opacity-0 transform translate-x-8'
            }`}>
              <div className="group hover:transform hover:scale-105 transition-all duration-300">
                <h3 className={`text-sm font-semibold ${textheading} uppercase tracking-wider mb-3 group-hover:text-red-600 transition-colors duration-300`}>
                  OUR MISSION
                </h3>
                <p className={`${textcontent} leading-relaxed`}>
                To deliver clarity and confidence through expert project advisory, 
                dispute resolution, and risk management—helping clients achieve successful outcomes 
                on time and on budget.
                </p>
              </div>

              <div className="group hover:transform hover:scale-105 transition-all duration-300">
                <h3 className={`text-sm font-semibold ${textheading} uppercase tracking-wider mb-3 group-hover:text-red-600 transition-colors duration-300`}>
                  VISION
                </h3>
                <p className={`${textcontent} leading-relaxed group-hover:text-gray-800 transition-colors duration-300`}>
                To be the consultancy of choice for organizations seeking independent expertise, strategic insight,
                 and exceptional project outcomes across Nigeria and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Scrolling Images Section */}
        <div className={`transition-all duration-1000 delay-700 ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <div className="relative">
            {/* Gradient overlays for smooth infinite scroll effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white to-transparent z-10"></div>
            
            <div 
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-hidden scroll-smooth"
              style={{ scrollBehavior: 'auto' }}
            >
              {duplicatedImages.map((image, index) => (
                <div
                  key={index}
                  className="shrink-0 w-64 aspect-3/4 rounded-2xl overflow-hidden group cursor-pointer relative"
                >
                  <img
                    src={image}
                    alt={`About ${(index % images.length) + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default AboutSection;
