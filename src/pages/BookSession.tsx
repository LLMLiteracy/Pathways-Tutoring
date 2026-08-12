import { useState, type FormEvent } from "react";
import { useSeo } from "../lib/useSeo";
import { SectionHeading, Field, inputClass, SubmitButton } from "../components/ui";
import { useServices } from "../lib/useServices";
import { supabase } from "../lib/supabase";

export function BookSession() {
  useSeo(
    "Book a Session",
    "Book a 1-on-1 online tutoring session with a certified Pathways Tutoring tutor. Fast confirmation, straightforward booking."
  );
  const { services } = useServices();

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setError(null);
    setSubmitting(true);

    const { data: inserted, error: insertError } = await supabase
      .from("bookings")
      .insert({
        student_name: data.get("studentName") as string,
        email: data.get("email") as string,
        phone: (data.get("phone") as string) || null,
        subject: data.get("subject") as string,
        preferred_date: data.get("preferredDate") as string,
        preferred_time: (data.get("preferredTime") as string) || null,
        notes: (data.get("notes") as string) || null,
      })
      .select("id")
      .single();

    setSubmitting(false);

    if (insertError) {
      setError("Something went wrong submitting your request. Please try again.");
      return;
    }
    setSubmitted(true);

    // Fire-and-forget: don't block the confirmation screen on email delivery.
    supabase.functions
      .invoke("send-booking-notifications", { body: { bookingId: inserted.id } })
      .catch(() => {});
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 text-gold-600">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-bold text-navy-900">Request received</h1>
        <p className="mt-3 text-navy-700/80">
          Thanks — we've got your booking request. You'll get a confirmation email shortly, and we'll be in
          touch to confirm the time.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 text-sm font-semibold text-gold-600 hover:text-gold-500"
        >
          Book another session
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <SectionHeading
        eyebrow="Book a session"
        title="Let's get you booked in"
        subtitle="Tell us a bit about what you need and we'll confirm a time fast."
      />

      <form onSubmit={handleSubmit} className="mt-12 space-y-5 rounded-2xl border border-navy-100 p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Student name" htmlFor="studentName">
            <input id="studentName" name="studentName" required className={inputClass} placeholder="Jane Doe" />
          </Field>
          <Field label="Email" htmlFor="email">
            <input id="email" name="email" type="email" required className={inputClass} placeholder="jane@university.edu" />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone" htmlFor="phone">
            <input id="phone" name="phone" type="tel" className={inputClass} placeholder="Optional" />
          </Field>
          <Field label="Subject" htmlFor="subject">
            <select id="subject" name="subject" required className={inputClass} defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              {services.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Preferred date" htmlFor="preferredDate">
            <input id="preferredDate" name="preferredDate" type="date" required className={inputClass} />
          </Field>
          <Field label="Preferred time" htmlFor="preferredTime">
            <input id="preferredTime" name="preferredTime" type="time" required className={inputClass} />
          </Field>
        </div>

        <Field label="Notes" htmlFor="notes">
          <textarea
            id="notes"
            name="notes"
            rows={4}
            className={inputClass}
            placeholder="What would you like to cover in this session?"
          />
        </Field>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <SubmitButton type="submit" disabled={submitting} className="w-full">
          {submitting ? "Submitting…" : "Request Booking"}
        </SubmitButton>

        <p className="text-xs text-navy-700/60">
          Cancellation/reschedule policy: reach out by email as soon as you can and we'll find a new time.
          (Full policy to be finalized before launch.)
        </p>
      </form>
    </div>
  );
}
