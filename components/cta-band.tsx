"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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
        "bg-ink py-14 px-7",
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div className="max-w-[1060px] mx-auto text-center">
          <div className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-accent2 mb-2.5">
            Start here
          </div>
          <h2 className="font-serif text-[2rem] text-bg tracking-[-0.02em] mb-2.5 leading-[1.15]">
            Bring me the problem.
            <br />
            I&apos;ll bring the solution.
          </h2>
          <p className="text-[0.85rem] text-[rgba(246,245,241,0.5)] leading-[1.7] max-w-[500px] mx-auto">
            A messy requirement, a page that loads too slowly, a codebase nobody
            wants to touch. Nine years of shipping for Norwegian, Swiss, and US
            teams says most of them are solvable — tell me yours.
          </p>
      </div>
    </section>
  );
}
