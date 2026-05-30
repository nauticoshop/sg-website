import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { team } from "@/lib/team";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The team behind Surroundings Group. Vertical-fluent practitioners building creative work, content systems, and owned distribution for premium brands.",
};

export default function TeamPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="TEAM"
        title="The people behind the work."
        subhead="Fully in-house. Vertical-fluent. The team that plans the work is the team that ships it."
      />

      <section className="bg-canvas py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {team.map((m) => (
              <li key={m.slug} className="group">
                <div className="aspect-[4/5] bg-ink mb-6 overflow-hidden">
                  {/* Real headshot placeholder — Billy to provide */}
                  <div className="w-full h-full flex items-center justify-center text-canvas/30">
                    <span className="font-sans font-extrabold text-6xl">
                      {m.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                </div>
                <p className="caption text-gold-deep mb-2">{m.department}</p>
                <h3 className="font-sans font-extrabold text-2xl text-ink mb-1">
                  {m.name}
                </h3>
                <p className="text-sm text-neutral-600 mb-3">{m.role}</p>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {m.bio}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-16 lg:mt-20 max-w-2xl">
            <p className="text-sm text-neutral-600 leading-relaxed">
              <span className="caption text-gold-deep mr-2">NOTE</span>
              The team grid above includes placeholder roles for the leadership
              and discipline leads while real photography and confirmed names
              are being gathered. Want to join the studio?{" "}
              <a
                href="/careers"
                className="underline hover:text-ink transition-colors"
              >
                See open roles →
              </a>
            </p>
          </div>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </>
  );
}
