"use client";

import { useState, useRef } from "react";
import { useProducts, Product } from "@/hooks/useProducts";
import { Lock, Plus, Pencil, Trash2, X, UploadCloud, ImageIcon } from "lucide-react";

export default function AdminPage() {
  const { products, isLoaded, addProduct, updateProduct, deleteProduct } = useProducts();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discountPrice: "",
    discountLabel: "",
    description: "",
    isAvailable: true,
    image: "",
  });

  if (!isLoaded) return <div className="min-h-screen bg-[#fcf9f5]" />;

  const formatRupiah = (angka: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(angka);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: "", price: "", discountPrice: "", discountLabel: "", description: "", isAvailable: true, image: "" });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingId(p.id);
    setFormData({
      name: p.name,
      price: p.price.toString(),
      discountPrice: p.discountPrice ? p.discountPrice.toString() : "",
      discountLabel: p.discountLabel || "",
      description: p.description || "",
      isAvailable: p.isAvailable,
      image: p.image || "",
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      price: Number(formData.price),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
      discountLabel: formData.discountLabel || undefined,
      description: formData.description,
      isAvailable: formData.isAvailable,
      image: formData.image,
    };

    if (editingId) {
      updateProduct(editingId, productData);
    } else {
      addProduct(productData);
    }
    setIsFormOpen(false);
  };

  return (
    // Background diperbarui ke warna krem yang sangat soft
    <div className="min-h-screen font-sans bg-[#fcf9f5] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-stone-800 to-stone-900 p-3.5 rounded-2xl text-white shadow-lg">
              <Lock size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Panel Admin Mel's Shop</h1>
              <p className="text-sm text-stone-500 font-medium">Sistem Kelola Data Produk</p>
            </div>
          </div>
          <button onClick={handleOpenAdd} className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-md shadow-orange-600/20 active:scale-95">
            <Plus size={18} /> Tambah Produk
          </button>
        </div>

        {isFormOpen && (
          <div className="bg-white rounded-3xl shadow-2xl border border-stone-100 p-6 md:p-8 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            <button onClick={() => setIsFormOpen(false)} className="absolute top-6 right-6 text-stone-400 hover:text-red-500 transition-colors bg-stone-50 p-2 rounded-full">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-6 text-stone-800">{editingId ? "Edit Produk Anda" : "Posting Produk Baru"}</h2>
            
            <form onSubmit={handleSubmit} className="grid md:grid-cols-12 gap-6">
              
              <div className="md:col-span-4 space-y-2">
                <label className="text-sm font-semibold text-stone-700 block">Foto Produk</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-square border-2 border-dashed border-stone-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50/50 transition-all overflow-hidden relative group"
                >
                  {formData.image ? (
                    <>
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-medium flex items-center gap-2"><UploadCloud size={16}/> Ganti Foto</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-stone-400 flex flex-col items-center gap-2">
                      <ImageIcon size={32} />
                      <span className="text-sm font-medium">Klik untuk upload foto</span>
                    </div>
                  )}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              </div>

              <div className="md:col-span-8 grid md:grid-cols-2 gap-4">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-semibold text-stone-700">Nama Produk *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-stone-200 bg-stone-50/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all" placeholder="Misal: Dimsum Ayam" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-stone-700">Harga Asli (Rp) *</label>
                  <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border border-stone-200 bg-stone-50/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all" placeholder="150000" />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-stone-700">Harga Diskon (Rp) - Opsional</label>
                  <input type="number" value={formData.discountPrice} onChange={e => setFormData({...formData, discountPrice: e.target.value})} className="w-full border border-stone-200 bg-stone-50/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all" placeholder="Kosongkan jika tidak ada" />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-stone-700">Label Diskon Khusus</label>
                  <input type="text" value={formData.discountLabel} onChange={e => setFormData({...formData, discountLabel: e.target.value})} className="w-full border border-stone-200 bg-stone-50/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all" placeholder="Misal: Promo Ramadhan" />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-stone-700">Status Ketersediaan</label>
                  <div className="relative">
                    <select 
                      value={formData.isAvailable ? "true" : "false"} 
                      onChange={e => setFormData({...formData, isAvailable: e.target.value === "true"})}
                      className="w-full appearance-none border border-stone-200 bg-stone-50/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all font-medium text-stone-700 cursor-pointer"
                    >
                      {/* Emoji dihilangkan */}
                      <option value="true">Produk Tersedia (Ready)</option>
                      <option value="false">Stok Habis (Sold Out)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-semibold text-stone-700">Deskripsi Produk</label>
                  <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-stone-200 bg-stone-50/50 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all resize-none" placeholder="Ceritakan detail produk ini..." />
                </div>

                <div className="md:col-span-2 mt-4 flex justify-end gap-3 pt-4 border-t border-stone-100">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-2.5 rounded-xl font-medium text-stone-500 hover:bg-stone-100 transition-colors">Batal</button>
                  <button type="submit" className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-2.5 rounded-xl font-medium shadow-md shadow-stone-900/20 transition-all active:scale-95">
                    Post Produk Ini
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-stone-50/80 text-stone-500 text-xs uppercase tracking-widest border-b border-stone-100">
                  <th className="p-5 font-semibold">Foto</th>
                  <th className="p-5 font-semibold">Detail Produk</th>
                  <th className="p-5 font-semibold">Harga</th>
                  <th className="p-5 font-semibold">Status</th>
                  <th className="p-5 font-semibold text-right sticky right-0 bg-stone-50/90 backdrop-blur-sm z-10 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.05)]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {products.length === 0 && (
                  <tr><td colSpan={5} className="p-12 text-center text-stone-400 font-medium">Belum ada produk. Tambahkan produk pertama Anda!</td></tr>
                )}
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50/50 transition-colors group">
                    <td className="p-5">
                      <div className="w-14 h-14 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden flex items-center justify-center">
                        {p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" /> : <ImageIcon className="text-stone-300" size={20} />}
                      </div>
                    </td>
                    <td className="p-5">
                      <p className="text-sm font-bold text-stone-900">{p.name}</p>
                      {p.discountLabel && <span className="inline-block mt-1 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10px] px-2 py-0.5 rounded-md font-medium">{p.discountLabel}</span>}
                    </td>
                    <td className="p-5">
                      {p.discountPrice ? (
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-red-600">{formatRupiah(p.discountPrice)}</span>
                          <span className="text-xs text-stone-400 line-through">{formatRupiah(p.price)}</span>
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-stone-700">{formatRupiah(p.price)}</span>
                      )}
                    </td>
                    <td className="p-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${p.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {p.isAvailable ? "Ready" : "Habis"}
                      </span>
                    </td>
                    {/* Tombol aksi dibuat permanen (opacity-100) */}
                    <td className="p-5 flex justify-end gap-2 items-center h-full pt-7 sticky right-0 bg-white/90 backdrop-blur-sm z-10 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.05)]">
                      <button onClick={() => handleOpenEdit(p)} className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all" title="Edit">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => { if(confirm("Yakin hapus produk ini?")) deleteProduct(p.id); }} className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all" title="Hapus">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
}