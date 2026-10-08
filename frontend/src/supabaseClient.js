import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const missing = [
  !url?.trim() && "VITE_SUPABASE_URL",
  !anonKey?.trim() && "VITE_SUPABASE_ANON_KEY",
].filter(Boolean);

if (missing.length) {
  throw new Error(`Missing Supabase configuration: ${missing.join(", ")}. See frontend/.env.example.`);
}

export const supabase = createClient(url, anonKey);
