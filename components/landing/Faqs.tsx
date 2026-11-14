"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqs } from "@/data/faqs";


export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggleFAQ(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section id="faq" className="container-main py-20 sm:py-24">
      {/* Section heading */}
      <div
        className="mx-auto max-w-2xl text-center"
        data-aos="fade-up"
        suppressHydrationWarning
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
          <HelpCircle size={13} className="text-violet-400" />
          FAQ
        </span>

        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-zinc-400 sm:text-base">
          Everything you need to know about shortening links, tracking clicks,
          and managing your URLs with LinkFlow.
        </p>
      </div>

      {/* FAQ accordion */}
      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const answerId = `faq-answer-${index}`;

          return (
            <div
              key={faq.question}
              data-aos="fade-up"
              data-aos-delay={String(index * 80)}
              suppressHydrationWarning
            >
            <article
              className={`glass-card overflow-hidden rounded-xl border transition-all duration-300 ${
                isOpen
                  ? "border-violet-500/40 shadow-[0_0_40px_-18px_rgba(139,92,246,0.6)]"
                  : "border-white/10 hover:border-violet-500/25"
              }`}
            >
              <h3>
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-400 sm:px-6"
                >
                  <span
                    className={`text-sm font-medium transition-colors duration-300 sm:text-base ${
                      isOpen ? "text-white" : "text-zinc-200"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      isOpen ? "bg-violet-500/20" : "bg-white/5"
                    }`}
                  >
                    <ChevronDown
                      size={17}
                      className={`text-violet-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>
              </h3>

              {/* Smooth height animation using grid rows */}
              <div
                id={answerId}
                role="region"
                inert={!isOpen}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="border-t border-white/5 px-5 py-5 text-sm leading-7 text-zinc-400 sm:px-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </article>
            </div>
          );
        })}
      </div>

      {/* Still have questions */}
      <p
        className="mt-10 text-center text-sm text-zinc-500"
        data-aos="fade-up"
        suppressHydrationWarning
      >
        Still have questions? We&apos;d love to hear from you.
      </p>
    </section>
  );
}