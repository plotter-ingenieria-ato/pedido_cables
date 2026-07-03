"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Layout from "@/components/Layout";
import UsuarioFilters from "@/components/usuarios/UsuarioFilters";
import UsuarioTable from "@/components/usuarios/UsuarioTable";

interface Usuario {
  id: string;
  nombre: string;
  sap_id: string;
  rol_id: number;
  activo: boolean;
  created_at: string;
}

export default function UsuariosPage() {
  const router = useRouter();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const [buscar, setBuscar] = useState("");
  const [rol, setRol] = useState("");
  const [estado, setEstado] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  async function cargarUsuarios() {
    setLoading(true);

    try {
      const response = await fetch("/api/usuarios");
      const data = await response.json();

      if (data.success) {
        setUsuarios(data.usuarios);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const usuariosFiltrados = usuarios.filter((usuario) => {

    const coincideBusqueda =
      usuario.nombre.toLowerCase().includes(buscar.toLowerCase()) ||
      usuario.sap_id.includes(buscar);

    const coincideRol =
      rol === "" ||
      usuario.rol_id === Number(rol);

    const coincideEstado =
      estado === "" ||
      usuario.activo === (estado === "true");

    return (
      coincideBusqueda &&
      coincideRol &&
      coincideEstado
    );

  });

  return (
    <Layout>

      <div className="space-y-6">

        {/* Encabezado */}

        <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6 flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold text-blue-700">
              Gestión de Usuarios
            </h1>

            <p className="text-gray-700 mt-2">
              Administración de usuarios del sistema
            </p>

          </div>

          <Link
            href="/usuarios/nuevo"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold shadow"
          >
            + Nuevo Usuario
          </Link>

        </div>

        {/* Filtros */}

        <UsuarioFilters
          buscar={buscar}
          setBuscar={setBuscar}
          rol={rol}
          setRol={setRol}
          estado={estado}
          setEstado={setEstado}
        />

        {/* Tabla */}

        <UsuarioTable
          usuarios={usuariosFiltrados}
          loading={loading}
          onEditar={(id) =>
            router.push(`/usuarios/editar/${id}`)
          }
        />

      </div>

    </Layout>
  );
}