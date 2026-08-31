"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const INITIAL = 10; // shown immediately
const BATCH = 10; // revealed per scroll / click

export default function ProjectGallery({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const hasMore = visibleCount < images.length;
  const loadMore = () =>
    setVisibleCount((c) => Math.min(c + BATCH, images.length));

  // Auto-reveal the next batch when the sentinel scrolls into view.
  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "300px" } // start loading a bit before it's visible
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, visibleCount]);

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
        {images.slice(0, visibleCount).map((img, i) => (
          <motion.div
            key={img}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (i % BATCH) * 0.08 }}
            className="relative group cursor-pointer overflow-hidden rounded-xl h-64 shadow-md hover:shadow-xl"
            onClick={() => setActiveIndex(i)}
          >
            <Image
              src={img}
              alt={`Gallery Image ${i + 1}`}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </div>

      {/* Sentinel auto-loads the next batch; button is the manual fallback. */}
      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-10">
          <button
            onClick={loadMore}
            className="px-6 py-3 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Load more ({images.length - visibleCount} left)
          </button>
        </div>
      )}

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
