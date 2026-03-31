import { Navigation } from "@/components/Navigation";
import { ChatWidget } from "@/components/ChatWidget";
import { Search, ExternalLink, FileText, Users, Tag, Download, FileDown, Copy, Check, BookOpen } from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Footer } from "@/components/Footer";
import { formatAPA, formatMLA, formatChicago, formatBibTeX } from "@/lib/citationFormatter";
import { toast } from "sonner";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Publication = {
  id: number;
  year: number;
  title: string;
  authors: string;
  journal: string;
  volume: string;
  pages: string;
  citations?: number;
  topic: string;
  doi?: string;
  abstract?: string;
  keywords?: string[];
  fullAuthorList?: string;
};

const publications: Publication[] = [
  { id: 1, year: 2023, title: "Best worst method-based mineral prospectivity modeling over the Central part of the Southern Kibi-Winneba Belt of Ghana", authors: "Forson, E.D., Menyeh, A.", fullAuthorList: "Emmanuel Daanoba Forson, Aboagye Menyeh", journal: "Earth Science Informatics", volume: "", pages: "", citations: 13, topic: "Mineral Exploration", abstract: "This study applies the Best-Worst Method (BWM), a multi-criteria decision-making technique, to mineral prospectivity modeling in the Southern Kibi-Winneba Belt of Ghana. The research integrates geophysical and remote sensing datasets to identify potential gold mineralization zones.", keywords: ["Mineral prospectivity", "Best-worst method", "Gold exploration", "Kibi-Winneba Belt", "Multi-criteria decision analysis"] },
  { id: 2, year: 2021, title: "Mapping lithological units, structural lineaments and alteration zones in the Southern Kibi-Winneba belt of Ghana using integrated geophysical and remote sensing datasets", authors: "Forson, E.D., Menyeh, A., Wemegah, D.D.", journal: "Ore Geology Reviews", volume: "", pages: "", citations: 52, topic: "Mineral Exploration" },
  { id: 3, year: 2021, title: "Potential Exposure Levels from Broadcast Transmitters in Ghana", authors: "Deatanyah, P., Menyeh, A., Amoako, J.K., Abavare, E.K.K., Osei-Donkor, A., Quarshie, E.", journal: "Radiation Protection Dosimetry", volume: "", pages: "1-10", topic: "Environmental Geophysics", doi: "10.1093/rpd/ncab008" },
  { id: 4, year: 2020, title: "Mesothermal gold prospectivity mapping of the southern Kibi-Winneba belt of Ghana based on Fuzzy analytical hierarchy process", authors: "Forson, E.D., Menyeh A., Wemegah, D.D., Danuor, S.K., Adjovu, I., Appiah, I.", journal: "Journal of Applied Geophysics", volume: "174", pages: "103971", topic: "Mineral Exploration" },
  { id: 5, year: 2019, title: "Integrated geophysical study of the Subika Gold Deposit in the Sefwi belt, Ghana", authors: "Takyi-Kyeremeh, K., Wemegah, D.D., Preko, K., Menyeh, A.", journal: "Cogent Geosciences", volume: "5", pages: "1585406", citations: 11, topic: "Mineral Exploration" },
  { id: 6, year: 2019, title: "Interpretation of Geological Structures Hosting Potential Gold Deposits in the Konongo Gold Mine Using Airborne Magnetic, Electromagnetic and Radiometric Datasets", authors: "Brempong, F., Wemegah, D.D., Preko, K., Armah, T., Boadi, B., Menyeh, A., et al.", journal: "Journal of Geoscience and Environment Protection", volume: "7", pages: "203-225", topic: "Mineral Exploration", doi: "10.4236/gep.2019.76016" },
  { id: 7, year: 2019, title: "Evaluation of aquifer characteristics of Voltaian Sedimentary rocks in the Brong Ahafo Region of Ghana", authors: "Mainoo, P.A., Duah, A., Agyekum, W.A., Menyeh, A.", journal: "Ghana Journal of Science", volume: "14(2)", pages: "73-85", topic: "Groundwater Exploration" },
  { id: 8, year: 2018, title: "Analysis of Electric Field Strength and Power Around Selected Mobile Base Stations", authors: "Deatanyah, P., Amoako, J.K., Abavare, E.K.K., Menyeh, A.", journal: "Radiation Protection Dosimetry, Oxford University Press", volume: "", pages: "1-8", topic: "Environmental Geophysics" },
  { id: 9, year: 2018, title: "Public Exposure to Multiple Radio Frequency sources in Ghana", authors: "Deatanyah, P., Abavare, E.K.K., Menyeh, A., Amoako, J.K.", journal: "Radiation Protection Dosimetry, Oxford University Press", volume: "", pages: "1-9", topic: "Environmental Geophysics" },
  { id: 10, year: 2017, title: "Spectral time-domain induced polarisation and magnetic surveying \u2013 an efficient tool for characterisation of solid waste deposits in developing countries", authors: "Wemegah, D.D., Fiandaca, G., Auken, E., Menyeh, A., Danuor, S.K.", journal: "Near Surface Geophysics", volume: "15(1)", pages: "75-84", topic: "Environmental Geophysics" },
  { id: 11, year: 2015, title: "Geophysical Interpretation of Possible Gold Mineralization Zones in Kyerano, South-Western Ghana Using Aeromagnetic and Radiometric Datasets", authors: "Wemegah, D.D., Preko, K., Noye, R.M., Boadi, B., Menyeh, A., Danuor, S.K., Amenyoh, T.", fullAuthorList: "David Dotse Wemegah, Kwasi Preko, Reginald Mensah Noye, Benjamin Boadi, Aboagye Menyeh, Sylvester Kojo Danuor, Thomas Amenyoh", journal: "Journal of Geoscience and Environment Protection", volume: "3", pages: "67-82", topic: "Mineral Exploration", abstract: "This study integrates aeromagnetic and radiometric datasets to identify potential gold mineralization zones in the Kyerano area of South-Western Ghana.", keywords: ["Gold exploration", "Aeromagnetic survey", "Radiometric survey", "Kyerano", "Ghana"] },
  { id: 12, year: 2015, title: "Qualitative Interpretation of Aerogravity and Aeromagnetic Survey Data over the South western part of the Volta Basin of Ghana", authors: "Hinson, G., Menyeh, A., Wemegah, D.D.", journal: "International Journal of Scientific & Technology Research", volume: "4(4)", pages: "23-30", topic: "Geophysical Surveys" },
  { id: 13, year: 2015, title: "Electromagnetic Method and Vertical Electrical Sounding for Groundwater Potential Assessment of Kintampo North Municipality of Ghana", authors: "Anechana, R., Noye, R.M., Menyeh, A., Manu, E., Okrah, C.", journal: "Journal of Environment and Earth Science", volume: "5(12)", pages: "9-16", topic: "Groundwater Exploration" },
  { id: 14, year: 2013, title: "Prospecting for Groundwater in the Bawku West District of the Upper East Region of Ghana Using the Electromagnetic and Vertical Electrical Sounding Methods", authors: "Kyere, C.A., Noye, R.M., Menyeh, A.", journal: "Journal of the Ghana Science Association", volume: "15(1)", pages: "72-84", topic: "Groundwater Exploration" },
  { id: 15, year: 2013, title: "Geo-Electrical Investigation of Groundwater Resources and Aquifer Characteristics in some small Communities in the Gushiegu and Karaga Districts of Northern Ghana", authors: "Van-Dycke, S.A., Menyeh, A.", journal: "International Journal of Scientific & Technology Research", volume: "2(3)", pages: "", topic: "Groundwater Exploration" },
  { id: 16, year: 2012, title: "A study of Sediment Magnetic Mineralogy in Lake Bosomtwe, Ghana: Indications of depositional environment and Paleoclimate", authors: "Dzirasah, W., Danuor, S.K., Menyeh, A., Peck, J.E.", journal: "European Journal of Scientific Research", volume: "82(1)", pages: "95-114", topic: "Lake Bosumtwi Studies" },
  { id: 17, year: 2012, title: "Evaluation of Aquifer Charactersistics of Voltaian Sedimentary Rocks in the Brong Ahafo Region of Ghana", authors: "Mainoo, P.A., Duah, A., Agyekum, W.A., Menyeh, A.", journal: "Journal of the Ghana Science Association", volume: "14(2)", pages: "73-85", topic: "Groundwater Exploration" },
  { id: 18, year: 2008, title: "Nitrate contamination Groundwater at Farmlands in Nsawam, Ghana: The Role of Fractures from Azimuthal Restivity Surveys", authors: "Boadu, K.F., Owusu-Nimo, F., Menyeh, A.", journal: "Journal of Environmental and Engineering Geophysics", volume: "13(1)", pages: "27-37", topic: "Environmental Geophysics" },
  { id: 19, year: 2008, title: "Exploring the linkages between geotechnical properties and geophysical responses of unconsolidated materials \u2013 laboratory measurements", authors: "Boadu, F.K., Owusu-Nimo, F., Menyeh, A.", journal: "Symposium of the Application of Geophysics to Engineering and Environmental Problems, Philadelphia", volume: "", pages: "264-274", topic: "Geophysical Methods" },
  { id: 20, year: 2007, title: "Results of pre-drilling potential field measurements at the Bosumtwi Crater", authors: "Danuor, S.K., Menyeh, A.", journal: "Meteoritics & Planetary Science", volume: "42(4/5)", pages: "541-547", topic: "Lake Bosumtwi Studies" },
  { id: 21, year: 2007, title: "Anisotropy and Pressure Dependence of the Compressional Wave Velocity of Suevites from the Bosumtwi Impact Crater, Ghana", authors: "Danuor, S.K., Menyeh, A., Berckhemer, H.", journal: "European Journal of Scientific Research", volume: "18(2)", pages: "240-249", topic: "Lake Bosumtwi Studies" },
  { id: 22, year: 2005, title: "Prospecting for groundwater in the Voltaian sedimentary basin of the Gushiegu-Karaga District of the Northern Region of Ghana, using the Electromagnetic Method", authors: "Menyeh, A., Noye, R., Danuor, S.", journal: "Journal of Science and Technology, KNUST", volume: "25(2)", pages: "53-65", topic: "Groundwater Exploration" },
  { id: 23, year: 2004, title: "Preliminary results of soil radon gas survey of the lake Bosumtwi impact crater", authors: "Preko, K., Danuor, S.K., Menyeh, A.", journal: "Journal of the Ghana Science Association", volume: "6(1)", pages: "156-172", topic: "Lake Bosumtwi Studies" },
  { id: 24, year: 2002, title: "Groundwater prospecting in the Sekyere-West District using the Electromagnetic Method", authors: "Ampong, K., Aning, A.A., Menyeh, A., Danuor, S.K.", journal: "Journal of the Ghana Science Association", volume: "4(1)", pages: "70-77", topic: "Groundwater Exploration" },
  { id: 25, year: 2000, title: "Magnetic properties of synthetic analogues of pyrrhotite ore in the grain size range 1-24 \u00B5m", authors: "O'Reilly, W., Hoffmann, V., Chouker, A.C., Soffel, H.C., Menyeh, A.", fullAuthorList: "William O'Reilly, Valerian Hoffmann, A. C. Chouker, Heinrich C. Soffel, Aboagye Menyeh", journal: "Geophysical Journal International", volume: "142", pages: "669-683", citations: 45, topic: "Mineral Magnetism", abstract: "This comprehensive study examines the magnetic properties of synthetic pyrrhotite analogues across a grain size range of 1-24 micrometers.", keywords: ["Pyrrhotite", "Grain size", "Magnetic properties", "Synthetic analogues", "Ore deposits"] },
  { id: 26, year: 2000, title: "Electrical resistivity of quartzite obtained from the gold-belt of the Tarkwaian rock formation in South\u2013Western Ghana", authors: "Menyeh, A.", journal: "Journal of the Ghana Science Association", volume: "2(2)", pages: "114-120", topic: "Rock Properties" },
  { id: 27, year: 1999, title: "The coercive force of fine particles of monoclinic pyrrhotite (Fe7S8), between 77 K and 600 K", authors: "Menyeh, A., O'Reilly, W.", journal: "Journal of the Ghana Science Association", volume: "1(2)", pages: "90-99", topic: "Mineral Magnetism" },
  { id: 28, year: 1998, title: "Thermoremanent magnetization in multidomain monoclinic pyrrhotite (Fe7S8)", authors: "Menyeh, A., O'Reilly, W.", journal: "Geophysical Research Letters", volume: "25", pages: "3461-3464", citations: 38, topic: "Mineral Magnetism" },
  { id: 29, year: 1998, title: "Inference of domain structure at elevated temperature in fine particles of monoclinic Pyrrhotite (Fe7S8)", authors: "Menyeh, A., O'Reilly, W.", journal: "Journal of the Ghana Science Association", volume: "1(1)", pages: "118-125", topic: "Mineral Magnetism" },
  { id: 30, year: 1997, title: "Magnetic hysteresis properties of monoclinic pyrrhotite (Fe7S8)", authors: "Menyeh, A., O'Reilly, W.", journal: "Journal of Geomagnetism and Geoelectricity", volume: "49", pages: "965-976", citations: 42, topic: "Mineral Magnetism" },
  { id: 31, year: 1997, title: "Experimental study of some physical properties of the Tarkwa Quartzite", authors: "Menyeh, A.", journal: "Ghana Mining Journal", volume: "3", pages: "83-89", topic: "Rock Properties" },
  { id: 32, year: 1996, title: "Thermoremanent magnetization in monodomain monoclinic pyrrhotite (Fe7S8)", authors: "Menyeh, A., O'Reilly, W.", fullAuthorList: "Aboagye Menyeh, William O'Reilly", journal: "Journal of Geophysical Research", volume: "101", pages: "25045-25051", citations: 67, topic: "Mineral Magnetism", abstract: "We present experimental results on thermoremanent magnetization (TRM) acquisition in monodomain monoclinic pyrrhotite particles.", keywords: ["Thermoremanent magnetization", "TRM", "Monoclinic pyrrhotite", "Monodomain particles"] },
  { id: 33, year: 1996, title: "A comparative study of matrix effect at elevated temperature on the magnetic hysteresis properties of monoclinic pyrrhotite (Fe7S8)", authors: "Menyeh, A.", journal: "Journal of the University of Science and Technology, Kumasi", volume: "16", pages: "89-93", topic: "Mineral Magnetism" },
  { id: 34, year: 1995, title: "The coercive force of fine particles of monoclinic pyrrhotite (Fe7S8) studied at elevated temperature", authors: "Menyeh, A., O'Reilly, W.", journal: "Physics of the Earth & Planetary Interiors", volume: "89", pages: "51-62", citations: 55, topic: "Mineral Magnetism" },
  { id: 35, year: 1991, title: "The magnetization process in monoclinic pyrrhotite (Fe7S8) particles containing few domains", authors: "Menyeh, A., O'Reilly, W.", fullAuthorList: "Aboagye Menyeh, William O'Reilly", journal: "Geophysical Journal International", volume: "104", pages: "387-399", citations: 89, topic: "Mineral Magnetism", abstract: "This pioneering study investigates the magnetization process in monoclinic pyrrhotite (Fe\u2087S\u2088) particles containing few magnetic domains.", keywords: ["Monoclinic pyrrhotite", "Fe7S8", "Magnetic domains", "Magnetization process", "Rock magnetism"] },
  { id: 36, year: 1990, title: "Electrical properties of some Ghanaian metamorphic rocks", authors: "Menyeh, A., Ahwireng, T.N., Tzidzi, K.E.N.", journal: "Journal of University of Science & Technology, Kumasi", volume: "10", pages: "121-125", topic: "Rock Properties" },
];

