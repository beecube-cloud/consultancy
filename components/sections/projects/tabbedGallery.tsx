"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectGallery from "./projectGallery";
interface Room {
  id: string;
  label: string;
  slug: string;
  images: string[];
}

export default function TabbedGallery({ rooms }: { rooms: Room[] }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* Tab bar — horizontally scrollable on mobile */}
      <div className="overflow-x-auto scrollbar-hide border-b border-gray-200 mb-8">
        <div className="flex min-w-max">
          {rooms.map((room, i) => (
            <button
              key={room.id}
              onClick={() => setActiveTab(i)}
              className={`relative px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === i
                  ? "text-[#000099]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {room.label}
              {activeTab === i && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#000099] rounded-t"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={rooms[activeTab].id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          <ProjectGallery images={rooms[activeTab].images} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
