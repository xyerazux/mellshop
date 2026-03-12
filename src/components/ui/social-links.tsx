"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Social {
  name: string;
  image: string;
  url: string;
}

interface SocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  socials: Social[];
}

export function SocialLinks({ socials, className, ...props }: SocialLinksProps) {
  const [hoveredSocial, setHoveredSocial] = React.useState<string | null>(null);
  const [rotation, setRotation] = React.useState<number>(0);

  return (
    <div className={cn("flex items-center justify-center gap-6 md:gap-2", className)} {...props}>
      {socials.map((social, index) => (
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative cursor-pointer px-2 md:px-5 py-2 transition-opacity duration-200 flex items-center gap-3",
            hoveredSocial && hoveredSocial !== social.name ? "md:opacity-50" : "opacity-100"
          )}
          key={index}
          onMouseEnter={() => {
            setHoveredSocial(social.name);
            setRotation(Math.random() * 20 - 10);
          }}
          onMouseLeave={() => setHoveredSocial(null)}
        >
          {/* Di Desktop tampilkan teks (animasi jalan), Di Mobile sembunyikan teks */}
          <span className="hidden md:block text-lg font-medium">{social.name}</span>
          
          {/* Di Mobile tampilkan logo permanen, Di Desktop sembunyikan logo permanen (biarkan animasi yang kerja) */}
          <img src={social.image} alt={social.name} className="block md:hidden w-10 h-10 object-contain drop-shadow-sm" />

          {/* Animasi Hover KHUSUS DESKTOP */}
          <AnimatePresence>
            {hoveredSocial === social.name && (
              <motion.div
                className="hidden md:flex absolute bottom-0 left-0 right-0 h-full w-full items-center justify-center pointer-events-none"
              >
                <motion.img
                  src={social.image}
                  alt={social.name}
                  className="size-16 object-contain drop-shadow-lg"
                  initial={{ y: -40, rotate: rotation, opacity: 0, filter: "blur(2px)" }}
                  animate={{ y: -50, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -40, opacity: 0, filter: "blur(2px)" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </a>
      ))}
    </div>
  );
}