import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Surroundings Group about your next campaign, content program, or website build.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />

      {/* Hero — offset for fixed nav */}
      <section className="bg-canvas pt-36 lg:pt-44 pb-16 lg:pb-20 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <p className="caption text-neutral-500 mb-6">◆ CONTACT</p>
          <h1 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink max-w-3xl text-balance">
            Let&apos;s work together.
          </h1>
          <p className="text-lg lg:text-xl text-neutral-700 mt-6 max-w-2xl leading-relaxed">
            We work with a small roster of premium brands at a time. Tell us
            what you&apos;re building.
          </p>
        </div>
      </section>

      {/* Form + Contact info */}
      <section className="bg-canvas pb-24 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact info sidebar */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <div className="lg:sticky lg:top-32 space-y-10">
              <div>
                <h2 className="caption text-neutral-500 mb-4">◆ GET IN TOUCH</h2>
                <ul className="space-y-3">
                  <li>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="text-lg text-ink hover:text-neutral-500 transition-colors"
                    >
                      {site.contact.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${site.contact.phone.replace(/-/g, "")}`}
                      className="text-lg text-ink hover:text-neutral-500 transition-colors"
                    >
                      {site.contact.phone}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="caption text-neutral-500 mb-4">◆ STUDIO</h2>
                <address className="not-italic text-base text-neutral-700 leading-relaxed">
                  {site.contact.city}
                </address>
              </div>

              <div>
                <h2 className="caption text-neutral-500 mb-4">◆ FOLLOW</h2>
                <ul className="space-y-3">
                  <li>
                    <a
                      href={site.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-neutral-700 hover:text-ink transition-colors"
                    >
                      Instagram →
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.social.vimeo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-neutral-700 hover:text-ink transition-colors"
                    >
                      Vimeo →
                    </a>
                  </li>
                </ul>
              </div>

              <div className="pt-8 border-t border-neutral-200">
                <p className="text-sm text-neutral-600 leading-relaxed">
                  For press, partnerships, or general inquiries, email is best.
                  For project briefs, the form routes straight to Phallon and
                  the team. Or{" "}
                  <a
                    href="/discovery-call"
                    className="underline hover:text-ink transition-colors"
                  >
                    book a 30-minute discovery
                  </a>{" "}
                  directly on her calendar.
                </p>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
