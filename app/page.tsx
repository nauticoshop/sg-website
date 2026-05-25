export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-screen px-6 relative">
      <div className="max-w-4xl text-center">
        <p className="caption text-gold mb-8">SURROUNDINGS GROUP</p>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-10 text-balance">
          An award-winning creative agency for premium markets.
        </h1>

        <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Full-service creative, content, and distribution for luxury brands —
          built by the team behind Nautical Network&apos;s 180M+ annual viewers.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/discovery-call"
            className="bg-ink text-canvas px-8 py-4 text-sm font-medium tracking-wide hover:bg-deep transition-colors duration-300"
          >
            Book a discovery call
          </a>
          <a
            href="/case-studies"
            className="border border-ink text-ink px-8 py-4 text-sm font-medium tracking-wide hover:bg-ink hover:text-canvas transition-colors duration-300"
          >
            Explore our work
          </a>
        </div>
      </div>

      <footer className="absolute bottom-6 left-0 right-0 text-center caption text-neutral-400">
        v0.1 — Next.js scaffold · {new Date().getFullYear()}
      </footer>
    </main>
  );
}
