"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectGallery({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const next = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % images.length);
  };

  const prev = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (activeIndex === null) return;

      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex]);





  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative group cursor-pointer overflow-hidden rounded-xl h-64 shadow-md hover:shadow-xl"
            onClick={() => setActiveIndex(i)}
          >
            <motion.div
              className="w-full h-full"
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={img}
                alt={`Gallery Image ${i + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-[90%] md:w-[70%] h-[70vh] rounded-xl overflow-hidden"
            >
              <Image
                src={images[activeIndex]}
                alt="Large view"
                fill
                className="object-contain"
              />

              <button
                className="absolute top-4 right-4 text-white hover:text-red-400 transition"
                onClick={() => setActiveIndex(null)}
              >
                <X size={34} />
              </button>

              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:scale-125 transition"
                onClick={prev}
              >
                <ChevronLeft size={50} />
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:scale-125 transition"
                onClick={next}
              >
                <ChevronRight size={50} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
