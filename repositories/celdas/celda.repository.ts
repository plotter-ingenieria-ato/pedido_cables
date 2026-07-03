import { supabaseServer } from "@/lib/supabase-server";

export async function obtenerCeldas() {

  const { data, error } = await supabaseServer
    .from("celdas")
    .select("*")
    .order("nombre");

  if (error) throw error;

  return data;

}