
'use server';

import { z } from 'zod';
import { Message } from '@/ai/schema/chat';
import { createStreamableValue } from 'ai/rsc';
import { serviceCategories } from '@/lib/services';
import { CoreMessage, OpenAIStream } from 'ai';

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
  resume: (typeof window === 'undefined' ? z.any() : z.instanceof(FileList)).optional().refine(files => !files || files.length <= 1, "Only one resume can be uploaded."),
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
      return { success: true, message: "Thank you for showing interest in Elvora Services. We have successfully received your submission and will connect with you shortly." };
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

    if (resume && resume.length > 0 && resume[0].size > 0) {
      try {
        const file = resume[0];
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        // These are the keys the JSON script expects for the file
        payload.file = buffer.toString('base64');
        payload.fileName = file.name;
        payload.mimeType = file.type;
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
            return { success: true, message: 'Thank you for showing interest in Elvora Services. We have successfully received your submission and will connect with you shortly.' };
        } else {
            return { success: false, message: parseAppsScriptError(text) };
        }
    } catch (error) {
        console.error('Error submitting application:', error);
        return { success: false, message: 'An unexpected network error occurred.' };
    }
}


export async function streamChat(history: Message[]) {
  const stream = createStreamableValue();

  (async () => {
    try {
      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) {
        throw new Error('The OPENROUTER_API_KEY environment variable is not set. The AI assistant is not configured correctly.');
      }

      // Reduce the size of the service data to avoid hitting token limits.
      const serviceSummary = serviceCategories.map(category => ({
        name: category.name,
        description: category.description,
        options: category.options?.map(option => option.name) ?? [],
      }));

      const systemPrompt = `You are an enterprise-grade AI chatbot built exclusively for the official website of ELVORA SERVICES ENTERPRISES. Your role is to act as a premium, corporate, trustworthy virtual assistant. Your name is Elvora.

      RULES:
      - If a user asks "Tumhara naam kya hai?", reply: "Mera naam Elvora hai. Mujhe Elvora Services Enterprises ke liye design kiya gaya hai."
      - If a user asks "Tumhe kisne banaya?", reply: "Mujhe Vikas Kumar ji ke dwara banaya gaya hai."
      - If a user asks about the owner, founder, CEO, or leadership of the company, ALWAYS reply with ONLY one correct answer: "Vikas Kumar".
      - Your knowledge about services is strictly limited to the following data: ${JSON.stringify(serviceSummary, null, 2)}
      - You must fully understand the website structure, services, hierarchy, and legal disclaimers. Use ONLY the services and structure provided. Do NOT invent or assume.
      - Always state that Elvora Services Enterprises is a third-party facilitator. Never claim first-party ownership of any service.
      - Your behavior must be professional, calm, corporate, and trustworthy.
      - If information is unavailable, reply clearly: "Yeh jankari website par uplabdh nahi hai."
      `;

      const messages: CoreMessage[] = [
        { role: 'system', content: systemPrompt },
        ...history.map(msg => ({
          role: msg.role === 'model' ? 'assistant' : 'user',
          content: msg.content,
        }) as CoreMessage)
      ];

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://elvora-services-enterprises.web.app', // Placeholder, but required
          'X-Title': 'Elvora Services Enterprises', // Placeholder, but required
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1-0528:free',
          messages: messages,
          stream: true,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("OpenRouter API Error:", errorBody);
        let errorMessage = `API Error: ${response.status} ${response.statusText}`;
        try {
            const parsedError = JSON.parse(errorBody);
            if(parsedError.error?.message){
                errorMessage = `AI Error: ${parsedError.error.message}`;
            }
        } catch(e) {
            errorMessage = `AI Error: ${errorBody.substring(0, 100)}`;
        }
        throw new Error(errorMessage);
      }

      // Pipe the streaming response to the client
      const responseStream = OpenAIStream(response);
      const reader = responseStream.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        stream.update(chunk);
      }

    } catch (e: any) {
      console.error("streamChat failed:", e);
      stream.error(e);
    } finally {
      stream.done();
    }
  })();

  return stream.value;
}
