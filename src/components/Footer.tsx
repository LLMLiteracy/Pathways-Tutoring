import { Link } from "react-router-dom";
import { PathDivider } from "./PathDivider";

export function Footer() {
  return (
    <footer className="border-t border-navy-700 bg-navy-950 text-navy-100">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Pathways Tutoring" className="h-9 w-9 rounded-full" />
              <span className="font-semibold text-white">Pathways Tutoring</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-navy-100/80">
              Certified, 1-on-1 online tutoring for university students. Pass your exams. Ace your coursework.
            </p>
            <PathDivider className="mt-4 text-gold-500/60" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-gold-400">Services</Link></li>
              <li><Link to="/about" className="hover:text-gold-400">About</Link></li>
              <li><Link to="/faq" className="hover:text-gold-400">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-gold-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-gold-400">Terms of Service</Link></li>
              <li><Link to="/login" className="hover:text-gold-400">Admin Login</Link></li>
            </ul>
            <div className="mt-4 flex gap-3 text-navy-100/60">
              <span aria-hidden="true">Social links coming soon</span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-navy-700 pt-6 text-xs text-navy-100/60">
          © {new Date().getFullYear()} Pathways Tutoring. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
