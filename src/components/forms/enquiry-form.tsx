'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';

import { submitEnquiry } from '@/lib/actions';
import { serviceCategories } from '@/lib/services';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const enquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  service: z.string().optional(),
  query: z.string().min(10, "Query must be at least 10 characters."),
});

type EnquiryFormInputs = z.infer<typeof enquirySchema>;

const allServices = serviceCategories.flatMap(cat => 
    cat.options ? cat.options.map(opt => ({
        value: `${cat.name} - ${opt.name}`,
        label: `${cat.name} - ${opt.name}`,
    })) : []
);

export default function EnquiryForm() {
  const searchParams = useSearchParams();
  const defaultService = searchParams.get('service');
  const { toast } = useToast();

  const form = useForm<EnquiryFormInputs>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      service: defaultService || '',
      fullName: '',
      email: '',
      phone: '',
      query: '',
    },
  });

  useEffect(() => {
    // If the URL param changes, update the form's default value
    form.reset({ ...form.getValues(), service: defaultService || '' });
  }, [defaultService, form]);


  const onSubmit = async (data: EnquiryFormInputs) => {
    try {
      const result = await submitEnquiry(data);
      if (!result.success) {
        throw new Error(result.message || 'An unknown submission error occurred.');
      }

      toast({
        title: 'Enquiry Sent!',
        description: result.message,
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Enquiry Form</CardTitle>
        <CardDescription>We'll respond within 24 hours.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" {...form.register('fullName')} />
            {form.formState.errors.fullName && <p className="text-sm text-destructive">{form.formState.errors.fullName.message}</p>}
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
            <Controller
              name="service"
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
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
              )}
            />
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
