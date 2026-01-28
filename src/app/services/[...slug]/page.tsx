import { serviceCategories, ServiceOption } from '@/lib/services';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import NavButtons from '@/components/nav-buttons';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DisclaimerCard from '@/components/disclaimer-card';

// Function to find the current service/category node based on the slug parts
function findServiceNode(slugParts: string[]): { node: ServiceOption, path: ServiceOption[] } | null {
    let currentNode: ServiceOption | undefined = undefined;
    let currentOptions: ServiceOption[] = serviceCategories;
    const path: ServiceOption[] = [];

    for (const part of slugParts) {
        currentNode = currentOptions.find(o => o.slug === part);
        if (!currentNode) {
            return null;
        }
        path.push(currentNode);
        currentOptions = currentNode.options || [];
    }

    return currentNode ? { node: currentNode, path } : null;
}

export async function generateStaticParams() {
  const paths: { slug: string[] }[] = [];
  const traverse = (options: ServiceOption[], prefix: string[] = []) => {
    options.forEach(option => {
      const newPrefix = [...prefix, option.slug];
      paths.push({ slug: newPrefix });
      if (option.options) {
        traverse(option.options, newPrefix);
      }
    });
  };
  traverse(serviceCategories);
  return paths;
}

export default function ServiceNodePage({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const result = findServiceNode(slug);

  if (!result) {
    notFound();
  }

  const { node, path } = result;
  const isLeaf = !node.options || node.options.length === 0;

  if (isLeaf) {
    // Render detail page for the final service
    const category = path[0];
    const serviceDescriptionForAI = `Service: ${path.map(p => p.name).join(' - ')}. Description: ${node.description}`;
    const Icon = node.icon;

    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <NavButtons />
        </div>
        <div className="bg-card p-8 rounded-lg shadow-sm">
          <div className="flex items-start">
            <Icon className="h-12 w-12 text-primary mr-6 hidden sm:block" />
            <div>
              <p className="text-sm font-medium text-primary">{path.length > 1 ? path[path.length - 2].name : category.name}</p>
              <h1 className="font-headline text-4xl md:text-5xl font-bold mt-1">{node.name}</h1>
            </div>
          </div>

          <p className="mt-6 text-lg text-muted-foreground">{node.description}</p>
          
          <div className="mt-8">
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href={`/enquiry?service=${slug.join('-')}`}>
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
  } else {
    // Render list page for category/subcategory
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <NavButtons />
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-bold">{node.name}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{node.description}</p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {node.options.map((option) => {
            const Icon = option.icon;
            return (
              <Link href={`/services/${slug.join('/')}/${option.slug}`} key={option.slug} className="group">
                <Card className="h-full transition-shadow duration-300 group-hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center">
                      <Icon className="h-8 w-8 text-primary mr-4" />
                      <div>
                        <CardTitle className="font-headline text-lg">{option.name}</CardTitle>
                        {option.description && <CardDescription className="text-sm mt-1 line-clamp-2">{option.description}</CardDescription>}
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
}
