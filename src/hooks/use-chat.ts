'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  role: 'user' | 'model';
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: 'model',
  content: 'Welcome to Elvora Services Enterprises. How may we assist you today?',
};

const ERROR_MESSAGE: Message = {
    role: 'model',
    content: "We are experiencing a temporary issue. Please contact ELVORA SERVICES ENTERPRISES at +91 8273157482."
};


export function useChat() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let storedSessionId = localStorage.getItem('elvora-chat-session');
    if (!storedSessionId) {
      storedSessionId = uuidv4();
      localStorage.setItem('elvora-chat-session', storedSessionId);
    }
    setSessionId(storedSessionId);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !sessionId) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Optimistic model response
    setMessages(prev => [...prev, { role: 'model', content: '' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId,
          message: input,
        }),
      });

      if (!response.ok || !response.body) {
        setMessages(prev => [...prev.slice(0, -1), ERROR_MESSAGE]);
        throw new Error('Network response was not ok.');
      }
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        assistantResponse += chunk;

        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', content: assistantResponse };
          return newMessages;
        });
      }

    } catch (error) {
      console.error('Chat submission failed:', error);
      setMessages(prev => [...prev.slice(0, -1), ERROR_MESSAGE]);
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
