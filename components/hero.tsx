"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { statCards } from "@/lib/data";

export function Hero() {
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
      { threshold: 0.08 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-[1060px] mx-auto px-7 pt-16 pb-12 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-center"
    >
      {/* Left content */}
      <div
        className={cn(
          "transition-all duration-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        )}
      >
        {/* Available pill */}
        <div
          className={cn(
            "inline-flex items-center gap-1.5",
            "bg-accent-bg text-accent",
            "border border-accent/20",
            "rounded-full text-[0.68rem] font-medium",
            "tracking-[0.06em] uppercase",
            "px-3 py-1 mb-5",
          )}
        >
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-blink" />
          Open to international roles
        </div>

        {/* Eyebrow */}
        <div className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-ink3 mb-3 flex items-center gap-2">
          <span className="w-6 h-px bg-ink3" />
          Senior Frontend Engineer &middot; 9+ Years
        </div>

        {/* Headline */}
        <h1 className="font-serif text-[2.8rem] sm:text-[4rem] font-bold leading-[1.08] tracking-[-0.02em] text-ink mb-3">
          I don&apos;t build features.
          <br />I build <em className="not-italic text-accent">products</em>.
        </h1>

        {/* Subtitle */}
        <p className="text-[1rem] text-ink2 leading-[1.8] max-w-[500px] mb-6">
          9+ years turning{" "}
          <strong className="text-ink font-medium">complex requirements</strong>{" "}
          into{" "}
          <strong className="text-ink font-medium">
            products people actually use
          </strong>{" "}
          &mdash; for Norwegian government agencies, Swiss insurers, and US
          startups. React, TypeScript, and Next.js at the core, with{" "}
          <strong className="text-ink font-medium">full-stack reach</strong>{" "}
          when the problem demands it.
        </p>

        {/* CTA buttons */}
        <div className="flex gap-2.5">
          <a
            href="#contact"
            className={cn(
              "bg-accent text-white",
              "px-[22px] py-2.5 rounded-md",
              "text-[0.82rem] font-medium",
              "no-underline inline-block",
              "transition-all duration-200",
              "hover:bg-accent-dark hover:-translate-y-px",
            )}
          >
            Get in touch
          </a>
          <a
            href="/Salman_Rahman_Resume.pdf"
            download
            className={cn(
              "border-[1.5px] border-bg3 text-ink2",
              "px-[22px] py-2.5 rounded-md",
              "text-[0.82rem] no-underline inline-block",
              "transition-all duration-200",
              "hover:border-ink hover:text-ink",
            )}
          >
            Download CV &darr;
          </a>
        </div>
      </div>

      {/* Right stat cards */}
      <div
        className={cn(
          "flex flex-col gap-2.5",
          "transition-all duration-500 delay-[120ms]",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        )}
      >
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className={cn(
              "bg-bg2 border border-bg3 border-l-[3px] border-l-accent/40",
              "rounded-[10px] px-5 py-5",
              "flex items-center gap-5",
              "transition-all duration-200 cursor-default",
              "hover:border-l-accent hover:translate-x-[3px]",
            )}
          >
            <div className="font-serif text-[3rem] font-bold text-accent leading-none min-w-[5.5rem] shrink-0">
              {stat.value}
            </div>
            <div>
              <div className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-ink3 mb-1">
                {stat.label}
              </div>
              <div className="text-[0.85rem] text-ink2 leading-[1.55]">
                {stat.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
