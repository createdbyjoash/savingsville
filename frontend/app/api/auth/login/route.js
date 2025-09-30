import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { token, user } = body;

    const response = NextResponse.json({ success: true, user });

    // Set cookie (no NODE_ENV condition)
    response.cookies.set("savingsville-token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
