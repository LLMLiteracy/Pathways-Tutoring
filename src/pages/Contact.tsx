import { useState, type FormEvent } from "react";
import { useSeo } from "../lib/useSeo";
import { SectionHeading, Field, inputClass, SubmitButton } from "../components/ui";

export function Contact() {
  useSeo("Contact", "Get in touch with Pathways Tutoring — questions about sessions, subjects, or booking.");

  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading eyebrow="Contact" title="Questions? Get in touch" />

      <div className="mt-14 grid gap-12 md:grid-cols-2">
        <div>
          {sent ? (
            <div className="rounded-2xl border border-navy-100 p-8 text-center">
              <p className="font-semibold text-navy-900">Message sent</p>
              <p className="mt-2 text-sm text-navy-700/80">We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-navy-100 p-8">
              <Field label="Name" htmlFor="name">
                <input id="name" name="name" required className={inputClass} />
              </Field>
              <Field label="Email" htmlFor="email">
                <input id="email" name="email" type="email" required className={inputClass} />
              </Field>
              <Field label="Message" htmlFor="message">
                <textarea id="message" name="message" rows={5} required className={inputClass} />
              </Field>
              <SubmitButton type="submit" className="w-full">
                Send Message
              </SubmitButton>
            </form>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-navy-900">Reach us directly</h3>
          <div className="mt-4 space-y-4 text-sm text-navy-700/90">
            <div>
              <p className="font-medium text-navy-900">Email</p>
              <p>
                <a href="mailto:LLMLiteracy@proton.me" className="hover:text-gold-600">
                  LLMLiteracy@proton.me
                </a>
              </p>
            </div>
            <div>
              <p className="font-medium text-navy-900">Phone</p>
              <p>To be added.</p>
            </div>
            <div>
              <p className="font-medium text-navy-900">Hours</p>
              <p>To be confirmed.</p>
            </div>
            <div>
              <p className="font-medium text-navy-900">Location</p>
              <p>Online only — sessions run over video call from anywhere.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
