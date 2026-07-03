import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("usuarios")
      .select("*");

    return NextResponse.json({
      data,
      error,
    });
  } catch (e: any) {
    return NextResponse.json({
      message: e.message,
      stack: e.stack,
    });
  }
}