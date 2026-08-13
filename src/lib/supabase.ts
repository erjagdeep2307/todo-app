import { createClient } from "@supabase/supabase-js";
const supUrl = import.meta.env.VITE_SUPABASE_URL;
const supKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!supKey || !supUrl) {
  throw new Error(`Missing Supabase Env Data`);
}
let activeStorage: Storage = localStorage;
export const rememberMe = (remeber: boolean) => {
  activeStorage = remeber ? localStorage : sessionStorage;
};
const dynamicStorage = {
  getItem: (key: string) => activeStorage.getItem(key),
  setItem: (key: string, value: string) => activeStorage.setItem(key, value),
  removeItem: (key: string) => activeStorage.removeItem(key),
};
export const supabase = createClient(supUrl, supKey, {
  auth: {
    storage: dynamicStorage,
    autoRefreshToken: true,
  },
});
