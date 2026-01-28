import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-headline text-lg font-bold">Elvora Services Enterprises</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your trusted partner for a wide range of essential services. We simplify processes, so you can focus on what matters.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-bold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li><Link href="/#services" className="text-sm hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/careers" className="text-sm hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/enquiry" className="text-sm hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-bold">Contact Information</h3>
            <div className="mt-2 space-y-2 text-sm">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+91 12345 67890</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@elvora.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8">
          <div className="text-sm text-muted-foreground space-y-2">
            <p><span className="font-bold">Disclaimer:</span> We are a third-party facilitator. Services are provided after approval from authorized first-party institutions and are facilitated strictly through official government portals. We do not sell insurance; we only assist in connecting customers with authorized insurers.</p>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Elvora Services Enterprises. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
