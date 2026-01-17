"use client";
import { useEffect, useRef, useState } from "react";

import {ShieldAlert, ConstructionIcon, CalendarCheck, Ban, ChartCandlestickIcon, ChartArea} from 'lucide-react'
import Link from "next/link";

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: ShieldAlert,
      title: "Quantity Survey & Project Advisory Services",
      description:
        "strategic guidance across planning, procurement, contracts, risk, cost and performance.",
      color: "bg-primary",
      slug: "project-advisory",
    },
    {
      icon: ConstructionIcon,
      title: "Construction Claims Consultancy",
      description:
        "identification, preparation and assessment of claims related to time, cost and scope.",
      color: "bg-primary",
      slug: "construction-claims",
    },
    {
      icon: CalendarCheck,
      title: "Project Planning & Scheduling",
      description:
        "development and review of programmes, critical path analysis and progress monitoring.",
      color: "bg-primary",
      slug: "project-planning-scheduling",
    },
    {
      icon: Ban,
      title: "Project Risk Management",
      description:
        "risk identification, assessment and mitigation strategies throughout the project lifecycle.",
      color: "bg-primary",
      slug: "project-risk-management",
    },
    {
      icon:ChartCandlestickIcon,
      title: "Value Engineering",
      description:
        "systematic evaluation of design and construction options to maximise value and efficiency.",
      color: "bg-primary",
      slug: "value-engineering",
    },
    {
      icon:ChartArea,
      title: "Expert Witness & Litigation Support",
      description:
        "independent technical opinions, forensic analysis and expert testimony support.",
      color: "bg-primary",
      slug: "expert-witness",
    },
    {
      icon: ChartArea,
      title: "Construction Management",
      description: 'End-to-end planning, coordination, and control of construction projects.',
      color: 'bg-primary',
      slug: 'construction-management'
    },
    {
      icon: ChartArea,
      title: "Infrastructure Design",
      description: 'Strategic, sustainable, and technically robust infrastructure design solutions',
      color: 'bg-primary',
      slug: 'infrastructure-design'
    },
    {
      icon: ChartArea,
      title: "Specialist Services",
      description: 'Insolvency support, loss adjusting, commercial audits, and contract consultancy for construction and engineering industries.',
      color: 'bg-primary',
      slug: 'specialist-services'
    }
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate items with stagger effect (reduced delay on mobile)
          services.forEach((_, index) => {
            const isMobile = window.innerWidth < 768;
            const delay = isMobile ? index * 100 : index * 150;
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index]);
            }, delay);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [services.length]);

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-screen bg-primary-50 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl text-primary-900 mb-3 sm:mb-4 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
          >
            Our Services
          </h2>
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
          >
            <p className="text-gray-600 text-base sm:text-lg px-4 sm:px-0">
              We offer end-to-end services across construction, engineering and
              facilities management.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const isItemVisible = visibleItems.includes(index);


            return (
              <Link href={`/services/${service.slug}`} className="block" key={index}>

              <div
                key={index}
                className={`bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 group cursor-pointer ${
                  isItemVisible
                    ? "opacity-100 transform translate-x-0"
                    : "opacity-0 transform translate-x-8"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div
                  className={`${service.color} w-16 h-16 sm:w-20 sm:h-20 lg:w-[104px] lg:h-[104px] inline-flex justify-center items-center p-3 sm:p-4 rounded-xl shrink-0 group-hover:scale-105 sm:group-hover:scale-110 group-hover:rotate-1 sm:group-hover:rotate-3 transition-transform duration-300 mx-auto sm:mx-0`}
                >
                                    <service.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300 text-white" />
                </div>
                <div className="overflow-hidden text-center sm:text-left flex-1">
                  <h3 className="text-lg sm:text-xl lg:text-xl font-semibold text-primary-900 mb-1 sm:mb-1 group-hover:text-red-600 transition-colors duration-300 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-secondary-gray leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              </div>
              </Link>

            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
