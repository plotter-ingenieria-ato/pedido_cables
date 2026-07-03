import { NextRequest, NextResponse } from "next/server";

import {
  listarUsuarios,
  guardarUsuario,
} from "@/services/usuario.service";

// ==========================
// Obtener usuarios
// ==========================
export async function GET() {
  try {

    const usuarios = await listarUsuarios();

    return NextResponse.json({
      success: true,
      usuarios,
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

// ==========================
// Crear usuario
// ==========================
export async function POST(req: NextRequest) {

  try {

    const {
      nombre,
      sap_id,
      password,
      rol_id,
      celda_id
    } = await req.json();

    const usuario = await guardarUsuario(
      nombre,
      sap_id,
      password,
      rol_id,
      celda_id
    );

    return NextResponse.json({
      success: true,
      usuario,
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