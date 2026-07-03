import { NextResponse } from "next/server";
import { listarCeldas } from "@/services/celda.service";

export async function GET() {
  try {

    const celdas = await listarCeldas();

    return NextResponse.json({
      success: true,
      celdas,
    });

  } catch (error: any) {

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );

  }
}