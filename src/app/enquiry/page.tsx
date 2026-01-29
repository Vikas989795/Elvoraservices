import EnquiryForm from '@/components/forms/enquiry-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function EnquiryFormFallback() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64 mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
         <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-20 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}


export default function EnquiryPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Get In Touch</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a question or need assistance with a service? Fill out the form, and our team will get back to you as soon as possible.
          </p>
          <div className="mt-8">
            <h2 className="font-headline text-2xl font-bold">ELVORA SERVICES ENTERPRISES</h2>
            <div className="mt-4 space-y-3 text-muted-foreground">
                <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-primary" />
                    <span>+91 8273157482</span>
                </div>
                 <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-primary" />
                    <span>+91 9897957482</span>
                </div>
                <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-primary" />
                    <span>Helpdesk@elvoraservices.com</span>
                </div>
                <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 mt-1 text-primary flex-shrink-0" />
                    <span>Office: Shahpur Khurd, Sasni, Hathras, Uttar Pradesh – 204101</span>
                </div>
            </div>
          </div>
        </div>
        <div>
          <Suspense fallback={<EnquiryFormFallback />}>
            <EnquiryForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
