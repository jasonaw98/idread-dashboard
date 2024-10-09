"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Minimize2, Maximize2, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { chatbot } from "@/app/actions/actions";

interface Message {
  text: string;
  isUser: boolean;
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput("");
      setIsLoading(true);

      try {
        const responseData = await chatbot(input);
        console.log("This is the response", responseData);

        setMessages((prev) => [...prev, { text: responseData.message, isUser: false }]);
      } catch (error) {
        console.log(error);
        setMessages((prev) => [...prev, { text: "Error fetching response", isUser: false }]);
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div
        className={`fixed right-10 bottom-20 z-50 transition-all duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div
          className={cn(
            "transition-all duration-300 ease-in-out cursor-pointer flex justify-end",
            isOpen ? "mb-2" : "mb-7"
          )}
          onClick={toggleChat}
        >
          <div className="bg-white p-3 rounded-full">
            <Bot className="h-8 w-8" />
          </div>
        </div>
        <Card className="w-80 h-96 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AIDA</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72 w-full pr-4 text-sm">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`rounded-lg p-2 max-w-[80%] ${
                      message.isUser
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg p-2 w-full max-w-[80%] bg-gray-200">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[90%] bg-gray-300" />
                      <Skeleton className="h-4 w-[80%] bg-gray-300" />
                    </div>
                  </div>
                </div>
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter className="mt-3">
            <form onSubmit={handleSubmit} className="flex w-full space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-white"
              />
              <Button type="submit">Send</Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
