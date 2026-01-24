import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface FooterLink {
  name: string;
  href: string;
  badge?: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logoText?: string;
  tagline?: string;
  description?: string;
  columns?: FooterColumn[];
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  copyrightText?: string;
  showButtons?: boolean;
}

export default function CustomizableFooter({
  logoText = 'Esthoj',
  tagline = "Let's Build the Future Together",
  description = 'Whether you need a trusted construction partner, expert advisory, or world-class training, Esthoj Group is your gateway to reliable and transformative solutions.',
  columns = [
    {
      title: 'Platform',
      links: [
        { name: 'Solutions', href: '/services' },
        { name: 'Pricing', href: 'https://wa.me/08140989555' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Our Mission', href: '/about' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '/#' },
        { name: 'Support', href: '/contact' },
      ],
    },
  ],
  primaryButtonText = 'Explore Divisions',
  primaryButtonHref = '/services',
  secondaryButtonText = 'Get in touch',
  secondaryButtonHref = '/contact',
  copyrightText = `© ${new Date().getFullYear()} Esthoj Group. All rights reserved.`,
  showButtons = true,
}: FooterProps) {
  return (
    <footer className="bg-[#0A1236] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
          {/* Left Section - Logo, Tagline, CTA */}
          <div className="space-y-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/assets/logo.svg" 
              alt="Esthoj Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
            </Link>

            {/* Tagline */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">{tagline}</h3>
              <p className="text-gray-400 max-w-md leading-relaxed">
                {description}
              </p>
            </div>

            {/* CTA Buttons */}
            {showButtons && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 font-semibold"
                >
                  <Link href={primaryButtonHref}>{primaryButtonText}</Link>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 bg-transparent text-white hover:bg-white/10 rounded-full px-8 font-semibold"
                >
                  <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Right Section - Link Columns */}
          <div className={`grid gap-8 lg:gap-12 ${
            columns.length === 3 ? 'grid-cols-2 sm:grid-cols-3' : 
            columns.length === 2 ? 'grid-cols-2' : 
            'grid-cols-1'
          }`}>
            {columns.map((column) => (
              <div key={column.title} className="space-y-4">
                <h4 className="text-lg font-semibold">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-2"
                      >
                        {link.name}
                        {link.badge && (
                          <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-gray-400 text-sm">{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}