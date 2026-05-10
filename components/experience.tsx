"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { experiences } from "@/lib/data";

export function Experience() {
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
      id="experience"
      className={cn(
        "max-w-[1060px] mx-auto px-7 py-14 border-t border-bg3",
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      {/* Section header */}
      <div className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-accent mb-2 flex items-center gap-1.5">
        Experience
        <span className="w-8 h-px bg-accent/40" />
      </div>
      <h2 className="font-serif text-[2.2rem] tracking-[-0.02em] text-ink mb-2 leading-[1.1]">
        9 years, global clients.
      </h2>
      <p className="text-[0.88rem] text-ink3 leading-[1.7] max-w-[560px] mb-9">
        Norwegian public sector, Swiss enterprise, US startups — delivered
        across time zones in remote-first, Agile environments.
      </p>

      {/* Experience list */}
      <div className="flex flex-col">
        {experiences.map((exp, index) => (
          <div
            key={exp.company}
            className={cn(
              "grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-8 py-8 border-b border-bg3",
              "transition-all duration-500",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4",
              index === 0 && "pt-0"
            )}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            {/* Left meta */}
            <div>
              <div className="font-medium text-[0.88rem] text-ink mb-1">
                {exp.company}
              </div>
              <div className="font-mono text-[0.65rem] text-ink3 tracking-[0.04em] mb-1">
                {exp.period}
              </div>
              <div className="text-[0.72rem] text-ink3">{exp.location}</div>
              <span className="inline-block bg-blue-bg text-blue text-[0.62rem] font-medium px-2 py-0.5 rounded-full mt-1.5 tracking-[0.04em]">
                {exp.clientFlag} {exp.clientLabel}
              </span>
            </div>

            {/* Right content */}
            <div>
              <h3 className="font-serif text-[1.4rem] tracking-[-0.01em] mb-1.5">
                {exp.role}
              </h3>
              <p className="text-[0.83rem] text-ink2 mb-3.5 leading-[1.7]">
                {exp.summary}
              </p>

              {/* Bullets */}
              <ul className="list-none flex flex-col gap-2 mb-3.5">
                {exp.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="text-[0.8rem] text-ink2 flex gap-2.5 items-start leading-[1.6]"
                  >
                    <span className="text-accent shrink-0 mt-px text-[0.75rem]">
                      →
                    </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: bullet.replace(
                          /<strong>/g,
                          '<strong class="text-ink font-medium">'
                        ),
                      }}
                    />
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-[5px]">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.62rem] bg-bg2 text-ink2 border border-bg3 px-2 py-0.5 rounded-[3px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
