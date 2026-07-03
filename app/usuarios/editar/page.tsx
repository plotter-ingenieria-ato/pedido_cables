"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import UsuarioForm from "@/components/usuarios/UsuarioForm";

export default function EditarUsuarioPage() {

  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    nombre: "",
    sap_id: "",
    password: "",
    confirmarPassword: "",
    rol_id: 3,
    celda_id: "",
    activo: true,
  });

  const [mostrarPassword, setMostrarPassword] =
    useState(false);

  useEffect(() => {
    cargarUsuario();
  }, []);

  async function cargarUsuario() {

    try {

      const response = await fetch(`/api/usuarios/${id}`);

      const data = await response.json();

      if (data.success) {

        setForm({
          nombre: data.usuario.nombre,
          sap_id: data.usuario.sap_id,
          password: "",
          confirmarPassword: "",
          rol_id: data.usuario.rol_id,
          celda_id: data.usuario.celda_id ?? "",
          activo: data.usuario.activo,
        });

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  async function guardar() {

    try {

      const response = await fetch(`/api/usuarios/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: form.nombre,
          sap_id: form.sap_id,
          rol_id: form.rol_id,
          celda_id: form.rol_id === 3 ? form.celda_id : null,
          activo: form.activo,
        }),
      });

      const data = await response.json();

      if (data.success) {

        alert("Usuario actualizado.");

      } else {

        alert(data.message);

      }

    } catch (error) {

      alert("Error al actualizar.");

    }

  }

  async function cambiarPassword() {

    if (form.password !== form.confirmarPassword) {

      alert("Las contraseñas no coinciden.");

      return;

    }

    if (!form.password.trim()) {

      alert("Ingrese una contraseña.");

      return;

    }

    try {

      const response = await fetch(`/api/usuarios/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: form.password,
        }),
      });

      const data = await response.json();

      if (data.success) {

        alert("Contraseña actualizada.");

        setForm({
          ...form,
          password: "",
          confirmarPassword: "",
        });

        setMostrarPassword(false);

      }

    } catch (error) {

      alert("Error al actualizar contraseña.");

    }

  }

  if (loading) {

    return (

      <Layout>

        <div className="text-center py-20">

          Cargando...

        </div>

      </Layout>

    );

  }

  return (

    <Layout>

      <div className="space-y-6">

        <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6">

          <h1 className="text-3xl font-bold text-blue-700">

            Editar Usuario

          </h1>

          <p className="text-gray-700 mt-2">

            Administración de usuarios

          </p>

        </div>

        <UsuarioForm
          form={form}
          setForm={setForm}
          mostrarPassword={false}
          modoEdicion={true}
          onSubmit={guardar}
          onCancelar={() => router.push("/usuarios")}
        />

        <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6">

          <h2 className="text-xl font-bold text-gray-800 mb-4">

            Contraseña

          </h2>

          {!mostrarPassword ? (

            <button
              onClick={() =>
                setMostrarPassword(true)
              }
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg"
            >
              Cambiar contraseña
            </button>

          ) : (

            <div className="space-y-4">

              <input
                type="password"
                placeholder="Nueva contraseña"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-3"
              />

              <input
                type="password"
                placeholder="Confirmar contraseña"
                value={form.confirmarPassword}
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirmarPassword: e.target.value,
                  })
                }
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-3"
              />

              <div className="flex gap-3">

                <button
                  onClick={cambiarPassword}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                >
                  Guardar contraseña
                </button>

                <button
                  onClick={() =>
                    setMostrarPassword(false)
                  }
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
                >
                  Cancelar
                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </Layout>

  );

}