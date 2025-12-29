import { NextRequest, NextResponse } from "next/server";
import { getAllCookies, createCookie } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { z } from "zod";

// Schema for validating cookie creation
const createCookieSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  price: z.string().min(1),
  imagePath: z.string().min(1),
  name: z.object({
    et: z.string().min(1),
    en: z.string().min(1),
  }),
  description: z.object({
    et: z.string(),
    en: z.string(),
  }),
  ingredients: z.object({
    et: z.string(),
    en: z.string(),
  }),
});

// GET /api/cookies - Fetch all cookies
export async function GET() {
  try {
    const cookies = await getAllCookies();
    return NextResponse.json({ data: cookies }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cookies:", error);
    return NextResponse.json(
      { error: "Failed to fetch cookies" },
      { status: 500 }
    );
  }
}

// POST /api/cookies - Create a new cookie (requires auth)
export async function POST(request: NextRequest) {
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
    const validation = createCookieSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.issues },
        { status: 400 }
      );
    }

    const cookie = await createCookie(validation.data);
    return NextResponse.json({ data: cookie }, { status: 201 });
  } catch (error) {
    console.error("Error creating cookie:", error);
    
    // Handle unique constraint violation
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "A cookie with this slug already exists" },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create cookie" },
      { status: 500 }
    );
  }
}
