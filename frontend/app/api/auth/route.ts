import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    // 1. Get authenticated user data from Clerk on the server-side
    const { userId, getToken } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const clerkSessionToken = await getToken();

    if (!clerkSessionToken) {
      return NextResponse.json(
        { message: "Clerk session token not available" },
        { status: 401 }
      );
    }

    // 2. Get the user data from the frontend request body
    const requestBody = await request.json();

    if (!requestBody.clerkId || !requestBody.email) {
      return NextResponse.json(
        { message: "Missing required user data in request body" },
        { status: 400 }
      );
    }

    // --- IMPORTANT: Your Backend URL ---
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      throw new Error(
        "NEXT_PUBLIC_BACKEND_URL is not defined in environment variables."
      );
    }
    const backendEndpoint = `${backendUrl}/api/auth/sync-user`; // Node.js backend endpoint

    // 3. Forward the request to the actual Node.js backend using Axios
    const backendResponse = await axios.post(backendEndpoint, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clerkSessionToken}`,
      },
    });

    // 4. Handle the response from your backend
    return NextResponse.json(backendResponse.data, {
      status: backendResponse.status,
    });
  } catch (error: any) {
    // Use 'any' or check error type for Axios error
    console.error("Error in /api/auth/sync-user API route:", error);

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
