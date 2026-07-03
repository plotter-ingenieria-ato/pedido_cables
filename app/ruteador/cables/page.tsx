"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";

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

export default function RuteadorPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [buscar, setBuscar] = useState("");

  async function cargarPedidos() {
    try {
      const response = await fetch("/api/pedidos?periodo=hoy");
      const data = await response.json();

      if (data.success) {
        setPedidos(data.pedidos);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarPedidos();
  }, []);

  const pedidosFiltrados = pedidos.filter((pedido) =>
    pedido.numero_documento
      .toLowerCase()
      .includes(buscar.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">

        {/* Encabezado */}

        <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

          <div>

            <h1 className="text-3xl font-bold text-blue-700">
              Pedidos de Cables
            </h1>

            <p className="text-gray-700 mt-2 font-medium">
              Administración de pedidos del área de ruteo
            </p>

          </div>

          <Link
            href="/ruteador/cables/nuevo"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
          >
            + Nuevo Pedido
          </Link>

        </div>

        {/* Buscador */}

        <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6">

          <label className="block text-base font-bold text-gray-900 mb-2">
            Buscar pedido
          </label>

          <input
            type="text"
            placeholder="Buscar por número de documento..."
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            className="
              w-full
              rounded-lg
              border-2
              border-gray-300
              px-4
              py-3
              text-gray-900
              font-medium
              placeholder:text-gray-500
              focus:border-blue-600
              focus:ring-2
              focus:ring-blue-300
              outline-none
            "
          />

        </div>

        {/* Tabla */}

        <div className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-blue-700 text-white">

                <tr>

                  <th className="px-6 py-4 text-left font-semibold">
                    Documento
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    SAP ID
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Solicitante
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Fecha Pedido
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Fecha Entregado
                  </th>

                  <th className="px-6 py-4 text-center font-semibold">
                    Estado
                  </th>

                </tr>

              </thead>

              <tbody>

                {loading && (

                  <tr>

                    <td
                      colSpan={6}
                      className="text-center py-10 text-gray-600"
                    >
                      Cargando pedidos...
                    </td>

                  </tr>

                )}

                {!loading && pedidosFiltrados.length === 0 && (

                  <tr>

                    <td
                      colSpan={6}
                      className="text-center py-10 text-gray-500"
                    >
                      No existen pedidos registrados.
                    </td>

                  </tr>

                )}

                {!loading &&
                  pedidosFiltrados.map((pedido) => (

                    <tr
                      key={pedido.id}
                      className="border-b hover:bg-blue-50 transition-colors"
                    >

                      <td className="px-6 py-4 font-semibold text-blue-700">
                        {pedido.numero_documento}
                      </td>

                      <td className="px-6 py-4 text-gray-900">
                        {pedido.usuarios.sap_id}
                      </td>

                      <td className="px-6 py-4 text-gray-900 font-medium">
                        {pedido.usuarios.nombre}
                      </td>

                      <td className="px-6 py-4 text-gray-900">
                        {new Date(
                          pedido.fecha_pedido
                        ).toLocaleString("es-SV")}
                      </td>

                      <td className="px-6 py-4 text-gray-900">
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

                        <span
                          className={`px-4 py-2 rounded-full text-xs font-bold
                            ${
                              pedido.estado === "Pendiente"
                                ? "bg-yellow-100 text-yellow-800"
                                : pedido.estado === "Completo"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                        >
                          {pedido.estado}
                        </span>

                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </Layout>
  );
}