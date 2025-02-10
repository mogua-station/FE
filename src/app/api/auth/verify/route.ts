import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/verify`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    console.log(response);

    if (!response.ok) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    return NextResponse.json({ message: "Authenticated" }, { status: 200 });
  } catch (error) {
    console.error("Auth Check Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
