import {
  AlertDialog,
  // AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PlusIcon } from "lucide-react";
import { chatMates } from "../../constants";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

const NewChat = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <PlusIcon className="size-5 cursor-pointer hover:scale-105 transition-all" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Connection</AlertDialogTitle>
          <AlertDialogDescription>
            Disover new friends and send them a message.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ScrollArea className="h-[500px] p-1">
          <div className="flex flex-col items-center justify-center gap-3">
            {chatMates.map((chat) => (
              <div
                key={chat.id}
                className="bg-white/20 dark:bg-black/20 w-full rounded-md flex flex-col items-start gap-2 p-2 px-3 cursor-pointer"
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
            ))}
          </div>
        </ScrollArea>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NewChat;
