'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

import { submitApplication } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const careerSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email(),
  phone: z.string().min(10, "A valid phone number is required"),
  position: z.string().min(2, "Position of interest is required"),
  experience: z.string().min(1, "Years of experience is required"),
  resume: z.instanceof(FileList).optional().refine(files => !files || files.length <= 1, "Only one resume can be uploaded."),
});

type CareerFormInputs = z.infer<typeof careerSchema>;

export default function CareerForm() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CareerFormInputs>({
    resolver: zodResolver(careerSchema),
  });
  
  const onSubmit = async (data: CareerFormInputs) => {
    const submissionData = {
        ...data,
        resume: data.resume?.[0], // Get the single File object
    };

    try {
        const result = await submitApplication(submissionData);
        if (!result.success) {
            throw new Error(result.message || "An unknown submission error occurred.");
        }

        toast({
            title: "Application Submitted!",
            description: "Thank you for showing interest in Elvora Services. We have successfully received your submission and will connect with you shortly.",
        });
        reset();
    } catch (error) {
        toast({
            title: "Submission Failed",
            description: (error as Error).message,
            variant: "destructive",
        });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Application Form</CardTitle>
        <CardDescription>Fill out the form below to apply.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" {...register('fullName')} />
            {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
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
            <Label htmlFor="resume">Upload Resume</Label>
            <Input id="resume" type="file" {...register('resume')} />
            {errors.resume && <p className="text-sm text-destructive">{errors.resume.message as string}</p>}
          </div>
          <Button type="submit" className="w-full bg-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
