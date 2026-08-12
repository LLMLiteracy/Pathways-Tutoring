import { useSeo } from "../lib/useSeo";
import { SectionHeading, PrimaryButton } from "../components/ui";
import { useServices } from "../lib/useServices";

export function Services() {
  useSeo(
    "Services",
    "Tutoring, coursework review, and proofreading for university students — certified support, straightforward pricing."
  );
  const { services, loading } = useServices();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading
        eyebrow="Services & pricing"
        title="Support that fits what you need"
        subtitle="Simple, straightforward pricing — no packages to decode."
      />

      {loading ? (
        <p className="mt-14 text-center text-sm text-navy-700/60">Loading services…</p>
      ) : (
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col rounded-2xl border border-navy-100 p-7 transition-shadow hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-navy-900">{service.name}</h3>
              <p className="mt-3 flex-1 text-sm text-navy-700/80">{service.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-navy-900">${service.price}</span>
                <span className="text-sm text-navy-700/60">
                  /{service.duration_minutes ? `${service.duration_minutes} min` : "session"}
                </span>
              </div>
              <PrimaryButton to="/book" className="mt-6">
                Book this
              </PrimaryButton>
            </div>
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-sm text-navy-700/60">
        Pricing shown is provisional and will be confirmed before launch.
      </p>
    </div>
  );
}
