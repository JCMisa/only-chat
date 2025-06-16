"use client";

import React, { useEffect, useState } from "react";
import { useChat } from "../../context/ChatContext";
import Image from "next/image";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendIcon, LoaderCircleIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Message {
  id: string;
  content: string;
  isMe: boolean;
  timestamp: string;
}

const DashboardPage = () => {
  const { selectedChatId } = useChat();
  const { isLoaded } = useUser();
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hey there! 👋",
      isMe: false,
      timestamp: "2 minutes ago",
    },
    {
      id: "2",
      content: "Hi! How are you?",
      isMe: true,
      timestamp: "1 minute ago",
    },
    {
      id: "3",
      content: "I'm doing great! Just working on some new features.",
      isMe: false,
      timestamp: "1 minute ago",
    },
    {
      id: "4",
      content: "That sounds interesting! What kind of features?",
      isMe: true,
      timestamp: "just now",
    },
    {
      id: "5",
      content:
        "I'm working on improving the chat functionality and making it more responsive!",
      isMe: false,
      timestamp: "just now",
    },
    {
      id: "6",
      content: "That's awesome! How's the progress so far?",
      isMe: true,
      timestamp: "just now",
    },
    {
      id: "7",
      content: "It's going well! We've implemented real-time messaging.",
      isMe: false,
      timestamp: "just now",
    },
    {
      id: "8",
      content: "Does it include file sharing capabilities?",
      isMe: true,
      timestamp: "just now",
    },
    {
      id: "9",
      content: "Not yet, but that's next on our roadmap!",
      isMe: false,
      timestamp: "just now",
    },
    {
      id: "10",
      content: "Looking forward to testing that feature!",
      isMe: true,
      timestamp: "just now",
    },
    {
      id: "11",
      content: "We'll also add emoji reactions soon.",
      isMe: false,
      timestamp: "just now",
    },
    {
      id: "12",
      content: "That would make conversations more engaging!",
      isMe: true,
      timestamp: "just now",
    },
    {
      id: "13",
      content: "Exactly! User engagement is our priority.",
      isMe: false,
      timestamp: "just now",
    },
    {
      id: "14",
      content: "Are you planning to add voice messages too?",
      isMe: true,
      timestamp: "just now",
    },
    {
      id: "15",
      content: "Yes, that's in our long-term plans!",
      isMe: false,
      timestamp: "just now",
    },
    {
      id: "16",
      content: "The app is really coming together nicely!",
      isMe: true,
      timestamp: "just now",
    },
    {
      id: "17",
      content: "Thanks! We're working hard on it.",
      isMe: false,
      timestamp: "just now",
    },
    {
      id: "18",
      content: "Any other exciting features planned?",
      isMe: true,
      timestamp: "just now",
    },
    {
      id: "19",
      content: "We're considering adding group chats!",
      isMe: false,
      timestamp: "just now",
    },
    {
      id: "20",
      content: "That would be fantastic!",
      isMe: true,
      timestamp: "just now",
    },
  ]);

  // --------------------------------------------------------------------------------

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      isMe: true,
      timestamp: "just now",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageText("");

    // Mock response after 1 second
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message! This is a mock response.",
        isMe: false,
        timestamp: "just now",
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 1000);
  };

  // --------------------------------------------------------------------------------

  useEffect(() => {
    const fetchSelectedUser = async () => {
      if (!isLoaded || !selectedChatId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await axios.post(`/api/user/get-by-id`, {
          clerkId: selectedChatId, // Send as an object with clerkId property
        });

        setSelectedUser(response.data.user);
      } catch (err: any) {
        console.error("Error fetching selected user:", err);
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message || "Failed to fetch user.");
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSelectedUser();
  }, [isLoaded, selectedChatId]);

  if (!selectedChatId) {
    return (
      <div className="flex h-full items-start justify-center">
        <p className="text-muted-foreground">
          Select a chat to start messaging
        </p>
      </div>
    );
  }

  if (loading)
    return (
      <div className="flex items-center justify-center w-full">
        <LoaderCircleIcon className="size-5 animate-spin" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!selectedUser) return <div>No user data found.</div>;

  return (
    <div className="flex flex-col h-[43rem] overflow-hidden w-full">
      {/* Header section */}
      <div className="flex items-center gap-4 p-4 border-b shrink-0">
        <Image
          src={selectedUser.imageUrl}
          alt={selectedUser.email}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">
            {selectedUser.firstName} {selectedUser.lastName}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {selectedUser.bio || "No bio available"}
          </p>
        </div>
      </div>

      {/* Messages section */}
      <ScrollArea
        className="flex-1 px-4 overflow-y-auto no-scrollbar"
        type="always"
      >
        <div className="flex flex-col gap-4 py-4 overflow-y-auto no-scrollbar">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.isMe
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="break-words">{message.content}</p>
                <span className="text-xs opacity-70 block mt-1">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input section */}
      <div className="border-t p-4 shrink-0">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className="px-4"
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
