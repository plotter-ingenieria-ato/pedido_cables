import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  cambiarPassword,
  cambiarEstadoUsuario,
} from "@/repositories/usuario/usuario.repository";

import bcrypt from "bcryptjs";

// ===============================
// Listar usuarios
// ===============================
export async function listarUsuarios() {
  return await obtenerUsuarios();
}

// ===============================
// Obtener usuario por ID
// ===============================
export async function obtenerUsuario(id: string) {
  return await obtenerUsuarioPorId(id);
}

// ===============================
// Crear usuario
// ===============================
export async function guardarUsuario(
  nombre: string,
  sap_id: string,
  password: string,
  rol_id: number,
  celda_id: string | null
) {
  if (!nombre.trim()) {
    throw new Error("Debe ingresar el nombre.");
  }

  if (!sap_id.trim()) {
    throw new Error("Debe ingresar el SAP ID.");
  }

  if (!password.trim()) {
    throw new Error("Debe ingresar la contraseña.");
  }

  const password_hash = await bcrypt.hash(password, 10);

  return await crearUsuario({
    nombre,
    sap_id,
    password_hash,
    rol_id,
    celda_id
  });
}

// ===============================
// Editar usuario
// ===============================
export async function editarUsuario(
  id: string,
  nombre: string,
  sap_id: string,
  rol_id: number,
  activo: boolean,
  celda_id: string | null
) {
  return await actualizarUsuario(id, {
    nombre,
    sap_id,
    rol_id,
    activo,
    celda_id
  });
}

// ===============================
// Cambiar contraseña
// ===============================
export async function actualizarPassword(
  id: string,
  password: string
) {
  if (!password.trim()) {
    throw new Error("Debe ingresar una contraseña.");
  }

  const password_hash = await bcrypt.hash(password, 10);

  return await cambiarPassword(
    id,
    password_hash
  );
}

// ===============================
// Cambiar estado
// ===============================
export async function actualizarEstadoUsuario(
  id: string,
  activo: boolean
) {
  return await cambiarEstadoUsuario(
    id,
    activo
  );
}