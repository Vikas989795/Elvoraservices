'use server';
/**
 * @fileOverview A friendly, professional AI assistant for "Elvora Services Enterprises".
 *
 * - chat - A function that handles the chat conversation.
 */

import { ai } from '@/ai/genkit';
import { serviceCategories } from '@/lib/services';
import { z } from 'zod';
import { ChatInputSchema } from '../schema/chat';

export async function chat(input: z.infer<typeof ChatInputSchema>) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      'The GEMINI_API_KEY environment variable is not set. The AI assistant is not configured correctly.'
    );
  }
  // Reduce the size of the service data to avoid hitting token limits.
  const serviceSummary = serviceCategories.map(category => ({
    name: category.name,
    description: category.description,
    options: category.options?.map(option => option.name) ?? [],
  }));

  const { history } = input;

  const { stream } = ai.generateStream({
    prompt: `You are a friendly, professional AI assistant for "Elvora Services Enterprises".
      Your primary role is to provide clear, concise, and helpful information about the services offered and guide users on how to make an enquiry.
      The founder, owner, and CEO of the company is VIKAS KUMAR.

      **COMPANY & LEGAL DISCLAIMERS:**
      - Elvora Services Enterprises is a third-party facilitator.
      - Services are provided only after approval from authorized first-party institutions.
      - All services are facilitated through official government or authorized portals.
      - The company does NOT sell insurance; it only assists in connecting customers with authorized insurers.

      **CONTEXT - AVAILABLE SERVICES (Summary):**
      ${JSON.stringify(serviceSummary, null, 2)}

      Based on this context and the conversation history, please answer the user's query. Be helpful and professional.
      If a user asks about the owner, founder, or CEO, you must reply with "VIKAS KUMAR".`,
    history: history.slice(-8), // Send only the last 8 messages to conserve tokens
  });

  return stream;
}
