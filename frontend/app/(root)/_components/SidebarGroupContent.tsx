import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatMates } from "../../constants";
import { useChat } from "../../context/ChatContext";

const SidebarGroupContent = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const { selectedChatId, setSelectedChatId } = useChat();

  return (
    <ScrollArea className="h-full p-1">
      <div className="flex flex-col items-center justify-center gap-3">
        {chatMates.map((chat) => (
          <div key={chat.id} onClick={() => setSelectedChatId(chat.id)}>
            {isCollapsed ? (
              <Image
                src={chat.img}
                loading="lazy"
                blurDataURL="/blur.jpg"
                alt="chat-profile"
                width={26}
                height={26}
                className={`rounded-full cursor-pointer ${
                  selectedChatId === chat.id ? "border-2 border-primary" : ""
                }`}
              />
            ) : (
              <div
                className={`bg-background w-full rounded-2xl flex flex-col items-start gap-2 p-2 px-3 cursor-pointer ${
                  selectedChatId === chat.id ? "border-2 border-primary" : ""
                }`}
              >
                <div className="flex items-end gap-1 w-full">
                  <Image
                    src={chat.img}
                    loading="lazy"
                    blurDataURL="/blur.jpg"
                    alt="chat-profile"
                    width={26}
                    height={26}
                    className="rounded-full"
                  />
                  <p className="text-md font-semibold line-clamp-1">
                    {chat.name}
                  </p>
                </div>
                <span className="text-muted-foreground text-xs line-clamp-1 w-full">
                  {chat.message}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default SidebarGroupContent;
