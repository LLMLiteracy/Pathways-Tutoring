import { useState } from "react";
import { useSeo } from "../lib/useSeo";
import { SectionHeading } from "../components/ui";
import { faqs } from "../data/mockData";

export function FAQ() {
  useSeo("FAQ", "Answers to common questions about booking, sessions, subjects, and rescheduling at Pathways Tutoring.");

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />

      <div className="mt-14 divide-y divide-navy-100 rounded-2xl border border-navy-100">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={faq.question}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-medium text-navy-900">{faq.question}</span>
                <svg
                  viewBox="0 0 24 24"
                  className={`h-5 w-5 shrink-0 text-gold-600 transition-transform ${isOpen ? "rotate-45" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                </svg>
              </button>
              {isOpen && <p className="px-6 pb-5 text-sm text-navy-700/80">{faq.answer}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
