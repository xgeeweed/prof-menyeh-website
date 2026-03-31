import { Navigation } from "@/components/Navigation";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Download, ArrowDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState, useCallback, MouseEvent as ReactMouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Photo = { src: string; caption: string };

function BookCoverGlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !glowRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.opacity = "1";
    glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(200,164,78,0.15), transparent 60%)`;
  };

  const handleMouseLeave = () => {
    if (!glowRef.current) return;
    glowRef.current.style.opacity = "0";
  };

  return (
    <div
      data-animate
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {/* Static ambient glow */}
      <div className="absolute -inset-12 bg-gradient-to-br from-[#c8a44e]/[0.06] via-transparent to-[#c8a44e]/[0.03] rounded-3xl blur-[80px]" />
      {/* Mouse-tracking glow */}
      <div
        ref={glowRef}
        className="absolute -inset-8 rounded-3xl transition-opacity duration-300 pointer-events-none"
        style={{ opacity: 0 }}
      />
      <img
        src="/images/book/cover.jpeg"
        alt="Raised to Walk, Raised to Praise"
        className="relative w-full rounded-xl shadow-2xl shadow-black/40"
      />
    </div>
  );
}

const journeyPhases = [
  {
    id: "hospital",
    phase: "01",
    title: "Hospital & Surgery",
    period: "August 2024 \u2013 December 2025",
    description: "The journey began in a hospital room in London. Surrounded by family, medical staff, and unwavering faith, Prof. Menyeh faced surgery with courage and a smile that never left his face.",
    photos: [
      { src: "/images/book/hospital-02.jpg", caption: "With the surgeon and nurse before the operation" },
      { src: "/images/book/hospital-01.jpg", caption: "Family visit in the hospital room" },
      { src: "/images/book/hospital-03.jpg", caption: "Recovery room with visitors" },
      { src: "/images/book/hospital-04.jpg", caption: "Recovery room with a younger family member" },
      { src: "/images/book/hospital-05.jpg", caption: "A later hospital admission, seven months on" },
      { src: "/images/book/hospital-06.jpg", caption: "Smiling through it all \u2014 with neck brace and faith" },
    ],
  },
  {
    id: "early-recovery",
    phase: "02",
    title: "Early Recovery",
    period: "July \u2013 December 2024",
    description: "The first steps back into the world. Using a walking stick and later a crutch, each step a testament to determination and divine grace.",
    photos: [
      { src: "/images/book/recovery-01.jpg", caption: "Walking at Little Britain Lake, London" },
      { src: "/images/book/recovery-02.jpg", caption: "Standing independently, weeks after surgery" },
      { src: "/images/book/recovery-03.jpg", caption: "Walking near a church, autumn 2025" },
    ],
  },
  {
    id: "followup",
    phase: "03",
    title: "Follow-Up Appointments",
    period: "May 2025",
    description: "A milestone visit to the consultant's office. Standing unaided, smiling broadly, with a gift for the doctor who helped make the impossible possible.",
    photos: [
      { src: "/images/book/followup-01.jpg", caption: "Positive follow-up visit with his doctor" },
      { src: "/images/book/followup-02.jpg", caption: "Gratitude \u2014 a thank-you gift for the surgical team" },
    ],
  },
  {
    id: "social",
    phase: "04",
    title: "Family & Social Life",
    period: "December 2024 \u2013 April 2025",
    description: "Normal life resumed. Dining out, relaxing at home with family \u2014 the simple joys that illness can take away and faith can restore.",
    photos: [
      { src: "/images/book/social-01.jpg", caption: "Dining out with family" },
      { src: "/images/book/social-02.jpg", caption: "At home with loved ones" },
    ],
  },
  {
    id: "church",
    phase: "05",
    title: "Church & Community",
    period: "July 2025",
    description: "A powerful moment of testimony. Standing tall among clergy at the Presbyterian Church of Ghana revival in Kumasi, dressed in white, praising God with the community that had prayed for his recovery.",
    photos: [
      { src: "/images/book/church-01.jpg", caption: "With clergy in kente stoles at the revival" },
      { src: "/images/book/church-02.jpg", caption: "Standing with a family member at the revival" },
      { src: "/images/book/church-03.jpg", caption: "Large congregation group photo" },
      { src: "/images/book/church-04.jpg", caption: "Outdoor social reception" },
      { src: "/images/book/church-05.jpg", caption: "After the church event" },
      { src: "/images/book/church-06.jpg", caption: "Fellowship and dining at the gathering" },
    ],
  },
  {
    id: "professional",
    phase: "06",
    title: "Full Recovery \u2014 Professional",
    period: "February \u2013 March 2026",
    description: "The ultimate proof of restoration. Standing on the red carpet at the Wall of Fame, giving speeches, networking \u2014 fully back in his element as a distinguished professor.",
    photos: [
      { src: "/images/book/professional-01.jpg", caption: "At the Wall of Fame display" },
      { src: "/images/book/professional-02.jpg", caption: "Formal group photo at the event" },
      { src: "/images/book/professional-03.jpg", caption: "Presenting on the red carpet" },
      { src: "/images/book/professional-04.jpg", caption: "Seated with colleagues at the venue" },
      { src: "/images/book/professional-05.jpg", caption: "Networking with colleagues" },
    ],
  },
  {
    id: "family",
    phase: "07",
    title: "Family Portraits",
    period: "February 2026",
    description: "The family that stood by him through every step of the journey.",
    photos: [
      { src: "/images/book/portrait-03.jpg", caption: "Emmanuel Aboagye \u2014 Aviation Officer" },
      { src: "/images/book/portrait-02.jpg", caption: "Theodosia Aboagye" },
      { src: "/images/book/portrait-01.jpg", caption: "Elizabeth Aboagye" },
      { src: "/images/book/portrait-04.jpg", caption: "Godfried Aboagye" },
      { src: "/images/book/portrait-05.jpg", caption: "Mrs. Adelaide Aboagye" },
    ],
  },
];

// ── Carousel Component ──
function PhotoCarousel({ photos, onPhotoClick }: { photos: Photo[]; onPhotoClick: (photo: Photo, index: number, allPhotos: Photo[]) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="relative group/carousel">
      {/* Scroll buttons */}
      {canScrollLeft && (
        <button onClick={() => scroll("left")} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover/carousel:opacity-100">
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      {canScrollRight && (
        <button onClick={() => scroll("right")} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover/carousel:opacity-100">
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Scrollable track */}
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {photos.map((photo, i) => (
          <div
            key={i}
            className="flex-shrink-0 snap-start cursor-pointer group/img"
            style={{ width: photos.length === 1 ? "100%" : photos.length === 2 ? "calc(50% - 6px)" : "calc(40% - 6px)" }}
            onClick={() => onPhotoClick(photo, i, photos)}
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full aspect-[4/3] object-cover opacity-70 group-hover/img:opacity-95 group-hover/img:scale-[1.03] transition-all duration-500"
              />
            </div>
            <p className="text-white/20 text-xs mt-2 group-hover/img:text-white/40 transition-colors">{photo.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Lightbox Modal ──
function Lightbox({ photos, initialIndex, onClose }: { photos: Photo[]; initialIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex);
  const photo = photos[index];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIndex((i) => (i > 0 ? i - 1 : photos.length - 1));
      if (e.key === "ArrowRight") setIndex((i) => (i < photos.length - 1 ? i + 1 : 0));
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [onClose, photos.length]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center" onClick={onClose}>
      <div className="relative max-w-5xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button onClick={onClose} className="absolute -top-12 right-0 p-2 text-white/50 hover:text-white transition-colors">
          <X className="h-6 w-6" />
        </button>

        {/* Image */}
        <img src={photo.src} alt={photo.caption} className="w-full max-h-[80vh] object-contain rounded-lg" />

        {/* Caption */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-white/50 text-sm">{photo.caption}</p>
          <span className="text-white/20 text-xs font-mono">{index + 1} / {photos.length}</span>
        </div>

        {/* Nav arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={() => setIndex((i) => (i > 0 ? i - 1 : photos.length - 1))}
              className="absolute left-[-50px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all hidden md:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIndex((i) => (i < photos.length - 1 ? i + 1 : 0))}
              className="absolute right-[-50px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all hidden md:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function Book() {
  const heroRef = useRef<HTMLElement>(null);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lightbox, setLightbox] = useState<{ photos: Photo[]; index: number } | null>(null);

  const openLightbox = (photo: Photo, index: number, allPhotos: Photo[]) => {
    setLightbox({ photos: allPhotos, index });
  };

  useEffect(() => {
    if (heroRef.current) {
      const els = heroRef.current.querySelectorAll("[data-animate]");
      gsap.fromTo(els, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power2.out", stagger: 0.12, delay: 0.2 });
    }
    phaseRefs.current.forEach((el) => {
      if (!el) return;
      const items = el.querySelectorAll("[data-animate]");
      gsap.fromTo(items, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    });
    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#050d1a]">
      <Navigation />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c8a44e]/[0.03] rounded-full blur-[150px]" />
        <div className="max-w-[1100px] mx-auto px-6 py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-20 items-center">
            <div>
              <p data-animate className="text-[#c8a44e] text-xs tracking-[0.3em] uppercase mb-6">New Book</p>
              <h1 data-animate className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-[1.1] mb-6">
                Raised to Walk,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8a44e] via-[#e8d5a0] to-[#c8a44e]">Raised to Praise</span>
              </h1>
              <p data-animate className="text-white/50 text-lg leading-relaxed mb-3">A Journey of God's Restoring Power</p>
              <p data-animate className="text-white/30 text-sm leading-relaxed mb-10 max-w-lg">
                A personal testimony of restoration, faith, and God's miraculous power. Through surgery, recovery, and the unwavering support of family and community, this book chronicles Professor Menyeh's journey from a hospital bed to standing tall once again.
              </p>
              <div data-animate className="flex items-center gap-3 text-white/25 text-xs mb-10">
                <span>Prof. Aboagye Menyeh</span>
                <span className="w-1 h-1 rounded-full bg-white/15" />
                <span>Foreword by Rev Prof. Charles Ansah</span>
              </div>
              <div data-animate className="flex flex-wrap gap-4">
                <a href="/downloads/raised-to-walk.pdf" download className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#c8a44e] to-[#b8943e] text-[#050d1a] text-sm font-medium tracking-wider uppercase hover:from-[#d4b05e] hover:to-[#c8a44e] transition-all duration-300">
                  <Download className="h-4 w-4" />
                  Download Free PDF
                </a>
                <a href="#journey" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/10 text-white/50 text-sm tracking-wider uppercase hover:border-white/20 hover:text-white/70 transition-all duration-300">
                  <ArrowDown className="h-4 w-4" />
                  View the Journey
                </a>
              </div>
            </div>
            <BookCoverGlow />
          </div>
        </div>
      </section>

      {/* ── JOURNEY ── */}
      <main id="journey" className="max-w-[1100px] mx-auto px-6 pb-32">
        <div className="py-20 border-b border-white/5">
          <p className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase mb-4">The Journey</p>
          <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight mb-4">A Story in Photographs</h2>
          <p className="text-white/35 max-w-xl leading-relaxed">
            All 29 photographs documenting the recovery — from the hospital bed to the red carpet. Click any image to view full size.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-[3px] top-0 bottom-0 w-px bg-gradient-to-b from-[#c8a44e]/30 via-white/5 to-transparent hidden lg:block" />

          {journeyPhases.map((phase, idx) => (
            <div
              key={phase.id}
              ref={(el) => { phaseRefs.current[idx] = el; }}
              className="relative py-16 border-b border-white/5 last:border-0"
            >
              <div className="absolute left-0 top-[72px] w-[7px] h-[7px] rounded-full bg-[#c8a44e]/40 hidden lg:block" />

              <div className="lg:pl-12">
                <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-16">
                  <div data-animate>
                    <span className="text-[#c8a44e]/30 text-xs font-mono tracking-wider">{phase.phase}</span>
                    <div className="text-white/60 text-sm mt-1">{phase.title}</div>
                    <div className="text-white/20 text-xs mt-0.5">{phase.period}</div>
                    <div className="text-white/15 text-xs mt-1">{phase.photos.length} photos</div>
                  </div>
                  <div>
                    <p data-animate className="text-white/50 text-[15px] leading-relaxed mb-6">{phase.description}</p>
                    <div data-animate>
                      <PhotoCarousel photos={phase.photos} onPhotoClick={openLightbox} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── ABOUT THE BOOK ── */}
        <div className="py-16 border-t border-white/5 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-16">
            <span className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase">About</span>
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-white tracking-tight">About the Book</h3>
              <p className="text-white/45 text-[15px] leading-relaxed">
                "Raised to Walk, Raised to Praise" is a deeply personal account of Professor Aboagye Menyeh's encounter with illness, surgery, and the miraculous restoration that followed. Written as a testimony of faith, it chronicles the moments of fear, hope, and ultimate triumph.
              </p>
              <p className="text-white/35 text-[15px] leading-relaxed">
                With a foreword by Rev Prof. Charles Ansah, the book weaves together the medical journey with spiritual reflection, offering readers not just a story of recovery but a meditation on the power of faith, family, and community in the face of adversity.
              </p>
              <div className="pt-6">
                <a href="/downloads/raised-to-walk.pdf" download className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#c8a44e]/30 text-[#c8a44e] text-sm tracking-wider hover:bg-[#c8a44e]/10 transition-colors">
                  <Download className="h-4 w-4" />
                  Download Free PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          photos={lightbox.photos}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}

      <ChatWidget />
      <Footer />
    </div>
  );
}
