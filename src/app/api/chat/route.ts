import { Groq } from 'groq-sdk';
import { db } from '@/lib/firebase-admin';
import { Timestamp }from 'firebase-admin/firestore';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are the official enterprise AI assistant of Elvora Services Enterprises.
Identity: You represent a premium, corporate, large-scale organization.
Core Rules:
- Respond in the same language as the user (Hindi or English).
- Maintain professional, structured, corporate tone.
- Elvora Services Enterprises is strictly a third-party facilitator.
- Never claim ownership of banks, government institutions, insurers, or platforms.
- Never promise approval, claims, or guaranteed outcomes.
- Always align responses with official first-party processes.
- If unsure, ask clarification.
- Use structured hierarchy when explaining services.
CEO Rule: If anyone asks about the owner, CEO, founder, co-founder, or leadership:
Respond with only: VIKAS KUMAR
Safety:
- No document uploads.
- No payment collection.
- Redirect users to official processes.
- Handle aggressive users calmly.`;

const FALLBACK_MESSAGE = "We are experiencing a temporary issue. Please contact ELVORA SERVICES ENTERPRISES at +91 8273157482.";

export async function POST(req: Request) {
  try {
    const { sessionId, message } = await req.json();

    if (!sessionId || !message) {
      return new Response('Bad Request: Missing sessionId or message', { status: 400 });
    }

    const chatRef = db.collection('elvora_chats').doc(sessionId);
    const messagesRef = chatRef.collection('messages');
    
    const userMessageData = {
      role: 'user',
      content: message,
      timestamp: Timestamp.now(),
    };
    await messagesRef.add(userMessageData);
    
    const historySnapshot = await messagesRef.orderBy('timestamp', 'desc').limit(8).get();
    const history = historySnapshot.docs.map(doc => doc.data()).reverse();

    const messagesToGroq = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.map((msg: any) => ({ role: msg.role === 'model' ? 'assistant' : msg.role, content: msg.content })),
      // The last message is already in history, so we don't add it again.
    ];

    const stream = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: messagesToGroq as any,
      temperature: 0.3,
      max_tokens: 500,
      stream: true,
    });

    let fullResponse = '';
    const transformStream = new TransformStream({
      transform(chunk, controller) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          fullResponse += content;
          controller.enqueue(new TextEncoder().encode(content));
        }
      },
      async flush(controller) {
          if (fullResponse) {
              const aiMessageData = {
                  role: 'model', // Use 'model' role to match frontend
                  content: fullResponse,
                  timestamp: Timestamp.now(),
              };
              await messagesRef.add(aiMessageData);
          }
          controller.terminate();
      }
    });
    
    return new Response(stream.toReadableStream().pipeThrough(transformStream), {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error) {
    console.error('Groq API or Firestore error:', error);
    return new Response(FALLBACK_MESSAGE, { status: 500 });
  }
}
