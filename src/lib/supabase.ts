import { createClient } from '@supabase/supabase-js';

// 1. Ambil alamat dan kunci dari file .env.local
// Tanda "!" di akhir artinya kita meyakinkan TypeScript kalau isinya PASTI ADA.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 2. Buat koneksi resminya
export const supabase = createClient(supabaseUrl, supabaseAnonKey);