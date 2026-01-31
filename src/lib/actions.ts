'use server';

import { z } from 'zod';
import { chat } from '@/ai/flows/chat';
import { Message } from '@/ai/schema/chat';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwrJ2NGs6he_RMGSer2fnMoFebhKCMRcfCa-jQISYvNB_h22YmdHESLLNC6aOVpnDM6AQ/exec";

// Helper to extract the actual error from Google's HTML response
function parseAppsScriptError(text: string): string {
  try {
    if (text.includes("<!DOCTYPE html>")) {
      // It's an HTML error page from Google
      const match = text.match(/<div style="text-align:center;font-family:monospace;[^>]+">([^<]+)<\/div>/);
      if (match && match[1]) {
        const errorMessage = match[1].trim();
        const lineMatch = text.match(/ \(line (\d+), file/);
        if (lineMatch && lineMatch[1]) {
          return `Google Apps Script Error: ${errorMessage} (line ${lineMatch[1]})`;
        }
        return `Google Apps Script Error: ${errorMessage}`;
      }
      return "An unknown error occurred with Google Apps Script.";
    }
    // If it's not HTML, it might be the plain text error message
    if (text.startsWith("Error:")) {
      return `Google Apps Script Error: ${text.substring(6).trim()}`;
    }
  } catch (e) {
    // Fallback if parsing fails
    return text.substring(0, 200); 
  }
  // Return the original text if no specific message is found
  return text;
}


export type FormState = {
  message: string | null;
  success: boolean;
};

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
  resume: z.instanceof(File).optional(),
});

export async function submitEnquiry(data: z.infer<typeof enquirySchema>): Promise<FormState> {
  const validatedFields = enquirySchema.safeParse(data);

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return { success: false, message: firstError || "Invalid data." };
  }

  const payload = {
    formType: 'enquiry',
    ...validatedFields.data,
  };

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    const text = await response.text();

    if (text === "Success") {
      return { success: true, message: "Your enquiry has been submitted successfully!" };
    } else {
      return { success: false, message: parseAppsScriptError(text) };
    }
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return { success: false, message: 'An unexpected network error occurred.' };
  }
}

export async function submitApplication(data: z.infer<typeof careerSchema>): Promise<FormState> {
    const validatedFields = careerSchema.safeParse(data);

    if (!validatedFields.success) {
      const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
      return { success: false, message: firstError || "Invalid data." };
    }

    const { resume, email, ...restOfData } = validatedFields.data;
    
    // The backend script for careers expects 'mail' not 'email'
    let payload: any = {
      formType: 'career',
      fullName: restOfData.fullName,
      mail: email,
      phone: restOfData.phone,
      position: restOfData.position,
      experience: restOfData.experience,
    };

    if (resume && resume.size > 0) {
      try {
        const bytes = await resume.arrayBuffer();
        const buffer = Buffer.from(bytes);
        // These are the keys the JSON script expects for the file
        payload.file = buffer.toString('base64');
        payload.fileName = resume.name;
        payload.mimeType = resume.type;
      } catch (fileError) {
         console.error("Error processing resume file:", fileError);
         return { success: false, message: 'There was an error reading the resume file.' };
      }
    }

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            redirect: 'follow',
        });

        const text = await response.text();
        if (text === 'Success') {
            return { success: true, message: 'Your application has been submitted successfully!' };
        } else {
            return { success: false, message: parseAppsScriptError(text) };
        }
    } catch (error) {
        console.error('Error submitting application:', error);
        return { success: false, message: 'An unexpected network error occurred.' };
    }
}


export async function streamChat(history: Message[]) {
  const prompt = history[history.length - 1]?.content ?? '';
  return await chat({ history, prompt });
}
