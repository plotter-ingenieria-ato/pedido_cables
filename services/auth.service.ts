import bcrypt from "bcryptjs";
import { buscarUsuarioPorSapId } from "@/repositories/usuario/usuario.repository";
export async function login(sapId: string, password: string) {
  const usuario = await buscarUsuarioPorSapId(sapId);

  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  if (!usuario.activo) {
    throw new Error("Usuario inactivo");
  }

  const passwordValida = await bcrypt.compare(
    password,
    usuario.password_hash
  );

  if (!passwordValida) {
    throw new Error("Contraseña incorrecta");
  }

  return usuario;
}