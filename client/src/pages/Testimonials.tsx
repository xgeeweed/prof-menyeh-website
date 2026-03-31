import { Navigation } from "@/components/Navigation";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Testimonial = {
  id: number;
  name: string;
  role: string;
  affiliation: string;
  quote: string;
  category: "student" | "colleague" | "administrator";
  year: string;
};

const testimonials: Testimonial[] = [
  { id: 1, name: "Dr. David Dotse Wemegah", role: "Former Ph.D. Student, Now Lecturer", affiliation: "Department of Physics, KNUST", quote: "Professor Menyeh's mentorship transformed my approach to scientific research. His patience, rigorous thinking, and emphasis on practical applications shaped my career. He didn't just teach geophysics\u2014he taught us how to think like scientists and contribute to Ghana's development.", category: "student", year: "2015-2021" },
  { id: 2, name: "Dr. Emmanuel Daanoba Forson", role: "Former M.Phil./Ph.D. Student", affiliation: "KNUST", quote: "Working under Professor Menyeh was a transformative experience. His deep understanding of mineral magnetism and geophysical exploration methods, combined with his genuine care for student success, created an environment where groundbreaking research could flourish.", category: "student", year: "2018-2023" },
  { id: 3, name: "Dr. Peter Deatanyah", role: "Former Ph.D. Student", affiliation: "Ghana Atomic Energy Commission", quote: "Professor Menyeh's guidance during my doctoral research was invaluable. His ability to connect theoretical physics with practical applications in Ghana's context made the research both academically rigorous and socially relevant.", category: "student", year: "2016-2021" },
  { id: 4, name: "Prof. William O'Reilly", role: "Ph.D. Supervisor", affiliation: "University of Newcastle upon Tyne, UK", quote: "Aboagye was an exceptional doctoral student whose work on monoclinic pyrrhotite opened new avenues in mineral magnetism. His experimental skills, theoretical insights, and dedication to understanding fundamental processes made our collaboration immensely productive.", category: "colleague", year: "1991-1995" },
  { id: 5, name: "Prof. Sylvester K. Danuor", role: "Colleague & Research Collaborator", affiliation: "Department of Physics, KNUST", quote: "Professor Menyeh's contributions to geophysics at KNUST are unparalleled. His vision in establishing the geophysics program and his leadership as Provost transformed the College of Science into a modern, research-oriented institution.", category: "colleague", year: "1995-Present" },
  { id: 6, name: "Prof. Kwasi Preko", role: "Colleague", affiliation: "Department of Physics, KNUST", quote: "Professor Menyeh's leadership as Provost transformed the College of Science. His vision, strategic thinking, and commitment to excellence created lasting institutional change. As a colleague, his mentorship and collaborative spirit continue to inspire us.", category: "colleague", year: "2004-Present" },
  { id: 7, name: "Dr. Reginald Mensah Noye", role: "Former Student & Collaborator", affiliation: "KNUST", quote: "Professor Menyeh's approach to geophysical fieldwork set the standard for applied research in Ghana. His emphasis on combining rigorous data collection with practical community impact influenced how an entire generation of geophysicists approach their work.", category: "student", year: "2005-2015" },
  { id: 8, name: "Prof. Frederick K. Boadu", role: "Research Collaborator", affiliation: "Duke University, USA", quote: "Collaborating with Professor Menyeh on environmental geophysics research demonstrated his remarkable ability to bridge international research standards with local Ghanaian context. His work ethic and scientific integrity are exemplary.", category: "colleague", year: "2006-2012" },
  { id: 9, name: "University Administration", role: "KNUST Council Citation", affiliation: "Kwame Nkrumah University of Science and Technology", quote: "Professor Aboagye Menyeh's service as Foundation Provost of the College of Science represents one of the most transformative periods in the College's history. His infrastructure development, academic program expansion, and fundraising achievements set new benchmarks for institutional leadership at KNUST.", category: "administrator", year: "2010" },
  { id: 10, name: "Science Students Association (SCISA)", role: "Student Body", affiliation: "College of Science, KNUST", quote: "Professor Menyeh championed the cause of science students throughout his tenure. His open-door policy, genuine interest in student welfare, and tireless advocacy for better facilities and resources earned him the deep respect and admiration of generations of science students.", category: "student", year: "2002-2010" },
];

const categoryConfig = {
  student: { label: "Students & Mentees" },
  colleague: { label: "Colleagues & Collaborators" },
  administrator: { label: "Institutional" },
};

export default function Testimonials() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      if (!section) return;
      const els = section.querySelectorAll("[data-animate]");
      gsap.fromTo(els, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.08, scrollTrigger: { trigger: section, start: "top 85%" } });
    });
    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#050d1a]">
      <Navigation />

      <section className="relative pt-32 pb-16 border-b border-white/5">
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="text-[#c8a44e] text-xs tracking-[0.3em] uppercase mb-4">Voices</p>
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-[1.1] mb-6">Testimonials</h1>
          <p className="text-white/40 text-lg max-w-xl font-light leading-relaxed">
            From students, colleagues, and institutions &mdash; reflections on a life dedicated to science and mentorship.
          </p>
        </div>
      </section>

      <main className="max-w-[1100px] mx-auto px-6 pb-32">
        {(["student", "colleague", "administrator"] as const).map((cat, catIdx) => {
          const items = testimonials.filter((t) => t.category === cat);
          return (
            <section key={cat} ref={(el) => { sectionRefs.current[catIdx] = el; }} className="py-20 border-b border-white/5 last:border-0">
              <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
                <div data-animate>
                  <span className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase">{categoryConfig[cat].label}</span>
                  <div className="text-white/15 text-xs mt-1">{items.length} testimonials</div>
                </div>
                <div className="space-y-12">
                  {items.map((t) => (
                    <div key={t.id} data-animate className="group">
                      <blockquote className="text-white/55 text-lg leading-relaxed font-light italic group-hover:text-white/65 transition-colors">
                        "{t.quote}"
                      </blockquote>
                      <div className="mt-6 flex items-baseline gap-3">
                        <span className="text-white/80 text-sm font-medium">{t.name}</span>
                        <span className="w-1 h-1 rounded-full bg-white/15" />
                        <span className="text-white/30 text-sm">{t.role}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-white/20 text-xs">{t.affiliation}</span>
                        <span className="text-[#c8a44e]/30 text-xs">{t.year}</span>
                      </div>
                      <div className="mt-6 h-px w-12 bg-gradient-to-r from-[#c8a44e]/20 to-transparent" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <section ref={(el) => { sectionRefs.current[3] = el; }} className="pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div data-animate>
              <span className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase">Contribute</span>
            </div>
            <div>
              <h2 data-animate className="text-2xl font-light text-white tracking-tight mb-4">Share Your Story</h2>
              <p data-animate className="text-white/40 leading-relaxed mb-6">
                If you studied under, worked with, or were influenced by Professor Menyeh, we welcome your reflections.
              </p>
              <a data-animate href="mailto:physics@knust.edu.gh?subject=Testimonial for Prof. Menyeh" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#c8a44e]/30 text-[#c8a44e] text-sm tracking-wider hover:bg-[#c8a44e]/10 transition-colors">
                Submit a Testimonial
              </a>
            </div>
          </div>
        </section>
      </main>

      <ChatWidget />
      <Footer />
    </div>
  );
}
