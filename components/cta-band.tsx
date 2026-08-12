"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { contactLinks } from "@/lib/data";
import { TrackedLink } from "@/components/tracked-link";

const email = contactLinks.find((link) => link.label === "Email");

export function CtaBand() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "bg-ink py-20 sm:py-24 px-7",
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div className="max-w-[1060px] mx-auto text-center">
        <div className="font-mono text-[0.7rem] font-medium tracking-[0.14em] uppercase text-accent2 mb-4 flex items-center justify-center gap-2">
          <span className="w-6 h-px bg-accent2/50" />
          Start here
          <span className="w-6 h-px bg-accent2/50" />
        </div>

        <h2 className="font-serif text-[2rem] sm:text-[2.5rem] text-bg tracking-[-0.02em] mb-5 leading-[1.15] text-balance">
          Bring me the problem.
          {/* Breaking mid-sentence only helps once the line is long enough to
              need it — on a phone it would leave a two-word orphan. */}
          <br className="hidden sm:block" /> I&apos;ll bring the solution.
        </h2>

        <p className="text-[0.95rem] sm:text-[1rem] text-[rgba(246,245,241,0.78)] leading-[1.75] max-w-[46ch] mx-auto text-pretty">
          A messy requirement, a page that loads too slowly, a codebase nobody
          wants to touch. Nine years of shipping for Norwegian, Swiss, and US
          teams says most of them are solvable — tell me yours.
        </p>

        {/* "Start here" needs somewhere to go: the band sits directly above
            #contact, so it hands off rather than dead-ending. */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
          <a
            href="#contact"
            className={cn(
              "bg-accent2 text-ink font-medium",
              "px-[26px] py-3 rounded-md",
              "text-[0.875rem] no-underline inline-block",
              "transition-all duration-200",
              "hover:bg-bg hover:-translate-y-px"
            )}
          >
            Tell me the problem
          </a>
          {email && (
            <TrackedLink
              href={email.href}
              event="contact_click"
              eventProps={{ channel: "email", location: "cta_band" }}
              className={cn(
                "border-[1.5px] border-[rgba(246,245,241,0.25)]",
                "text-[rgba(246,245,241,0.85)]",
                "px-[26px] py-3 rounded-md",
                "text-[0.875rem] no-underline inline-block",
                "transition-all duration-200",
                "hover:border-[rgba(246,245,241,0.6)] hover:text-bg"
              )}
            >
              Email me directly
            </TrackedLink>
          )}
        </div>
      </div>
    </section>
  );
}
