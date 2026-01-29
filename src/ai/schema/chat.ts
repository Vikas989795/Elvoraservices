import { z } from 'zod';

export const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

export const ChatInputSchema = z.object({
  history: z.array(MessageSchema),
  prompt: z.string(),
});

export const ChatOutputSchema = z.object({
  response: z.string(),
});
