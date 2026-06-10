import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Nav />

      <section className="bg-ink text-canvas min-h-screen flex items-center px-6 lg:px-12 pt-24 pb-20">
        <div className="max-w-[1200px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5">
              <p className="caption text-gold mb-6">404</p>
              <p
                className="font-sans font-extrabold text-gold leading-none tracking-tight"
                style={{ fontSize: "clamp(8rem, 22vw, 18rem)" }}
                aria-hidden
              >
                404
              </p>
            </div>

            <div className="lg:col-span-7">
              <p className="caption text-gold mb-6">PAGE NOT FOUND</p>
              <h1 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-canvas mb-6 text-balance">
                The page you&apos;re looking for isn&apos;t here.
              </h1>
              <p className="text-base lg:text-lg text-canvas/75 leading-relaxed mb-10 max-w-xl">
                It might have moved, been retired, or never existed. Try
                heading back to the homepage, or look around the Studio
                Journal for what we&apos;re making.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/"
                  className="bg-gold text-ink px-8 py-4 text-sm font-bold tracking-wide hover:bg-canvas transition-colors duration-300"
                >
                  Back to home
                </Link>
                <Link
                  href="/journal"
                  className="border border-canvas/40 text-canvas px-8 py-4 text-sm font-medium tracking-wide hover:bg-canvas hover:text-ink hover:border-canvas transition-colors duration-300 inline-flex items-center justify-center gap-2"
                >
                  Studio Journal
                </Link>
              </div>

              <div className="mt-12 pt-8 border-t border-canvas/15">
                <p className="caption text-canvas/50 mb-3">
                  STILL CAN&apos;T FIND WHAT YOU NEED?
                </p>
                <Link
                  href="/contact"
                  className="text-base text-canvas hover:text-gold transition-colors underline underline-offset-4"
                >
                  Get in touch and we&apos;ll point you in the right
                  direction.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
