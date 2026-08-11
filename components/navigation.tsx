"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50",
        "bg-bg/90 backdrop-blur-[16px]",
        "border-b border-bg3",
        "px-7 h-[52px]",
        "flex items-center justify-between"
      )}
    >
      <Link
        href="/"
        className="font-serif text-[1.1rem] font-semibold tracking-[-0.02em] text-ink no-underline"
      >
        Salman Rahman
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-6 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[0.72rem] font-medium tracking-[0.08em] uppercase text-ink3 no-underline transition-colors duration-150 hover:text-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/#contact"
            className={cn(
              "bg-accent text-white",
              "px-3.5 py-1.5 rounded-md",
              "text-[0.7rem] font-medium tracking-[0.06em] uppercase",
              "no-underline transition-colors duration-200",
              "hover:bg-accent-dark"
            )}
          >
            Hire Me
          </Link>
        </li>
      </ul>

      {/* Mobile menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <button
              className="md:hidden p-2 text-ink3 hover:text-ink transition-colors"
              aria-label="Open menu"
            />
          }
        >
          <Menu className="w-5 h-5" />
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[280px] !bg-bg border-bg3 p-6"
        >
          <SheetTitle className="font-serif text-[1.1rem] font-semibold tracking-[-0.02em] text-ink mb-6">
            Salman Rahman
          </SheetTitle>
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[0.78rem] font-medium tracking-[0.06em] uppercase text-ink2 no-underline py-3 px-3 rounded-md transition-colors hover:bg-bg2 hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className={cn(
                "mt-4 bg-accent text-white text-center",
                "px-3.5 py-2.5 rounded-md",
                "text-[0.72rem] font-medium tracking-[0.06em] uppercase",
                "no-underline transition-colors duration-200",
                "hover:bg-accent-dark"
              )}
            >
              Hire Me
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
