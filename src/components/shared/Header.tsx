"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { Car, MessageCircleMore, Sparkles } from "lucide-react";
import Link from "next/link";

const PHONE_DISPLAY = "+880170678-5160";
const PHONE_HREF = "tel:+8801706785160";

export function Header() {
  const { data: session } = useSession();
  console.log(session?.user);
  const handelSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-brand-navy text-white">
      <div className="mx-auto flex h-15 w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 xl:px-16">
        <Link
          href="/"
          aria-label="Car wash home"
          className="shrink-0 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-white/40"
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
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          <a
            href={PHONE_HREF}
            className="rounded-sm text-sm font-semibold tracking-tight whitespace-nowrap outline-none hover:underline focus-visible:ring-3 focus-visible:ring-white/40 sm:text-base"
          >
            <span className="hidden sm:inline">Call us now: </span>
            {PHONE_DISPLAY}
          </a>

          {/* <button
            type="button"
            aria-label="Chat with us"
            className="grid size-9 place-items-center rounded-full text-white/80 transition-colors outline-none hover:bg-white/10 hover:text-white focus-visible:ring-3 focus-visible:ring-white/40"
          >
            <MessageCircleMore
              className="size-5"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </button> */}

          <button
            type="button"
            aria-label="My account"
            className="grid  place-items-center rounded-full text-white/80 transition-colors outline-none hover:bg-white/10 hover:text-white focus-visible:ring-3 focus-visible:ring-white/40"
          >
            <Link href={"/signin"}>Sign In</Link>
          </button>
        </div>
      </div>
    </header>
  );
}
