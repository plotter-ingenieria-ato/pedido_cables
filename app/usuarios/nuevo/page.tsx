"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import UsuarioForm from "@/components/usuarios/UsuarioForm";

export default function NuevoUsuarioPage() {

  const router = useRouter();

  const [form, setForm] = useState({
    nombre: "",
    sap_id: "",
    password: "",
    confirmarPassword: "",
    rol_id: 3,
    celda_id: "",
    activo: true,
  });

  const [guardando, setGuardando] = useState(false);

  async function guardar() {

    if (!form.nombre.trim()) {
      alert("Debe ingresar el nombre completo.");
      return;
    }

    if (!form.sap_id.trim()) {
      alert("Debe ingresar el SAP ID.");
      return;
    }

    if (!form.password) {
      alert("Debe ingresar la contraseña.");
      return;
    }

    if (form.password !== form.confirmarPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (form.rol_id === 3 && !form.celda_id) {
      alert("Debe seleccionar una celda para el ruteador.");
      return;
    }

    setGuardando(true);

    try {

      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: form.nombre,
          sap_id: form.sap_id,
          password: form.password,
          rol_id: form.rol_id,
          celda_id: form.rol_id === 3 ? form.celda_id : null,
        }),
      });

      const data = await response.json();

      if (data.success) {

        alert("Usuario creado correctamente.");

        router.push("/usuarios");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

      alert("Error al crear el usuario.");

    } finally {

      setGuardando(false);

    }

  }

  return (

    <Layout>

      <div className="space-y-6">

        <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6">

          <h1 className="text-3xl font-bold text-blue-700">
            Nuevo Usuario
          </h1>

          <p className="text-gray-700 mt-2">
            Registro de usuarios del sistema
          </p>

        </div>

        <UsuarioForm
          form={form}
          setForm={setForm}
          mostrarPassword={true}
          modoEdicion={false}
          onSubmit={guardar}
          onCancelar={() => router.push("/usuarios")}
        />

        {guardando && (

          <div className="text-center text-blue-700 font-semibold">
            Guardando usuario...
          </div>

        )}

      </div>

    </Layout>

  );

}