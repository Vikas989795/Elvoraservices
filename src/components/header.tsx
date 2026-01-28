'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { serviceCategories } from '@/lib/services';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/careers', label: 'Careers' },
  { href: '/enquiry', label: 'Contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block font-headline">
              Elvora Services
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className={navigationMenuTriggerStyle()}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {serviceCategories.map((component) => (
                    <li key={component.name}>
                        <NavigationMenuLink asChild>
                           <Link
                            href={`/services/${component.slug}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none font-headline">{component.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {component.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
             <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/careers" className={navigationMenuTriggerStyle()}>
                    Careers
                  </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
             <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/enquiry" className={navigationMenuTriggerStyle()}>
                    Contact
                  </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild className="hidden md:inline-flex bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/enquiry">Enquire Now</Link>
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container flex flex-col items-center space-y-4 py-4">
            <Link href="/" className="text-lg" onClick={() => setIsMenuOpen(false)}>Home</Link>
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="text-lg" onClick={() => setIsMenuOpen(false)}>
                {label}
              </Link>
            ))}
             <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setIsMenuOpen(false)}>
              <Link href="/enquiry">Enquire Now</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
