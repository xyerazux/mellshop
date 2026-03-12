"use client";
import { useState, useEffect } from "react";

export interface Product {
  id: string; // Menggunakan string (timestamp) agar unik saat ditambah
  name: string;
  price: number;
  discountPrice?: number;
  discountLabel?: string; // e.g., "Spesial Ramadhan"
  description?: string;
  isAvailable: boolean;
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Kemeja Flanel Premium",
    price: 150000,
    discountPrice: 120000,
    discountLabel: "Spesial Ramadhan",
    description: "Bahan halus dan tidak panas. Cocok untuk buka bersama.",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Celana Chino Slimfit",
    price: 180000,
    isAvailable: true,
  }
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data dari local storage saat web dibuka
  useEffect(() => {
    const saved = localStorage.getItem("mellshop_products");
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(DEFAULT_PRODUCTS);
      localStorage.setItem("mellshop_products", JSON.stringify(DEFAULT_PRODUCTS));
    }
    setIsLoaded(true);
  }, []);

  // Simpan ke local storage setiap ada perubahan
  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("mellshop_products", JSON.stringify(newProducts));
  };

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = { ...product, id: Date.now().toString() };
    saveProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updatedData: Partial<Product>) => {
    const updated = products.map(p => p.id === id ? { ...p, ...updatedData } : p);
    saveProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const filtered = products.filter(p => p.id !== id);
    saveProducts(filtered);
  };

  return { products, isLoaded, addProduct, updateProduct, deleteProduct };
}