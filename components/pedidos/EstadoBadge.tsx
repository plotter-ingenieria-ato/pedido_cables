"use client";

interface Props {
  estado: string;
}

export default function EstadoBadge({ estado }: Props) {
  if (estado === "Pendiente") {
    return (
      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
        Pendiente
      </span>
    );
  }

  if (estado === "Completo") {
    return (
      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
        Completo
      </span>
    );
  }

  if (estado === "Entregado") {
    return (
      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
        Entregado
      </span>
    );
  }

  return (
    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
      {estado}
    </span>
  );
}