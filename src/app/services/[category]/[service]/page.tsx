import { serviceCategories } from '@/lib/services';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import NavButtons from '@/components/nav-buttons';
import DisclaimerCard from '@/components/disclaimer-card';
import { ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  const paths = serviceCategories.flatMap((category) =>
    category.options.map((option) => ({
      category: category.slug,
      service: option.slug,
    }))
  );
  return paths;
}

export default function ServiceDetailPage({ params }: { params: { category: string, service: string } }) {
  const category = serviceCategories.find((c) => c.slug === params.category);
  const service = category?.options.find((o) => o.slug === params.service);

  if (!category || !service) {
    notFound();
  }

  const serviceDescriptionForAI = `Service: ${category.name} - ${service.name}. Description: ${service.description}`;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <NavButtons />
      </div>
      <div className="bg-card p-8 rounded-lg shadow-sm">
        <div className="flex items-start">
          <service.icon className="h-12 w-12 text-primary mr-6 hidden sm:block" />
          <div>
            <p className="text-sm font-medium text-primary">{category.name}</p>
            <h1 className="font-headline text-4xl md:text-5xl font-bold mt-1">{service.name}</h1>
          </div>
        </div>

        <p className="mt-6 text-lg text-muted-foreground">{service.description}</p>
        
        <div className="mt-8">
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href={`/enquiry?service=${category.slug}-${service.slug}`}>
              Enquire Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        <div className="mt-12">
            <DisclaimerCard serviceDescription={serviceDescriptionForAI} />
        </div>
      </div>
    </div>
  );
}
