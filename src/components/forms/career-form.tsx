'use client';

import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

import { submitApplication, type CareerState } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const careerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email(),
  phone: z.string().min(10, "A valid phone number is required"),
  position: z.string().min(2, "Position of interest is required"),
  experience: z.string().min(1, "Years of experience is required"),
  // resume: z.instanceof(File).optional(),
});

type CareerFormInputs = z.infer<typeof careerSchema>;

const initialState: CareerState = {
  message: null,
  status: null,
};

export default function CareerForm() {
  const [state, formAction] = useActionState(submitApplication, initialState);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CareerFormInputs>({
    resolver: zodResolver(careerSchema),
  });
  
  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Application Submitted!",
        description: state.message,
      });
    } else if (state.status === 'error') {
      toast({
        title: "Submission Failed",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Application Form</CardTitle>
        <CardDescription>Fill out the form below to apply.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" {...register('name')} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" {...register('phone')} />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position of Interest</Label>
            <Input id="position" {...register('position')} />
            {errors.position && <p className="text-sm text-destructive">{errors.position.message}</p>}
          </div>
           <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input id="experience" type="number" {...register('experience')} />
            {errors.experience && <p className="text-sm text-destructive">{errors.experience.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="resume">Upload Resume (Optional)</Label>
            <Input id="resume" type="file" {...register('resume')} />
          </div>
          <Button type="submit" className="w-full bg-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
