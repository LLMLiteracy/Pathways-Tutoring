import { useSeo } from "../lib/useSeo";

function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold text-navy-900">{title}</h1>
      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-gold-600">
        Placeholder draft — review before publishing
      </p>
      <div className="prose prose-navy mt-8 space-y-5 text-sm leading-relaxed text-navy-700/90">
        {children}
      </div>
    </div>
  );
}

export function Privacy() {
  useSeo("Privacy Policy", "Pathways Tutoring privacy policy.");
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        Pathways Tutoring ("we", "us") collects the information you provide when booking a session or
        contacting us — name, email, phone number, and any notes you share — solely to schedule and deliver
        tutoring services and to communicate with you about your bookings.
      </p>
      <p>
        We do not sell your information. Data is stored securely in our database provider (Supabase) and
        only accessible to the site administrator. We retain booking information for as long as needed to
        provide our services and meet basic record-keeping needs.
      </p>
      <p>
        You can request that we delete your information at any time by contacting us through the Contact
        page.
      </p>
      <p className="text-xs text-navy-700/60">
        This is placeholder legal text and should be reviewed by a qualified professional before the site
        goes live.
      </p>
    </LegalLayout>
  );
}

export function Terms() {
  useSeo("Terms of Service", "Pathways Tutoring terms of service.");
  return (
    <LegalLayout title="Terms of Service">
      <p>
        By booking a session with Pathways Tutoring, you agree to provide accurate information and to
        attend scheduled sessions or cancel/reschedule with reasonable notice, per our cancellation policy.
      </p>
      <p>
        Sessions are delivered online by certified tutors on a best-effort basis. While we aim to help you
        succeed, we cannot guarantee specific academic outcomes or grades.
      </p>
      <p>
        Pricing is as listed on the Services page at time of booking and may change for future bookings.
      </p>
      <p className="text-xs text-navy-700/60">
        This is placeholder legal text and should be reviewed by a qualified professional before the site
        goes live.
      </p>
    </LegalLayout>
  );
}
