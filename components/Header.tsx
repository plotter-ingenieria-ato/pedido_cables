"use client";

import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

interface Usuario {
  id?: string;
  nombre?: string;
  rol?: string;
}

export default function Header() {
  const [usuario, setUsuario] = useState<Usuario>({});

  useEffect(() => {
    const data = localStorage.getItem("usuario");

    if (data) {
      setUsuario(JSON.parse(data));
    }
  }, []);

  function cerrarSesion() {
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  }

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">

      <h1 className="text-xl font-bold text-blue-700">
        PEDIDO CABLES
      </h1>

      <div className="flex items-center gap-6">

        <div className="text-right">
          
          <p className="text-sm text-black-700">
            {usuario.rol ?? ""}
          </p>

        </div>

        <button
          onClick={cerrarSesion}
          className="flex items-center gap-2 text-red-600 hover:text-red-700"
        >
          <LogOut size={18} />
          Salir
        </button>

      </div>

    </header>
  );
}