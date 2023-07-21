import { routerClient } from "lib/supabase/server";
//import supabase  from "lib/supabase/client"
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let slug;
  try {
    const { searchParams } = new URL(req.url);
    slug = searchParams.get("slug");
    if (!slug) {
      const url = new URL(req.url);
      slug = url.pathname.substring(url.pathname.lastIndexOf("/") + 1);
    }

    const supabase = routerClient();
    await supabase.rpc("increment_page_view", {
      page_slug: slug,
    });
    return new NextResponse("OK!");
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to increment page`, {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  let slug;
  try {
    const { searchParams } = new URL(req.url);
    slug = searchParams.get("slug");
    if (!slug) {
      const url = new URL(req.url);
      slug = url.pathname.substring(url.pathname.lastIndexOf("/") + 1);
    }

    const supabase = routerClient();
    const { data } = await supabase
      .from("pageviews")
      .select("view_count")
      .eq("slug", slug);

    const total = data?.reduce((acc, row) => acc + row.view_count, 0);

    return NextResponse.json({ total });
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to increment page`, {
      status: 500,
    });
  }
}
