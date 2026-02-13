"use client";

import Link from "next/link";

interface Soul {
  name: string;
  display_name: string;
  description: string;
  tags: string[];
  author: string;
}

interface SoulMarqueeProps {
  souls: Soul[];
  locale: string;
  direction?: "left" | "right";
}

function SoulCard({ soul, locale }: { soul: Soul; locale: string }) {
  return (
    <Link
      href={`/${locale}/${soul.name}`}
      className="flex-shrink-0 w-80 p-5 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-orange-500/50 hover:bg-gray-800 transition-all duration-300 group"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-400 text-lg group-hover:bg-orange-500/30 transition">
          🦞
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate group-hover:text-orange-400 transition">
            {soul.display_name}
          </h3>
          <p className="text-xs text-gray-500">by @{soul.author}</p>
        </div>
      </div>
      <p className="text-sm text-gray-400 line-clamp-2 mb-3">{soul.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {soul.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs bg-gray-700/50 text-gray-400 rounded"
          >
            {tag}
          </span>
        ))}
        {soul.tags.length > 3 && (
          <span className="px-2 py-0.5 text-xs text-gray-500">
            +{soul.tags.length - 3}
          </span>
        )}
      </div>
    </Link>
  );
}

export default function SoulMarquee({ souls, locale, direction = "left" }: SoulMarqueeProps) {
  // Double the souls for seamless loop
  const displaySouls = [...souls, ...souls];
  
  return (
    <div className="relative overflow-hidden py-4">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />
      
      <div
        className={`flex gap-6 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
        style={{
          width: "max-content",
        }}
      >
        {displaySouls.map((soul, index) => (
          <SoulCard key={`${soul.name}-${index}`} soul={soul} locale={locale} />
        ))}
      </div>
    </div>
  );
}
