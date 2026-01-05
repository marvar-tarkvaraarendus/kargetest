import { NextRequest, NextResponse } from "next/server";
import { getOpeningTimes, updateOpeningTimes } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { z } from "zod";

// Time format: HH:MM or "closed"
const timeString = z.string().refine(
  (val) => val === "closed" || /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val),
  "Time must be in HH:MM format or 'closed'"
);

// Schema for validating opening times
const openingTimesSchema = z.record(
  z.object({
    open: timeString,
    close: timeString,
  })
);

// GET /api/opening-times - Fetch opening times
export async function GET() {
  try {
    const times = await getOpeningTimes();
    
    if (!times) {
      return NextResponse.json(
        { data: null },
        { status: 200 }
      );
    }

    return NextResponse.json({ data: times }, { status: 200 });
  } catch (error) {
    console.error("Error fetching opening times:", error);
    return NextResponse.json(
      { error: "Failed to fetch opening times" },
      { status: 500 }
    );
  }
}

// PUT /api/opening-times - Update opening times (requires auth)
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
    const validation = openingTimesSchema.safeParse(body.content);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.issues },
        { status: 400 }
      );
    }

    const times = await updateOpeningTimes(validation.data);
    return NextResponse.json({ data: times }, { status: 200 });
  } catch (error) {
    console.error("Error updating opening times:", error);
    return NextResponse.json(
      { error: "Failed to update opening times" },
      { status: 500 }
    );
  }
}
