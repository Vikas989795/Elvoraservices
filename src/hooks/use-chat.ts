'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useToast } from './use-toast';
import { Message } from '@/ai/schema/chat';
import { streamChat } from '@/lib/actions';

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

      for await (const delta of result) {
        assistantResponse += delta.response;
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if(lastMessage.role === 'model') {
            lastMessage.content = assistantResponse;
            return [...prev.slice(0, -1), lastMessage];
          }
          return prev;
        });
      }
    } catch (error) {
      console.error('Chat submission failed:', error);
      toast({
        title: 'Chat Error',
        description: 'Sorry, I\'m having a little trouble connecting right now. Please try again in a moment.',
        variant: 'destructive',
      });
      setMessages(messages); // Revert to messages before user submission
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
