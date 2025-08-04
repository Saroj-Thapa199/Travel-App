// app/api/image-proxy/route.ts
import { cleanUrl } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing URL", { status: 400 });
  }

  try {
    const response = await fetch(cleanUrl(url), { cache: "no-store" });

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) {
      return new NextResponse("URL is not an image", { status: 400 });
    }

    const imageBuffer = await response.arrayBuffer();
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400", // 1 day cache
      },
    });
  } catch (err) {
    return new NextResponse("Failed to fetch image", { status: 500 });
  }
}
