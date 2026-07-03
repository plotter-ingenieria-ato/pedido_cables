"use client";

import EstadoBadge from "./EstadoBadge";

interface Pedido {
  id: string;
  numero_documento: string;
  fecha_pedido: string;
  fecha_entregado: string | null;
  estado: string;
  observaciones: string;
  usuarios: {
    nombre: string;
    sap_id: string;
  };
}

interface PedidoTableProps {
  pedidos: Pedido[];
  loading: boolean;
  mostrarAcciones?: boolean;
  onCompletar?: (id: string) => void;
  onEntregar?: (id: string) => void;
}

export default function PedidoTable({
  pedidos,
  loading,
  mostrarAcciones = false,
  onCompletar,
  onEntregar,
}: PedidoTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">

      <table className="w-full">

        <thead className="bg-blue-700 text-white">
          <tr>

            <th className="px-6 py-4 text-left">
              Documento
            </th>

            <th className="px-6 py-4 text-left">
              SAP ID
            </th>

            <th className="px-6 py-4 text-left">
              Solicitante
            </th>

            <th className="px-6 py-4 text-left">
              Fecha Pedido
            </th>

            <th className="px-6 py-4 text-left">
              Fecha Entregado
            </th>

            <th className="px-6 py-4 text-center">
              Estado
            </th>

            {mostrarAcciones && (
              <th className="px-6 py-4 text-center">
                Acción
              </th>
            )}

          </tr>
        </thead>

        <tbody>

          {loading && (
            <tr>
              <td
                colSpan={mostrarAcciones ? 7 : 6}
                className="text-center py-10 text-gray-600"
              >
                Cargando pedidos...
              </td>
            </tr>
          )}

          {!loading && pedidos.length === 0 && (
            <tr>
              <td
                colSpan={mostrarAcciones ? 7 : 6}
                className="text-center py-10 text-gray-500"
              >
                No hay pedidos disponibles.
              </td>
            </tr>
          )}

          {!loading &&
            pedidos.map((pedido) => (
              <tr
                key={pedido.id}
                className="border-b hover:bg-blue-50 transition-colors"
              >

                <td className="px-6 py-4 font-semibold text-gray-900">
                  {pedido.numero_documento}
                </td>

                <td className="px-6 py-4 text-gray-900">
                  {pedido.usuarios.sap_id}
                </td>

                <td className="px-6 py-4 text-gray-900">
                  {pedido.usuarios.nombre}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {new Date(
                    pedido.fecha_pedido
                  ).toLocaleString("es-SV")}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {pedido.fecha_entregado ? (
                    new Date(
                      pedido.fecha_entregado
                    ).toLocaleString("es-SV")
                  ) : (
                    <span className="text-gray-400">
                      —
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-center">
                  <EstadoBadge estado={pedido.estado} />
                </td>

                {mostrarAcciones && (
                  <td className="px-6 py-4 text-center">

                    {pedido.estado === "Pendiente" && (
                      <button
                        onClick={() => onCompletar?.(pedido.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                      >
                        Completar
                      </button>
                    )}

                    {pedido.estado === "Completo" && (
                      <button
                        onClick={() => onEntregar?.(pedido.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                      >
                        Entregar
                      </button>
                    )}

                    {pedido.estado === "Entregado" && (
                      <span className="text-green-700 font-semibold">
                        ✔ Entregado
                      </span>
                    )}

                  </td>
                )}

              </tr>
            ))}

        </tbody>

      </table>

    </div>
  );
}