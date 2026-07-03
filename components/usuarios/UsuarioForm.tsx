"use client";
import { useEffect, useState } from "react";

interface UsuarioFormData {
  nombre: string;
  sap_id: string;
  password: string;
  confirmarPassword: string;
  rol_id: number;
  celda_id: string;
  activo: boolean;
}

interface Celda {
  id: string;
  nombre: string;
}

interface Props {
  form: UsuarioFormData;
  setForm: React.Dispatch<React.SetStateAction<UsuarioFormData>>;
  mostrarPassword?: boolean;
  modoEdicion?: boolean;
  onSubmit: () => void;
  onCancelar: () => void;
}

export default function UsuarioForm({
  form,
  setForm,
  mostrarPassword = true,
  modoEdicion = false,
  onSubmit,
  onCancelar,
}: Props) {

const [celdas, setCeldas] = useState<Celda[]>([]);

useEffect(() => {

  async function cargarCeldas() {

    const response = await fetch("/api/celdas");

    const data = await response.json();

    if (data.success) {
      setCeldas(data.celdas);
    }

  }

  cargarCeldas();

}, []);
  
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-300 p-8">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Nombre */}

        <div>

          <label className="block text-sm font-bold text-gray-800 mb-2">
            Nombre Completo
          </label>

          <input
            type="text"
            placeholder="Ingrese el nombre completo"
            value={form.nombre}
            onChange={(e) =>
              setForm({
                ...form,
                nombre: e.target.value.toUpperCase(),
              })
            }
            className="
              w-full
              rounded-xl
              border-2
              border-gray-300
              bg-white
              px-4
              py-3
              text-gray-900
              font-medium
              placeholder:text-gray-500
              outline-none
              transition
              focus:border-blue-600
              focus:ring-2
              focus:ring-blue-200
            "
          />

        </div>

        {/* SAP */}

        <div>

          <label className="block text-sm font-bold text-gray-800 mb-2">
            SAP ID (Usuario)
          </label>

          <input
            type="number"
            placeholder="Ingrese su SAP ID"
            value={form.sap_id}
            onChange={(e) =>
              setForm({
                ...form,
                sap_id: e.target.value,
              })
            }
            className="
              w-full
              rounded-xl
              border-2
              border-gray-300
              bg-white
              px-4
              py-3
              text-gray-900
              font-medium
              placeholder:text-gray-500
              outline-none
              transition
              focus:border-blue-600
              focus:ring-2
              focus:ring-blue-200
            "
          />

        </div>

        {/* Contraseña */}

        {mostrarPassword && (
          <>
            <div>

              <label className="block text-sm font-bold text-gray-800 mb-2">
                Contraseña
              </label>

              <input
                type="password"
                placeholder="Ingrese la contraseña"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="
                  w-full
                  rounded-xl
                  border-2
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  text-gray-900
                  font-medium
                  placeholder:text-gray-500
                  outline-none
                  transition
                  focus:border-blue-600
                  focus:ring-2
                  focus:ring-blue-200
                "
              />

            </div>

            <div>

              <label className="block text-sm font-bold text-gray-800 mb-2">
                Confirmar contraseña
              </label>

              <input
                type="password"
                placeholder="Confirme la contraseña"
                value={form.confirmarPassword}
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirmarPassword: e.target.value,
                  })
                }
                className="
                  w-full
                  rounded-xl
                  border-2
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  text-gray-900
                  font-medium
                  placeholder:text-gray-500
                  outline-none
                  transition
                  focus:border-blue-600
                  focus:ring-2
                  focus:ring-blue-200
                "
              />

            </div>
          </>
        )}

        {/* Rol */}

        <div>

          <label className="block text-sm font-bold text-gray-800 mb-2">
            Rol
          </label>

          <select
            value={form.rol_id}
            onChange={(e) =>
              setForm({
                ...form,
                rol_id: Number(e.target.value),
              })
            }
            className="
              w-full
              rounded-xl
              border-2
              border-gray-300
              bg-white
              px-4
              py-3
              text-gray-900
              font-medium
              outline-none
              transition
              focus:border-blue-600
              focus:ring-2
              focus:ring-blue-200
            "
          >
            <option value={1}>Administrador</option>
            <option value={2}>Tienda</option>
            <option value={3}>Ruteador</option>
          </select>         

        </div>

        {/* Celda */}

{form.rol_id === 3 && (

  <div>

    <label className="block text-sm font-bold text-gray-800 mb-2">
      Celda
    </label>

    <select
      value={form.celda_id}
      onChange={(e) =>
        setForm({
          ...form,
          celda_id: e.target.value,
        })
      }
      className="
        w-full
        rounded-xl
        border-2
        border-gray-300
        bg-white
        px-4
        py-3
        text-gray-900
        font-medium
        outline-none
        transition
        focus:border-blue-600
        focus:ring-2
        focus:ring-blue-200
      "
    >
      <option value="">Seleccione una celda</option>

      {celdas.map((celda) => (
        <option
          key={celda.id}
          value={celda.id}
        >
          {celda.nombre}
        </option>
      ))}

    </select>

  </div>

)}

        {/* Estado */}

        {modoEdicion && (

          <div>

            <label className="block text-sm font-bold text-gray-800 mb-2">
              Estado
            </label>

            <select
              value={String(form.activo)}
              onChange={(e) =>
                setForm({
                  ...form,
                  activo: e.target.value === "true",
                })
              }
              className="
                w-full
                rounded-xl
                border-2
                border-gray-300
                bg-white
                px-4
                py-3
                text-gray-900
                font-medium
                outline-none
                transition
                focus:border-blue-600
                focus:ring-2
                focus:ring-blue-200
              "
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>

          </div>

        )}

      </div>

      <div className="flex justify-end gap-4 mt-10">

        <button
          type="button"
          onClick={onCancelar}
          className="
            px-8
            py-3
            rounded-xl
            bg-gray-200
            hover:bg-gray-300
            text-gray-800
            font-semibold
            transition
          "
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="
            px-8
            py-3
            rounded-xl
            bg-blue-700
            hover:bg-blue-800
            text-white
            font-bold
            shadow-lg
            transition
          "
        >
          {modoEdicion ? "Guardar Cambios" : "Crear Usuario"}
        </button>

      </div>

    </div>
  );
}