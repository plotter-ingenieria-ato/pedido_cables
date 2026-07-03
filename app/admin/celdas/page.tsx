"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import CeldaForm from "@/components/celdas/CeldaForm";
import CeldaTable from "@/components/celdas/CeldaTable";

export interface Celda {
  id: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

export default function CeldasPage() {

  const [celdas, setCeldas] = useState<Celda[]>([]);
  const [loading, setLoading] = useState(true);

  async function cargarCeldas() {

    setLoading(true);

    const response = await fetch("/api/celdas");

    const data = await response.json();

    if (data.success) {
      setCeldas(data.celdas);
    }

    setLoading(false);
  }

  useEffect(() => {
    cargarCeldas();
  }, []);

  return (

    <Layout>

      <div className="space-y-6">

        <div>

          <h1 className="text-3xl font-bold text-blue-700">
            Administración de Celdas
          </h1>

          <p className="text-gray-600">
            Registro de celdas de producción
          </p>

        </div>

        <CeldaForm
          onGuardado={cargarCeldas}
        />

        <CeldaTable
          celdas={celdas}
          loading={loading}
          onActualizar={cargarCeldas}
        />

      </div>

    </Layout>

  );

}