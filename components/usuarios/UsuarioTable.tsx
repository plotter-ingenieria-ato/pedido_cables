"use client";

interface Usuario {
  id: string;
  nombre: string;
  sap_id: string;
  rol_id: number;
  activo: boolean;
  created_at: string;
}

interface UsuarioTableProps {
  usuarios: Usuario[];
  loading: boolean;
  onEditar: (id: string) => void;
}

export default function UsuarioTable({
  usuarios,
  loading,
  onEditar,
}: UsuarioTableProps) {

  function obtenerRol(rol: number) {
    switch (rol) {
      case 1:
        return "Administrador";
      case 2:
        return "Tienda";
      case 3:
        return "Ruteador";
      default:
        return "Sin rol";
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">

      <table className="w-full">

        <thead className="bg-blue-700 text-white">
          <tr>

            <th className="px-6 py-4 text-left">
              Nombre
            </th>

            <th className="px-6 py-4 text-left">
              SAP ID
            </th>

            <th className="px-6 py-4 text-center">
              Rol
            </th>

            <th className="px-6 py-4 text-center">
              Estado
            </th>

            <th className="px-6 py-4 text-center">
              Creado
            </th>

            <th className="px-6 py-4 text-center">
              Acción
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
                Cargando usuarios...
              </td>
            </tr>
          )}

          {!loading && usuarios.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="text-center py-10 text-gray-500"
              >
                No existen usuarios registrados.
              </td>
            </tr>
          )}

          {!loading &&
            usuarios.map((usuario) => (

              <tr
                key={usuario.id}
                className="border-b hover:bg-blue-50 transition-colors"
              >

                <td className="px-6 py-4 font-semibold text-gray-900">
                  {usuario.nombre}
                </td>

                <td className="px-6 py-4 text-blue-700 font-semibold">
                  {usuario.sap_id}
                </td>

                <td className="px-6 py-4 text-center">

                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-semibold">

                    {obtenerRol(usuario.rol_id)}

                  </span>

                </td>

                <td className="px-6 py-4 text-center">

                  {usuario.activo ? (

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-bold">
                      Activo
                    </span>

                  ) : (

                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-bold">
                      Inactivo
                    </span>

                  )}

                </td>

                <td className="px-6 py-4 text-center text-gray-900">

                  {new Date(
                    usuario.created_at
                  ).toLocaleString("es-SV")}

                </td>

                <td className="px-6 py-4 text-center">

                  <button
                    onClick={() => onEditar(usuario.id)}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >
                    Editar
                  </button>

                </td>

              </tr>

            ))}

        </tbody>

      </table>

    </div>
  );
}