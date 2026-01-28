import EnquiryForm from '@/components/forms/enquiry-form';
import { Mail, Phone } from 'lucide-react';

export default function EnquiryPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Get In Touch</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a question or need assistance with a service? Fill out the form, and our team will get back to you as soon as possible.
          </p>
          <div className="mt-8 space-y-4">
            <h3 className="font-headline text-xl font-semibold">Contact Information</h3>
             <div className="flex items-center text-muted-foreground">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <span>+91 12345 67890</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <span>contact@elvora.com</span>
              </div>
          </div>
        </div>
        <div>
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
}
