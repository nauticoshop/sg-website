import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <>
      <Nav variant="dark" />
      <Hero />

      {/* Placeholder sections below the hero — to be built */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto text-center">
          <p className="caption text-neutral-500 mb-4">WHAT WE DO</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            Six disciplines, one in-house team.
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Studio · Social · Digital · Growth · Experiences · Intelligence
          </p>
          <p className="caption text-neutral-400 mt-12">
            Services grid coming next
          </p>
        </div>
      </section>
    </>
  );
}
