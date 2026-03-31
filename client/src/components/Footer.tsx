import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/biography", label: "Biography" },
    { href: "/publications", label: "Publications" },
    { href: "/awards", label: "Awards" },
    { href: "/speeches", label: "Speeches" },
    { href: "/book", label: "Book" },
    { href: "/gallery", label: "Gallery" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
  ];

  const externalLinks = [
    { href: "https://www.knust.edu.gh", label: "KNUST" },
    { href: "https://scholar.google.com/citations?user=-3l-TTcAAAAJ&hl=en", label: "Google Scholar" },
    { href: "https://www.researchgate.net/profile/Aboagye-Menyeh", label: "ResearchGate" },
  ];

  return (
    <footer className="bg-[#030a14] border-t border-white/5 mt-auto">
      <div className="max-w-[1100px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-12 md:gap-16">
          {/* Brand */}
          <div>
            <div className="text-white/80 text-sm tracking-[0.2em] uppercase mb-4">Prof. Aboagye Menyeh</div>
            <p className="text-white/30 text-sm leading-relaxed max-w-[280px]">
              Professor of Geophysics at KNUST. Pioneering researcher in mineral magnetism. Foundation Provost of the College of Science.
            </p>
          </div>

          {/* Site links */}
          <div>
            <span className="text-white/20 text-xs tracking-[0.15em] uppercase block mb-4">Pages</span>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/30 text-sm hover:text-white/60 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External */}
          <div>
            <span className="text-white/20 text-xs tracking-[0.15em] uppercase block mb-4">External</span>
            <ul className="space-y-2">
              {externalLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-white/30 text-sm hover:text-white/60 transition-colors inline-flex items-center gap-1">
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-40" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <span className="text-white/20 text-xs tracking-[0.15em] uppercase block mb-4">Contact</span>
            <div className="space-y-2 text-white/30 text-sm">
              <p>Department of Physics</p>
              <p>College of Science, KNUST</p>
              <p>Kumasi, Ghana</p>
              <p className="pt-2">
                <a href="mailto:physics@knust.edu.gh" className="hover:text-white/60 transition-colors">physics@knust.edu.gh</a>
              </p>
              <p>
                <a href="tel:+233322060319" className="hover:text-white/60 transition-colors">+233 32 206 0319</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/15 text-xs">
            &copy; {currentYear} Prof. Aboagye Menyeh. All rights reserved.
          </p>
          <p className="text-white/15 text-xs">
            Geophysics &bull; KNUST &bull; Ghana
          </p>
        </div>
      </div>
    </footer>
  );
}
