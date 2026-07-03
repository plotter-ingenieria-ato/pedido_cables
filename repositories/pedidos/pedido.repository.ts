import { supabaseServer } from "@/lib/supabase-server";

interface CrearPedidoDTO {
  numero_documento: string;
  usuario_id: string;
  observaciones: string;
}

export async function crearPedido(data: CrearPedidoDTO) {
  const { data: pedido, error } = await supabaseServer
    .from("pedidos")
    .insert({
      numero_documento: data.numero_documento,
      usuario_id: data.usuario_id,
      observaciones: data.observaciones,
      estado: "Pendiente",
      fecha_pedido: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;

  return pedido;
}

export async function obtenerPedidos(periodo: string = "todos") {
  let consulta = supabaseServer
    .from("pedidos")
    .select(`
      id,
      numero_documento,
      fecha_pedido,
      fecha_entregado,
      estado,
      observaciones,
      usuarios!fk_pedidos_usuario (
        nombre,
        sap_id
      )
    `);

  const hoy = new Date();

  switch (periodo) {
    case "hoy": {
      const inicio = new Date(hoy);
      inicio.setHours(0, 0, 0, 0);

      const fin = new Date(inicio);
      fin.setDate(fin.getDate() + 1);

      consulta = consulta
        .gte("fecha_pedido", inicio.toISOString())
        .lt("fecha_pedido", fin.toISOString());
      break;
    }

    case "ayer": {
      const inicio = new Date(hoy);
      inicio.setDate(inicio.getDate() - 1);
      inicio.setHours(0, 0, 0, 0);

      const fin = new Date(inicio);
      fin.setDate(fin.getDate() + 1);

      consulta = consulta
        .gte("fecha_pedido", inicio.toISOString())
        .lt("fecha_pedido", fin.toISOString());
      break;
    }

    case "7dias": {
      const inicio = new Date(hoy);
      inicio.setDate(inicio.getDate() - 7);

      consulta = consulta.gte(
        "fecha_pedido",
        inicio.toISOString()
      );
      break;
    }

    case "mes": {
      const inicio = new Date(
        hoy.getFullYear(),
        hoy.getMonth(),
        1
      );

      consulta = consulta.gte(
        "fecha_pedido",
        inicio.toISOString()
      );
      break;
    }

    case "todos":
    default:
      break;
  }

  const { data, error } = await consulta.order(
    "fecha_pedido",
    {
      ascending: false,
    }
  );

  if (error) throw error;

  return data;
}

export async function completarPedido(
  id: string,
  completadoPor: string
) {
  const { data, error } = await supabaseServer
    .from("pedidos")
    .update({
      estado: "Completo",
      fecha_completado: new Date().toISOString(),
      completado_por: completadoPor,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function entregarPedido(
  id: string,
  entregadoPor: string
) {
  const { data, error } = await supabaseServer
    .from("pedidos")
    .update({
      estado: "Entregado",
      fecha_entregado: new Date().toISOString(),
      entregado_por: entregadoPor,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}