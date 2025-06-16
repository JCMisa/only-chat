"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoaderCircleIcon } from "lucide-react";

const Profile = () => {
  const { isLoaded, isSignedIn } = useUser(); // Just check if Clerk user is loaded/signed in
  const [profile, setProfile] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isLoaded || !isSignedIn) {
        // User not loaded or not signed in via Clerk yet
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Call your Next.js API route to get the user's profile
        // No need to send clerkId in params or body from frontend, Next.js API route handles it securely.
        const response = await axios.get("/api/user/get-one");

        setProfile(response.data.user); // Assuming your backend returns { user: {...} }
      } catch (err: any) {
        console.error("Error fetching user profile:", err);
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message || "Failed to fetch profile.");
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [isLoaded, isSignedIn]); // Re-run when Clerk auth state changes

  if (loading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <LoaderCircleIcon className="size-5 animate-spin" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data found.</div>;

  return (
    <div className="h-full p-4 py-10 flex items-center flex-col gap-4 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-xl border border-white/20 dark:border-gray-800/20 shadow-lg">
      <Image
        src={profile?.imageUrl}
        loading="lazy"
        blurDataURL="/blur.jpg"
        alt="logo"
        width={150}
        height={150}
        className="rounded-full"
      />
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-lg lg:text-2xl font-bold">
          {profile.firstName} {profile.lastName}
        </h1>
        <p className="text-sm lg:text-md text-primary">{profile.email}</p>
      </div>

      <div className="my-5">
        {profile.profileSetup ? (
          <span className="text-xs text-muted-foreground">{profile.bio}</span>
        ) : (
          <Button className="cursor-pointer">Complete your Profile</Button>
        )}
      </div>

      <Link
        href={`/profile/${profile.clerkId}`}
        className="text-xs text-primary hover:underline transition-all"
      >
        View Analytics
      </Link>
    </div>
  );
};

export default Profile;
