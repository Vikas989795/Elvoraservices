'use server';

/**
 * @fileOverview Generates contextual legal disclaimers based on the service described on a webpage.
 *
 * - generateContextualDisclaimers - A function that generates legal disclaimers.
 * - GenerateContextualDisclaimersInput - The input type for the generateContextualDisclaimers function.
 * - GenerateContextualDisclaimersOutput - The return type for the generateContextualDisclaimers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateContextualDisclaimersInputSchema = z.object({
  serviceDescription: z
    .string()
    .describe('The description of the service offered on the webpage.'),
});
export type GenerateContextualDisclaimersInput = z.infer<
  typeof GenerateContextualDisclaimersInputSchema
>;

const GenerateContextualDisclaimersOutputSchema = z.object({
  disclaimer: z.string().describe('The generated contextual legal disclaimer.'),
});
export type GenerateContextualDisclaimersOutput = z.infer<
  typeof GenerateContextualDisclaimersOutputSchema
>;

export async function generateContextualDisclaimers(
  input: GenerateContextualDisclaimersInput
): Promise<GenerateContextualDisclaimersOutput> {
  return generateContextualDisclaimersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContextualDisclaimersPrompt',
  input: {schema: GenerateContextualDisclaimersInputSchema},
  output: {schema: GenerateContextualDisclaimersOutputSchema},
  prompt: `You are a legal expert specializing in generating disclaimers for third-party service facilitators.

  Based on the service description provided, generate a disclaimer that informs users about Elvora Services Enterprises' role as a facilitator and clarifies that services are provided after approval from authorized first-party institutions and facilitated through official government portals. Also state clearly that insurance is not sold, but only assistance is provided in connecting customers with authorized insurers.

Service Description: {{{serviceDescription}}}

Disclaimer:`, // Ensure the output is just the disclaimer text, nothing else.
});

const generateContextualDisclaimersFlow = ai.defineFlow(
  {
    name: 'generateContextualDisclaimersFlow',
    inputSchema: GenerateContextualDisclaimersInputSchema,
    outputSchema: GenerateContextualDisclaimersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
