"use client";

import * as React from "react";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Settings,
  Bell,
  MessageSquare,
  BadgeCheck,
  UserCog,
  LineChart,
  StethoscopeIcon,
  DollarSignIcon,
  UserIcon,
  PlusIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroupLabel,
  SidebarGroupAction,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import LogoFull from "@/components/custom/LogoFull";
import Image from "next/image";
import { SearchForm } from "./SearchForm";
import SidebarGroupContent from "./SidebarGroupContent";
import NewChat from "./NewChat";

const menuItems = {
  patient: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard className="w-4 h-4 mr-2" />,
    },
    {
      title: "My Doctors",
      url: "/my-checkups",
      icon: <StethoscopeIcon className="w-4 h-4 mr-2" />,
    },
    {
      title: "My Profile",
      url: "/profile",
      icon: <UserIcon className="w-4 h-4 mr-2" />,
    },
    {
      title: "Subscription",
      url: "/subscription",
      icon: <DollarSignIcon className="w-4 h-4 mr-2" />,
    },
    {
      title: "Messages",
      url: "/messages",
      icon: <MessageSquare className="w-4 h-4 mr-2" />,
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: <Bell className="w-4 h-4 mr-2" />,
    },
  ],
  admin: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard className="w-4 h-4 mr-2" />,
    },
    {
      title: "User Management",
      url: "/admin/users",
      icon: <UserCog className="w-4 h-4 mr-2" />,
    },
    {
      title: "Profile Approvals",
      url: "/admin/profile-approvals",
      icon: <BadgeCheck className="w-4 h-4 mr-2" />,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: <LineChart className="w-4 h-4 mr-2" />,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: <Settings className="w-4 h-4 mr-2" />,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  variant: string;
  collapsible: string;
}

export function AppSidebar({
  variant = "floating",
  collapsible = "icon",
}: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar variant={variant} collapsible={collapsible}>
      <SidebarHeader>
        <div
          className={`mb-3 ${isCollapsed ? "flex justify-center mt-3" : ""}`}
        >
          {!isCollapsed ? (
            <div className="flex items-center justify-between gap-2">
              <LogoFull width={20} height={20} textSize="lg" />
              <NewChat />
            </div>
          ) : (
            <Link href="/">
              <Image
                src="/logo.svg"
                loading="lazy"
                blurDataURL="/blur.jpg"
                alt="logo"
                width={20}
                height={20}
              />
            </Link>
          )}
        </div>
        {!isCollapsed ? <SearchForm /> : <Separator />}
      </SidebarHeader>
      <SidebarContent className="remove-scrollbar">
        <SidebarGroup>
          <SidebarGroupContent isCollapsed={isCollapsed} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
