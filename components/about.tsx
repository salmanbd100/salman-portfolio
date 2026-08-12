"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
      { threshold: 0.08 },
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
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
    >
      {/* Section label */}
      <div className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-accent mb-2 flex items-center gap-1.5">
        About me
        <span className="w-8 h-px bg-accent/40" />
      </div>

      {/* About grid */}
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 items-start">
        {/* Left — profile photo */}
        <div className="relative">
          <div className="relative w-full aspect-[3/4] rounded-[10px] overflow-hidden bg-bg2 border border-bg3">
            <Image
              src="/profile.jpg"
              alt="Salman Rahman — Senior Software Engineer"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 300px"
              priority
            />
          </div>
          <div className="absolute -bottom-3 -right-3 bg-ink text-bg text-[0.7rem] font-medium px-3.5 py-2 rounded-md tracking-[0.04em] whitespace-nowrap">
            📍 Dhaka · Remote-ready
          </div>
        </div>

        {/* Right — body */}
        <div>
          <h3 className="font-serif text-[1.75rem] font-semibold tracking-[-0.01em] leading-[1.25] mb-4">
            I help international teams ship great products — fast and
            sustainably.
          </h3>

          <p className="text-[0.93rem] text-ink2 leading-[1.8] mb-4">
            Over <strong className="text-ink font-medium">9+ years</strong>,
            I&apos;ve collaborated with teams in{" "}
            <strong className="text-ink font-medium">
              Norway, Switzerland, and the US
            </strong>{" "}
            — owning architecture from the database up to the interface,
            working across time zones, and mentoring junior engineers along the
            way.
          </p>

          <p className="text-[0.93rem] text-ink2 leading-[1.8] mb-4">
            My degree in{" "}
            <strong className="text-ink font-medium">statistics</strong> trained
            me to think in evidence, not assumptions — I profile before I
            optimize, A/B test before I ship, and ground architecture decisions
            in real performance data.
          </p>

          <p className="text-[0.93rem] text-ink2 leading-[1.8] mb-4">
            I build the whole path:{" "}
            <strong className="text-ink font-medium">
              Node.js and Express services
            </strong>
            ,{" "}
            <strong className="text-ink font-medium">
              PostgreSQL and Prisma
            </strong>{" "}
            behind them, the{" "}
            <strong className="text-ink font-medium">
              Docker, CI/CD, and AWS
            </strong>{" "}
            pipelines that ship them, and{" "}
            <strong className="text-ink font-medium">
              AI-powered features
            </strong>{" "}
            on top. The interface is where I go deepest — but I don&apos;t hand
            off at the API boundary.
          </p>

          <p className="text-[0.93rem] text-ink2 leading-[1.8] mb-5">
            Start with{" "}
            <strong className="text-ink font-medium">
              the problem you need solved
            </strong>{" "}
            — location, notice, and paperwork are details we can sort out after.
            I&apos;m in Dhaka, and I&apos;ve been shipping with teams in Oslo,
            Zurich, and the US for nine years.
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
