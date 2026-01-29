'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, CornerDownLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { useChat } from '@/hooks/use-chat';
import Thinking from './ui/thinking';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg"
          aria-label="Toggle Chatbot"
        >
          {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-md"
          >
            <Card className="shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-headline flex items-center">
                  <Bot className="mr-2" /> Elvora Assistant
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div ref={scrollRef} className="h-80 overflow-y-auto pr-4 space-y-4">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                       {m.role !== 'user' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                      <div className={`rounded-lg px-3 py-2 max-w-sm ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                      </div>
                    </div>
                  ))}
                   {isLoading && (
                    <div className="flex gap-2 justify-start">
                       <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                       <div className="rounded-lg px-3 py-2 bg-muted">
                          <Thinking />
                       </div>
                    </div>
                  )}
                </div>
                <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about our services..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                 <p className="text-xs text-center text-muted-foreground mt-2">
                    Press <CornerDownLeft className="inline-block h-3 w-3" /> to send.
                 </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
