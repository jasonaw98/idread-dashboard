'use client'
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBox = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!input.trim()) return;

      // Add user message
      const userMessage: Message = { role: 'user', content: input };
      setMessages(prev => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch response');
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No reader available');
        }

        // Read the stream
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Convert the chunk to text
          const chunk = new TextDecoder().decode(value);
          const data = JSON.parse(chunk);

          // Add assistant message
          const assistantMessage: Message = {
            role: 'assistant',
            content: data.message
          };
          setMessages(prev => [...prev, assistantMessage]);
        }
      } catch (error) {
        console.error('Error:', error);
        // Add error message
        const errorMessage: Message = {
          role: 'assistant',
          content: 'Sorry, I encountered an error while processing your request.'
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    };
  
  return (
    <div className="flex w-full items-center justify-center max-w-4xl">
      <Card className="w-full mt-16 bg-gray-900 shadow-inner shadow-white/30 border border-white/[0.2]">
        <CardHeader className="items-start">
          <CardTitle className="text-white">AIDA</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 font-semibold ${
                  message.role === 'user' ? 'text-blue-400 flex justify-end' : 'text-neutral-300'
                }`}
              >
                <div className="flex flex-col w-full">
                  <strong>{message.role === 'user' ? null : 'AIDA: '}</strong>
                  {message.role === 'user' ? (
                    <span className="flex justify-end">You: {message.content}</span>
                  ) : (
                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code: ({ node, inline, className, children, ...props }: any) => {
                            return (
                              <code
                                className={`${className} ${inline ? 'bg-gray-800 rounded px-1' : 'block bg-gray-800 p-2 rounded-lg my-2'}`}
                                {...props}
                              >
                                {children}
                              </code>
                            )
                          },
                          a({ node, className, children, ...props }) {
                            return (
                              <a
                                className="text-blue-400 hover:text-blue-300 underline"
                                {...props}
                              >
                                {children}
                              </a>
                            )
                          },
                          ul({ node, className, children, ...props }) {
                            return (
                              <ul
                                className="list-disc list-inside my-2"
                                {...props}
                              >
                                {children}
                              </ul>
                            )
                          },
                          ol({ node, className, children, ...props }) {
                            return (
                              <ol
                                className="list-decimal list-inside my-2"
                                {...props}
                              >
                                {children}
                              </ol>
                            )
                          }
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-white animate-pulse font-bold">AIDA is typing...</div>
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow text-white bg-gray-800"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading} className="bg-gray-300 text-slate-800 font-bold hover:bg-gray-400">
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatBox;
