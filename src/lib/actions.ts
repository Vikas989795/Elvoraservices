'use server';

import { z } from 'zod';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwrJ2NGs6he_RMGSer2fnMoFebhKCMRcfCa-jQISYvNB_h22YmdHESLLNC6aOVpnDM6AQ/exec";

// Helper to extract the actual error from Google's HTML response
function extractErrorMessage(html: string): string {
  try {
    const specificMessages = [
      {
        keyword: "getFolderById",
        message: "Google Apps Script Error: Failed to access the Google Drive folder. Please verify the Folder ID in your script and ensure the script has been granted Google Drive permissions.",
      },
      {
        keyword: "getSheetByName",
        message: "Google Apps Script Error: Failed to write to the Google Sheet because the specified sheet (tab) was not found. Please check the sheet name in your script.",
      },
      {
        keyword: "appendRow",
        message: "Google Apps Script Error: Failed to write to the Google Sheet. This is often because the target sheet name is incorrect or missing.",
      }
    ];

    for (const { keyword, message } of specificMessages) {
      if (html.includes(keyword)) {
        return message;
      }
    }

    const match = html.match(/<div style="text-align:center;font-family:monospace;[^>]+">([^<]+)<\/div>/);
    if (match && match[1]) {
      return `Google Apps Script Error: ${match[1].trim()}`;
    }
  } catch (e) {
    // Fallback if parsing fails
  }
  return html; // Return the original HTML if no specific message is found
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
    type: 'enquiry',
    ...validatedFields.data,
  };

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    const text = await response.text();

    if (text === "Success") {
      return { success: true, message: "Your enquiry has been submitted successfully!" };
    } else {
      return { success: false, message: extractErrorMessage(text) };
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

    const { resume, ...restOfData } = validatedFields.data;
    const payload: Record<string, any> = { type: 'career', ...restOfData };

    if (resume && resume.size > 0) {
      const bytes = await resume.arrayBuffer();
      const buffer = Buffer.from(bytes);
      payload.file = buffer.toString('base64');
      payload.fileName = resume.name;
      payload.mimeType = resume.type;
    }

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            redirect: 'follow',
        });

        const text = await response.text();
        if (text === 'Success') {
            return { success: true, message: 'Your application has been submitted successfully!' };
        } else {
            return { success: false, message: extractErrorMessage(text) };
        }
    } catch (error) {
        console.error('Error submitting application:', error);
        return { success: false, message: 'An unexpected network error occurred.' };
    }
}

// This function is no longer needed with the server-side proxy approach.
export async function streamChat() {
  throw new Error("Chat function not implemented in this version.");
}
