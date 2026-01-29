'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useToast } from './use-toast';
import { Message } from '@/ai/schema/chat';
import { streamChat } from '@/lib/actions';
import { readStreamableValue } from 'ai/rsc';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage]; // History for the API call

    // Optimistically update UI
    setMessages(prev => [...prev, userMessage, { role: 'model', content: '' }]);
    setInput('');
    setIsLoading(true);

    let attempts = 0;
    const maxAttempts = 3;
    const retryDelay = 5000;

    while (attempts < maxAttempts) {
        try {
            const result = await streamChat(newMessages); // Use the history captured before UI updates
            
            let assistantResponse = '';
            for await (const delta of readStreamableValue(result)) {
                if (typeof delta === 'string') {
                    assistantResponse += delta;
                    setMessages(prev => {
                        const lastMessage = prev[prev.length - 1];
                        return [ ...prev.slice(0, -1), { ...lastMessage, content: assistantResponse } ];
                    });
                }
            }
            setIsLoading(false);
            return; // Success, exit the function
        } catch (error) {
            attempts++;
            const errorMessage = (error as Error)?.message || '';
            const isRateLimitError = errorMessage.includes('429') || errorMessage.includes('quota');
            
            if (isRateLimitError && attempts < maxAttempts) {
                console.warn(`Attempt ${attempts} failed due to rate limiting. Retrying in ${retryDelay / 1000}s...`);
                // Update UI to show retry status
                setMessages(prev => {
                    const lastMessage = prev[prev.length - 1];
                    return [ ...prev.slice(0, -1), { ...lastMessage, content: `Our AI service is temporarily busy. Retrying...` } ];
                });
                await new Promise(res => setTimeout(res, retryDelay));
                // Clear the retry message before the next attempt
                setMessages(prev => {
                    const lastMessage = prev[prev.length - 1];
                    return [ ...prev.slice(0, -1), { ...lastMessage, content: '' } ];
                });
                continue; // Go to the next iteration of the while loop
            } else {
                // This is a permanent failure (or max retries reached)
                console.warn('Chat submission failed after multiple retries.', error);
                let description = "Sorry, I'm having a little trouble connecting right now. Please try again in a moment.";
                if (isRateLimitError) {
                    description = 'Our AI assistant is currently experiencing high traffic. Please try again in a minute.';
                } else if (errorMessage.includes('API key')) {
                    description = 'The AI assistant is not configured correctly. Please contact support.';
                }

                toast({ title: 'Chat Error', description, variant: 'destructive' });
                
                // Clean up the optimistic UI placeholder
                setMessages(prev => prev.slice(0, -1));
                setIsLoading(false);
                return; // Exit the function
            }
        }
    }
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  };
}
