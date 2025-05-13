"use client";
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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Trash2Icon } from "lucide-react";

interface Message {
  role: "user" | "assistant";
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
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_ZYGY_STRREAM_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          querySearch: input,
          serviceAccount: "gov",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const reader = response.body?.getReader();

      // Initialize an empty assistant message
      const initialMessage: Message = {
        role: "assistant",
        content: "",
      };
      setMessages((prev) => [...prev, initialMessage]);

      if (!reader) {
        throw new Error("No reader available");
      }

      // Read the stream
      let accumulatedText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Convert the chunk to text and accumulate it
        const chunk = new TextDecoder().decode(value);
        accumulatedText += chunk;

        // Update the last message with accumulated text
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: "assistant",
            content: accumulatedText,
          };
          return newMessages;
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      // Add error message
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error while processing your request.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center max-w-4xl">
      <Card className="w-full bg-gray-900 shadow-inner shadow-white/30 border border-white/[0.2]">
        <CardHeader className="items-start">
          <CardTitle className="text-white justify-between flex w-full">
            AIDA
            <Button
              className="bg-red-400 hover:bg-red-500 text-slate-800 font-bold stroke-2"
              onClick={() => setMessages([])}
            >
              <Trash2Icon className="size-5" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] md:h-[500px] pr-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 font-semibold ${
                  message.role === "user"
                    ? "text-blue-400 flex justify-end"
                    : "text-neutral-300 text-left max-w-[80%] flex justify-start"
                }`}
              >
                <div className="flex flex-col w-full">
                  {message.role === "user" ? (
                    <span className="flex justify-end">
                      You: {message.content}
                    </span>
                  ) : (
                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code: ({
                            node,
                            inline,
                            className,
                            children,
                            ...props
                          }: any) => {
                            return (
                              <code
                                className={`${className} ${
                                  inline
                                    ? "bg-gray-800 rounded px-1"
                                    : "block bg-gray-800 p-2 rounded-lg my-2"
                                }`}
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          },
                          a({ node, className, children, ...props }) {
                            return (
                              <a
                                className="text-blue-400 hover:text-blue-300 underline"
                                {...props}
                              >
                                {children}
                              </a>
                            );
                          },
                          ul({ node, className, children, ...props }) {
                            return (
                              <ul
                                className="list-disc list-inside my-2"
                                {...props}
                              >
                                {children}
                              </ul>
                            );
                          },
                          ol({ node, className, children, ...props }) {
                            return (
                              <ol
                                className="list-decimal list-inside my-2"
                                {...props}
                              >
                                {children}
                              </ol>
                            );
                          },
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
              <div className="text-white animate-pulse font-bold">
                AIDA is typing...
              </div>
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
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gray-300 text-slate-800 font-bold hover:bg-gray-400"
            >
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatBox;
