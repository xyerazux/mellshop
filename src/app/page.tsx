"use client";

import { useState, useEffect } from "react";
import { FadeIn } from "@/components/FadeIn";
import { useProducts } from "@/hooks/useProducts";
import { SocialLinks } from "@/components/ui/social-links";
import { ShoppingBag, Tag, Search, CornerDownRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 8;

// Foto Banner Lokal dari folder public/assets
const bannerImages = [
  "/assets/gambar1.png",
  "/assets/gambar2.png",
  "/assets/gambar3.png"
];

export default function Home() {
  const { products, isLoaded } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(slideInterval);
  }, []);

  if (!isLoaded) return <div className="min-h-screen bg-orange-50/50" />;

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatRupiah = (angka: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(angka);

  const WA_NUMBER = "6282298331632";

  return (
    <main id="beranda" className="min-h-screen flex flex-col bg-gradient-to-br from-orange-100 via-orange-50/80 to-amber-100 selection:bg-orange-200 selection:text-orange-900 font-sans">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-orange-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center">
            {/* Tinggi logo diatur otomatis menyesuaikan layar (h-10 di HP, h-12 di Laptop) */}
            <img src="/assets/logo-mellshop.png" alt="Mellshop Logo" className="h-18 md:h-25 w-auto object-contain" />
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-600">
             <a href="#beranda" className="hover:text-orange-600 transition">Beranda</a>
             <a href="#katalog" className="hover:text-orange-600 transition">Produk</a>
             <a href="#footer" className="hover:text-orange-600 transition">About</a>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden p-2 text-orange-600 hover:bg-orange-50 rounded-xl transition-colors"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-orange-100 shadow-xl md:hidden flex flex-col"
            >
              <a href="#beranda" onClick={() => setIsMobileMenuOpen(false)} className="p-5 font-semibold text-stone-700 border-b border-orange-50 hover:bg-orange-50 hover:text-orange-600 transition-colors">Beranda</a>
              <a href="#katalog" onClick={() => setIsMobileMenuOpen(false)} className="p-5 font-semibold text-stone-700 border-b border-orange-50 hover:bg-orange-50 hover:text-orange-600 transition-colors">Produk</a>
              <a href="#footer" onClick={() => setIsMobileMenuOpen(false)} className="p-5 font-semibold text-stone-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">About</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 md:gap-16 items-center w-full">
        <FadeIn delay={0.1}>
          <div className="space-y-6 md:space-y-8 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 leading-[1.1] tracking-tight">
              Pilihan Makanan Lengkap <br className="hidden md:block"/> <span className="text-orange-600">Dalam Satu Tempat.</span>
            </h1>
            <p className="text-base md:text-lg text-stone-600 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
              Nikmati kemudahan membeli makanan ringan, makanan siap santap, dan frozen food berkualitas dengan proses pemesanan yang cepat dan praktis.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#katalog" className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-orange-600/30">
                Pesan Sekarang
              </a>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.3}>
          <div className="relative w-full aspect-square md:aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl group bg-stone-100">
             <AnimatePresence initial={false}>
               <motion.img 
                 key={currentBannerIndex}
                 src={bannerImages[currentBannerIndex]}
                 alt="Aneka Makanan Mellshop"
                 initial={{ x: "100%" }}
                 animate={{ x: 0 }}
                 exit={{ x: "-100%" }}
                 transition={{ duration: 0.8, ease: "easeInOut" }}
                 className="absolute inset-0 w-full h-full object-cover"
               />
             </AnimatePresence>
             
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none"></div>
             
             <div className="absolute bottom-6 left-6 right-6 text-white text-left z-20 pointer-events-none">
                <p className="font-bold text-xl md:text-2xl drop-shadow-md">Kualitas & Rasa Terbaik</p>
                <p className="text-sm md:text-base font-medium opacity-90 drop-shadow-md">Siap dihidangkan untuk Anda.</p>
             </div>
          </div>
        </FadeIn>
      </section>

      {/* KATALOG SECTION */}
      <section id="katalog" className="max-w-7xl mx-auto px-4 py-16 md:py-20 w-full grow scroll-mt-20">
        <FadeIn>
          <div className="text-center mb-12 md:mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">Katalog Produk</h2>
            <p className="text-sm md:text-base text-stone-500 max-w-sm mx-auto font-medium">Pilih jajanan dan stok makanan favorit Anda.</p>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <div className="max-w-3xl mx-auto mb-12 md:mb-16 relative">
             <input
               type="text"
               placeholder="Cari nama makanan..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-white border border-orange-100/80 rounded-2xl px-12 py-4 md:py-5 text-sm md:text-base font-medium text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-orange-400 outline-none shadow-sm transition-all"
             />
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 w-5 h-5" />
          </div>
        </FadeIn>
        
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-stone-100 rounded-3xl p-12 md:p-16 text-center shadow-sm">
            <p className="text-stone-500 font-medium text-base md:text-lg">Produk tidak ditemukan atau belum ditambahkan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {currentProducts.map((product, index) => (
              <FadeIn key={product.id} delay={index * 0.05}>
                <div className="bg-[#FFFDFB] rounded-2xl md:rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgb(0,0,0,0.06)] transition-all duration-300 border border-orange-100/50 hover:border-orange-200 flex flex-col h-full overflow-hidden group">
                  
                  <div className="relative w-full aspect-square bg-stone-50 overflow-hidden flex items-center justify-center">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <ShoppingBag className="text-stone-300 w-10 h-10 md:w-12 md:h-12" />
                    )}
                     
                     {product.discountPrice && product.isAvailable && product.discountLabel && (
                       <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-500 text-white text-[9px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full shadow-md z-10 flex items-center gap-1">
                         <Tag size={10} className="md:w-3 md:h-3" /> {product.discountLabel}
                       </div>
                     )}

                    {!product.isAvailable && (
                      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-20">
                        <span className="text-white font-bold bg-stone-900 px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs shadow-xl tracking-wide uppercase">
                          Mohon Maaf, Produk Habis
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-3 md:p-5 flex flex-col grow">
                    
                    {product.isAvailable ? (
                      <div className="text-orange-600 text-[10px] md:text-xs font-bold flex items-center gap-1 mb-1 md:mb-1.5">
                         <CornerDownRight size={12} className="md:w-[14px] md:h-[14px]" /> Siap Diantar
                      </div>
                    ) : (
                      <div className="h-4 md:h-5 mb-1 md:mb-1.5"></div>
                    )}

                    <h3 className="font-bold text-stone-900 text-xs md:text-base line-clamp-2 mb-1 md:mb-1.5 group-hover:text-orange-600 transition-colors leading-tight">
                      {product.name}
                    </h3>
                    
                    <div className="mb-2 md:mb-4">
                      {product.discountPrice ? (
                        <div className="flex flex-col">
                          <span className="font-extrabold text-red-500 text-sm md:text-lg tracking-tight">{formatRupiah(product.discountPrice)}</span>
                          <span className="text-[9px] md:text-xs text-stone-400 line-through font-medium">{formatRupiah(product.price)}</span>
                        </div>
                      ) : (
                        <span className="font-extrabold text-stone-900 text-sm md:text-lg tracking-tight">{formatRupiah(product.price)}</span>
                      )}
                    </div>

                    <p className="text-[9px] md:text-xs text-stone-500 line-clamp-2 mb-4 md:mb-6 grow leading-relaxed font-medium">
                      {product.description || "Tidak ada deskripsi"}
                    </p>
                    
                    <div className="mt-auto">
                      <a
                        href={product.isAvailable ? `https://wa.me/${WA_NUMBER}?text=Halo%20Mel'sShop,%20saya%20tertarik%20membeli%20*${product.name}*%20seharga%20*${formatRupiah(product.discountPrice || product.price)}*` : "#"}
                        target={product.isAvailable ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-1.5 md:gap-2 w-full py-2.5 md:py-3.5 rounded-xl text-[10px] md:text-sm font-bold transition-all ${
                          product.isAvailable 
                            ? "bg-[#25D366] hover:bg-[#20bd5a] text-white active:scale-95 shadow-lg shadow-[#25D366]/30" 
                            : "bg-stone-100 text-stone-400 cursor-not-allowed"
                        }`}
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg>
                        Pesan via WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <FadeIn>
            <div className="flex justify-center items-center gap-2 mt-12 md:mt-20">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentPage(idx + 1);
                    document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl md:rounded-2xl font-bold text-xs md:text-sm transition-all ${
                    currentPage === idx + 1 
                      ? "bg-orange-600 text-white shadow-xl shadow-orange-600/30" 
                      : "bg-white text-stone-600 hover:bg-orange-50 border border-orange-100"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </FadeIn>
        )}
      </section>

      {/* FOOTER: Background Soft Peach/Orange Muda (Berbeda dari Body) */}
      <footer id="footer" className="bg-[#FFE8D1] pt-16 md:pt-20 pb-10 md:pb-12 mt-auto border-t border-orange-200">
        <FadeIn>
          <div className="text-center mb-10 space-y-2">
            {/* Logo favicon + Mellshop disandingkan */}
            <div className="flex justify-center mb-4">
            {/* Di footer dibikin sedikit lebih besar (h-12 di HP, h-16 di Laptop) */}
            <img src="/assets/logo-mellshop.png" alt="Mellshop Logo" className="h-20 md:h-28 w-auto object-contain drop-shadow-sm" />
          </div>
            <p className="text-stone-600 text-xs md:text-sm font-medium">Mitra belanja makanan praktis Anda.</p>
          </div>
          
          {/* DESKTOP SOCIAL LINKS (Dengan Efek Animasi) */}
          <div className="hidden md:flex justify-center mb-16">
            <SocialLinks 
              socials={[
                { name: "Instagram", image: "https://cdn-icons-png.flaticon.com/512/174/174855.png", url: "https://instagram.com/twins_mot" },
                { name: "WhatsApp", image: "https://cdn-icons-png.flaticon.com/512/733/733585.png", url: `https://wa.me/${WA_NUMBER}` }
              ]} 
            />
          </div>

          {/* MOBILE SOCIAL LINKS (Logo Tampil Permanen dan Jelas) */}
          <div className="flex md:hidden justify-center items-center gap-8 mb-12">
             <a href="https://instagram.com/twins_mot" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
               <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" className="w-12 h-12 drop-shadow-md" />
               <span className="text-[10px] font-bold text-stone-700">Instagram</span>
             </a>
             <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
               <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" className="w-12 h-12 drop-shadow-md" />
               <span className="text-[10px] font-bold text-stone-700">WhatsApp</span>
             </a>
          </div>

          <div className="text-center text-[10px] md:text-xs font-semibold text-orange-600/60 border-t border-orange-200/50 pt-8">
            &copy; {new Date().getFullYear()} Mellshop. All rights reserved.
          </div>
        </FadeIn>
      </footer>
    </main>
  );
}