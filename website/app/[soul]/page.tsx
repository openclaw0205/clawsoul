import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SoulManifest {
  name: string;
  display_name: string;
  version: string;
  author: string;
  description: string;
  tags: string[];
  skills: string[];
}

interface PageProps {
  params: Promise<{ soul: string }>;
}

async function getSoul(soulName: string) {
  const soulDir = path.join(process.cwd(), "souls", soulName);

  if (!fs.existsSync(soulDir)) {
    return null;
  }

  const manifest: SoulManifest = JSON.parse(
    fs.readFileSync(path.join(soulDir, "manifest.json"), "utf-8")
  );

  const soulMd = fs.existsSync(path.join(soulDir, "SOUL.md"))
    ? fs.readFileSync(path.join(soulDir, "SOUL.md"), "utf-8")
    : null;

  const agentsMd = fs.existsSync(path.join(soulDir, "AGENTS.md"))
    ? fs.readFileSync(path.join(soulDir, "AGENTS.md"), "utf-8")
    : null;

  const memoryMd = fs.existsSync(path.join(soulDir, "MEMORY.md"))
    ? fs.readFileSync(path.join(soulDir, "MEMORY.md"), "utf-8")
    : null;

  return { manifest, soulMd, agentsMd, memoryMd };
}

export async function generateStaticParams() {
  const soulsDir = path.join(process.cwd(), "souls");
  const dirs = fs.readdirSync(soulsDir);
  return dirs.map((soul) => ({ soul }));
}

export default async function SoulPage({ params }: PageProps) {
  const { soul: soulName } = await params;
  const soul = await getSoul(soulName);

  if (!soul) {
    notFound();
  }

  const { manifest, soulMd } = soul;
  const installCommand = `curl -fsSL https://raw.githubusercontent.com/openclaw0205/clawsoul/main/scripts/install.sh | bash -s ${manifest.name}`;
  const manualCommand = `git clone https://github.com/openclaw0205/clawsoul.git && cp -r clawsoul/souls/${manifest.name}/* ~/.openclaw/workspace/`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to list
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-white">{manifest.display_name}</h1>
            <span className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-full">
              v{manifest.version}
            </span>
          </div>
          <p className="text-xl text-gray-400">{manifest.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {manifest.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-orange-500/20 text-orange-400 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Install */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">📦 Installation</h2>

          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-2">One-line install (recommended)</h3>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
              {installCommand}
            </div>
          </div>

          <div>
            <h3 className="text-sm text-gray-400 mb-2">Manual install</h3>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
              {manualCommand}
            </div>
          </div>

          {manifest.skills.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h3 className="text-sm text-gray-400 mb-2">Required skills</h3>
              <div className="flex flex-wrap gap-2">
                {manifest.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-blue-500/20 text-blue-400 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Preview */}
        {soulMd && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">👀 Preview SOUL.md</h2>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono">
                {soulMd}
              </pre>
            </div>
          </div>
        )}

        {/* Author */}
        <div className="mt-8 text-center text-gray-500">
          <p>
            Created by{" "}
            <a
              href={`https://github.com/${manifest.author}`}
              target="_blank"
              className="text-orange-400 hover:underline"
            >
              @{manifest.author}
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
