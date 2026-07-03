"use client";

interface Props {
  buscar: string;
  setBuscar: (valor: string) => void;
}

export default function PedidoSearch({
  buscar,
  setBuscar,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">

      <input
        type="text"
        placeholder="Buscar por número de documento..."
        value={buscar}
        onChange={(e) => setBuscar(e.target.value)}
        className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-black text-lg placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 outline-none"
      />

    </div>
  );
}