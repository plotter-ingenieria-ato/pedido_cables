"use client";

import { useState } from "react";
import { useNotificationSound } from "./useNotificationSound";
import { obtenerPedidoNotificacion } from "@/services/notification.service";

interface NotificationData {
  documento: string;
  solicitante: string;
}

export function useNotificationCenter() {
  const { playNuevoPedido } = useNotificationSound();

  const [toastVisible, setToastVisible] = useState(false);

  const [notification, setNotification] = useState<NotificationData>({
    documento: "",
    solicitante: "",
  });

  async function mostrar(id: string) {
    try {
      const pedido = await obtenerPedidoNotificacion(id);

      if (!pedido) return;

      console.log("Nueva notificación:", pedido);

      playNuevoPedido();

      setNotification({
        documento: pedido.documento,
        solicitante: pedido.solicitante,
      });

      setToastVisible(true);

      setTimeout(() => {
        setToastVisible(false);
      }, 5000);

    } catch (error) {
      console.error("Error al mostrar notificación:", error);
    }
  }

  return {
    toastVisible,
    notification,
    mostrar,
  };
}