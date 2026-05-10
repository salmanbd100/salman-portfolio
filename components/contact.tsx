"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { contactLinks, openToItems } from "@/lib/data";

export function Contact() {
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
      id="contact"
      className={cn(
        "max-w-[1060px] mx-auto px-7 py-14 border-t border-bg3",
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      {/* Section label */}
      <div className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-accent mb-2 flex items-center gap-1.5">
        Contact
        <span className="w-8 h-px bg-accent/40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left — contact info */}
        <div>
          <h3 className="font-serif text-[1.8rem] tracking-[-0.01em] mb-3.5">
            Let&apos;s talk about your team&apos;s next hire.
          </h3>
          <p className="text-[0.85rem] text-ink2 leading-[1.75] mb-5">
            I&apos;m actively interviewing for international roles. If
            you&apos;re a recruiter, tech lead, or hiring manager looking for a
            senior frontend engineer with proven European client experience —
            I&apos;d love to connect.
          </p>

          <div className="flex flex-col gap-2">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className={cn(
                  "flex items-center gap-3.5 no-underline",
                  "text-ink2 px-4 py-3",
                  "bg-bg2 border border-bg3 rounded-md",
                  "transition-all duration-200",
                  "hover:border-accent hover:text-accent"
                )}
              >
                <div className="w-[34px] h-[34px] bg-bg3 rounded-full flex items-center justify-center text-[0.9rem] shrink-0">
                  {link.icon}
                </div>
                <div>
                  <div className="text-[0.65rem] uppercase tracking-[0.07em] text-ink3 mb-0.5">
                    {link.label}
                  </div>
                  <div className="text-[0.82rem] font-medium">{link.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right — open to */}
        <div className="bg-bg2 border border-bg3 rounded-[10px] p-6 h-fit">
          <h4 className="font-serif text-[1.2rem] mb-3.5">
            What I&apos;m open to
          </h4>
          <ul className="list-none flex flex-col gap-[9px]">
            {openToItems.map((item) => (
              <li
                key={item}
                className="text-[0.8rem] text-ink2 flex items-start gap-2 leading-[1.5]"
              >
                <span className="text-accent font-semibold shrink-0">
                  &#10003;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
