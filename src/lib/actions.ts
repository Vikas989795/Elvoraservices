'use server';

import { z } from 'zod';
import { chat } from '@/ai/flows/chat';
import { Message } from '@/ai/schema/chat';
import { createStreamableValue } from 'ai/rsc';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwrJ2NGs6he_RMGSer2fnMoFebhKCMRcfCa-jQISYvNB_h22YmdHESLLNC6aOVpnDM6AQ/exec";

// Helper function to handle response from Google Apps Script
async function handleGoogleScriptResponse(response: Response): Promise<{ success: boolean; message: string }> {
  const text = await response.text();
  if (text === "Success") {
    return { success: true, message: "Submission successful!" };
  }
  return { success: false, message: text }; // Return the error message from the script
}

const enquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  service: z.string().optional(),
  query: z.string().min(10, "Query must be at least 10 characters."),
});

const careerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  position: z.string().min(2, "Position of interest is required."),
  experience: z.string().min(1, "Please specify your years of experience."),
  resume: z.any().optional(),
});


export type FormState = {
  message: string;
  status: 'success' | 'error';
} | {
  message: null;
  status: null;
};

export async function submitEnquiry(prevState: FormState, formData: FormData): Promise<FormState> {
  // Validate form data against the schema
  const validatedFields = enquirySchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      message: firstError || "Invalid data provided.",
      status: 'error',
    };
  }
  
  formData.append("formType", "enquiry");

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formData,
    });
    
    const result = await handleGoogleScriptResponse(response);

    if (result.success) {
       return {
        message: 'Your enquiry has been submitted successfully! We will get back to you shortly.',
        status: 'success',
      };
    } else {
       return {
        message: `Submission failed: ${result.message}`,
        status: 'error',
      };
    }
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return {
      message: 'An unexpected network error occurred. Please try again.',
      status: 'error',
    };
  }
}

export async function submitApplication(prevState: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = careerSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
        return {
            message: firstError || "Invalid data provided.",
            status: 'error',
        };
    }

    const submissionFormData = new FormData();
    for (const [key, value] of formData.entries()) {
        if (key !== 'resume') {
            submissionFormData.append(key, value);
        }
    }
    
    submissionFormData.append("formType", "career");

    const resumeFile = formData.get('resume') as File | null;
    if (resumeFile && resumeFile.size > 0) {
        const bytes = await resumeFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString('base64');
        submissionFormData.append('resume', base64);
        submissionFormData.append('resumeName', resumeFile.name);
        submissionFormData.append('resumeType', resumeFile.type);
    } else {
        // If there's no resume, ensure the script doesn't fail
        submissionFormData.append('resume', '');
        submissionFormData.append('resumeName', '');
        submissionFormData.append('resumeType', '');
    }

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: submissionFormData,
        });

        const result = await handleGoogleScriptResponse(response);

        if (result.success) {
            return {
                message: 'Your application has been received. Thank you for your interest.',
                status: 'success',
            };
        } else {
            return {
                message: `Submission failed: ${result.message}`,
                status: 'error',
            };
        }
    } catch (error) {
        console.error("Error submitting application:", error);
        return {
            message: 'An unexpected network error occurred. Please try again.',
            status: 'error',
        };
    }
}


export async function streamChat(history: Message[]) {
  const stream = createStreamableValue('');

  (async () => {
    try {
      const llmStream = await chat({ history, prompt: history[history.length - 1].content });
      for await (const chunk of llmStream) {
        if (chunk.text) {
          stream.update(chunk.text);
        }
      }
    } catch (e) {
      console.error(e);
      stream.error(e);
    } finally {
      stream.done();
    }
  })();

  return stream.value;
}
