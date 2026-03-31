import { Navigation } from "@/components/Navigation";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { useState, useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AwardItem = {
  id: number;
  title: string;
  year: string;
  description: string;
  category: "academic" | "institutional" | "fellowship" | "recognition";
};

const awards: AwardItem[] = [
  { id: 1, title: "Aboagye Menyeh Complex Naming", year: "2015", description: "The College of Science building at KNUST was officially named the 'Aboagye Menyeh Complex' in recognition of his transformative leadership as Foundation Provost (2004-2010). This unprecedented honor acknowledges his role in establishing the College structure, securing major funding, and building international partnerships.", category: "institutional" },
  { id: 2, title: "Two Commonwealth Scholarships", year: "1984-1995", description: "Awarded the prestigious Commonwealth Scholarship twice: first for his M.Sc. in Geophysics (1984-1986) and again for his Ph.D. in Geophysics (1991-1995), both at the University of Newcastle upon Tyne. This rare distinction enabled his groundbreaking research on monoclinic pyrrhotite under Prof. William O'Reilly.", category: "fellowship" },
  { id: 3, title: "Promotion to Full Professor", year: "2008", description: "Elevated to the rank of Full Professor of Geophysics at KNUST, the highest academic rank, in recognition of his distinguished research contributions, exceptional teaching, and outstanding service to the university.", category: "academic" },
  { id: 4, title: "Foundation Provost, College of Science", year: "2004-2010", description: "Appointed as the inaugural Provost of the newly established College of Science at KNUST, leading the transformation from Faculty to College structure. Secured significant research funding, established international partnerships, and oversaw infrastructure development.", category: "institutional" },
  { id: 5, title: "Dean, Faculty of Science", year: "2001-2004", description: "Served as the 8th and last Dean of the Faculty of Science before the transition to the College system. His leadership laid the groundwork for the structural transformation.", category: "institutional" },
  { id: 6, title: "TALIF Grant Awards", year: "2004-2006", description: "Principal Investigator on multiple Teaching and Learning Innovation Fund grants totaling approximately $800,000 for laboratory setup, glass-blowing, molecular biology, and distance-learning facilities.", category: "recognition" },
  { id: 7, title: "International Research Collaborations", year: "1991-Present", description: "Established partnerships with University of Newcastle upon Tyne (UK), Ludwig Maximilian University of Munich (Germany), and various African universities. Led the Ghanaian-German Lake Bosumtwi drilling project.", category: "recognition" },
  { id: 8, title: "Promotion to Associate Professor", year: "1999", description: "Advanced to Associate Professor in recognition of his growing international reputation in rock magnetism and geophysical exploration.", category: "academic" },
  { id: 9, title: "Senior Lecturer Appointment", year: "1991", description: "Promoted to Senior Lecturer following his return from Ph.D. studies and the publication of groundbreaking research on monoclinic pyrrhotite.", category: "academic" },
  { id: 10, title: "Research Excellence in Mineral Magnetism", year: "1991-2023", description: "His research on monoclinic pyrrhotite has been recognized as pioneering work. Over 12,000 reads and 431 citations on ResearchGate. Cited in Encyclopedia of Geomagnetism (Springer, 2007) and Rock Magnetism (Cambridge UP, 2001).", category: "recognition" },
  { id: 11, title: "70th Birthday Celebration at KNUST", year: "2022", description: "Celebrated at KNUST with tributes highlighting his role as Foundation Provost and scientific mentor. The event included scholarly presentations from colleagues, former students, and university leadership.", category: "recognition" },
  { id: 12, title: "Ghana Athletics Association Dispute Committee Chair", year: "2019", description: "Chaired a committee resolving disputes in the Ghana Athletics Association, presenting recommendations to the National Sports Authority.", category: "recognition" },
  { id: 13, title: "Professorial Inaugural Lecture", year: "2012", description: "Delivered his Professorial Inaugural Lecture on September 28, 2012, titled 'The Importance of Physics in Socio-Economic Development.'", category: "academic" },
  { id: 14, title: "KNUST 60-Year Anniversary Gold Plaque", year: "2011", description: "Received the KNUST 60-Year Anniversary Gold Plaque in recognition of outstanding contributions over decades of dedicated service.", category: "recognition" },
  { id: 15, title: "Certificate of Long Service", year: "2009", description: "Awarded the Certificate of Long Service by KNUST in recognition of nearly three decades of unbroken, dedicated service.", category: "recognition" },
  { id: 16, title: "SEG Grant & Ghana SEG Branch", year: "2006", description: "Facilitated a US$10,000 grant from the Society of Exploration Geophysicists (USA) and established a Ghana branch of SEG, connecting Ghanaian geophysicists with the international community.", category: "fellowship" },
  { id: 17, title: "Professorial Member of University Council", year: "2003-2005", description: "Served as the Professorial Member of Convocation on the KNUST University Council, the highest governing body of the university.", category: "institutional" },
  { id: 18, title: "National President, Ghana Science Association", year: "2001-2003", description: "Elected National President of the GSA, advocating for science-friendly national policies and championing increased government investment in science education.", category: "institutional" },
  { id: 19, title: "Founding Editor-in-Chief, Journal of the GSA", year: "1998", description: "Appointed first Editor-in-Chief of the Journal of the Ghana Science Association, establishing editorial standards for Ghana's premier multidisciplinary science journal.", category: "recognition" },
  { id: 20, title: "TWAS Research Grant", year: "1997", description: "Received a US$5,000 research grant from the Third World Academy of Sciences, recognising the international significance of his research in rock and mineral magnetism.", category: "fellowship" },
  { id: 21, title: "Patron, Ghana Science Association", year: "Present", description: "Currently serves as the Patron of the Ghana Science Association, a lifetime honour reflecting his enduring contribution to science in Ghana.", category: "recognition" },
  { id: 22, title: "England-Africa Partnership Grant", year: "2008", description: "Secured approximately US$160,000 (GBP 80,000) under the England-Africa Partnership to support the introduction of Meteorology and Climatic Science in the Physics Department.", category: "fellowship" },
  { id: 23, title: "Plaque from KNUST Alumni Association of North America", year: "2009", description: "Received a plaque from the KNUST Alumni Association of North America in recognition of his outstanding contributions to the university.", category: "recognition" },
];

const categories: Record<string, { label: string; color: string }> = {
  institutional: { label: "Leadership", color: "#9b7fd4" },
  academic: { label: "Academic", color: "#5b9bd5" },
  fellowship: { label: "Fellowship", color: "#6abf8a" },
  recognition: { label: "Recognition", color: "#c8a44e" },
};

export default function Awards() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return awards;
    return awards.filter((a) => a.category === activeFilter);
  }, [activeFilter]);

  // Sort by year descending, "Present" first
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const ya = a.year === "Present" ? 9999 : parseInt(a.year.split("-")[0]);
      const yb = b.year === "Present" ? 9999 : parseInt(b.year.split("-")[0]);
      return yb - ya;
    });
  }, [filtered]);

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      if (!section) return;
      const els = section.querySelectorAll("[data-animate]");
      gsap.fromTo(els, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.06,
        scrollTrigger: { trigger: section, start: "top 85%" },
      });
    });
    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#050d1a]">
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 border-b border-white/5">
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="text-[#c8a44e] text-xs tracking-[0.3em] uppercase mb-4">Recognition</p>
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-[1.1] mb-6">
            Awards & Honors
          </h1>
          <p className="text-white/40 text-lg max-w-xl font-light leading-relaxed">
            Four decades of excellence recognised across research, leadership, and national service.
          </p>
        </div>
      </section>

      <main className="max-w-[1100px] mx-auto px-6 pb-32">

        {/* ── SIGNATURE: ABOAGYE MENYEH COMPLEX ── */}
        <section ref={(el) => { sectionRefs.current[0] = el; }} className="py-24 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div data-animate>
              <span className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase">Signature</span>
            </div>
            <div>
              <div data-animate className="flex items-baseline gap-4 mb-6">
                <span className="text-[#c8a44e]/30 text-xs font-mono">2015</span>
                <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">Aboagye Menyeh Complex</h2>
              </div>
              <p data-animate className="text-white/50 text-lg leading-relaxed mb-6">
                KNUST bestowed its highest institutional honour by naming the College of Science building the <span className="text-white/80">"Aboagye Menyeh Complex"</span> in recognition of his transformative leadership as Foundation Provost from 2004 to 2010.
              </p>
              <p data-animate className="text-white/35 leading-relaxed">
                This unprecedented recognition acknowledges his visionary leadership in establishing the College structure, securing over $800,000 in funding, building international research partnerships, and creating an environment where both research and teaching could flourish. The complex stands as a physical testament to his dedication to advancing science education in Ghana.
              </p>
              <div data-animate className="flex items-center gap-6 mt-8 text-white/25 text-xs tracking-wider">
                <span>KNUST Campus, Kumasi</span>
                <span className="w-1 h-1 rounded-full bg-white/10" />
                <span>Dedicated 2015</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── FILTER & AWARDS LIST ── */}
        <section ref={(el) => { sectionRefs.current[1] = el; }} className="py-16">
          {/* Filter pills */}
          <div data-animate className="flex flex-wrap gap-2 mb-12">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-full text-xs tracking-wider transition-colors ${
                activeFilter === "all" ? "bg-white/10 text-white/80" : "text-white/30 hover:text-white/50"
              }`}
            >
              All ({awards.length})
            </button>
            {Object.entries(categories).map(([key, cat]) => {
              const count = awards.filter((a) => a.category === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`px-4 py-2 rounded-full text-xs tracking-wider transition-colors ${
                    activeFilter === key ? "text-white/80" : "text-white/30 hover:text-white/50"
                  }`}
                  style={activeFilter === key ? { backgroundColor: cat.color + "20", color: cat.color } : {}}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Awards list — clean timeline */}
          <div className="relative">
            <div className="absolute left-[3px] top-2 bottom-2 w-px bg-gradient-to-b from-[#c8a44e]/20 via-white/5 to-transparent" />

            <div className="space-y-0">
              {sorted.map((award) => {
                const cat = categories[award.category];
                return (
                  <div key={award.id} className="relative pl-10 pb-8 last:pb-0 group">
                    {/* Dot */}
                    <div
                      className="absolute left-0 top-1.5 w-[7px] h-[7px] rounded-full transition-colors duration-300"
                      style={{ backgroundColor: cat.color + "60" }}
                    />
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-2">
                      <span className="text-[#c8a44e]/40 text-xs font-mono tracking-wider shrink-0 w-20">{award.year}</span>
                      <h3 className="text-white/80 text-base font-medium group-hover:text-white transition-colors">{award.title}</h3>
                    </div>
                    <div className="sm:ml-24 flex items-center gap-3 mb-2">
                      <span className="text-xs tracking-wider" style={{ color: cat.color + "80" }}>{cat.label}</span>
                    </div>
                    <p className="text-white/30 text-[15px] leading-relaxed sm:ml-24 group-hover:text-white/40 transition-colors">{award.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── LEGACY STATEMENT ── */}
        <section ref={(el) => { sectionRefs.current[2] = el; }} className="pt-16 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div data-animate>
              <span className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase">Legacy</span>
            </div>
            <div className="space-y-6">
              <p data-animate className="text-white/45 text-lg leading-relaxed">
                These honours reflect a career defined by groundbreaking research in mineral magnetism, visionary leadership that transformed KNUST's College of Science, and dedicated mentorship of the next generation of Ghanaian scientists.
              </p>
              <p data-animate className="text-white/35 leading-relaxed">
                The Aboagye Menyeh Complex stands as the most visible symbol, but his true impact extends far beyond any single building. His 517+ citations continue to influence scientific work worldwide, his administrative innovations set new standards for university governance, and his former students carry forward his commitment to rigorous, socially relevant research.
              </p>
              <div data-animate className="mt-12 pt-8 border-t border-white/5">
                <blockquote className="text-white/50 italic text-2xl font-extralight tracking-tight leading-relaxed">
                  "What is worth doing is worth doing well."
                </blockquote>
                <div className="mt-4 h-px w-16 bg-gradient-to-r from-[#c8a44e]/40 to-transparent" />
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
