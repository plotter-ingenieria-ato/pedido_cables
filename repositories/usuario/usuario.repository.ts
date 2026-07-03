import { supabaseServer } from "@/lib/supabase-server";

interface CrearUsuarioDTO {
  nombre: string;
  sap_id: string;
  password_hash: string;
  rol_id: number;
  celda_id: string | null;
}

interface ActualizarUsuarioDTO {
  nombre: string;
  sap_id: string;
  rol_id: number;
  activo: boolean;
  celda_id: string | null;
}

// ==========================
// Obtener todos los usuarios
// ==========================
export async function obtenerUsuarios() {
  const { data, error } = await supabaseServer
    .from("usuarios")
    .select(`
      id,
      nombre,
      sap_id,
      activo,
      created_at,
      rol_id,
      celda_id,
      celdas (
          nombre
      )
    `)
    .order("nombre");

  if (error) throw error;

  return data;
}

// ==========================
// Obtener usuario por ID
// ==========================
export async function obtenerUsuarioPorId(id: string) {
  const { data, error } = await supabaseServer
    .from("usuarios")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

// ==========================
// Crear usuario
// ==========================
export async function crearUsuario(
  usuario: CrearUsuarioDTO
) {
  const { data, error } = await supabaseServer
    .from("usuarios")
    .insert({
      nombre: usuario.nombre,
      sap_id: usuario.sap_id,
      password_hash: usuario.password_hash,
      rol_id: usuario.rol_id,
      celda_id: usuario.celda_id,
      activo: true,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

// ==========================
// Actualizar usuario
// ==========================
export async function actualizarUsuario(
  id: string,
  usuario: ActualizarUsuarioDTO
) {
  const { data, error } = await supabaseServer
    .from("usuarios")
    .update({
      nombre: usuario.nombre,
      sap_id: usuario.sap_id,
      rol_id: usuario.rol_id,
      celda_id: usuario.celda_id,
      activo: usuario.activo,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

// ==========================
// Cambiar contraseña
// ==========================
export async function cambiarPassword(
  id: string,
  password_hash: string
) {
  const { data, error } = await supabaseServer
    .from("usuarios")
    .update({
      password_hash,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

// ==========================
// Activar / Desactivar
// ==========================
export async function cambiarEstadoUsuario(
  id: string,
  activo: boolean
) {
  const { data, error } = await supabaseServer
    .from("usuarios")
    .update({
      activo,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

// ==========================
// Buscar usuario por SAP ID
// ==========================
export async function buscarUsuarioPorSapId(sapId: string) {
  const { data, error } = await supabaseServer
    .from("usuarios")
    .select(`
      id,
      nombre,
      sap_id,
      password_hash,
      rol_id,
      activo,
      celda_id
    `)
    .eq("sap_id", sapId)
    .single();

  if (error) {
    return null;
  }

  return data;
}