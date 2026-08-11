import { createClient } from "@supabase/supabase-js";
const supUrl = import.meta.env.VITE_SUPABASE_URL;
const supKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
if(!supKey || !supUrl){
    throw new Error(`Missing Supabase Env Data`);
}
export const supabase =  createClient(supUrl,supKey);