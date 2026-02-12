"use client";

import { useState } from "react";

interface FileTabsProps {
  soulMd: string | null;
  agentsMd: string | null;
  memoryMd: string | null;
}

type TabType = "soul" | "agents" | "memory";

export default function FileTabs({ soulMd, agentsMd, memoryMd }: FileTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("soul");

  const tabs: { key: TabType; label: string; content: string | null }[] = [
    { key: "soul" as TabType, label: "SOUL.md", content: soulMd },
    { key: "agents" as TabType, label: "AGENTS.md", content: agentsMd },
    { key: "memory" as TabType, label: "MEMORY.md", content: memoryMd },
  ].filter((tab): tab is { key: TabType; label: string; content: string } => tab.content !== null);

  const activeContent = tabs.find((tab) => tab.key === activeTab)?.content || soulMd;

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
      <div className="flex border-b border-gray-800 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 text-sm font-medium transition ${
              activeTab === tab.key
                ? "text-orange-400 border-b-2 border-orange-400 bg-orange-400/5"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* File Content */}
      <div className="p-6 max-h-[600px] overflow-y-auto">
        <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">
          {activeContent}
        </pre>
      </div>
    </div>
  );
}
