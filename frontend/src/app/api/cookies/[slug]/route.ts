import { NextRequest, NextResponse } from "next/server";
import { getCookieBySlug, getCookieById, updateCookie, deleteCookie } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { z } from "zod";

// Schema for validating cookie updates
const updateCookieSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/).optional(),
  price: z.string().min(1).optional(),
  imagePath: z.string().min(1).optional(),
  name: z.object({
    et: z.string().min(1),
    en: z.string().min(1),
  }).optional(),
  description: z.object({
    et: z.string(),
    en: z.string(),
  }).optional(),
  ingredients: z.object({
    et: z.string(),
    en: z.string(),
  }).optional(),
});

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET /api/cookies/[slug] - Fetch a single cookie
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    
    // Try to find by slug first, then by ID
    let cookie = await getCookieBySlug(slug);
    if (!cookie) {
      cookie = await getCookieById(slug);
    }

    if (!cookie) {
      return NextResponse.json(
        { error: "Cookie not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: cookie }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cookie:", error);
    return NextResponse.json(
      { error: "Failed to fetch cookie" },
      { status: 500 }
    );
  }
}

// PUT /api/cookies/[slug] - Update a cookie (requires auth)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const body = await request.json();
    
    // Validate input
    const validation = updateCookieSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.issues },
        { status: 400 }
      );
    }

    // Find the cookie first
    let existingCookie = await getCookieBySlug(slug);
    if (!existingCookie) {
      existingCookie = await getCookieById(slug);
    }

    if (!existingCookie) {
      return NextResponse.json(
        { error: "Cookie not found" },
        { status: 404 }
      );
    }

    const updated = await updateCookie(existingCookie.id, validation.data);
    return NextResponse.json({ data: updated }, { status: 200 });
  } catch (error) {
    console.error("Error updating cookie:", error);
    return NextResponse.json(
      { error: "Failed to update cookie" },
      { status: 500 }
    );
  }
}

// DELETE /api/cookies/[slug] - Delete a cookie (requires auth)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { slug } = await params;
    
    // Find the cookie first
    let existingCookie = await getCookieBySlug(slug);
    if (!existingCookie) {
      existingCookie = await getCookieById(slug);
    }

    if (!existingCookie) {
      return NextResponse.json(
        { error: "Cookie not found" },
        { status: 404 }
      );
    }

    await deleteCookie(existingCookie.id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting cookie:", error);
    return NextResponse.json(
      { error: "Failed to delete cookie" },
      { status: 500 }
    );
  }
}
