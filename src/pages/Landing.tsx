import { useSeo } from "../lib/useSeo";
import { SectionHeading, PrimaryButton } from "../components/ui";
import { PathDivider } from "../components/PathDivider";
import { testimonials } from "../data/mockData";
import { useServices } from "../lib/useServices";

const sellingPoints = [
  {
    title: "Certified tutors",
    description: "Every tutor is vetted and certified in their subject area.",
    icon: (
      <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
    ),
  },
  {
    title: "Fast response time",
    description: "Most booking requests get a reply within a few hours.",
    icon: <path d="M12 6v6l4 2M12 22a10 10 0 100-20 10 10 0 000 20z" />,
  },
  {
    title: "1-on-1 personalized",
    description: "Sessions built entirely around what you need help with.",
    icon: <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0" />,
  },
  {
    title: "No-fluff support",
    description: "Straightforward help that gets you to the result.",
    icon: <path d="M5 13l4 4L19 7" />,
  },
];

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

export function Landing() {
  useSeo(
    "Home",
    "Pathways Tutoring — certified 1-on-1 online tutoring for university students. Book a session and pass your exams and coursework, fast."
  );
  const { services } = useServices();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900">
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 800 400" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <path
              d="M-50 380C120 380 120 260 260 260C400 260 400 140 540 140C650 140 680 60 850 40"
              stroke="#D4B673"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center sm:py-32">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/10 ring-1 ring-gold-500/30">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-gold-500" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="6" r="2.4" fill="currentColor" stroke="none" />
              <path d="M12 8.4V20M8 11.5h8M9 20h6M7 14.5h10" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Certified Tutors. Fast Support. Real Results.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-navy-100/90">
            Pass your exams. Ace your coursework.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryButton to="/book">Book a Session</PrimaryButton>
            <PrimaryButton
              to="/services"
              className="bg-transparent text-white ring-1 ring-navy-100/30 hover:bg-white/5"
            >
              View Services
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* Key selling points */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {sellingPoints.map((point) => (
            <div key={point.title} className="text-center sm:text-left">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900 text-gold-500 sm:mx-0">
                <Icon>{point.icon}</Icon>
              </div>
              <h3 className="mt-4 font-semibold text-navy-900">{point.title}</h3>
              <p className="mt-1.5 text-sm text-navy-700/80">{point.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials (placeholder — swap for real quotes before launch) */}
      <section className="bg-navy-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Student stories" title="Real students, real progress" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy-100">
                <p className="text-navy-800">"{t.quote}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-100 text-sm font-semibold text-gold-600">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{t.name}</p>
                    <p className="text-xs text-navy-700/70">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="What we offer" title="Support that fits what you need" />
        <div className="mt-4 flex justify-center">
          <PathDivider className="text-gold-500" />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="rounded-2xl border border-navy-100 p-6 transition-shadow hover:shadow-md">
              <h3 className="font-semibold text-navy-900">{service.name}</h3>
              <p className="mt-2 text-sm text-navy-700/80">{service.description}</p>
              <p className="mt-4 text-lg font-bold text-navy-900">${service.price}<span className="text-sm font-normal text-navy-700/60"> /session</span></p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <PrimaryButton to="/services">See all services</PrimaryButton>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-navy-900 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to get support that actually works?
          </h2>
          <p className="mt-3 text-navy-100/80">
            Book a session with a certified tutor and get moving on your exams and coursework today.
          </p>
          <div className="mt-8">
            <PrimaryButton to="/book">Book a Session</PrimaryButton>
          </div>
        </div>
      </section>
    </>
  );
}
