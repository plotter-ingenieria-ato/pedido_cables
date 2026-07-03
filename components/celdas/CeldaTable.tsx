"use client";

interface Props{

    celdas:any[];
    loading:boolean;
    onActualizar:()=>void;

}

export default function CeldaTable({

    celdas,
    loading

}:Props){

    if(loading){

        return <p>Cargando...</p>

    }

    return(

        <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-blue-700 text-white">

                    <tr>

                        <th className="p-3 text-left">
                            Nombre
                        </th>

                        <th className="p-3 text-left">
                            Descripción
                        </th>

                        <th className="p-3 text-center">
                            Estado
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        celdas.map((celda)=>(

                            <tr
                                key={celda.id}
                                className="border-b"
                            >

                                <td className="p-3">
                                    {celda.nombre}
                                </td>

                                <td className="p-3">
                                    {celda.descripcion}
                                </td>

                                <td className="text-center">

                                    {

                                        celda.activo
                                        ? "Activo"
                                        : "Inactivo"

                                    }

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    )

}