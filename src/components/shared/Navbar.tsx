import { GitCompareArrows, Info, LayoutGrid } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const links = [
  { href: "/services", label: "Services", icon: LayoutGrid },
  { href: "/compare", label: "Compare", icon: GitCompareArrows },
  { href: "/about", label: "About Us", icon: Info },
] as const;

export function Navbar() {
  return (
    <nav aria-label="Main" className="border-b border-border bg-background">
      <div className="mx-auto flex min-h-15 w-full flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-2.5 sm:h-15 sm:flex-nowrap sm:px-6 sm:py-0 lg:px-10 xl:px-16">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:gap-x-14">
          {links.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center gap-2 rounded-sm text-sm font-medium text-foreground/90 transition-opacity outline-none hover:opacity-70 focus-visible:ring-3 focus-visible:ring-ring/50 sm:text-base"
              >
                <Icon
                  className="size-4.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/book"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-10 rounded-lg bg-brand-amber px-6 text-sm font-semibold text-white hover:bg-brand-amber/90 sm:h-11 sm:min-w-64 sm:px-8 sm:text-lg",
          )}
        >
          Book Now
        </Link>
      </div>
    </nav>
  );
}
