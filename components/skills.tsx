"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { skillCategories } from "@/lib/data";
import type { SkillTier } from "@/lib/data";

const tierStyles: Record<SkillTier, string> = {
  core: "bg-ink text-bg",
  strong: "bg-bg2 text-ink2 border border-bg3",
  know: "bg-transparent text-ink3 border border-bg3",
};

export function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(skillCategories[0].id);
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

  const activeCategory = skillCategories.find((c) => c.id === activeTab)!;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={cn(
        "max-w-[1060px] mx-auto px-7 py-14 border-t border-bg3",
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      {/* Section header */}
      <div className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-accent mb-2 flex items-center gap-1.5">
        Skills
        <span className="w-8 h-px bg-accent/40" />
      </div>
      <h2 className="font-serif text-[2.4rem] font-bold tracking-[-0.02em] text-ink mb-2 leading-[1.1]">
        What I bring to your team.
      </h2>
      <p className="text-[0.95rem] text-ink3 leading-[1.75] max-w-[560px] mb-9">
        Core expertise in frontend, with backend fluency and DevOps awareness —
        so I can work across the stack without becoming a blocker.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12 items-start">
        {/* Left nav — horizontal scroll on mobile, vertical sticky on desktop */}
        <div className="flex md:flex-col gap-0.5 overflow-x-auto md:overflow-visible md:sticky md:top-16 -mx-7 px-7 md:mx-0 md:px-0 pb-2 md:pb-0">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={cn(
                "bg-transparent border-none text-left",
                "px-3 py-2 rounded-md",
                "text-[0.78rem] text-ink2 cursor-pointer",
                "font-sans transition-all duration-150",
                "border-l-2 border-l-transparent",
                "whitespace-nowrap shrink-0",
                activeTab === cat.id &&
                  "bg-accent-bg text-accent border-l-accent"
              )}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Right panel */}
        <div key={activeTab} className="animate-fadeIn">
          {activeCategory.groups.map((group) => (
            <div key={group.title}>
              <div className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-ink3 mb-2.5 mt-6 first:mt-0 flex items-center gap-2">
                {group.title}
                <span className="flex-1 h-px bg-bg3" />
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {group.tags.map((tag) => (
                  <span
                    key={tag.name}
                    className={cn(
                      "text-[0.8rem] px-3 py-1.5 rounded-[5px] cursor-default",
                      tierStyles[tag.tier]
                    )}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <p className="text-[0.8rem] text-ink3 mt-5 pt-4 border-t border-bg3">
            {activeCategory.note}
          </p>
        </div>
      </div>
    </section>
  );
}
