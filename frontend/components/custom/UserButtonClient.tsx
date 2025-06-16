"use client";

import { UserButton } from "@clerk/nextjs";

const UserButtonClient = ({ user }: { user: UserType }) => {
  return (
    <div className="flex items-center gap-2">
      <UserButton afterSignOutUrl="/sign-in" />
      <div className="flex flex-col">
        <p className="text-sm font-medium">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-xs">{user.email}</p>
      </div>
    </div>
  );
};

export default UserButtonClient;
