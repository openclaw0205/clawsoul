import Link from "next/link";
import fs from "fs";
import path from "path";

interface SoulManifest {
  name: string;
  display_name: string;
  version: string;
  author: string;
  description: string;
  tags: string[];
}

async function getSouls(): Promise<SoulManifest[]> {
  const soulsDir = path.join(process.cwd(), "souls");
  const dirs = fs.readdirSync(soulsDir);

  const souls: SoulManifest[] = [];
  for (const dir of dirs) {
    const manifestPath = path.join(soulsDir, dir, "manifest.json");
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
      souls.push(manifest);
    }
  }
  return souls;
}

export default async function Home() {
  const souls = await getSouls();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🦞</span>
              <div>
                <h1 className="text-2xl font-bold text-white">ClawSoul</h1>
                <p className="text-gray-400 text-sm">Soul templates for OpenClaw</p>
              </div>
            </div>
            <a
              href="https://github.com/openclaw0205/clawsoul"
              target="_blank"
              className="text-gray-400 hover:text-white transition"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Give Your AI Assistant a Soul
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Reject mediocre chatbots. Transform your OpenClaw into domain experts instantly.
        </p>
      </section>

      {/* Soul Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {souls.map((soul) => (
            <Link
              key={soul.name}
              href={`/${soul.name}`}
              className="group bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-all hover:shadow-lg hover:shadow-orange-500/10"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-orange-400 transition">
                  {soul.display_name}
                </h3>
                <span className="text-xs text-gray-500">v{soul.version}</span>
              </div>
              <p className="text-gray-400 mb-4 line-clamp-2">{soul.description}</p>
              <div className="flex flex-wrap gap-2">
                {soul.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-sm text-gray-500">by @{soul.author}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-500">
          <p>MIT License · Open Source · Made with 🦞</p>
        </div>
      </footer>
    </div>
  );
}
