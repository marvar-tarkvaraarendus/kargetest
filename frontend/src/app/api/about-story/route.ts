import { NextRequest, NextResponse } from "next/server";
import { getAboutStory, updateAboutStory } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { z } from "zod";

// Schema for validating about story
const aboutStorySchema = z.object({
  title: z.object({
    et: z.string().min(1, "Estonian title is required"),
    en: z.string().min(1, "English title is required"),
  }),
  content: z.object({
    et: z.string().min(1, "Estonian content is required"),
    en: z.string().min(1, "English content is required"),
  }),
});

// GET /api/about-story - Fetch about story
export async function GET() {
  try {
    const story = await getAboutStory();
    
    if (!story) {
      return NextResponse.json(
        { data: null },
        { status: 200 }
      );
    }

    return NextResponse.json({ data: story }, { status: 200 });
  } catch (error) {
    console.error("Error fetching about story:", error);
    return NextResponse.json(
      { error: "Failed to fetch about story" },
      { status: 500 }
    );
  }
}

// PUT /api/about-story - Update about story (requires auth)
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
    const validation = aboutStorySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.issues },
        { status: 400 }
      );
    }

    const story = await updateAboutStory(validation.data);
    return NextResponse.json({ data: story }, { status: 200 });
  } catch (error) {
    console.error("Error updating about story:", error);
    return NextResponse.json(
      { error: "Failed to update about story" },
      { status: 500 }
    );
  }
}
