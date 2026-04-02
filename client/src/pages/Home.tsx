import { useEffect, useRef } from "react";
import { ChatWidget } from "@/components/ChatWidget";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroScene } from "@/components/HeroScene";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { ArrowDown, Droplets, Mountain, Globe } from "lucide-react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const numericVal = parseInt(value.replace(/[^0-9]/g, ""));
    if (isNaN(numericVal)) {
      el.textContent = value + suffix;
      return;
    }

    gsap.fromTo(
      { val: 0 },
      { val: numericVal },
      {
        val: numericVal,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
        onUpdate: function () {
          const current = Math.round(this.targets()[0].val);
          el.textContent = current.toLocaleString() + suffix;
        },
      }
    );
  }, [value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Home() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Scroll-triggered section animations
    sectionRefs.current.forEach((section) => {
      if (!section) return;
      const children = section.querySelectorAll("[data-animate]");
      gsap.fromTo(
        children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#050d1a]">
      <Navigation />
      <main>
        {/* ── HERO SECTION ── */}
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
          {/* Dotted wave surface — subtle background layer */}
          <DottedSurface
            dotColor={[180, 195, 220]}
            fogColor={0x050d1a}
            cameraY={350}
            dotSize={10}
            dotOpacity={0.9}
            className="z-0 opacity-80"
          />
          {/* 3D Scene — globe + particles foreground */}
          <HeroScene />

          {/* Gradient overlays */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#050d1a]/60 via-transparent to-[#050d1a]" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#050d1a]/40 via-transparent to-[#050d1a]/40" />

          {/* Hero content */}
          <div className="relative z-10 text-center max-w-5xl mx-auto px-6 -mt-[20vh]">
            <div>
              <p className="text-[#c8a44e] text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-8">
                Professor Aboagye Menyeh
              </p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] tracking-tight mb-4">
                Pioneering
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8a44e] via-[#e8d5a0] to-[#c8a44e]">
                  Geophysics
                </span>
              </h1>
            </div>
            <p
              className="text-lg md:text-xl text-white/50 mt-8 max-w-2xl mx-auto leading-relaxed font-light"
            >
              Uncovering the magnetic secrets of the Earth to power exploration,
              sustainability, and scientific advancement in Ghana and beyond.
            </p>

            <div className="mt-12 flex justify-center gap-4">
              <Link
                href="/biography"
                className="px-8 py-3 border border-[#c8a44e]/40 text-[#c8a44e] text-sm tracking-wider uppercase hover:bg-[#c8a44e]/10 transition-all duration-300 rounded-full"
              >
                Explore Legacy
              </Link>
              <Link
                href="/publications"
                className="px-8 py-3 bg-white/5 text-white/70 text-sm tracking-wider uppercase hover:bg-white/10 transition-all duration-300 rounded-full backdrop-blur-sm"
              >
                Publications
              </Link>
            </div>
          </div>

          {/* Professor portrait — blended into the globe arc, below buttons */}
          <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 z-[2] w-[340px] sm:w-[420px] md:w-[500px] pointer-events-none">
            <div className="relative">
              <img
                src="/images/prof-portrait.jpg"
                alt="Professor Aboagye Menyeh"
                className="w-full mix-blend-luminosity opacity-[0.5] brightness-[0.6]"
                style={{
                  maskImage: "radial-gradient(ellipse 70% 65% at 50% 40%, black 30%, transparent 70%)",
                  WebkitMaskImage: "radial-gradient(ellipse 70% 65% at 50% 40%, black 30%, transparent 70%)",
                }}
              />
            </div>
          </div>

          {/* Scroll indicator */}
        </section>

        {/* Scroll indicator — between hero and research */}
        <div className="flex flex-col items-center gap-2 py-12 bg-gradient-to-b from-[#050d1a] to-[#0a1628]">
          <span className="text-white/30 text-xs tracking-[0.2em] uppercase">Scroll</span>
          <ArrowDown className="h-4 w-4 text-white/30" />
        </div>

        {/* ── RESEARCH FOCUS ── */}
        <section
          ref={(el) => { sectionRefs.current[0] = el; }}
          className="relative py-32 bg-gradient-to-b from-[#050d1a] via-[#0a1628] to-[#0a1628]"
        >
          <div className="container max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <div data-animate className="inline-block px-4 py-1.5 rounded-full border border-[#c8a44e]/30 text-[#c8a44e] text-xs tracking-[0.2em] uppercase mb-8">
                  Mineral Magnetism
                </div>
                <h2 data-animate className="text-4xl md:text-5xl font-light text-white tracking-tight mb-8 leading-tight">
                  Monoclinic Pyrrhotite
                  <span className="block text-white/40 text-2xl md:text-3xl mt-2">(Fe&#x2087;S&#x2088;)</span>
                </h2>
                <div data-animate className="text-white/50 text-lg leading-relaxed space-y-5">
                  <p>
                    Prof. Menyeh's seminal work on monoclinic pyrrhotite has redefined
                    our understanding of magnetic minerals. His research into this iron
                    sulfide mineral is critical for paleomagnetism and gold exploration.
                  </p>
                </div>
                <div data-animate className="mt-10 space-y-4">
                  {[
                    { label: "Synthesis & Characterization", desc: "Pioneered the silica tube technique for synthesizing pure monoclinic pyrrhotite" },
                    { label: "Magnetization Dynamics", desc: "Discovered coherent rotation of monodomain moments in fine particles (<0.8 \u00B5m)" },
                    { label: "Coercive Force Model", desc: "Developed Hc = 75.5 exp(-0.025 L\u00B9\u00B2) for predicting coercive force" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c8a44e] mt-2.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/80 font-medium">{item.label}:</span>{" "}
                        <span className="text-white/40">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div data-animate className="relative">
                <div className="absolute -inset-12 bg-gradient-to-br from-[#c8a44e]/8 via-transparent to-[#1a6fb5]/8 rounded-full blur-[80px]" />
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                    <img
                      src="/images/research-bg.jpg"
                      alt="Monoclinic Pyrrhotite Structure"
                      className="w-full h-full object-cover opacity-50 hover:opacity-70 transition duration-700 hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-6 flex justify-between items-end">
                    <div>
                      <p className="text-[#c8a44e]/50 text-xs tracking-[0.15em] uppercase mb-1.5">Key Publication</p>
                      <h3 className="text-white/60 font-light text-sm leading-relaxed max-w-[280px]">
                        The magnetization process in monoclinic pyrrhotite
                      </h3>
                    </div>
                    <span className="text-7xl font-extralight text-white/[0.03] leading-none">1991</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── APPLIED GEOPHYSICS ── */}
        <section
          ref={(el) => { sectionRefs.current[1] = el; }}
          className="relative py-32 bg-[#0a1628]"
        >
          <div className="container max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div data-animate className="inline-block px-4 py-1.5 rounded-full border border-[#c8a44e]/30 text-[#c8a44e] text-xs tracking-[0.2em] uppercase mb-8">
                Applied Geophysics
              </div>
              <h2 data-animate className="text-4xl md:text-5xl font-light text-white tracking-tight mb-6">
                Geophysical Exploration
              </h2>
              <p data-animate className="text-lg text-white/40 leading-relaxed">
                Bridging theoretical physics and practical resource management,
                addressing critical challenges in water security and mineral discovery.
              </p>
            </div>

            <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/5">
              {[
                {
                  icon: Mountain,
                  num: "01",
                  title: "Gold Exploration",
                  desc: "Utilizing aeromagnetic and radiometric surveys to delineate potential gold-bearing ore bodies in the Kyerano and Sefwi belts of Ghana.",
                },
                {
                  icon: Droplets,
                  num: "02",
                  title: "Groundwater",
                  desc: "Applying electrical resistivity and borehole geophysics to site sustainable water sources for rural communities across Ghana.",
                },
                {
                  icon: Globe,
                  num: "03",
                  title: "Environmental",
                  desc: "Mapping contaminant plumes and monitoring groundwater movement to assess environmental risks from mining and industrial activities.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  data-animate
                  className="group relative px-8 md:px-10"
                >
                  <span className="text-[#c8a44e]/20 text-xs font-mono tracking-wider">{card.num}</span>
                  <div className="mt-4 mb-5 flex items-center gap-3">
                    <card.icon className="w-5 h-5 text-[#c8a44e]/60" />
                    <h3 className="text-xl font-light text-white">{card.title}</h3>
                  </div>
                  <p className="text-white/35 leading-relaxed text-[15px]">{card.desc}</p>
                  <div className="mt-6 h-px w-12 bg-gradient-to-r from-[#c8a44e]/30 to-transparent group-hover:w-full transition-all duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── IMPACT STATS ── */}
        <section
          ref={(el) => { sectionRefs.current[2] = el; }}
          className="relative py-32 bg-gradient-to-b from-[#0a1628] to-[#050d1a]"
        >
          <div className="container max-w-6xl mx-auto px-6">
            {/* Research Numbers — horizontal flow with dividers */}
            <div data-animate className="relative">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                {[
                  { value: "517", suffix: "+", label: "Total Citations" },
                  { value: "12", suffix: "", label: "h-index" },
                  { value: "40", suffix: "+", label: "Years of Service" },
                  { value: "800", suffix: "k", label: "Grants Secured ($)" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    data-animate
                    className={`py-12 md:py-16 text-center ${
                      i > 0 ? "border-l border-white/5" : ""
                    }`}
                  >
                    <div className="text-4xl md:text-6xl font-extralight text-white mb-3 tabular-nums">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-white/25 text-xs tracking-[0.15em] uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Cited In — subtle inline */}
              <div className="border-t border-white/5 py-8">
                <p data-animate className="text-center text-white/20 text-xs tracking-[0.2em] uppercase mb-4">
                  Research Cited In
                </p>
                <div data-animate className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-white/25 text-[13px]">
                  {["Encyclopedia of Geomagnetism (Springer)", "Rock Magnetism (Cambridge UP)", "Science Magazine", "NASA/ADS", "JSTOR"].map((s, i) => (
                    <span key={i} className="flex items-center gap-2">
                      {i > 0 && <span className="w-1 h-1 rounded-full bg-white/10" />}
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Institutional Impact — clean text columns, no boxes */}
            <div className="mt-24">
              <div data-animate className="mb-16">
                <span className="text-[#c8a44e]/40 text-xs tracking-[0.2em] uppercase">Institutional Legacy</span>
                <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight mt-3">
                  Institutional Impact
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/5">
                {[
                  { top: "227 \u2192 4k+", label: "Student growth", sub: "1961 \u2013 2010" },
                  { top: "12,000+", label: "Graduates produced", sub: "Since founding" },
                  { top: "22", label: "Labs modernised", sub: "\u20AC5.44M Turnkey Project" },
                  { top: "6", label: "New programmes", sub: "As Provost" },
                ].map((stat, i) => (
                  <div key={i} data-animate className="px-6 md:px-8">
                    <div className="text-3xl md:text-4xl font-extralight text-[#c8a44e] mb-2">{stat.top}</div>
                    <div className="text-white/50 text-sm mb-1">{stat.label}</div>
                    <div className="text-white/20 text-xs">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── BOOK FEATURE ── */}
        <section className="relative py-40 bg-gradient-to-b from-[#050d1a] to-[#0a1628] overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c8a44e]/[0.03] rounded-full blur-[120px]" />
          <div className="container max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="relative flex justify-center">
                <div className="absolute -inset-12 bg-gradient-to-br from-[#c8a44e]/[0.06] via-transparent to-transparent rounded-3xl blur-[80px]" />
                <img src="/images/book/cover.jpeg" alt="Raised to Walk, Raised to Praise" className="relative w-full max-w-[420px] rounded-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]" />
              </div>
              <div className="text-center lg:text-left">
                <span className="text-[#c8a44e]/50 text-sm tracking-[0.25em] uppercase">New Book</span>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight mt-5 mb-8 leading-[1.05]">
                  Raised to Walk,<br />Raised to Praise
                </h2>
                <p className="text-white/45 text-xl leading-relaxed mb-5 max-w-xl mx-auto lg:mx-0">
                  A personal testimony of restoration, faith, and God's miraculous power. From the hospital bed to standing tall again.
                </p>
                <p className="text-white/25 text-sm mb-12">
                  Foreword by Rev Prof. Charles Ansah
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Link href="/book" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#c8a44e]/40 text-[#c8a44e] text-sm tracking-wider uppercase hover:bg-[#c8a44e]/10 transition-all duration-300">
                    Explore the Journey
                  </Link>
                  <a href="/downloads/raised-to-walk.pdf" download className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/5 text-white/50 text-sm tracking-wider uppercase hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ChatWidget />
      <Footer />
    </div>
  );
}
