"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UsuarioForm from "./UsuarioForm";

interface Props {
  id: string;
}

interface UsuarioFormData {
  nombre: string;
  sap_id: string;
  password: string;
  confirmarPassword: string;
  rol_id: number;
  celda_id: string;
  activo: boolean;
}

export default function EditarUsuarioForm({
  id,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [form, setForm] =
    useState<UsuarioFormData>({
      nombre: "",
      sap_id: "",
      password: "",
      confirmarPassword: "",
      rol_id: 3,
      celda_id: "",
      activo: true,
    });

  useEffect(() => {
    cargarUsuario();
  }, []);

  async function cargarUsuario() {
    try {
      const response = await fetch(`/api/usuarios/${id}`);

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        router.push("/usuarios");
        return;
      }

      setForm({
        nombre: data.usuario.nombre,
        sap_id: data.usuario.sap_id,
        password: "",
        confirmarPassword: "",
        rol_id: data.usuario.rol_id,
        celda_id: data.usuario.celda_id ?? "",
        activo: data.usuario.activo,
      });
    } catch (error) {
      console.error(error);
      alert("No fue posible cargar el usuario.");
    } finally {
      setLoading(false);
    }
  }

  async function guardarCambios() {
    if (!form.nombre.trim()) {
      alert("Ingrese el nombre completo.");
      return;
    }

    if (!form.sap_id.trim()) {
      alert("Ingrese el SAP ID.");
      return;
    }

    if (form.rol_id === 3 && !form.celda_id) {
      alert("Debe seleccionar una celda.");
      return;
}

    try {
      const response = await fetch(
        `/api/usuarios/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            nombre: form.nombre,
            sap_id: form.sap_id,
            rol_id: form.rol_id,
            celda_id:
            form.rol_id === 3
              ? form.celda_id
              : null,
            activo: form.activo,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      if (form.password.trim()) {
        if (
          form.password !==
          form.confirmarPassword
        ) {
          alert(
            "Las contraseñas no coinciden."
          );
          return;
        }
        
        await fetch(`/api/usuarios/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            password: form.password,
          }),
        });
      }

      alert(
        "Usuario actualizado correctamente."
      );

      router.push("/usuarios");
    } catch (error) {
      console.error(error);
      alert(
        "Ocurrió un error al actualizar."
      );
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
        Cargando usuario...
      </div>
    );
  }

  return (
    <UsuarioForm
      form={form}
      setForm={setForm}
      mostrarPassword={true}
      modoEdicion={true}
      onSubmit={guardarCambios}
      onCancelar={() =>
        router.push("/usuarios")
      }
    />
  );
}