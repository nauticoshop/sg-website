import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { BdMeetingCard } from "@/components/bd-meeting-card";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Discovery Call",
  description:
    "Connect directly with Phallon Ray, Director of Business Development, for a 30-minute discovery call with Surroundings Group.",
};

export default function DiscoveryCallPage() {
  return (
    <>
      <Nav />

      {/* Hero — offset for fixed nav */}
      <section className="bg-canvas pt-36 lg:pt-44 pb-12 lg:pb-16 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <p className="caption text-gold-deep mb-6">DISCOVERY CALL</p>
          <h1 className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-ink max-w-3xl text-balance">
            Let&apos;s talk about what you&apos;re building.
          </h1>
          <p className="text-lg lg:text-xl text-neutral-700 mt-6 max-w-2xl leading-relaxed">
            30 minutes. No pitch deck. We&apos;ll learn your project,
            timeline, and what success looks like, and tell you honestly
            whether we&apos;re the right fit.
          </p>
        </div>
      </section>

      {/* Primary CTA — BD editorial card */}
      <BdMeetingCard
        name="Phallon Ray"
        title="Director of Business Development"
        initials="PR"
        quote="Tell me what you're building. I'll tell you straight whether we're the right team."
        meta="30 minutes. No pitch deck. No follow-up nagging."
        bookingHref="https://calendly.com/nauticalnetwork/introductory"
        bookingLabel="Book 30 min with Phallon"
        eyebrow="CONNECT DIRECTLY"
        // image="/images/team/phallon-ray.jpg"   ← drop the file here when ready
      />

      {/* What to expect + secondary contact form */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* What to expect */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <div className="lg:sticky lg:top-32 space-y-10">
              <div>
                <h2 className="caption text-gold-deep mb-4">WHAT TO EXPECT</h2>
                <ol className="space-y-6">
                  <ExpectationStep
                    num="01"
                    title="Pick a time on Phallon's calendar"
                    copy="The button above. Live availability, no back-and-forth."
                  />
                  <ExpectationStep
                    num="02"
                    title="30-minute discovery"
                    copy="No pitch deck. We listen, ask, and tell you honestly whether we're the right fit."
                  />
                  <ExpectationStep
                    num="03"
                    title="A clear next step"
                    copy="Either a proposal, a referral to someone better suited, or we revisit in 90 days."
                  />
                </ol>
              </div>

              <div className="pt-8 border-t border-neutral-200">
                <h2 className="caption text-gold-deep mb-4">PREFER TO CALL?</h2>
                <a
                  href={`tel:${site.contact.phone.replace(/-/g, "")}`}
                  className="font-sans font-extrabold text-2xl lg:text-3xl text-ink hover:text-gold-deep transition-colors block"
                >
                  {site.contact.phone}
                </a>
                <p className="text-sm text-neutral-600 mt-2">
                  Tampa, FL business hours
                </p>
              </div>
            </div>
          </aside>

          {/* Secondary path — contact form */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <header className="mb-8 lg:mb-10 pb-6 lg:pb-8 border-b border-neutral-200">
              <p className="caption text-gold-deep mb-3">OR SEND A NOTE</p>
              <h2 className="font-sans font-extrabold text-3xl lg:text-4xl text-ink leading-tight text-balance">
                Not ready to grab a time? Tell us what you&apos;re working on
                and we&apos;ll follow up.
              </h2>
            </header>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function ExpectationStep({
  num,
  title,
  copy,
}: {
  num: string;
  title: string;
  copy: string;
}) {
  return (
    <li className="flex gap-4">
      <span className="caption text-gold-deep shrink-0 w-6 pt-1">{num}</span>
      <div>
        <p className="font-sans font-extrabold text-base text-ink mb-1">
          {title}
        </p>
        <p className="text-sm text-neutral-700 leading-relaxed">{copy}</p>
      </div>
    </li>
  );
}
