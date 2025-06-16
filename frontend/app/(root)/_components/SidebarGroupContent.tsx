import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "../../context/ChatContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoaderCircleIcon } from "lucide-react";

const SidebarGroupContent = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const { selectedChatId, setSelectedChatId } = useChat();
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
    return (
      <div className="flex items-center justify-center w-full">
        <LoaderCircleIcon className="size-5 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <ScrollArea className="h-full w-full p-1">
      <div className="flex flex-col items-center justify-center gap-3 w-full">
        {users.map((user) => (
          <div
            key={user.clerkId}
            onClick={() => setSelectedChatId(user.clerkId)}
            className="w-full"
          >
            {isCollapsed ? (
              <Image
                src={user.imageUrl}
                loading="lazy"
                blurDataURL="/blur.jpg"
                alt="user-profile"
                width={26}
                height={26}
                className={`rounded-full cursor-pointer ${
                  selectedChatId === user.clerkId
                    ? "border-2 border-primary"
                    : ""
                }`}
              />
            ) : (
              <div
                className={`bg-background min-w-full rounded-2xl flex flex-col items-start gap-2 p-2 px-3 cursor-pointer ${
                  selectedChatId === user.clerkId
                    ? "border-2 border-primary"
                    : ""
                }`}
              >
                <div className="flex items-end gap-1 w-full">
                  <Image
                    src={user.imageUrl}
                    loading="lazy"
                    blurDataURL="/blur.jpg"
                    alt="user-profile"
                    width={26}
                    height={26}
                    className="rounded-full"
                  />
                  <p className="text-md font-semibold line-clamp-1">
                    {`${user.firstName} ${user.lastName}`}
                  </p>
                </div>
                <span className="text-muted-foreground text-xs line-clamp-1 w-full">
                  {user.bio ||
                    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil accusantium quae, dolor eaque explicabo dignissimos nostrum optio repellat nam nulla dolore, dolorem consectetur, molestias doloremque molestiae sint incidunt! Asperiores ea labore quaerat tempore beatae suscipit. Nobis consectetur repellat ea ut pariatur qui alias eos laudantium. Sapiente nesciunt iusto sunt vitae!"}
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
