import { useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  { year: "1980", title: "National Service & Teaching Assistant", text: "Began his career at KNUST as National Service Personnel (1980-1981), then appointed Regular Teaching Assistant (1981-1982). This marked the beginning of his lifelong commitment to KNUST." },
  { year: "1982", title: "Assistant Lecturer", text: "Appointed Assistant Lecturer in October 1982. Also served as Departmental Board Secretary, Examinations/Timetable Officer, and Faculty Examinations Officer, during which time he designed the \"Broad Sheet\" for capturing examination results, readily adopted by other faculties." },
  { year: "1984", title: "Lecturer & M.Sc. Studies", text: "Promoted to Lecturer in 1984 and pursued M.Sc. in Geophysics at Newcastle upon Tyne (1984-1986) on his first Commonwealth Scholarship. Returned to KNUST and re-introduced Geophysics, a course abandoned for over a decade, drawing up the syllabus himself." },
  { year: "1991", title: "Senior Lecturer & Ph.D. Studies", text: "Promoted to Senior Lecturer in 1991 and embarked on Ph.D. research at Newcastle upon Tyne (1991-1995) on his second Commonwealth Scholarship. Conducted groundbreaking research on monoclinic pyrrhotite, publishing across Ghana, Europe, the USA, and Japan." },
  { year: "1998", title: "Founding Editor, Journal of GSA", text: "Appointed first Editor-in-Chief of the Journal of the Ghana Science Association (1998). Also served as GSA National Secretary (1996-1997), then National President (2001-2003), and currently serves as Patron." },
  { year: "1999", title: "Associate Professor", text: "Elevated to Associate Professor in October 1999, establishing himself as a leading researcher in geophysics and mineral magnetism with growing international recognition." },
  { year: "2001", title: "Dean of Faculty of Science", text: "Elected as the 8th Dean of the Faculty of Science (2001-2004). At his very first Faculty Board meeting (the 183rd), he proposed the construction of the Science Building Complex." },
  { year: "2004", title: "Foundation Provost, College of Science", text: "Appointed Foundation Provost (2004-2010). Secured over US$800,000 in TALIF grants, constructed the Science Building Complex, modernised 22 laboratories, established a French Resource Centre, introduced six new degree programmes (Food Science, Environmental Science, Actuarial Science, Meteorology & Climate Science, Polymer Science, Financial Mathematics), recruited ~60 new academic staff, and digitised administration via the FACSCI system." },
  { year: "2008", title: "Full Professor", text: "Appointed to the rank of Full Professor. Delivered his Professorial Inaugural Lecture on September 28, 2012, on \"The Importance of Physics in Socio-Economic Development.\"" },
  { year: "2015", title: "Aboagye Menyeh Complex Named", text: "The College of Science building he championed from its inception in 2001 was officially named the \"Aboagye Menyeh Complex\" by the University Council \u2014 the highest honour bestowed by KNUST." },
  { year: "2022", title: "70th Birthday Celebration", text: "His 70th birthday was celebrated at KNUST with tributes highlighting his role as Foundation Provost and scientific mentor, with scholarly presentations from colleagues and former students." },
  { year: "Now", title: "Professor (on contract)", text: "Continues to serve KNUST in the Department of Physics, mentoring the next generation of geophysicists and contributing to research advancement." },
];

