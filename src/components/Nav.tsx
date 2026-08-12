import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

function linkClass({ isActive }: { isActive: boolean }) {
  return `text-sm font-medium transition-colors ${
    isActive ? "text-gold-500" : "text-navy-100 hover:text-gold-400"
  }`;
}

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy-900/95 backdrop-blur border-b border-navy-700">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="Pathways Tutoring" className="h-9 w-9 rounded-full" />
          <span className="font-semibold text-white">Pathways Tutoring</span>
        </NavLink>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/book"
            className="rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
          >
            Book a Session
          </NavLink>
        </nav>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-md text-navy-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-navy-700 px-6 py-4 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
            >
              <span className="block py-2">{link.label}</span>
            </NavLink>
          ))}
          <NavLink
            to="/book"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-gold-500 px-4 py-2 text-center text-sm font-semibold text-navy-950"
          >
            Book a Session
          </NavLink>
        </nav>
      )}
    </header>
  );
}
