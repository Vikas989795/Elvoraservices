'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { submitEnquiry, type EnquiryState } from '@/lib/actions';
import { serviceCategories } from '@/lib/services';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  service: z.string().optional(),
  query: z.string().min(10, "Query must be at least 10 characters."),
});

type EnquiryFormInputs = z.infer<typeof enquirySchema>;

const allServices = serviceCategories.flatMap(cat => cat.options.map(opt => ({
  value: `${cat.slug}-${opt.slug}`,
  label: `${cat.name} - ${opt.name}`,
})));

const initialState: EnquiryState = {
  message: null,
  status: null,
};

export default function EnquiryForm() {
  const searchParams = useSearchParams();
  const defaultService = searchParams.get('service');
  const [state, formAction] = useFormState(submitEnquiry, initialState);
  const { toast } = useToast();

  const form = useForm<EnquiryFormInputs>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      service: defaultService || '',
      name: '',
      email: '',
      phone: '',
      query: '',
    },
  });

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: 'Enquiry Sent!',
        description: state.message,
      });
      form.reset();
    } else if (state.status === 'error') {
       toast({
        title: 'Submission Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast, form]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Enquiry Form</CardTitle>
        <CardDescription>We'll respond within 24 hours.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" {...form.register('name')} />
            {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" {...form.register('email')} />
             {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" {...form.register('phone')} />
             {form.formState.errors.phone && <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="service">Service of Interest</Label>
            <Select name="service" defaultValue={defaultService || undefined}>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {allServices.map(service => (
                  <SelectItem key={service.value} value={service.value}>
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="query">Your Query</Label>
            <Textarea id="query" {...form.register('query')} />
             {form.formState.errors.query && <p className="text-sm text-destructive">{form.formState.errors.query.message}</p>}
          </div>
          <Button type="submit" className="w-full bg-primary" disabled={form.formState.isSubmitting}>
             {form.formState.isSubmitting ? 'Sending...' : 'Send Enquiry'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
