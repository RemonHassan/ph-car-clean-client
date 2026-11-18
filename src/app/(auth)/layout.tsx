import { Car, Check, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const benefits = [
  "Verified detailers at your doorstep",
  "Clear pricing before you book",
  "Free rescheduling, no hidden fees",
];

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-muted/30 px-4 py-10 sm:px-6 sm:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-brand-amber/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full bg-brand-navy/10 blur-3xl"
      />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border/70 bg-background shadow-xl shadow-brand-navy/5 lg:grid-cols-[1.05fr_1fr]">
        <aside className="relative hidden flex-col justify-between gap-10 overflow-hidden bg-brand-navy p-10 text-white lg:flex xl:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-20 size-72 rounded-full bg-brand-amber/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full bg-sky-400/20 blur-3xl"
          />

          <div className="relative flex items-center gap-3">
            <Link
              href="/"
              aria-label="Car Wash home"
              className="flex items-center gap-3 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-white/40"
            >
              <span className="relative grid size-11 place-items-center rounded-full bg-linear-to-br from-[#1b4a7a] to-[#081a30] ring-1 ring-white/15">
                <Car
                  className="size-6 text-sky-400"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <Sparkles
                  className="absolute -top-1 -right-1 size-4 text-brand-amber"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </span>
              <span className="text-lg font-semibold tracking-tight">
                Car Wash
              </span>
            </Link>
          </div>

          <div className="relative space-y-6">
            <h2 className="text-3xl leading-tight font-semibold text-balance xl:text-4xl">
              A spotless car, without leaving your driveway.
            </h2>
            <p className="text-sm leading-relaxed text-white/70">
              Book trusted car wash professionals in minutes, track your
              appointment, and pay securely online.
            </p>

            <ul className="space-y-3 text-sm">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-amber/15 text-brand-amber">
                    <Check
                      className="size-3"
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-white/80">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-1 text-brand-amber">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="size-4 fill-current"
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="mt-2 text-sm text-white/75">
              Rated 4.9 out of 5 by drivers across the city.
            </p>
          </div>
        </aside>

        <section className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <Link
              href="/"
              aria-label="Car Wash home"
              className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span className="relative grid size-10 place-items-center rounded-full bg-linear-to-br from-[#1b4a7a] to-[#081a30]">
                <Car
                  className="size-5 text-sky-400"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <Sparkles
                  className="absolute -top-0.5 -right-0.5 size-3.5 text-brand-amber"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </span>
              <span className="text-base font-semibold tracking-tight">
                Car Wash
              </span>
            </Link>
          </div>

          {children}
        </section>
      </div>
    </div>
  );
}
