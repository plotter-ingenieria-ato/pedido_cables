"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function PedidoForm() {
  const router = useRouter();

  const [usuario, setUsuario] = useState<any>(null);
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const inputDocumento = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const data = localStorage.getItem("usuario");

    if (data) {
      setUsuario(JSON.parse(data));
    }

    inputDocumento.current?.focus();
  }, []);

  async function guardarPedido(e: React.FormEvent) {
    e.preventDefault();

    setMensaje("");
    setError("");

    if (!numeroDocumento.trim()) {
      setError("Ingrese el número de documento.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numero_documento: numeroDocumento,
          usuario_id: usuario.id,
          observaciones,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message);
      } else {
        setMensaje("Pedido creado correctamente.");

        setTimeout(() => {
          router.push("/ruteador/cables");
        }, 1000);
      }
    } catch {
      setError("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Nuevo Pedido
      </h1>

      <form onSubmit={guardarPedido} className="space-y-6">

        <div>

          <label className="block font-semibold text-black mb-2">
            Solicitante
          </label>

          <input
            disabled
            value={
              usuario
                ? `${usuario.nombre} (${usuario.sap_id})`
                : ""
            }
            className="w-full border rounded-lg p-3 bg-gray-100 text-black"
          />

        </div>

        <div>

        <label className="block font-semibold text-black mb-2">
          Número de documento
        </label>

        <input
          ref={inputDocumento}
          type="text"
          inputMode="numeric"
          maxLength={20}
          value={numeroDocumento}
          onChange={(e) =>
            setNumeroDocumento(
              e.target.value.replace(/\D/g, "")
            )
          }
          className="w-full border rounded-lg p-3 text-black"
        />

</div>

        <div>

          <label className="block font-semibold text-black mb-2">
            Observaciones
          </label>

          <textarea
            rows={4}
            value={observaciones}
            maxLength={300}
            onChange={(e) => setObservaciones(e.target.value)}
            className="w-full border rounded-lg p-3 text-black"
          />

        </div>

        {mensaje && (
          <div className="bg-green-100 text-green-800 p-3 rounded">
            {mensaje}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-3 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>

          <button
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white"
          >
            {loading ? "Guardando..." : "Guardar Pedido"}
          </button>

        </div>

      </form>

    </div>
  );
}