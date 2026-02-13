"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface SoulManifest {
  name: string;
  display_name: string;
  version: string;
  author: string;
  description: string;
  tags: string[];
}

interface SoulsExplorerProps {
  souls: SoulManifest[];
  locale: string;
  t: {
    hero: {
      searchPlaceholder: string;
    };
    filters: {
      all: string;
      featured: string;
      latest: string;
      business: string;
      development: string;
      activeTag: string;
      allTags: string;
      noResults: string;
      clearFilters: string;
    };
    souls: {
      title: string;
      available: string;
      by: string;
      viewDetails: string;
    };
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };
}

// Soul emoji mapping
const soulEmojis: Record<string, string> = {
  "pm-expert": "📋",
  "seo-master": "🔍",
  "code-mentor": "💻",
  "life-coach": "🌟",
};

// Tag to filter category mapping
const tagCategories: Record<string, string[]> = {
  business: ["product", "management", "planning", "business", "marketing"],
  development: ["code", "programming", "developer", "tech", "engineering"],
};

export default function SoulsExplorer({
  souls,
  locale,
  t,
}: SoulsExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    souls.forEach((soul) => soul.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [souls]);

  // Filter souls based on search, filter, and tag
  const filteredSouls = useMemo(() => {
    let result = souls.filter((soul) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          soul.name.toLowerCase().includes(query) ||
          soul.display_name.toLowerCase().includes(query) ||
          soul.description.toLowerCase().includes(query) ||
          soul.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (
        activeFilter !== "all" &&
        activeFilter !== "featured" &&
        activeFilter !== "latest"
      ) {
        const categoryTags = tagCategories[activeFilter];
        if (categoryTags) {
          const hasCategory = soul.tags.some((tag) =>
            categoryTags.some((catTag) =>
              tag.toLowerCase().includes(catTag.toLowerCase()),
            ),
          );
          if (!hasCategory) return false;
        }
      }

      // Tag filter
      if (activeTag) {
        if (!soul.tags.includes(activeTag)) return false;
      }

      return true;
    });

    // Latest: reverse order (newest added last in the array)
    if (activeFilter === "latest") {
      result = [...result].reverse();
    }

    return result;
  }, [souls, searchQuery, activeFilter, activeTag]);

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveTag(activeTag === tag ? null : tag);
    setActiveFilter("all");
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setActiveTag(null);
  };

  return (
    <>
      {/* Header Section */}
      <section className="px-6 lg:px-12 py-8 border-b border-gray-800">
        <div className="max-w-6xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {t.souls.title}
              </h1>
              <p className="text-gray-400">
                {souls.length} {t.souls.available}
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.hero.searchPlaceholder}
                className="w-full px-5 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            <button
              onClick={() => handleFilterClick("all")}
              className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                activeFilter === "all" && !activeTag
                  ? "bg-orange-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              🔥 {t.filters.all}
            </button>
            <button
              onClick={() => handleFilterClick("featured")}
              className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                activeFilter === "featured"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              ⭐ {t.filters.featured}
            </button>
            <button
              onClick={() => handleFilterClick("latest")}
              className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                activeFilter === "latest"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              🆕 {t.filters.latest}
            </button>
            <button
              onClick={() => handleFilterClick("business")}
              className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                activeFilter === "business"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              💼 {t.filters.business}
            </button>
            <button
              onClick={() => handleFilterClick("development")}
              className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                activeFilter === "development"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              💻 {t.filters.development}
            </button>
          </div>

          {/* Active Tag Indicator */}
          {activeTag && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {t.filters.activeTag}
              </span>
              <button
                onClick={() => setActiveTag(null)}
                className="inline-flex items-center gap-1 px-3 py-1 bg-orange-500/20 text-orange-400 text-sm rounded-full hover:bg-orange-500/30 transition"
              >
                {activeTag}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* All Tags */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <span className="text-sm text-gray-500 block mb-3">
              {t.filters.allTags}
            </span>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={(e) => handleTagClick(tag, e)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition ${
                    activeTag === tag
                      ? "bg-orange-500 text-white"
                      : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Soul Cards Grid */}
      <section className="px-6 lg:px-12 py-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-500">
            {filteredSouls.length} / {souls.length} {t.souls.available}
          </span>
        </div>

        {filteredSouls.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg">{t.filters.noResults}</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
                setActiveTag(null);
              }}
              className="mt-4 px-4 py-2 text-orange-400 hover:text-orange-300 transition"
            >
              {t.filters.clearFilters}
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSouls.map((soul) => (
              <Link
                key={soul.name}
                href={`/${locale}/${soul.name}`}
                className="group bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-orange-500/50 transition-all hover:shadow-xl hover:shadow-orange-500/5"
              >
                {/* Card Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-2xl shrink-0">
                    {soulEmojis[soul.name] || "🦞"}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition truncate">
                      {soul.display_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t.souls.by} @{soul.author}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
                  {soul.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {soul.tags.slice(0, 3).map((tag) => (
                    <button
                      key={tag}
                      onClick={(e) => handleTagClick(tag, e)}
                      className={`px-2.5 py-1 text-xs rounded-md transition ${
                        activeTag === tag
                          ? "bg-orange-500/30 text-orange-400"
                          : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                  {soul.tags.length > 3 && (
                    <span className="px-2.5 py-1 text-xs bg-gray-800 text-gray-500 rounded-md">
                      +{soul.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Version Badge */}
                <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
                  <span className="text-xs text-gray-600">v{soul.version}</span>
                  <span className="text-xs text-orange-400 opacity-0 group-hover:opacity-100 transition">
                    {t.souls.viewDetails}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-12 py-16 border-t border-gray-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t.cta.title}</h2>
          <p className="text-gray-400 mb-8">{t.cta.description}</p>
          <Link
            href={`/${locale}/submit`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            {t.cta.button}
          </Link>
        </div>
      </section>
    </>
  );
}
