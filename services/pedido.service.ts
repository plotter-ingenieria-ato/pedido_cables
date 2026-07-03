import {
  crearPedido,
  obtenerPedidos,
  completarPedido,
  entregarPedido,
} from "@/repositories/pedidos/pedido.repository";

export async function guardarPedido(
  numeroDocumento: string,
  usuarioId: string,
  observaciones: string
) {
  if (!numeroDocumento.trim()) {
    throw new Error("Debe ingresar el número de documento.");
  }

  return await crearPedido({
    numero_documento: numeroDocumento,
    usuario_id: usuarioId,
    observaciones,
  });
}

// Historial
export async function listarPedidos(
  periodo: string = "todos"
) {
  return await obtenerPedidos(periodo);
}

// Almacén
export async function listarPedidosAlmacen(
  periodo: string = "hoy"
) {
  return await obtenerPedidos(periodo);
}

export async function marcarPedidoComoCompletado(
  id: string,
  completadoPor: string
) {
  return await completarPedido(id, completadoPor);
}

export async function marcarPedidoComoEntregado(
  id: string,
  entregadoPor: string
) {
  return await entregarPedido(id, entregadoPor);
}