"use client";

import { useChat } from "../../context/ChatContext";
import Image from "next/image";

const DashboardPage = () => {
  const { selectedChat } = useChat();

  if (!selectedChat) {
    return (
      <div className="flex h-full items-start justify-center">
        <p className="text-muted-foreground">
          Select a chat to start messaging
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        <Image
          src={selectedChat.img}
          alt={selectedChat.name}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">{selectedChat.name}</h2>
          <p className="text-sm text-muted-foreground">
            {selectedChat.message}
          </p>
        </div>
      </div>
      {/* Add your chat interface here */}
    </div>
  );
};

export default DashboardPage;
