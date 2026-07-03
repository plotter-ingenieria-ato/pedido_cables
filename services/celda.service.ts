import { obtenerCeldas } from "@/repositories/celdas/celda.repository";

export async function listarCeldas() {
  return await obtenerCeldas();
}