export default function Biography() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      if (!section) return;
      const els = section.querySelectorAll("[data-animate]");
      gsap.fromTo(
        els,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.1,
          scrollTrigger: { trigger: section, start: "top 85%" },
        }
      );
    });
    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#050d1a]">
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative h-[60vh] min-h-[450px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-[0.07]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1a]/30 via-transparent to-[#050d1a]" />
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 pb-16 w-full">
          <p className="text-[#c8a44e] text-xs tracking-[0.3em] uppercase mb-4">Biography</p>
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-[1.1]">
            Professor Aboagye<br />Menyeh
          </h1>
          <p className="text-white/40 text-lg mt-6 max-w-xl font-light leading-relaxed">
            A life dedicated to science, education, and leadership &mdash; from Asikasu village to the halls of KNUST.
          </p>
        </div>
      </section>

      <main className="max-w-[1100px] mx-auto px-6 pb-32">

        {/* ── EARLY LIFE ── */}
        <section ref={(el) => { sectionRefs.current[0] = el; }} className="py-24 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div data-animate>
              <span className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase">Origins</span>
            </div>
            <div className="space-y-8">
              <h2 data-animate className="text-3xl md:text-4xl font-light text-white tracking-tight">Early Life & Roots</h2>

              <p data-animate className="text-white/50 text-lg leading-relaxed">
                Professor Aboagye Menyeh was born to <span className="text-white/80">Opanyin Kwasi Menyeh</span>, a chief cocoa farmer, and <span className="text-white/80">Madam Rosina Amma Okyerebea</span>, both natives of <span className="text-white/80">Abiriw, Akwapim</span> in the Eastern Region of Ghana. Both parents were deeply religious. He is the third born of his mother's five children. His early childhood was spent in <span className="text-white/80">Asikasu</span> (literally, "the Golden River"), a village about 15 kilometres from Koforidua.
              </p>

              <p data-animate className="text-white/50 text-lg leading-relaxed">
                His primary schooling began at the <span className="text-white/80">Asikasu Presbyterian School</span>, the two primary schools separated by about 5 kilometres. Young Aboagye walked to school daily, rain or shine. With no middle school in Asikasu, he continued at the <span className="text-white/80">Jumapo Methodist Middle School</span>, completing in 1967 with a <span className="text-white/80">distinction in the MSLCE</span>. As he later reflected: <em className="text-white/60">"I have had a taste of both Presbyterian and Methodist training, which has been a blessing to me in my life."</em>
              </p>

              {/* Father's Wisdom */}
              <div data-animate className="border-l-2 border-[#c8a44e]/30 pl-8 py-4 my-12">
                <p className="text-white/70 text-xs tracking-[0.15em] uppercase mb-4">A Father's Wisdom</p>
                <p className="text-white/50 leading-relaxed mb-4">
                  While in Middle Form 2, he passed the Common Entrance Examination and was offered admission to <span className="text-white/80">Prempeh College</span>. The headmaster even visited his school personally. But his father insisted he complete middle school first:
                </p>
                <blockquote className="text-white/60 italic text-lg leading-relaxed">
                  "Get one certificate before trying for another. What if something happened and you were unable to complete?"
                </blockquote>
                <p className="text-white/50 leading-relaxed mt-4">
                  Upon completing Form 4, he received three simultaneous admissions. His father remarked: <em className="text-white/60">"Now you see, you have obtained one certificate and now you have three good options, just as I told you."</em>
                </p>
              </div>

              <p data-animate className="text-white/50 text-lg leading-relaxed">
                He settled on <span className="text-white/80">Asankrangwa Secondary School</span> in the Western Region, travelling the long journey from eastern Ghana to the far west: Asikasu to Koforidua, then by train to Tarkwa, and finally by a "mummy truck" to Asankrangwa. One of Nkrumah's Educational Trust institutions, it was no "bush school" at all. He earned a <span className="text-white/80">Ghana Cocoa Marketing Board Scholarship</span>, became House Prefect, and achieved Division One at O-Level. His Physics teacher, Mr. Anthony Aggrey, would often say: <em className="text-white/60">"One day, I expect this boy to be a Professor of Physics."</em>
              </p>

              <p data-animate className="text-white/50 text-lg leading-relaxed">
                He then gained Sixth Form admission to <span className="text-white/80">Adisadel College</span> in Cape Coast, studying Mathematics, Physics, and Chemistry at the A-Level.
              </p>

              {/* Education timeline */}
              <div data-animate className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/5">
                {[
                  { period: "Primary", school: "Asikasu Presbyterian", detail: "Lower & Upper Primary" },
                  { period: "1963-1967", school: "Jumapo Methodist", detail: "Distinction in MSLCE" },
                  { period: "1967-1972", school: "Asankrangwa Secondary", detail: "Division One, Cocoa Board Scholar" },
                  { period: "1972-1974", school: "Adisadel College", detail: "A-Level: Maths, Physics, Chemistry" },
                ].map((ed, i) => (
                  <div key={i} className="px-4 md:px-6">
                    <div className="text-[#c8a44e]/40 text-xs tracking-wider mb-2">{ed.period}</div>
                    <div className="text-white/70 text-sm font-medium mb-1">{ed.school}</div>
                    <div className="text-white/30 text-xs">{ed.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── HIGHER EDUCATION ── */}
        <section ref={(el) => { sectionRefs.current[1] = el; }} className="py-24 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div data-animate>
              <span className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase">University</span>
            </div>
            <div className="space-y-8">
              <h2 data-animate className="text-3xl md:text-4xl font-light text-white tracking-tight">Higher Education</h2>

              <p data-animate className="text-white/50 text-lg leading-relaxed">
                The common phrase at the time was <em className="text-white/60">"Medico or suicide"</em>, but being mathematically inclined, medicine was out of the question. He wanted Engineering but accepted Physics &mdash; a choice that would fulfil his Asankrangwa teacher's prophecy.
              </p>

              <div data-animate className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5 mt-12">
                {[
                  { year: "1976-1980", degree: "B.Sc. Physics", school: "KNUST, Kumasi", badge: "Second Class Upper", note: "One of only three to achieve this grade" },
                  { year: "1984-1986", degree: "M.Sc. Geophysics", school: "University of Newcastle upon Tyne", badge: "1st Commonwealth Scholarship", note: "" },
                  { year: "1991-1995", degree: "Ph.D. Geophysics", school: "University of Newcastle upon Tyne", badge: "2nd Commonwealth Scholarship", note: "" },
                ].map((d, i) => (
                  <div key={i} className="py-6 md:py-0 px-0 md:px-8 first:pl-0 last:pr-0">
                    <div className="text-[#c8a44e]/40 text-xs tracking-wider mb-3">{d.year}</div>
                    <h3 className="text-white/90 text-lg font-light mb-1">{d.degree}</h3>
                    <p className="text-white/35 text-sm mb-3">{d.school}</p>
                    <span className="text-[#c8a44e]/70 text-xs tracking-wider">{d.badge}</span>
                    {d.note && <p className="text-white/25 text-xs mt-2">{d.note}</p>}
                  </div>
                ))}
              </div>

              <p data-animate className="text-white/50 text-lg leading-relaxed mt-8">
                Awarded the <span className="text-white/80">Commonwealth Scholarship</span> twice, he studied under Prof. William O'Reilly, conducting groundbreaking research on monoclinic pyrrhotite. Upon returning, he immediately drew up the syllabus for re-introducing Geophysics at KNUST and later initiated the M.Sc. Geophysics programme.
              </p>
            </div>
          </div>
        </section>

        {/* ── CAREER TIMELINE ── */}
        <section ref={(el) => { sectionRefs.current[2] = el; }} className="py-24 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div data-animate>
              <span className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase">Career</span>
            </div>
            <div>
              <h2 data-animate className="text-3xl md:text-4xl font-light text-white tracking-tight mb-6">Career at KNUST</h2>
              <p data-animate className="text-white/50 text-lg leading-relaxed mb-16">
                Four decades of service, beginning in 1980. During the "Agege Craze" when colleagues emigrated to Nigeria, he stood his ground. After his Ph.D., he turned down offers in the US and UK, honouring his Commonwealth bond. He has not gone on sabbatical for over 14 years.
              </p>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[3px] top-2 bottom-2 w-px bg-gradient-to-b from-[#c8a44e]/30 via-white/10 to-white/5" />

                <div className="space-y-0">
                  {timelineData.map((item, i) => (
                    <div key={i} data-animate className="relative pl-10 pb-10 last:pb-0 group">
                      {/* Dot */}
                      <div className="absolute left-0 top-1.5 w-[7px] h-[7px] rounded-full bg-[#c8a44e]/40 group-hover:bg-[#c8a44e] transition-colors duration-300" />
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-2">
                        <span className="text-[#c8a44e]/50 text-xs font-mono tracking-wider shrink-0 w-12">{item.year}</span>
                        <h3 className="text-white/80 text-base font-medium">{item.title}</h3>
                      </div>
                      <p className="text-white/35 text-[15px] leading-relaxed sm:ml-16">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── NATIONAL SERVICE ── */}
        <section ref={(el) => { sectionRefs.current[3] = el; }} className="py-24 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div data-animate>
              <span className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase">Service</span>
            </div>
            <div>
              <h2 data-animate className="text-3xl md:text-4xl font-light text-white tracking-tight mb-12">National & Professional Service</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5">
                <div data-animate className="pr-0 md:pr-10 pb-8 md:pb-0">
                  <p className="text-[#c8a44e]/40 text-xs tracking-[0.15em] uppercase mb-6">Ghana Science Association</p>
                  <div className="space-y-3">
                    {[
                      "Founding Editor-in-Chief, Journal of the GSA (1998)",
                      "National Secretary (1996-1997)",
                      "National President (2001-2003)",
                      "Current Patron",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full bg-white/20 mt-2 shrink-0" />
                        <span className="text-white/45 text-[15px]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div data-animate className="pl-0 md:pl-10 pt-8 md:pt-0">
                  <p className="text-[#c8a44e]/40 text-xs tracking-[0.15em] uppercase mb-6">National & International</p>
                  <div className="space-y-3">
                    {[
                      "Implementation Planning Committee on Science, Mathematics & Technology Education",
                      "Working Group on S&T Management, Ministry of Science and Environment",
                      "Ghanaian Technical Committee for Education Programmes of ECOWAS",
                      "Ghana Chapter, African Technology Policy Studies (ATPS) Network",
                      "Professorial Member of University Council (2003-2005)",
                      "Chairman, Ghana Athletics Association Dispute Committee (2019)",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full bg-white/20 mt-2 shrink-0" />
                        <span className="text-white/45 text-[15px]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TEACHING & MENTORSHIP ── */}
        <section ref={(el) => { sectionRefs.current[4] = el; }} className="py-24 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div data-animate>
              <span className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase">Philosophy</span>
            </div>
            <div className="space-y-8">
              <h2 data-animate className="text-3xl md:text-4xl font-light text-white tracking-tight">Teaching & Mentorship</h2>

              <p data-animate className="text-white/50 text-lg leading-relaxed">
                His approach is rooted in making science accessible: <em className="text-white/60">"I have noted with deep satisfaction how students I have taught have been very much excited because I am able to make the subject more interesting to them rather than making it a boring or dry subject."</em>
              </p>

              <p data-animate className="text-white/50 text-lg leading-relaxed">
                On his career choice: <em className="text-white/60">"I will categorically say I have no regrets whatsoever! In life one should do what one can do to the best of his or her ability if one is to derive maximum job satisfaction."</em>
              </p>

              <p data-animate className="text-white/50 text-lg leading-relaxed">
                The <span className="text-white/80">Geophysics Section he built from scratch has trained more lecturers than any other section under Physics</span>. His former students hold responsible positions at GNPC, in the mining sector, and with borehole drilling companies across Ghana.
              </p>

              <div data-animate className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5 mt-12 pt-8 border-t border-white/5">
                <div className="pr-0 md:pr-10 pb-6 md:pb-0">
                  <blockquote className="text-white/55 italic text-lg leading-relaxed">"What is worth doing is worth doing well."</blockquote>
                  <p className="text-white/25 text-xs mt-3">His favourite adage, applied to teaching, research, and administration alike.</p>
                </div>
                <div className="pl-0 md:pl-10 pt-6 md:pt-0">
                  <blockquote className="text-white/55 italic text-lg leading-relaxed">"An investment in knowledge pays the best interest."</blockquote>
                  <p className="text-white/25 text-xs mt-3">Benjamin Franklin's words, printed on the first page of all Physics and Chemistry laboratory manuals.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VISION FOR SCIENCE ── */}
        <section ref={(el) => { sectionRefs.current[5] = el; }} className="py-24 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div data-animate>
              <span className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase">Vision</span>
            </div>
            <div className="space-y-8">
              <h2 data-animate className="text-3xl md:text-4xl font-light text-white tracking-tight">Vision for Science in Ghana</h2>

              <p data-animate className="text-white/50 text-lg leading-relaxed">
                The College motto: <em className="text-white/60">"Science: the Bedrock of Technology and Socioeconomic Development."</em>
              </p>

              <div data-animate className="border-l-2 border-[#c8a44e]/30 pl-8 py-2">
                <blockquote className="text-white/60 italic text-xl leading-relaxed">
                  "Just as in the advanced and the advancing world, the new generation goes into Science as a matter of choice, our new generation must also get into Science with the passion of the Newtons and the Einsteins. It is the only way we can secure our future."
                </blockquote>
              </div>

              <p data-animate className="text-white/50 text-lg leading-relaxed">
                He has spoken passionately about an alarming trend: students preferring business over the basic sciences. He repeatedly appeals to government to create scholarships and incentives for science students.
              </p>

              <div data-animate className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/5 mt-12">
                {[
                  { val: "227", label: "Students at founding", sub: "1961" },
                  { val: "4,000+", label: "Students by 2010", sub: "18x growth" },
                  { val: "12,000+", label: "Graduates produced", sub: "Since founding" },
                  { val: "10+", label: "Degree programmes", sub: "Across 7 departments" },
                ].map((s, i) => (
                  <div key={i} className="px-4 md:px-6">
                    <div className="text-2xl md:text-3xl font-extralight text-[#c8a44e] mb-1">{s.val}</div>
                    <div className="text-white/45 text-sm">{s.label}</div>
                    <div className="text-white/20 text-xs">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAMILY ── */}
        <section ref={(el) => { sectionRefs.current[6] = el; }} className="py-24 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div data-animate>
              <span className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase">Family</span>
            </div>
            <div className="space-y-8">
              <h2 data-animate className="text-3xl md:text-4xl font-light text-white tracking-tight">Family</h2>
              <p data-animate className="text-white/50 text-lg leading-relaxed">
                Professor Menyeh is married to <span className="text-white/80">Mrs. Adelaide Aboagye</span>, a Principal Technician in the Department of Computer Science at KNUST. Together they have four children: Theodosia, Emmanuel, Godfried, and Elizabeth.
              </p>
              <div data-animate className="border-l-2 border-[#c8a44e]/30 pl-8 py-2">
                <blockquote className="text-white/55 italic text-lg leading-relaxed">
                  "To my wife Adelaide, who has been consistently over the years praying with me for resources to complete this building so that it does not become a white elephant, I say God bless you for the strong faith exhibited."
                </blockquote>
                <p className="text-white/25 text-xs mt-3">From the commissioning speech, June 2010</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── LEGACY ── */}
        <section ref={(el) => { sectionRefs.current[7] = el; }} className="py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div data-animate>
              <span className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase">Legacy</span>
            </div>
            <div className="space-y-8">
              <h2 data-animate className="text-3xl md:text-4xl font-light text-white tracking-tight">A Lasting Legacy</h2>

              <p data-animate className="text-white/50 text-lg leading-relaxed">
                From the village of Asikasu, walking kilometres to school, to becoming one of Ghana's most distinguished geophysicists with over 12,000 reads and 431 citations on ResearchGate &mdash; his journey embodies the aspirations of countless African scholars.
              </p>

              <p data-animate className="text-white/50 text-lg leading-relaxed">
                As founding Editor of the Journal of the Ghana Science Association, past National President, and Foundation Provost who shaped the College of Science, his impact extends far beyond research. The Aboagye Menyeh Complex stands as a permanent reminder of his contributions to KNUST and to science education in West Africa.
              </p>

              <div data-animate className="mt-16 pt-12 border-t border-white/5">
                <blockquote className="text-white/60 italic text-2xl md:text-3xl font-extralight leading-relaxed tracking-tight">
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
