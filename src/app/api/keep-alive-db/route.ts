import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-client";

export async function GET(request: NextRequest) {
  try {
    // This endpoint can be used to keep the database connection alive
    // as supabase can pause the db due to inactivity.

    const supabase = createClient();

    // Efficient lightweight query: just count rows without fetching data
    const { count } = await supabase
      .from("profiles")
      .select("id", { count: "exact", head: true });

    return NextResponse.json({
      success: true,
      message: "Database is active",
      count,
    });
  } catch (error) {
    console.error("Keep-alive error:", error);
    return NextResponse.json(
      { success: false, error: "Database is paused" },
      { status: 500 },
    );
  }
}
