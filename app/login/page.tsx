"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  User,
  Lock,
  LogIn,
  ShieldCheck,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [sapId, setSapId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function iniciarSesion(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sap_id: sapId,
          password,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      localStorage.setItem(
        "usuario",
        JSON.stringify(data.usuario)
      );

      switch (data.usuario.rol_id) {
        case 1:
          router.push("/dashboard");
          break;

        case 2:
          router.push("/almacen/cables");
          break;

        case 3:
          router.push("/ruteador/cables");
          break;

        default:
          router.push("/");
      }
    } catch {
      setError("No fue posible conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Imagen de fondo */}

      <Image
        src="/images/fondo_logo.png"
        alt="Fondo"
        fill
        priority
        quality={100}
        className="object-cover object-center scale-105"
      />

      {/* Capa azul */}

      <div className="absolute inset-0 bg-slate-900/15" />

      {/* Degradado */}

      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-slate-900/25" />

      {/* Contenido */}

      <div className="relative z-10 w-full flex justify-center px-4">

        <div
          className="
            w-full
            max-w-md
            rounded-[32px]
            bg-white/92
            backdrop-blur-md
            border
            border-white/60
            shadow-[0_25px_80px_rgba(0,0,0,.35)]
            p-10
          "
        >

          {/* Logo */}

          <div className="flex justify-center">

            <Image
              src="/images/Yazaki_company_logo.png"
              alt="Yazaki"
              width={240}
              height={90}
              priority
            />

          </div>

          <div className="flex justify-center my-5">

            <div className="w-20 h-1 rounded-full bg-blue-700" />

          </div>

          {/* Título */}

          <div className="text-center mb-8">

            <h4 className="text-4xl font-extrabold text-slate-800">

              Sistema de Gestión

            </h4>

            <h3 className="mt-2 text-3xl font-semibold text-slate-700">

              Pedidos de Cables

            </h3>

          </div>

          <form
            onSubmit={iniciarSesion}
            className="space-y-6"
          >

            {/* SAP */}

            <div>

              <label className="block mb-2 font-bold text-slate-800">

                SAP ID

              </label>

              <div className="flex items-center rounded-xl border border-slate-300 bg-white shadow-sm px-4 transition-all focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-300">

                <User
                  size={20}
                  className="text-slate-500"
                />

                <input
                  type="text"
                  value={sapId}
                  onChange={(e) => setSapId(e.target.value)}
                  placeholder="Ingrese su SAP ID"
                  className="w-full bg-transparent px-3 py-4 text-slate-900 placeholder:text-slate-400 outline-none"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="block mb-2 font-bold text-slate-800">

                Contraseña

              </label>

              <div className="flex items-center rounded-xl border border-slate-300 bg-white shadow-sm px-4 transition-all focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-300">

                <Lock
                  size={20}
                  className="text-slate-500"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingrese su contraseña"
                  className="w-full bg-transparent px-3 py-4 text-slate-900 placeholder:text-slate-400 outline-none"
                />

              </div>

            </div>

            {/* Error */}

            {error && (

              <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">

                {error}

              </div>

            )}

            {/* Botón */}

            <button
              type="submit"
              disabled={loading}
              className="
                mt-2
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-blue-700
                py-4
                text-lg
                font-bold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-blue-800
                hover:shadow-2xl
                disabled:opacity-70
              "
            >

              <LogIn size={20} />

              {loading
                ? "Ingresando..."
                : "Ingresar"}

            </button>

          </form>

          {/* Footer */}

          <div className="mt-8">

            <div className="flex items-center justify-center gap-3">

              <div className="flex-1 h-px bg-gray-300" />

              <div className="w-2 h-2 rounded-full bg-blue-600" />

              <div className="flex-1 h-px bg-gray-300" />

            </div>

            <div className="flex justify-center mt-6">

              <ShieldCheck
                size={22}
                className="text-blue-700"
              />

            </div>

            <p className="mt-2 text-center text-sm font-bold text-blue-700">

              Versión 1.0.0

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}