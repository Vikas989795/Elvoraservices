import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { serviceCategories } from '@/lib/services';
import { ArrowRight, BadgeCheck, Users, Globe } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-office');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">
            Elvora Services Enterprises
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Your trusted facilitator for a seamless experience with government, banking, and business services.
          </p>
          <Button asChild className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="#services">
              Explore Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Our Services</h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-muted-foreground">
            We provide comprehensive assistance across various sectors to meet your needs efficiently and reliably.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link href={`/services/${category.slug}`} key={category.slug}>
                  <Card className="h-full transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        <div className="p-4 bg-primary/10 rounded-full">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <CardTitle className="font-headline text-xl text-center">{category.name}</CardTitle>
                      <CardDescription className="text-center pt-2">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust and Compliance Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center">Trust & Compliance</h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-muted-foreground">
            We are committed to providing services with integrity and transparency.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <BadgeCheck className="h-12 w-12 text-primary" />
              <h3 className="font-headline mt-4 text-xl font-bold">Authorized Facilitator</h3>
              <p className="mt-2 text-muted-foreground">
                We act as a legitimate third-party facilitator, ensuring all services are processed through official channels.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-primary" />
              <h3 className="font-headline mt-4 text-xl font-bold">Customer-Centric</h3>
              <p className="mt-2 text-muted-foreground">
                Our focus is on simplifying complex processes and providing you with the best possible assistance.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="h-12 w-12 text-primary" />
              <h3 className="font-headline mt-4 text-xl font-bold">Official Portals</h3>
              <p className="mt-2 text-muted-foreground">
                All services are strictly facilitated through official government and institutional portals for your security.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
