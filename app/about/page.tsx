"use client";

import Layout from "@/components/Layout";
import {
  Info,
  UserCircle,
  BadgeCheck,
  MonitorSmartphone,
} from "lucide-react";

export default function AboutPage() {
  return (
    <Layout>
      <div className="space-y-8">

        {/* Encabezado */}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">

          <div className="flex items-center gap-5">

            <div className="bg-blue-700 p-4 rounded-xl text-white shadow-lg">

              <Info size={34} />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-blue-700">
                Acerca del Sistema
              </h1>

              <p className="text-gray-600 mt-2">
                Información general del Sistema de Gestión de Pedidos de Cables.
              </p>

            </div>

          </div>

        </div>

        {/* Descripción */}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Sistema de Gestión de Pedidos de Cables
          </h2>

          <p className="text-gray-700 leading-8 text-justify">

            El Sistema de Gestión de Pedidos de Cables fue desarrollado
            para optimizar el proceso de solicitud, preparación y entrega
            de pedidos entre las áreas de <strong>Ruteador</strong> y
            <strong> Tienda</strong>.

            <br /><br />

            El sistema permite administrar usuarios, controlar el flujo
            completo de los pedidos, registrar fechas y estados,
            proporcionando trazabilidad y una mejor organización del
            proceso operativo.

          </p>

        </div>

        {/* Tarjetas */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Información */}

          <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">

            <div className="flex items-center gap-3 mb-6">

              <MonitorSmartphone
                size={28}
                className="text-blue-700"
              />

              <h2 className="text-2xl font-bold text-gray-800">
                Información del Sistema
              </h2>

            </div>

            <div className="space-y-5">

              <div>

                <p className="text-sm text-gray-500">
                  Proyecto
                </p>

                <p className="text-lg font-semibold text-gray-800">
                  Sistema de Gestión de Pedidos de Cables
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Versión
                </p>

                <span className="inline-flex bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold">

                  v1.0.0

                </span>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Estado
                </p>

                <span className="inline-flex bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">

                  Producción

                </span>

              </div>

            </div>

          </div>

          {/* Desarrollador */}

          <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8">

            <div className="flex items-center gap-3 mb-6">

              <UserCircle
                size={28}
                className="text-blue-700"
              />

              <h2 className="text-2xl font-bold text-gray-800">
                Desarrollador
              </h2>

            </div>

            <div className="space-y-5">

              <div>

                <p className="text-sm text-gray-500">
                  Desarrollado por
                </p>

                <p className="text-2xl font-bold text-gray-800">
                  Ing. Marvin Ruíz
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Área
                </p>

                <p className="text-lg text-gray-700">
                  Ingeniería ATO y Tienda.
                </p>
                <p className="text-sm text-gray-500">
                  Contacto
                </p>
                <p className="text-lg text-gray-700">
                  marvin.ruizs@sv.yazaki.com
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-6">

          <div className="flex items-center justify-center gap-3">

            <BadgeCheck
              size={22}
              className="text-blue-700"
            />

            <p className="text-gray-600">

              © 2026 Sistema de Gestión de Pedidos de Cables.
              Todos los derechos reservados.

            </p>

          </div>

        </div>

      </div>
    </Layout>
  );
}