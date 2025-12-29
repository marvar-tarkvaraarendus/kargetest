import { NextResponse } from "next/server";
import { logout } from "@/lib/auth";

// POST /api/auth/logout - Admin logout
export async function POST() {
  try {
    await logout();
    return NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    );
  }
}
