"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ctaCards } from "@/lib/data";

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
      <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
        {/* Left copy */}
        <div>
          <div className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-accent2 mb-2.5">
            Currently seeking
          </div>
          <h2 className="font-serif text-[2rem] text-bg tracking-[-0.02em] mb-2.5 leading-[1.15]">
            Open to the right
            <br />
            international opportunity.
          </h2>
          <p className="text-[0.85rem] text-[rgba(246,245,241,0.5)] leading-[1.7] max-w-[500px]">
            I&apos;m actively looking for Senior Frontend roles at companies
            that value engineering craft, remote collaboration, and long-term
            impact. Visa sponsorship welcome. Remote (any timezone) preferred.
          </p>
        </div>

        {/* Right cards */}
        <div className="flex flex-col gap-2 min-w-[240px]">
          {ctaCards.map((card) => (
            <div
              key={card.label}
              className={cn(
                "bg-white/5 border border-white/10",
                "rounded-md px-4 py-3",
                "flex items-center gap-3",
                "cursor-default transition-colors duration-200",
                "hover:bg-white/[0.09]"
              )}
            >
              <div className="text-base w-7 text-center">{card.icon}</div>
              <div>
                <div className="text-[0.7rem] font-medium text-[rgba(246,245,241,0.55)] tracking-[0.04em] uppercase mb-px">
                  {card.label}
                </div>
                <div className="text-[0.8rem] text-[rgba(246,245,241,0.85)]">
                  {card.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
