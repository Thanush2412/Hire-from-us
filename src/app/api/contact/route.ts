import { NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyby4yt80n80vNm3burP41RVvREKoQeCojV6V5kU9sYuW0xPCBsUMw6AYApM23RTvV5/exec";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL;

    // Forward the data to Google Apps Script
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorText = await response.text();
      return NextResponse.json(
        { success: false, error: `Google Script responded with error: ${errorText}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit form" },
      { status: 500 }
    );
  }
}
