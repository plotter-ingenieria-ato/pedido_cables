import { createClient } from '@supabase/supabase-js'

console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(
  "SERVICE KEY:",
  process.env.SUPABASE_SERVICE_ROLE_KEY ? "CARGADA" : "NO CARGADA"
);

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);