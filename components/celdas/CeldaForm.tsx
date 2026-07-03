"use client";

import { useState } from "react";

interface Props{
    onGuardado:()=>void;
}

export default function CeldaForm({

    onGuardado

}:Props){

    const[nombre,setNombre]=useState("");
    const[descripcion,setDescripcion]=useState("");

    async function guardar(){

        const response=await fetch("/api/celdas",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                nombre,
                descripcion

            })

        });

        const data=await response.json();

        if(data.success){

            setNombre("");
            setDescripcion("");

            onGuardado();

        }else{

            alert(data.message);

        }

    }

    return(

        <div className="bg-white rounded-xl shadow p-6">

            <div className="grid grid-cols-2 gap-4">

                <input
                    className="border rounded-lg p-3"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e)=>setNombre(e.target.value)}
                />

                <input
                    className="border rounded-lg p-3"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e)=>setDescripcion(e.target.value)}
                />

            </div>

            <button

                onClick={guardar}

                className="
                    mt-5
                    bg-blue-700
                    hover:bg-blue-800
                    text-white
                    px-6
                    py-3
                    rounded-xl
                "

            >

                Guardar

            </button>

        </div>

    )

}