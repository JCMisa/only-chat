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
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import axios from "axios";

const NewChat = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/user/get-all");
        setUsers(response.data.users);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to load users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

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
            {users.map((user) => (
              <div
                key={user.clerkId}
                className="bg-white/20 dark:bg-black/20 w-full rounded-md flex flex-col items-start gap-2 p-2 px-3 cursor-pointer"
              >
                <div className="flex items-end gap-1 w-full">
                  <Image
                    src={user.imageUrl}
                    loading="lazy"
                    blurDataURL="/blur.jpg"
                    alt="chat-profile"
                    width={26}
                    height={26}
                    className="rounded-full"
                  />
                  <p className="text-md font-semibold line-clamp-1">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <span className="text-muted-foreground text-xs line-clamp-1 w-full">
                  {user.bio ||
                    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil accusantium quae, dolor eaque explicabo dignissimos nostrum optio repellat nam nulla dolore, dolorem consectetur, molestias doloremque molestiae sint incidunt! Asperiores ea labore quaerat tempore beatae suscipit. Nobis consectetur repellat ea ut pariatur qui alias eos laudantium. Sapiente nesciunt iusto sunt vitae!"}
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
