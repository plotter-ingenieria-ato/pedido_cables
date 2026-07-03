"use client";

interface Props {
  buscar: string;
  setBuscar: (valor: string) => void;

  rol: string;
  setRol: (valor: string) => void;

  estado: string;
  setEstado: (valor: string) => void;
}

export default function UsuarioFilters({
  buscar,
  setBuscar,
  rol,
  setRol,
  estado,
  setEstado,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Buscar */}

        <div>

          <label className="block text-sm font-bold text-gray-900 mb-2">
            Buscar
          </label>

          <input
            type="text"
            placeholder="Nombre, Apellido o SAP ID..."
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 font-medium placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 outline-none"
          />

        </div>

        {/* Rol */}

        <div>

          <label className="block text-sm font-bold text-gray-900 mb-2">
            Rol
          </label>

          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 font-medium focus:border-blue-600 focus:ring-2 focus:ring-blue-300 outline-none"
          >
            <option value="">Todos</option>
            <option value="1">Administrador</option>
            <option value="2">Tienda</option>
            <option value="3">Ruteador</option>
          </select>

        </div>

        {/* Estado */}

        <div>

          <label className="block text-sm font-bold text-gray-900 mb-2">
            Estado
          </label>

          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 font-medium focus:border-blue-600 focus:ring-2 focus:ring-blue-300 outline-none"
          >
            <option value="">Todos</option>
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>

        </div>

      </div>

    </div>
  );
}