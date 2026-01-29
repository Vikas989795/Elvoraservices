'use server';

import { z } from 'zod';
import { chat } from '@/ai/flows/chat';
import { Message } from '@/ai/schema/chat';
import { createStreamableValue } from 'ai/rsc';

const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  service: z.string().optional(),
  query: z.string().min(10, "Query must be at least 10 characters."),
});

const careerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  position: z.string().min(2, "Position of interest is required."),
  experience: z.string().min(1, "Please specify your years of experience."),
  resume: z.any().optional(), // In a real app, this would be file validation.
});

export type EnquiryState = {
  message: string;
  status: 'success' | 'error';
} | {
  message: null;
  status: null;
};

export async function submitEnquiry(prevState: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const validatedFields = enquirySchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    service: formData.get('service'),
    query: formData.get('query'),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors[Object.keys(validatedFields.error.flatten().fieldErrors)[0]][0],
      status: 'error',
    };
  }

  // Simulate sending an email or saving to DB
  console.log('New Enquiry:', validatedFields.data);

  return {
    message: 'Your enquiry has been submitted successfully! We will get back to you shortly.',
    status: 'success',
  };
}


export type CareerState = {
  message: string;
  status: 'success' | 'error';
} | {
  message: null;
  status: null;
};

export async function submitApplication(prevState: CareerState, formData: FormData): Promise<CareerState> {
    const validatedFields = careerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    position: formData.get('position'),
    experience: formData.get('experience'),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors[Object.keys(validatedFields.error.flatten().fieldErrors)[0]][0],
      status: 'error',
    };
  }
  
  // Simulate processing
  console.log('New Application:', validatedFields.data);

  return {
    message: 'Your application has been received. Thank you for your interest in Elvora Services Enterprises.',
    status: 'success',
  };
}


export async function streamChat(history: Message[]) {
  const stream = createStreamableValue({ response: '' });

  (async () => {
    try {
      const llmStream = chat({ history, prompt: history[history.length - 1].content });
      for await (const chunk of llmStream) {
        if (chunk.text) {
          stream.update({ response: chunk.text });
        }
      }
    } catch (e) {
      console.error(e);
      stream.update({ response: 'An error occurred. Please try again.' });
    } finally {
      stream.done();
    }
  })();

  return stream.value;
}
