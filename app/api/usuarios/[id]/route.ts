import { NextRequest, NextResponse } from "next/server";

import {
  obtenerUsuario,
  editarUsuario,
  actualizarEstadoUsuario,
  actualizarPassword,
} from "@/services/usuario.service";

// ==========================
// Obtener un usuario
// ==========================
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await params;

    const usuario = await obtenerUsuario(id);

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
        status: 404,
      }
    );

  }

}

// ==========================
// Editar usuario
// ==========================
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await params;

    const body = await req.json();

    // Cambio de contraseña
    if (body.password) {

      const usuario = await actualizarPassword(
        id,
        body.password
      );

      return NextResponse.json({
        success: true,
        usuario,
      });

    }

    // Edición general
    const usuario = await editarUsuario(
      id,
      body.nombre,
      body.sap_id,
      body.rol_id,
      body.activo,
      body.celda_id
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