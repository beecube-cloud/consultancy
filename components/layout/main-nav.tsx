'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState, useEffect } from 'react';

export default function NavbarScrollWithLogo() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
  ];

  useEffect(() => {
    const handleScroll = () => {  
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${ 'bg-[#0A1236]/95 backdrop-blur-md shadow-lg border-b border-primary/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Image */}
          <Link href="/" className="flex items-center space-x-2 z-10">
            <Image
              src="/assets/logo.svg"
              alt="Esthoj Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
            <div className="flex flex-col">
              <span className="text-white text-xl font-bold leading-tight">
                Esthoj
              </span>
              <span className="text-white/60 text-[8px] font-semibold uppercase tracking-widest -mt-0.5">
                Consultancy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              variant="outline"
              className={`border-2 bg-transparent text-white hover:text-white rounded-full px-6 transition-all duration-300 ${
                scrolled
                  ? 'border-white/30 hover:bg-white/20'
                  : 'border-white/20 hover:bg-white/10'
              }`}
            >
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen} >
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="bg-[#0A1236] border-l border-primary/20 text-white w-[300px] sm:w-[400px]"
            >
              <SheetHeader>
                <SheetTitle className="text-white text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8 mx-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-lg font-medium py-2"
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white rounded-full mt-4"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/contact">Get in touch</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}