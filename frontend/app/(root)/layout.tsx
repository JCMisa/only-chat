import { cookies } from "next/headers";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React, { ReactNode, Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import ModeToggle from "@/components/ModeToggle";
import { AppSidebar } from "./_components/AppSidebar";
import Image from "next/image";
import Profile from "./_components/Profile";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const clerkUser = await currentUser();

  const user = {
    userId: clerkUser?.userId,
    firstName: clerkUser?.firstName,
    lastName: clerkUser?.lastName,
    email: clerkUser?.primaryEmailAddress?.emailAddress,
    imageUrl: clerkUser?.imageUrl,
  } as UserType;

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <article className="grid grid-cols-5">
      <SidebarProvider
        defaultOpen={defaultOpen}
        style={
          {
            "--sidebar-width": "20rem",
            "--sidebar-width-mobile": "20rem",
          } as Record<string, string>
        }
        className="col-span-4"
      >
        <AppSidebar variant="floating" collapsible="icon" />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <ModeToggle bg="transparent" />
            </div>
            <div className="flex items-center gap-2">
              <Suspense fallback={"loading..."}>
                <UserButton />
              </Suspense>
              <div className="flex flex-col">
                <p className="text-sm font-medium">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs">{user.email}</p>
              </div>
            </div>
          </header>
          <main className="flex h-full w-full flex-col overflow-hidden p-5">
            <div className="flex h-full w-full flex-1 overflow-hidden">
              <div className="flex h-full w-full flex-1 overflow-hidden">
                {children}
              </div>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
      <section className="p-2 h-full hidden lg:block">
        <Profile user={user} />
      </section>
    </article>
  );
};

export default DashboardLayout;
