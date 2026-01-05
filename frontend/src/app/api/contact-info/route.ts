import { NextRequest, NextResponse } from "next/server";
import { getContactInfo, updateContactInfo } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { z } from "zod";

// Schema for validating contact info
const contactInfoSchema = z.object({
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
});

// GET /api/contact-info - Fetch contact info
export async function GET() {
  try {
    const info = await getContactInfo();
    
    if (!info) {
      return NextResponse.json(
        { data: null },
        { status: 200 }
      );
    }

    return NextResponse.json({ data: info }, { status: 200 });
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact info" },
      { status: 500 }
    );
  }
}

// PUT /api/contact-info - Update contact info (requires auth)
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate input
    const validation = contactInfoSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.issues },
        { status: 400 }
      );
    }

    const info = await updateContactInfo(validation.data);
    return NextResponse.json({ data: info }, { status: 200 });
  } catch (error) {
    console.error("Error updating contact info:", error);
    return NextResponse.json(
      { error: "Failed to update contact info" },
      { status: 500 }
    );
  }
}
