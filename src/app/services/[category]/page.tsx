import { serviceCategories } from '@/lib/services';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import NavButtons from '@/components/nav-buttons';
import { ChevronRight } from 'lucide-react';

export async function generateStaticParams() {
  return serviceCategories.map((category) => ({
    category: category.slug,
  }));
}

export default function ServiceCategoryPage({ params }: { params: { category: string } }) {
  const category = serviceCategories.find((c) => c.slug === params.category);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <NavButtons />
      </div>
      <h1 className="font-headline text-4xl md:text-5xl font-bold">{category.name}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{category.description}</p>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.options.map((option) => {
          const Icon = option.icon;
          return (
            <Link href={`/services/${category.slug}/${option.slug}`} key={option.slug} className="group">
              <Card className="h-full transition-shadow duration-300 group-hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center">
                    <Icon className="h-8 w-8 text-primary mr-4" />
                    <div>
                      <CardTitle className="font-headline text-lg">{option.name}</CardTitle>
                      <CardDescription className="text-sm mt-1">{option.description}</CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
