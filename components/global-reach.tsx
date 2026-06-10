import { GlobalReachMap } from "./global-reach-map";

/**
 * Global reach section — dark mode, full-bleed.
 *
 * Wraps the GlobalReachMap with editorial copy positioning the agency
 * as Tampa-rooted with worldwide audience and client reach.
 */
export function GlobalReach() {
  return (
    <section className="bg-ink text-canvas py-24 lg:py-36 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 lg:mb-20">
          <div className="lg:col-span-7">
            <p className="caption text-gold mb-6">GLOBAL PRESENCE</p>
            <h2 className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.02] tracking-tight text-balance">
              Work that reaches the world.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-lg lg:text-xl text-canvas/70 leading-relaxed">
              255M+ affluent viewers a year across an owned-media network on
              four continents. And a production team that goes where the work
              is — from the Bahamas and the Riviera to Dubai and Bangkok.
              When our clients launch, the world is already watching.
            </p>
          </div>
        </header>

        <div className="bg-canvas/[0.03] p-6 lg:p-12 border border-canvas/10">
          <GlobalReachMap />
        </div>
      </div>
    </section>
  );
}
