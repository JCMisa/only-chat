"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { chatMates } from "../constants";

type ChatContextType = {
  selectedChatId: string | null;
  setSelectedChatId: (id: string | null) => void;
  selectedChat: (typeof chatMates)[0] | null;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const selectedChat = selectedChatId
    ? chatMates.find((chat) => chat.id === selectedChatId)
    : null;

  return (
    <ChatContext.Provider
      value={{ selectedChatId, setSelectedChatId, selectedChat }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
