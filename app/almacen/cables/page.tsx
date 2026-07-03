"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import PedidoTable from "@/components/pedidos/PedidoTable";
import PedidoFilters from "@/components/pedidos/PedidoFilters";
import NuevoPedidoToast from "@/components/pedidos/NuevoPedidoToast";
import { usePedidosRealtime } from "@/hooks/usePedidosRealtime";
import { useNotificationCenter } from "@/hooks/useNotificationCenter";

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

export default function AlmacenPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [buscar, setBuscar] = useState("");
  const [periodo, setPeriodo] = useState("hoy");
  const [estado, setEstado] = useState("");
  const [loading, setLoading] = useState(true);

  const primeraCarga = useRef(true);

  const { toastVisible, notification, mostrar } =
    useNotificationCenter();

  const cargarPedidos = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `/api/pedidos?almacen=true&periodo=${periodo}`
      );

      const data = await response.json();

      if (data.success) {
        setPedidos(data.pedidos);

        if (primeraCarga.current) {
          primeraCarga.current = false;
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [periodo]);

  useEffect(() => {
    cargarPedidos();
  }, [cargarPedidos]);

  const onNuevoPedido = useCallback(
    async (pedido: { id: string }) => {
      if (primeraCarga.current) return;

      await cargarPedidos();
      await mostrar(pedido.id);
    },
    [cargarPedidos, mostrar]
  );

  usePedidosRealtime({
    onNuevoPedido,
  });

  async function completarPedido(id: string) {
    const usuario = JSON.parse(
      localStorage.getItem("usuario") || "{}"
    );

    if (!confirm("¿Desea marcar este pedido como COMPLETO?")) {
      return;
    }

    try {
      const response = await fetch(
        `/api/pedidos/${id}/completar`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completado_por: usuario.id,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        await cargarPedidos();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function entregarPedido(id: string) {
    const usuario = JSON.parse(
      localStorage.getItem("usuario") || "{}"
    );

    if (!confirm("¿Confirma que el pedido fue ENTREGADO?")) {
      return;
    }

    try {
      const response = await fetch(
        `/api/pedidos/${id}/entregar`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            entregado_por: usuario.id,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        await cargarPedidos();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function descargarExcel() {
    const params = new URLSearchParams();

    params.append("periodo", periodo);

    if (estado !== "") {
      params.append("estado", estado);
    }

    if (buscar.trim() !== "") {
      params.append("buscar", buscar);
    }

    window.open(
      `/api/pedidos/excel?${params.toString()}`,
      "_blank"
    );
  }

  const pedidosFiltrados = pedidos.filter((pedido) => {
    const coincideDocumento =
      pedido.numero_documento
        .toLowerCase()
        .includes(buscar.toLowerCase());

    const coincideEstado =
      estado === "" || pedido.estado === estado;

    return coincideDocumento && coincideEstado;
  });

  return (
    <Layout>
      <div className="space-y-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold text-blue-700">
              Administración de Pedidos
            </h1>

            <p className="text-gray-600">
              Gestión de pedidos de Tienda
            </p>
          </div>

          <button
            onClick={descargarExcel}
            className="
              flex
              items-center
              justify-center
              gap-2
              bg-green-600
              hover:bg-green-700
              text-white
              font-semibold
              px-6
              py-3
              rounded-xl
              shadow-lg
              transition-all
            "
          >
            Descargar Excel
          </button>

        </div>

        <PedidoFilters
          buscar={buscar}
          setBuscar={setBuscar}
          periodo={periodo}
          setPeriodo={setPeriodo}
          estado={estado}
          setEstado={setEstado}
        />

        <PedidoTable
          pedidos={pedidosFiltrados}
          loading={loading}
          mostrarAcciones={true}
          onCompletar={completarPedido}
          onEntregar={entregarPedido}
        />

        <NuevoPedidoToast
          visible={toastVisible}
          documento={notification.documento}
          solicitante={notification.solicitante}
        />

      </div>
    </Layout>
  );
}