export default function Publications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("year-desc");
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  const years = useMemo(() => Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a), []);
  const topics = useMemo(() => Array.from(new Set(publications.map((p) => p.topic))).sort(), []);

  const filteredPublications = useMemo(() => {
    let filtered = publications.filter((pub) => {
      const matchesSearch = searchQuery === "" || pub.title.toLowerCase().includes(searchQuery.toLowerCase()) || pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) || pub.journal.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear = selectedYear === "all" || pub.year.toString() === selectedYear;
      const matchesTopic = selectedTopic === "all" || pub.topic === selectedTopic;
      return matchesSearch && matchesYear && matchesTopic;
    });
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "year-desc": return b.year - a.year;
        case "year-asc": return a.year - b.year;
        case "citations": return (b.citations || 0) - (a.citations || 0);
        case "title": return a.title.localeCompare(b.title);
        default: return 0;
      }
    });
    return filtered;
  }, [searchQuery, selectedYear, selectedTopic, sortBy]);

  const totalCitations = publications.reduce((sum, pub) => sum + (pub.citations || 0), 0);

  useEffect(() => {
    if (!heroRef.current) return;
    const els = heroRef.current.querySelectorAll("[data-animate]");
    gsap.fromTo(els, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.1 });
    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, []);

  function copyCitation(format: string, formatter: (p: any) => string) {
    if (!selectedPublication) return;
    const citation = formatter({
      title: selectedPublication.title,
      authors: selectedPublication.fullAuthorList || selectedPublication.authors,
      year: selectedPublication.year,
      journal: selectedPublication.journal,
      volume: selectedPublication.volume,
      pages: selectedPublication.pages,
      doi: selectedPublication.doi,
    });
    navigator.clipboard.writeText(citation);
    setCopiedCitation(format);
    setTimeout(() => setCopiedCitation(null), 2000);
    toast.success(`${format} citation copied`);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#050d1a]">
      <Navigation />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative pt-32 pb-16 border-b border-white/5">
        <div className="max-w-[1100px] mx-auto px-6">
          <p data-animate className="text-[#c8a44e] text-xs tracking-[0.3em] uppercase mb-4">Research Output</p>
          <h1 data-animate className="text-5xl md:text-7xl font-light text-white tracking-tight leading-[1.1] mb-6">
            Publications
          </h1>
          <p data-animate className="text-white/40 text-lg max-w-xl font-light leading-relaxed mb-16">
            {publications.length}+ peer-reviewed papers spanning four decades of geophysical research.
          </p>

          {/* Stats row */}
          <div data-animate className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/5">
            {[
              { val: publications.length.toString(), label: "Publications" },
              { val: "517+", label: "Citations" },
              { val: "12", label: "h-index" },
              { val: "33", label: "Years Active" },
            ].map((s, i) => (
              <div key={i} className="px-4 md:px-6 first:pl-0">
                <div className="text-3xl md:text-4xl font-extralight text-white mb-1">{s.val}</div>
                <div className="text-white/25 text-xs tracking-wider uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-[1100px] mx-auto px-6 py-12">
        {/* ── SEARCH & FILTERS ── */}
        <div className="mb-12 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25" />
            <input
              type="text"
              placeholder="Search by title, author, or journal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/5 rounded-lg pl-11 pr-4 py-3.5 text-white/80 text-sm placeholder:text-white/20 focus:outline-none focus:border-[#c8a44e]/30 transition-colors"
            />
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-white/[0.03] border border-white/5 rounded-lg px-4 py-2.5 text-white/60 text-sm focus:outline-none focus:border-[#c8a44e]/30 appearance-none cursor-pointer"
            >
              <option value="all">All Years</option>
              {years.map((y) => <option key={y} value={y.toString()}>{y}</option>)}
            </select>

            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="bg-white/[0.03] border border-white/5 rounded-lg px-4 py-2.5 text-white/60 text-sm focus:outline-none focus:border-[#c8a44e]/30 appearance-none cursor-pointer"
            >
              <option value="all">All Topics</option>
              {topics.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            <div className="flex-1" />

            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-white/20 mr-2">Sort:</span>
              {[
                { key: "year-desc", label: "Newest" },
                { key: "year-asc", label: "Oldest" },
                { key: "citations", label: "Citations" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSortBy(opt.key)}
                  className={`px-3 py-1.5 rounded-full transition-colors ${
                    sortBy === opt.key
                      ? "bg-[#c8a44e]/15 text-[#c8a44e]"
                      : "text-white/30 hover:text-white/50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-white/20 text-sm">
            {filteredPublications.length} of {publications.length} publications
          </div>
        </div>

        {/* ── PUBLICATIONS LIST ── */}
        <div className="space-y-0 divide-y divide-white/5">
          {filteredPublications.map((pub) => (
            <div
              key={pub.id}
              className="group py-6 cursor-pointer hover:bg-white/[0.01] -mx-4 px-4 rounded-lg transition-colors"
              onClick={() => setSelectedPublication(pub)}
            >
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-[#c8a44e]/40 text-xs font-mono shrink-0 w-10">{pub.year}</span>
                <span className="text-white/15 text-xs shrink-0">{pub.topic}</span>
                {pub.citations && (
                  <span className="text-white/20 text-xs">{pub.citations} cited</span>
                )}
              </div>
              <h3 className="text-white/75 text-base font-light leading-relaxed group-hover:text-white/90 transition-colors mb-2 ml-14">
                {pub.title}
              </h3>
              <div className="ml-14 flex flex-wrap items-center gap-x-3 text-xs text-white/30">
                <span>{pub.authors}</span>
                <span className="w-1 h-1 rounded-full bg-white/10" />
                <span className="italic">{pub.journal}</span>
                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c8a44e]/40 hover:text-[#c8a44e]/70 inline-flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-3 w-3" />
                    DOI
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPublications.length === 0 && (
          <div className="text-center py-24">
            <BookOpen className="h-12 w-12 text-white/10 mx-auto mb-4" />
            <p className="text-white/30">No publications match your search.</p>
          </div>
        )}

        {/* ── RESEARCH IMPACT ── */}
        <section className="mt-24 pt-16 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <span className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase">Impact</span>
            <div className="space-y-8">
              <h2 className="text-3xl font-light text-white tracking-tight">Research Impact</h2>
              <p className="text-white/45 text-lg leading-relaxed">
                Over three decades of contributions to mineral magnetism, geophysical exploration, and environmental geophysics. His pioneering work on monoclinic pyrrhotite has been cited extensively, establishing him as a leading authority in rock and mineral magnetism.
              </p>
            </div>
          </div>
        </section>

        {/* ── CITED IN ── */}
        <section className="mt-16 pt-12 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <span className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase">Cited In</span>
            <div>
              <h2 className="text-2xl font-light text-white tracking-tight mb-8">Major Reference Works</h2>
              <div className="space-y-0 divide-y divide-white/5">
                {[
                  { title: "Encyclopedia of Geomagnetism and Paleomagnetism", pub: "David Gubbins & Emilio Herrero-Bervera, Springer, 2007" },
                  { title: "Rock Magnetism: Fundamentals and Frontiers", pub: "David J. Dunlop & Ozden Ozdemir, Cambridge University Press, 2001" },
                  { title: "A Low Temperature Transfer of ALH84001 from Mars to Earth", pub: "JSTOR \u2014 Research on the Mars meteorite" },
                  { title: "Science Magazine Supplemental Material", pub: "Weiss et al. \u2014 Coercivity function measurements" },
                  { title: "Magnetic Paleointensities of Meteorites", pub: "NASA/ADS \u2014 Lunar and Planetary Institute" },
                  { title: "Magnetic Properties of Synthetic Pyrrhotite Ore", pub: "Geophysical Journal International \u2014 Oxford Academic" },
                ].map((ref, i) => (
                  <div key={i} className="py-4">
                    <h3 className="text-white/70 text-sm font-medium">{ref.title}</h3>
                    <p className="text-white/25 text-xs mt-1">{ref.pub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── DOWNLOADS ── */}
        <section className="mt-16 pt-12 border-t border-white/5 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <span className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase">Downloads</span>
            <div>
              <h2 className="text-2xl font-light text-white tracking-tight mb-8">Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5">
                {[
                  { icon: FileDown, title: "Curriculum Vitae", desc: "Complete CV, 8 pages", href: "/downloads/cv_aboagye_menyeh.pdf" },
                  { icon: BookOpen, title: "Publication List", desc: "Chronological, 6 pages", href: "/downloads/publication_list.pdf" },
                  { icon: FileText, title: "Biography", desc: "Detailed summary, 7 pages", href: "/downloads/biographical_summary.pdf" },
                ].map((dl, i) => (
                  <a key={i} href={dl.href} download className="group block py-6 md:py-0 px-0 md:px-8 first:pl-0 last:pr-0">
                    <dl.icon className="h-5 w-5 text-white/20 group-hover:text-[#c8a44e]/60 transition-colors mb-3" />
                    <h3 className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">{dl.title}</h3>
                    <p className="text-white/25 text-xs mt-1">{dl.desc}</p>
                    <div className="mt-3 flex items-center gap-1.5 text-[#c8a44e]/40 text-xs group-hover:text-[#c8a44e]/70 transition-colors">
                      <Download className="h-3 w-3" />
                      PDF
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── PUBLICATION DETAIL MODAL ── */}
      <Dialog open={!!selectedPublication} onOpenChange={() => setSelectedPublication(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-[#0a1628] border-white/10 text-white">
          {selectedPublication && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#c8a44e]/60 text-xs font-mono">{selectedPublication.year}</span>
                  <span className="text-white/20 text-xs">{selectedPublication.topic}</span>
                  {selectedPublication.citations && (
                    <span className="text-white/20 text-xs">{selectedPublication.citations} citations</span>
                  )}
                </div>
                <DialogTitle className="text-xl font-light leading-relaxed text-white/90">
                  {selectedPublication.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div>
                  <p className="text-white/25 text-xs uppercase tracking-wider mb-2">Authors</p>
                  <p className="text-white/60 text-sm">{selectedPublication.fullAuthorList || selectedPublication.authors}</p>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <p className="text-white/25 text-xs uppercase tracking-wider mb-2">Journal</p>
                  <p className="text-white/60 text-sm italic">
                    {selectedPublication.journal}
                    {selectedPublication.volume && `, ${selectedPublication.volume}`}
                    {selectedPublication.pages && `, pp. ${selectedPublication.pages}`}
                  </p>
                  {selectedPublication.doi && (
                    <a href={`https://doi.org/${selectedPublication.doi}`} target="_blank" rel="noopener noreferrer" className="text-[#c8a44e]/50 hover:text-[#c8a44e] text-xs inline-flex items-center gap-1 mt-2">
                      <ExternalLink className="h-3 w-3" /> {selectedPublication.doi}
                    </a>
                  )}
                </div>

                {selectedPublication.abstract && (
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-white/25 text-xs uppercase tracking-wider mb-2">Abstract</p>
                    <p className="text-white/50 text-sm leading-relaxed">{selectedPublication.abstract}</p>
                  </div>
                )}

                {selectedPublication.keywords && selectedPublication.keywords.length > 0 && (
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-white/25 text-xs uppercase tracking-wider mb-2">Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPublication.keywords.map((kw, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-full border border-white/10 text-white/40 text-xs">{kw}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-white/5 pt-4">
                  <p className="text-white/25 text-xs uppercase tracking-wider mb-3">Cite</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "APA 7th", key: "APA", fn: formatAPA },
                      { label: "MLA 9th", key: "MLA", fn: formatMLA },
                      { label: "Chicago 17th", key: "Chicago", fn: formatChicago },
                      { label: "BibTeX", key: "BibTeX", fn: formatBibTeX },
                    ].map((fmt) => (
                      <button
                        key={fmt.key}
                        onClick={() => copyCitation(fmt.key, fmt.fn)}
                        className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-white/5 hover:border-[#c8a44e]/20 text-white/50 hover:text-white/80 text-sm transition-colors"
                      >
                        {fmt.label}
                        {copiedCitation === fmt.key ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <ChatWidget />
      <Footer />
    </div>
  );
}
