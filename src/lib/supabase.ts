import { createClient, SupabaseClient } from '@supabase/supabase-js';

export type Product = {
  id: number;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  price: number;
  currency: string;
  image_url: string;
  category: string;
  in_stock: boolean;
  is_featured: boolean;
  created_at: string;
};

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  _client = createClient(url, key);
  return _client;
}
