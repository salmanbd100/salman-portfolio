"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { breadthItems } from "@/lib/data";

export function About() {
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
      id="about"
      className={cn(
        "max-w-[1060px] mx-auto px-7 py-14 border-t border-bg3",
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      {/* Section label */}
      <div className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-accent mb-2 flex items-center gap-1.5">
        About me
        <span className="w-8 h-px bg-accent/40" />
      </div>

      {/* About grid */}
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 items-start">
        {/* Left — photo placeholder */}
        <div className="relative">
          <div className="w-full aspect-[3/4] bg-bg2 border border-bg3 rounded-[10px] flex items-center justify-center text-5xl">
            📸
          </div>
          <div className="absolute -bottom-3 -right-3 bg-ink text-bg text-[0.7rem] font-medium px-3.5 py-2 rounded-md tracking-[0.04em] whitespace-nowrap">
            📍 Dhaka · Remote-ready
          </div>
        </div>

        {/* Right — body */}
        <div>
          <h3 className="font-serif text-[1.6rem] tracking-[-0.01em] mb-4">
            I help international teams ship great products — fast and
            maintainably.
          </h3>

          <p className="text-[0.88rem] text-ink2 leading-[1.8] mb-3.5">
            With <strong className="text-ink font-medium">9+ years</strong> of
            professional experience, I&apos;ve collaborated with companies in{" "}
            <strong className="text-ink font-medium">
              Norway, Switzerland, and the US
            </strong>{" "}
            — working across time zones, owning frontend architecture from day
            one, and mentoring junior engineers along the way.
          </p>

          <p className="text-[0.88rem] text-ink2 leading-[1.8] mb-3.5">
            My foundation in{" "}
            <strong className="text-ink font-medium">statistics</strong> gives
            me an analytical edge: I measure what matters, communicate results
            clearly, and make data-driven decisions on performance and
            architecture.
          </p>

          <p className="text-[0.88rem] text-ink2 leading-[1.8] mb-3.5">
            Beyond frontend, I bring{" "}
            <strong className="text-ink font-medium">
              Node.js/Express backend fluency
            </strong>
            , basic{" "}
            <strong className="text-ink font-medium">DevOps knowledge</strong>{" "}
            (Docker, CI/CD, Azure DevOps), and practical experience building{" "}
            <strong className="text-ink font-medium">
              AI-powered applications
            </strong>{" "}
            — giving me the full-picture context to collaborate effectively with
            any engineering team.
          </p>

          <p className="text-[0.88rem] text-ink2 leading-[1.8] mb-5">
            I&apos;m actively seeking an{" "}
            <strong className="text-ink font-medium">
              international remote role
            </strong>{" "}
            or{" "}
            <strong className="text-ink font-medium">
              visa-sponsored position
            </strong>{" "}
            in Europe, North America, or Australia. Passport ready. Open to any
            timezone.
          </p>

          {/* Breadth grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
            {breadthItems.map((item) => (
              <div
                key={item.label}
                className="bg-bg2 border border-bg3 rounded-md px-4 py-3.5 border-l-[3px] border-l-accent"
              >
                <div className="text-[0.68rem] font-medium tracking-[0.08em] uppercase text-accent mb-1">
                  {item.label}
                </div>
                <div className="text-[0.78rem] text-ink2 leading-[1.5]">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
