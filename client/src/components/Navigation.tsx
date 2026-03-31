import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, Search, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { SearchDialog } from "@/components/SearchDialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/biography", label: "Biography" },
    { path: "/publications", label: "Publications" },
    { path: "/gallery", label: "Gallery" },
    { path: "/testimonials", label: "Testimonials" },
    { path: "/awards", label: "Awards" },
    { path: "/speeches", label: "Speeches" },
    { path: "/book", label: "Book" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location.startsWith(path);
  };

  const isHome = location === "/";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? isHome
            ? "bg-[#050d1a]/90 backdrop-blur-xl border-b border-white/5"
            : "bg-background/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex h-20 items-center justify-between">
          {/* Logo / Brand name */}
          <Link href="/" className="flex items-center gap-3 group">
            <span
              className={`text-lg font-semibold tracking-[0.25em] uppercase transition-colors duration-300 ${
                isHome ? "text-white" : "text-foreground"
              }`}
            >
              Prof. Menyeh
            </span>
          </Link>

          {/* Desktop Navigation - centered */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`group relative flex items-center gap-1 px-4 py-2 text-sm transition-all duration-300 ${
                  isActive(item.path)
                    ? isHome
                      ? "text-white"
                      : "text-foreground"
                    : isHome
                      ? "text-white/50 hover:text-white/90"
                      : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                <ArrowUpRight
                  className={`h-3 w-3 opacity-0 -translate-y-0.5 translate-x-[-2px] transition-all duration-300 group-hover:opacity-60 group-hover:translate-y-0 group-hover:translate-x-0 ${
                    isHome ? "text-white/60" : "text-muted-foreground"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right side - search + tagline */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-full transition-colors duration-300 ${
                isHome
                  ? "text-white/40 hover:text-white/80"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Search className="h-4 w-4" />
            </button>
            <div
              className={`text-right text-xs leading-tight tracking-wide ${
                isHome ? "text-white/40" : "text-muted-foreground"
              }`}
            >
              <div>Geophysics</div>
              <div>KNUST</div>
              <div>Ghana</div>
            </div>
          </div>

          {/* Mobile - search + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-full transition-colors ${
                isHome
                  ? "text-white/50 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Search className="h-5 w-5" />
            </button>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className={`p-2 rounded-full transition-colors ${
                    isHome
                      ? "text-white/50 hover:text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[340px] bg-[#0a1628] border-white/5">
                <SheetHeader>
                  <SheetTitle className="text-left text-white/80 tracking-[0.2em] uppercase text-sm font-normal">
                    Navigation
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 mt-10">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-lg text-sm transition-all duration-200 ${
                        isActive(item.path)
                          ? "text-[#c8a44e] bg-white/5"
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-40" />
                    </Link>
                  ))}
                </div>

                <div className="absolute bottom-8 left-6 right-6">
                  <div className="border-t border-white/10 pt-6">
                    <div className="text-white/30 text-xs tracking-[0.2em] uppercase">
                      Prof. Aboagye Menyeh
                    </div>
                    <div className="text-white/20 text-xs mt-1">
                      Geophysics &bull; KNUST &bull; Ghana
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </nav>
  );
}
