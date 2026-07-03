import { NextRequest, NextResponse } from "next/server";
import { marcarPedidoComoEntregado } from "@/services/pedido.service";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await params;

    const { entregado_por } = await req.json();

    const pedido =
      await marcarPedidoComoEntregado(
        id,
        entregado_por
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