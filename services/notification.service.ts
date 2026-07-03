import { supabase } from "@/lib/supabase";

export interface PedidoNotificacion {
  documento: string;
  solicitante: string;
}

export async function obtenerPedidoNotificacion(
  id: string
): Promise<PedidoNotificacion | null> {

  const { data, error } = await supabase
    .from("pedidos")
    .select(`
      numero_documento,
      usuarios!fk_pedidos_usuario (
        nombre
      )
    `)
    .eq("id", id)
    .single();
      console.log("Notificación:", data);
  if (error) {
    console.error("Error obteniendo notificación:", error);
    return null;
  }

  const usuario = Array.isArray(data.usuarios)
    ? data.usuarios[0]
    : data.usuarios;

  return {
    documento: data.numero_documento,
    solicitante: usuario?.nombre ?? "",
  };
}