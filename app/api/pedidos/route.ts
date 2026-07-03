import { NextRequest, NextResponse } from "next/server";
import {
  guardarPedido,
  listarPedidos,
  listarPedidosAlmacen,
} from "@/services/pedido.service";

// Obtener pedidos
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const almacen = searchParams.get("almacen") === "true";

    const periodo = searchParams.get("periodo") ?? "hoy";

    const pedidos = almacen
      ? await listarPedidosAlmacen(periodo)
      : await listarPedidos(periodo);

    return NextResponse.json({
      success: true,
      pedidos,
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

// Crear pedido
export async function POST(req: NextRequest) {
  try {

    const {
      numero_documento,
      usuario_id,
      observaciones,
    } = await req.json();

    const pedido = await guardarPedido(
      numero_documento,
      usuario_id,
      observaciones
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