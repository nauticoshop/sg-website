import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Discovery Call",
  description:
    "Schedule a 30-minute discovery call with Surroundings Group to talk through your project, timeline, and what success looks like.",
};

export default function DiscoveryCallPage() {
  return (
    <>
      <Nav />

      {/* Hero — offset for fixed nav */}
      <section className="bg-canvas pt-36 lg:pt-44 pb-16 lg:pb-20 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <p className="caption text-gold-deep mb-6">DISCOVERY CALL</p>
          <h1 className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-ink max-w-3xl text-balance">
            Let&apos;s talk about what you&apos;re building.
          </h1>
          <p className="text-lg lg:text-xl text-neutral-700 mt-6 max-w-2xl leading-relaxed">
            30 minutes. No pitch deck. We&apos;ll learn your project,
            timeline, and what success looks like — and tell you honestly
            whether we&apos;re the right fit.
          </p>
        </div>
      </section>

      <section className="bg-canvas pb-24 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* What to expect */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <div className="lg:sticky lg:top-32 space-y-10">
              <div>
                <h2 className="caption text-gold-deep mb-4">WHAT TO EXPECT</h2>
                <ol className="space-y-6">
                  <ExpectationStep
                    num="01"
                    title="You send a brief note"
                    copy="The form on the right. Two minutes. We just need enough context to bring the right person to the call."
                  />
                  <ExpectationStep
                    num="02"
                    title="We schedule the call"
                    copy="You'll get a calendar link within one business day. Pick a time that works."
                  />
                  <ExpectationStep
                    num="03"
                    title="30-minute discovery"
                    copy="No pitch deck. We listen, ask, and tell you honestly whether we're the right fit."
                  />
                  <ExpectationStep
                    num="04"
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

          {/* Form */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <ContactForm />
            <p className="text-xs text-neutral-500 mt-6">
              Live calendar booking via Cal.com is coming soon. For now, the
              form above routes straight to Billy and the team — we&apos;ll
              send a calendar link within one business day.
            </p>
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
