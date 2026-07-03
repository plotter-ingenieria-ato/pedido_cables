import { NextRequest, NextResponse } from "next/server";
import { marcarPedidoComoCompletado } from "@/services/pedido.service";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { completado_por } = await req.json();

    const pedido = await marcarPedidoComoCompletado(
      id,
      completado_por
    );

    return NextResponse.json({
      success: true,
      pedido,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}