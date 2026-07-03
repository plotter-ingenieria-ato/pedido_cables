"use client";

interface Props {
  buscar: string;
  setBuscar: (valor: string) => void;

  periodo: string;
  setPeriodo: (valor: string) => void;

  estado: string;
  setEstado: (valor: string) => void;
}

export default function PedidoFilters({
  buscar,
  setBuscar,
  periodo,
  setPeriodo,
  estado,
  setEstado,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Buscar */}

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Buscar documento
          </label>

          <input
            type="text"
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            placeholder="Número de documento"
            className="
              w-full
              rounded-lg
              border-2
              border-gray-300
              bg-white
              px-4
              py-3
              text-gray-900
              placeholder:text-gray-400
              focus:border-blue-600
              focus:ring-4
              focus:ring-blue-200
              outline-none
              transition
            "
          />
        </div>

        {/* Periodo */}

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Período
          </label>

          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="
              w-full
              rounded-lg
              border-2
              border-gray-300
              bg-white
              px-4
              py-3
              text-gray-900
              focus:border-blue-600
              focus:ring-4
              focus:ring-blue-200
              outline-none
              transition
            "
          >
            <option value="hoy">Hoy</option>
            <option value="ayer">Ayer</option>
            <option value="7dias">Últimos 7 días</option>
            <option value="mes">Este mes</option>
            <option value="todos">Todos</option>
          </select>
        </div>

        {/* Estado */}

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Estado
          </label>

          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="
              w-full
              rounded-lg
              border-2
              border-gray-300
              bg-white
              px-4
              py-3
              text-gray-900
              focus:border-blue-600
              focus:ring-4
              focus:ring-blue-200
              outline-none
              transition
            "
          >
            <option value="">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Completo">Completo</option>
            <option value="Entregado">Entregado</option>
          </select>
        </div>

      </div>

    </div>
  );
}