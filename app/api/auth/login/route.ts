import { NextRequest, NextResponse } from "next/server";
import { login } from "@/services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const { sap_id, password } = await req.json();

    if (!sap_id || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "SAP ID y contraseña son obligatorios",
        },
        { status: 400 }
      );
    }

    const usuario = await login(sap_id, password);

    return NextResponse.json({
      success: true,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        sap_id: usuario.sap_id,
        rol_id: usuario.rol_id,
      },
    });

  } catch (error: unknown) {

    const message =
      error instanceof Error
        ? error.message
        : "Error de autenticación";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 401 }
    );
  }
}