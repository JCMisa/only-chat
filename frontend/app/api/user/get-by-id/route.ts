import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { getToken } = getAuth(request);
    const { clerkId } = await request.json(); // Properly destructure clerkId from request body

    if (!clerkId) {
      return NextResponse.json(
        { message: "clerkId is required" },
        { status: 400 }
      );
    }

    const clerkSessionToken = await getToken();

    if (!clerkSessionToken) {
      return NextResponse.json(
        { message: "Authentication token not available" },
        { status: 401 }
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
      throw new Error("Backend URL not configured");
    }

    // Make sure this matches your backend route exactly
    const backendEndpoint = `${backendUrl}/api/users/${clerkId}`;

    const backendResponse = await axios.get(backendEndpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clerkSessionToken}`,
      },
    });

    return NextResponse.json(backendResponse.data);
  } catch (error: any) {
    console.error("Error in /api/user/get-by-id route:", error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { message: error.response.data.message },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { message: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
