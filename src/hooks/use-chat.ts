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
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const result = await streamChat(newMessages);
      
      let assistantResponse = '';
      setMessages(prev => [...prev, { role: 'model', content: '' }]);

      for await (const delta of readStreamableValue(result)) {
        if (typeof delta === 'string') {
          assistantResponse += delta;
          setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage.role === 'model') {
              return [
                ...prev.slice(0, -1),
                { ...lastMessage, content: assistantResponse },
              ];
            }
            return prev;
          });
        }
      }
    } catch (error) {
      console.error('Chat submission failed:', error);
      
      let description = 'Sorry, I\'m having a little trouble connecting right now. Please try again in a moment.';
      const errorMessage = (error as Error)?.message || '';
      if (errorMessage.includes('429') || errorMessage.includes('quota')) {
        description = 'Our AI assistant is currently experiencing high traffic. Please try again in a minute.';
      }

      toast({
        title: 'Chat Error',
        description: description,
        variant: 'destructive',
      });
      // Revert to state before adding the assistant's placeholder message
      setMessages(newMessages);
    } finally {
      setIsLoading(false);
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
