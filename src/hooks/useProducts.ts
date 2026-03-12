"use client";

import { useState, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  discountLabel?: string;
  description: string;
  isAvailable: boolean;
  image?: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data dari LocalStorage saat pertama kali buka
  useEffect(() => {
    const savedProducts = localStorage.getItem("mellshop_products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
    setIsLoaded(true);
  }, []);

  // Simpan data ke LocalStorage setiap kali ada perubahan
  const saveToLocal = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("mellshop_products", JSON.stringify(newProducts));
  };

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = { ...product, id: Date.now().toString() };
    saveToLocal([...products, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    const newProducts = products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p));
    saveToLocal(newProducts);
  };

  const deleteProduct = (id: string) => {
    const newProducts = products.filter((p) => p.id !== id);
    saveToLocal(newProducts);
  };

  return { products, isLoaded, addProduct, updateProduct, deleteProduct };
}