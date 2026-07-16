import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Surroundings Group about your next campaign, content program, or website build.",
};

/** The three ways in — email, call, book. One tap each. */
const channels = [
  {
    label: "Email us",
    value: "interested@surroundingsgroup.com",
    detail: "Best for briefs, press, and partnerships.",
    href: "mailto:interested@surroundingsgroup.com",
    external: false,
  },
  {
    label: "Call us",
    value: "813-869-0162",
    detail: "Mon–Fri, 9–5 ET.",
    href: "tel:8138690162",
    external: false,
  },
  {
    label: "Book a discovery call",
    value: "30 minutes, on the calendar",
    detail: "Pick a time that works. No back-and-forth.",
    href: "/discovery-call",
    external: false,
  },
];

export default function ContactPage() {
  return (
    <>
      <Nav />

      {/* Hero — offset for fixed nav */}
      <section className="bg-canvas pt-36 lg:pt-44 pb-12 lg:pb-16 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <p className="caption text-neutral-500 mb-6">◆ CONTACT</p>
          <h1 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink max-w-3xl text-balance">
            Let&apos;s work together.
          </h1>
          <p className="text-xl lg:text-2xl font-light text-ink mt-6 max-w-2xl leading-[1.35] text-balance">
            Tell us what you&apos;re building.{" "}
            <span className="text-ink/55">
              We reply within one business day.
            </span>
          </p>
        </div>
      </section>

      {/* Three ways in — one tap each */}
      <section className="bg-canvas pb-16 lg:pb-20 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <ul className="border-t border-neutral-200">
            {channels.map((c) => (
              <li key={c.label}>
                <Link
                  href={c.href}
                  className="group grid grid-cols-1 md:grid-cols-12 md:items-baseline gap-x-6 gap-y-1 py-6 lg:py-8 border-b border-neutral-200 hover:border-ink/40 transition-colors duration-300"
                >
                  <h2 className="md:col-span-4 font-sans font-extrabold text-xl lg:text-2xl text-ink group-hover:text-neutral-500 transition-colors duration-300">
                    {c.label}
                  </h2>
                  <p className="md:col-span-4 text-base lg:text-lg text-ink break-words">
                    {c.value}
                  </p>
                  <p className="md:col-span-3 text-sm text-neutral-600">
                    {c.detail}
                  </p>
                  <span className="hidden md:flex md:col-span-1 justify-end text-neutral-400 group-hover:text-ink transition-colors duration-300">
                    <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Form + studio info */}
      <section className="bg-[#EFE7DA] py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8">
            <header className="mb-8 lg:mb-10">
              <p className="caption text-neutral-500 mb-3">◆ OR SEND THE DETAILS</p>
              <h2 className="font-sans font-extrabold text-3xl lg:text-4xl text-ink leading-tight text-balance">
                Send a note.
              </h2>
            </header>
            <ContactForm />
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-10 lg:pt-20">
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
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path
        d="M1 5h12m0 0L9 1m4 4L9 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
