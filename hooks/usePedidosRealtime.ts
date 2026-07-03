"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface PedidoRealtime {
  id: string;
}

interface Props {
  onNuevoPedido: (pedido: PedidoRealtime) => void;
}

export function usePedidosRealtime({
  onNuevoPedido,
}: Props) {

  useEffect(() => {

    console.log("🔔 Realtime iniciado");

    const channel = supabase
      .channel("pedidos-debug")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "pedidos",
        },
        (payload) => {

          console.log("🔥 EVENTO RECIBIDO");
          console.log(payload);

          if (payload.eventType === "INSERT") {
            onNuevoPedido(payload.new as PedidoRealtime);
          }

        }
      )
      .subscribe((status) => {

        console.log("Estado:", status);

      });

    return () => {

      supabase.removeChannel(channel);

    };

  }, [onNuevoPedido]);

}