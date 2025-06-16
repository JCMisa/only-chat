"use client";

import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

function SyncUser() {
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    // Only proceed if Clerk user data is loaded and the user is signed in
    if (isLoaded && isSignedIn && user) {
      // --- IMPORTANT: Prevent Redundant Syncs ---
      // We use localStorage to keep track if this specific user has been synced.
      // This prevents multiple sync calls within the same browser session/tab.
      const SYNC_KEY = `clerk_user_synced_${user.id}`;

      // Check if the user has already been marked as synced
      if (localStorage.getItem(SYNC_KEY) === "true") {
        return; // Exit early if already synced
      }

      const syncUserData = async () => {
        try {
          const userDataToSend = {
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
          };

          const response = await axios.post("/api/auth", userDataToSend, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          console.log(
            "User data synced successfully with backend!",
            response.data
          );
          // --- Mark as synced on SUCCESS ---
          // Set the flag in localStorage so it doesn't sync again in this session
          localStorage.setItem(SYNC_KEY, "true");
        } catch (error: any) {
          console.error("Error during user data synchronization:", error);
          if (axios.isAxiosError(error) && error.response) {
            if (
              error.response.status === 409 &&
              error.response.data.message ===
                "A user with this email already exists."
            ) {
              console.warn(
                "User already exists in DB (likely synced by another tab or previous attempt). Marking as synced."
              );
              localStorage.setItem(SYNC_KEY, "true"); // Mark as synced
            } else {
              console.error(
                "Failed to sync user data:",
                error.response.data.message
              );
            }
          } else {
            console.error("An unexpected error occurred.");
          }
        }
      };

      // Call the sync function when conditions are met and not already synced
      syncUserData();
    }
  }, [isLoaded, isSignedIn, user]);

  return null;
}

export default SyncUser;
