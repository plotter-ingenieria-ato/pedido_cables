"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Users,
  Info,
} from "lucide-react";

interface Usuario {
  id?: string;
  nombre?: string;
  sap_id?: string;
  rol_id?: number;
}

export default function Sidebar() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("usuario");

    if (data) {
      setUsuario(JSON.parse(data));
    }

    setMounted(true);
  }, []);

  function obtenerRol() {
    switch (usuario?.rol_id) {
      case 1:
        return "Administrador";
      case 2:
        return "Tienda";
      case 3:
        return "Ruteador";
      default:
        return "Usuario";
    }
  }

  if (!mounted) {
    return (
      <aside className="w-64 bg-slate-900 text-white min-h-screen" />
    );
  }

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col shadow-xl">

      {/* Encabezado del Sistema */}

    

        {/* Usuario */}

        <div className="mt-3 flex flex-col items-center">

          <div className="w-16 h-16 rounded-full bg-blue-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg">

            {usuario?.nombre
              ? usuario.nombre.charAt(0).toUpperCase()
              : "U"}

          </div>

          <h4 className="mt-4 text-lg font-bold text-white text-center">

            {usuario?.nombre}

          </h4>

          <p className="text-sm text-slate-400">

            {obtenerRol()}

          </p>

        </div>

   

      {/* Menú */}

      <div className="px-6 py-4 border-b border-slate-700">

        <h2 className="text-sm uppercase tracking-widest text-slate-400 font-semibold">
          Menú Principal
        </h2>

      </div>

      <nav className="flex-1 flex flex-col">

        {/* Dashboard */}

        {usuario?.rol_id === 1 && (
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800 transition-colors"
          >
            <LayoutDashboard size={20} />
            Reportes
          </Link>
        )}

        {/* Usuarios */}

        {usuario?.rol_id === 1 && (
          <Link
            href="/usuarios"
            className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800 transition-colors"
          >
            <Users size={20} />
            Usuarios
          </Link>
        )}

        {/* Ruteador */}

        {(usuario?.rol_id === 1 || usuario?.rol_id === 3) && (
          <Link
            href="/ruteador/cables"
            className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800 transition-colors"
          >
            <Package size={20} />
            Ruteador
          </Link>
        )}

        {/* Almacén */}

        {(usuario?.rol_id === 1 || usuario?.rol_id === 2) && (
          <Link
            href="/almacen/cables"
            className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800 transition-colors"
          >
            <Package size={20} />
            Tienda
          </Link>
        )}

        {/* Acerca del Sistema */}

        <Link
          href="/about"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800 transition-colors"
        >
          <Info size={20} />
          Acerca del Sistema
        </Link>

      </nav>

      {/* Pie */}

      <div className="border-t border-slate-700 p-4 text-center">

        <p className="text-xs text-slate-500">
          Sistema de Gestión de Pedidos
        </p>

        <p className="text-xs text-slate-600 mt-1">
          Versión 1.0.0
        </p>

      </div>

    </aside>
  );
}