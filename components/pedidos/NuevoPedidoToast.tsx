"use client";

import { Bell, FileText, User } from "lucide-react";

interface Props {
  visible: boolean;
  documento: string;
  solicitante: string;
}

export default function NuevoPedidoToast({
  visible,
  documento,
  solicitante,
}: Props) {
  return (
    <div
      className={`
        fixed
        top-6
        right-6
        z-50
        w-[380px]
        transition-all
        duration-500
        ${
          visible
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }
      `}
    >
      <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-2xl">

        {/* Encabezado */}

        <div className="flex items-center gap-3 bg-blue-700 px-5 py-4 text-white">

          <Bell
            size={24}
            className="animate-pulse"
          />

          <div>

            <h3 className="font-bold text-lg">
              Nuevo Pedido
            </h3>

            <p className="text-sm text-blue-100">
              Se ha recibido un nuevo pedido.
            </p>

          </div>

        </div>

        {/* Contenido */}

        <div className="space-y-4 p-5">

          <div className="flex items-center gap-3">

            <FileText
              size={18}
              className="text-blue-700"
            />

            <div>

              <p className="text-xs text-gray-500">
                Documento
              </p>

              <p className="font-bold text-gray-800">
                {documento}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <User
              size={18}
              className="text-blue-700"
            />

            <div>

              <p className="text-xs text-gray-500">
                Solicitante
              </p>

              <p className="font-semibold text-gray-800">
                {solicitante}
              </p>

            </div>

          </div>

        </div>

        <div className="h-1 bg-blue-700 animate-pulse" />

      </div>
    </div>
  );
}