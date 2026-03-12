"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface Product {
  id: string; // Supabase menggunakan UUID
  name: string;
  price: number;
  discountPrice?: number;
  discountLabel?: string;
  description?: string;
  isAvailable: boolean;
  image?: string; 
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // READ: Mengambil data dari server Supabase
  const fetchProducts = async () => {
    setIsLoaded(false);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false }); // Produk terbaru di atas

    if (error) {
      console.error("Error mengambil data:", error.message);
    } else {
      setProducts(data as Product[]);
    }
    setIsLoaded(true);
  };

  // Jalankan fetch saat aplikasi pertama kali dimuat
  useEffect(() => {
    fetchProducts();
  }, []);

  // CREATE: Menambah produk ke server
  const addProduct = async (product: Omit<Product, "id">) => {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select();

    if (error) {
      alert("Gagal menambah produk. Pastikan ukuran foto tidak terlalu besar.");
      console.error("Insert error:", error.message);
    } else if (data) {
      setProducts([data[0] as Product, ...products]);
    }
  };

  // UPDATE: Mengedit produk di server
  const updateProduct = async (id: string, updatedData: Partial<Product>) => {
    const { data, error } = await supabase
      .from('products')
      .update(updatedData)
      .eq('id', id)
      .select();

    if (error) {
      alert("Gagal menyimpan perubahan.");
      console.error("Update error:", error.message);
    } else if (data) {
      setProducts(products.map(p => p.id === id ? (data[0] as Product) : p));
    }
  };

  // DELETE: Menghapus produk dari server
  const deleteProduct = async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      alert("Gagal menghapus produk.");
      console.error("Delete error:", error.message);
    } else {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return { products, isLoaded, addProduct, updateProduct, deleteProduct, refreshProducts: fetchProducts };
}