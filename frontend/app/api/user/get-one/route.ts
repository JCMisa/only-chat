import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    // 1. Get authenticated user information from Clerk on the server-side
    // This is the secure way to get the logged-in user's Clerk ID and token.
    const { userId, getToken } = getAuth(request);

    if (!userId) {
      // If no userId, the user is not authenticated by Clerk.
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get the Clerk session token to forward to your Node.js backend for verification
    const clerkSessionToken = await getToken();

    if (!clerkSessionToken) {
      return NextResponse.json(
        { message: "Clerk session token not available" },
        { status: 401 }
      );
    }

    // --- IMPORTANT: Your Node.js Backend URL ---
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;

    console.log("DEBUG: NEXT_PUBLIC_BACKEND_URL resolved to:", backendUrl);

    if (!backendUrl) {
      throw new Error(
        "NEXT_PUBLIC_BACKEND_URL is not defined in environment variables."
      );
    }

    // Your Node.js backend endpoint to get user profile by Clerk ID
    // We pass the clerkId as a URL parameter to the backend
    const backendEndpoint = `${backendUrl}/api/auth/profile/${userId}`;

    // 2. Forward the request to your Node.js backend using Axios
    const backendResponse = await axios.get(backendEndpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clerkSessionToken}`,
      },
    });

    // 3. Return the response data from your backend to the frontend
    return NextResponse.json(backendResponse.data, {
      status: backendResponse.status,
    });
  } catch (error: any) {
    console.error("Error in /api/user/get-one API route:", error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
