import { useSeo } from "../lib/useSeo";
import { SectionHeading, PrimaryButton } from "../components/ui";

export function About() {
  useSeo(
    "About",
    "Meet the team behind Pathways Tutoring — certified tutors dedicated to helping university students pass their exams and coursework."
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading
        eyebrow="About us"
        title="Straightforward help, from people who've done it"
        subtitle="Pathways Tutoring was built around one idea: getting unstuck shouldn't be complicated."
      />

      <div className="mt-16 grid items-center gap-12 md:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
          alt="Tutor portrait"
          className="aspect-4/5 w-full rounded-2xl object-cover shadow-md"
        />
        <div>
          <h3 className="text-xl font-semibold text-navy-900">Our story</h3>
          <p className="mt-3 text-navy-700/90">
            {/* placeholder bio — replace with the owner's real background before launch */}
            Founded by a certified tutor who spent years watching capable students get stuck not because
            they couldn't do the work, but because they couldn't get fast, straightforward help when they
            needed it. Pathways Tutoring exists to close that gap — certified support, booked in minutes,
            with no fluff in between.
          </p>
          <div className="mt-6 rounded-xl bg-navy-50 p-5">
            <h4 className="text-sm font-semibold text-navy-900">Credentials</h4>
            <ul className="mt-2 space-y-1.5 text-sm text-navy-700/90">
              <li>• Certified tutor(s) across core university subjects</li>
              <li>• Relevant degree qualifications</li>
              <li>• Experience supporting university-level coursework and exam prep</li>
            </ul>
            <p className="mt-3 text-xs text-navy-700/60">
              Full bios and credentials to be added before launch.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 rounded-2xl bg-navy-900 p-10 text-center">
        <h3 className="text-xl font-semibold text-white">Ready to get started?</h3>
        <p className="mt-2 text-navy-100/80">Book a session and see the difference for yourself.</p>
        <div className="mt-6">
          <PrimaryButton to="/book">Book a Session</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
