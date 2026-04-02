export type SearchResult = {
  id: string;
  title: string;
  description: string;
  category: "Publication" | "Biography" | "Research" | "Award" | "Testimonial" | "General" | "Speech";
  url: string;
  keywords: string[];
  content: string;
};

export const searchIndex: SearchResult[] = [
  // Research Focus Content
  {
    id: "research-pyrrhotite",
    title: "Monoclinic Pyrrhotite Research",
    description: "Pioneering work on the magnetic properties of monoclinic pyrrhotite (Fe₇S₈)",
    category: "Research",
    url: "/",
    keywords: ["pyrrhotite", "Fe7S8", "mineral magnetism", "magnetic properties", "domain structures"],
    content: "Professor Menyeh's doctoral research on monoclinic pyrrhotite (Fe₇S₈) opened new frontiers in understanding magnetic materials. His experimental studies revealed fundamental insights into domain structures, coercive force mechanisms, and magnetization processes. His 1991 paper in Geophysical Journal International has been cited over 120 times and remains a foundational reference in the field.",
  },
  {
    id: "research-mineral-exploration",
    title: "Mineral Exploration",
    description: "Geophysical exploration for gold and mineral deposits in Ghana",
    category: "Research",
    url: "/",
    keywords: ["gold exploration", "mineral prospecting", "aeromagnetic", "radiometric", "Kyerano", "Sefwi", "Kibi-Winneba"],
    content: "Applying aeromagnetic, radiometric, and gravity surveys to delineate gold-bearing ore bodies in the Kyerano and Sefwi belts, and across the Kibi-Winneba belt of Ghana. 8 publications in mineral exploration.",
  },
  {
    id: "research-groundwater",
    title: "Groundwater Exploration",
    description: "Geophysical methods for locating sustainable water sources in rural Ghana",
    category: "Research",
    url: "/",
    keywords: ["groundwater", "borehole", "electrical resistivity", "water", "rural communities", "Volta Region"],
    content: "Using electrical resistivity, electromagnetic methods, and borehole geophysics to locate sustainable water sources for rural communities across Ghana. 7 publications in groundwater exploration.",
  },
  {
    id: "research-environmental",
    title: "Environmental Geophysics",
    description: "Contaminant mapping and environmental risk assessment using geophysical techniques",
    category: "Research",
    url: "/",
    keywords: ["environmental geophysics", "contaminant", "induced polarisation", "solid waste", "mining", "pollution"],
    content: "Mapping contaminant plumes, characterising solid waste deposits using spectral time-domain induced polarisation, and assessing environmental risks from mining and industrial activities. 5 publications in environmental geophysics.",
  },
  
  // Biography Content
  {
    id: "bio-early-life",
    title: "Early Life and Education",
    description: "Born in Abiriw, Akwapim; grew up in Asikasu village; educated at KNUST with two Commonwealth Scholarships",
    category: "Biography",
    url: "/biography",
    keywords: ["Abiriw", "Akwapim", "Asikasu", "Asankrangwa", "Adisadel", "Jumapo", "Commonwealth Scholarship", "Newcastle upon Tyne", "education", "Prempeh"],
    content: "Born to Opanyin Kwasi Menyeh and Madam Rosina Amma Okyerebea, natives of Abiriw, Akwapim. Grew up in Asikasu village near Koforidua. Attended Asikasu Presbyterian School and Jumapo Methodist Middle School (distinction in MSLCE, 1967). Asankrangwa Secondary School (Cocoa Board Scholar, Division One). Adisadel College for A-Level. B.Sc. Physics from KNUST (1980, Second Upper), M.Sc. and Ph.D. from Newcastle upon Tyne on two Commonwealth Scholarships.",
  },
  {
    id: "bio-career-progression",
    title: "Academic Career Progression",
    description: "44-year journey from Teaching Assistant to Full Professor at KNUST",
    category: "Biography",
    url: "/biography",
    keywords: ["career", "professor", "KNUST", "promotion", "academic advancement"],
    content: "Teaching Assistant (1980-1982), Assistant Lecturer (1984-1987), Lecturer (1991-1995), Senior Lecturer (1995-2000), Associate Professor (2000-2008), Professor (2008-Present). Achieved highest academic rank through internal promotion based on research excellence and teaching quality.",
  },
  {
    id: "bio-provost",
    title: "Foundation Provost of College of Science",
    description: "Transformative leadership as Foundation Provost (2004-2010)",
    category: "Biography",
    url: "/biography",
    keywords: ["Provost", "College of Science", "leadership", "administration", "transformation"],
    content: "Served as Foundation Provost of College of Science (2004-2010), leading transformation from Faculty structure. Secured over $800,000 in funding, established international partnerships, and oversaw infrastructure development including the building later named in his honor.",
  },

  // Awards Content
  {
    id: "award-complex-naming",
    title: "Aboagye Menyeh Complex Naming",
    description: "College of Science building named in his honor (2015)",
    category: "Award",
    url: "/awards",
    keywords: ["Aboagye Menyeh Complex", "building naming", "honor", "legacy", "2015"],
    content: "In 2015, KNUST's College of Science officially named its main building the 'Aboagye Menyeh Complex' in recognition of his transformative contributions as Foundation Provost. The Complex houses the Departments of Physics, Chemistry, Mathematics, and Statistics.",
  },
  {
    id: "award-commonwealth",
    title: "Commonwealth Scholarship",
    description: "Prestigious UK government scholarship for doctoral studies (1987-1991)",
    category: "Award",
    url: "/awards",
    keywords: ["Commonwealth Scholarship", "UK", "doctoral studies", "1987", "Newcastle"],
    content: "Awarded prestigious Commonwealth Scholarship by UK government for doctoral studies at University of Newcastle upon Tyne (1987-1991), studying under Prof. William O'Reilly.",
  },
  {
    id: "award-professorship",
    title: "Promotion to Full Professor",
    description: "Achieved highest academic rank in 2008",
    category: "Award",
    url: "/awards",
    keywords: ["professor", "promotion", "2008", "academic rank", "achievement"],
    content: "Promoted to Full Professor in 2008 in recognition of outstanding research contributions, teaching excellence, and institutional service. Represents culmination of 28-year progression from Teaching Assistant.",
  },
  {
    id: "award-dean",
    title: "Dean of Faculty of Science",
    description: "Last Dean before College transformation (2001-2004)",
    category: "Award",
    url: "/awards",
    keywords: ["Dean", "Faculty of Science", "2001", "leadership", "administration"],
    content: "Served as Dean of Faculty of Science (2001-2004), the last Dean before transition to College system. Prepared groundwork for structural transformation and strengthened research capacity.",
  },

  // Teaching & Vision
  {
    id: "bio-teaching-philosophy",
    title: "Teaching & Mentorship Philosophy",
    description: "Making physics interesting, mentoring geophysicists, building capacity",
    category: "Biography",
    url: "/biography",
    keywords: ["teaching", "mentorship", "philosophy", "physics", "students", "geophysics", "no regrets"],
    content: "Prof. Menyeh's teaching philosophy centres on making physics interesting rather than boring. He says 'I will categorically say I have no regrets whatsoever!' about his career choice. The Geophysics Section he built from scratch has trained more lecturers than any other section under Physics. His guiding adage: 'What is worth doing is worth doing well.'",
  },
  {
    id: "bio-vision-science",
    title: "Vision for Science in Ghana",
    description: "Creating a Science Culture, advocacy for science education and scholarships",
    category: "Biography",
    url: "/biography",
    keywords: ["vision", "science culture", "Ghana", "scholarships", "advocacy", "Newton", "Einstein"],
    content: "College motto: 'Science: the Bedrock of Technology and Socioeconomic Development.' Prof. Menyeh advocates for creating a Science Culture in Ghana and appeals for government scholarships for science students. 'Our new generation must get into Science with the passion of the Newtons and the Einsteins.'",
  },
  {
    id: "bio-college-stats",
    title: "College of Science Institutional History",
    description: "Growth from 227 students in 1961 to 4,000+ by 2010, 12,000+ graduates",
    category: "General",
    url: "/biography",
    keywords: ["College of Science", "history", "students", "graduates", "enrolment", "growth", "1961"],
    content: "College of Science founded 1961 with 227 students, grew to nearly 4,000 by 2009/2010. Over 12,000 graduates produced. 11 programmes across 7 departments. Female enrolment ~40% in Biosciences, ~20% in Physical Sciences. New programmes introduced: Food Science, Environmental Science, Actuarial Science, Meteorology & Climate Science, Polymer Science, Financial Mathematics.",
  },
  {
    id: "speech-career-prospects",
    title: "Career Prospects for Science Graduates",
    description: "Comprehensive career paths for scientists from KNUST College of Science",
    category: "Speech",
    url: "/speeches",
    keywords: ["career", "prospects", "jobs", "scientists", "CSIR", "GNPC", "mining", "WHO", "employment"],
    content: "Career prospects for science graduates include: All Sector Ministries, CSIR (13 institutes), GNPC, Civil Aviation, Armed Forces, Water Companies, EPA, Ghana Standards Board, Mining/Energy industries, Ghana Meteorological Services, Financial Institutions, WHO/UNESCO/UNICEF. The list is endless.",
  },

  // Publications - Selected Key Papers
  {
    id: "pub-1991-magnetization",
    title: "The magnetisation process in monoclinic pyrrhotite (Fe₇S₈) particles",
    description: "Landmark 1991 paper with 120+ citations",
    category: "Publication",
    url: "/publications",
    keywords: ["monoclinic pyrrhotite", "magnetization", "1991", "Geophysical Journal International", "domain structures"],
    content: "Menyeh, A., & O'Reilly, W. (1991). The magnetisation process in monoclinic pyrrhotite (Fe₇S₈) particles containing few domains. Geophysical Journal International, 104(2), 387-399. Most cited work with 120+ citations.",
  },
  {
    id: "pub-1995-hysteresis",
    title: "Magnetic hysteresis properties of fine particles of monoclinic pyrrhotite",
    description: "1995 paper with 95+ citations",
    category: "Publication",
    url: "/publications",
    keywords: ["magnetic hysteresis", "pyrrhotite", "1995", "fine particles", "coercivity"],
    content: "Menyeh, A., & O'Reilly, W. (1995). Magnetic hysteresis properties of fine particles of monoclinic pyrrhotite Fe₇S₈. Journal of Geomagnetism and Geoelectricity, 47(2), 173-184. Second most cited work.",
  },
  {
    id: "pub-2023-mineral-prospectivity",
    title: "Mineral prospectivity mapping of gold mineralization in Kibi-Winneba belt",
    description: "Recent 2023 research on gold exploration in Ghana",
    category: "Publication",
    url: "/publications",
    keywords: ["gold", "mineral prospectivity", "Kibi-Winneba", "Ghana", "2023", "Fuzzy AHP"],
    content: "Forson, E. D., Menyeh, A., Wemegah, D. D., Preko, K., & Manu, E. (2023). Mineral prospectivity mapping of gold mineralization in the Kibi-Winneba belt of Ghana. Heliyon, 9(5), e15641.",
  },
  {
    id: "pub-2023-geophysical-solid-waste",
    title: "Spectral time-domain induced polarisation for solid waste characterisation",
    description: "2023 environmental geophysics research",
    category: "Publication",
    url: "/publications",
    keywords: ["induced polarization", "solid waste", "environmental geophysics", "2023", "developing countries"],
    content: "Wemegah, D. D., Fiandaca, G., Auken, E., Menyeh, A., & Danuor, S. K. (2023). Spectral time-domain induced polarisation and magnetic surveying for characterisation of solid waste deposits in developing countries. Near Surface Geophysics.",
  },

  // Testimonials
  {
    id: "testimonial-wemegah",
    title: "Dr. David Dotse Wemegah - Former Ph.D. Student",
    description: "Testimonial from former student, now Lecturer at KNUST",
    category: "Testimonial",
    url: "/testimonials",
    keywords: ["student", "mentorship", "David Wemegah", "Ph.D.", "guidance"],
    content: "Professor Menyeh's mentorship transformed my approach to scientific research. His patience, rigorous thinking, and emphasis on practical applications shaped my career. He didn't just teach geophysics—he taught us how to think like scientists and contribute to Ghana's development.",
  },
  {
    id: "testimonial-oreilly",
    title: "Prof. William O'Reilly - Ph.D. Supervisor",
    description: "Testimonial from doctoral supervisor at Newcastle",
    category: "Testimonial",
    url: "/testimonials",
    keywords: ["William O'Reilly", "supervisor", "Newcastle", "collaboration", "research excellence"],
    content: "Aboagye was an exceptional doctoral student whose work on monoclinic pyrrhotite opened new avenues in mineral magnetism. His experimental skills, theoretical insights, and dedication to understanding fundamental processes made our collaboration immensely productive.",
  },
  {
    id: "testimonial-colleague",
    title: "Prof. Kwasi Preko - KNUST Colleague",
    description: "Testimonial from Physics Department colleague",
    category: "Testimonial",
    url: "/testimonials",
    keywords: ["colleague", "KNUST", "Physics Department", "leadership", "mentor"],
    content: "Professor Menyeh's leadership as Provost transformed the College of Science. His vision, strategic thinking, and commitment to excellence created lasting institutional change. As a colleague, his mentorship and collaborative spirit continue to inspire us.",
  },

  // Speeches Content
  {
    id: "speech-commissioning",
    title: "Science Building Complex Commissioning Speech",
    description: "Historic address at the commissioning of the building later named in his honor (June 2010)",
    category: "Speech",
    url: "/speeches",
    keywords: ["commissioning", "Science Building", "GETFund", "2010", "speech", "Aboagye Menyeh Complex"],
    content: "Address delivered at the commissioning of the Science Building Complex on June 28, 2010. Prof. Menyeh proposed this building at his very first Faculty Board meeting in 2001. The project was funded by GETFund, took 7 years to complete, and was later named the Aboagye Menyeh Complex in 2015.",
  },
  {
    id: "speech-technocrat",
    title: "Technocrat Magazine Interview",
    description: "Comprehensive autobiographical interview covering family, education, and career (October 2009)",
    category: "Speech",
    url: "/speeches",
    keywords: ["Technocrat", "interview", "Asikasu", "family", "patriotism", "Agege", "autobiography"],
    content: "A detailed first-person interview covering his family background in Abiriw, childhood in Asikasu village, the Prempeh College story, journey to Asankrangwa, career at KNUST, research on pyrrhotite, patriotism during the Agege Craze, and his philosophy of service.",
  },
  {
    id: "speech-turnkey",
    title: "Turnkey Laboratory Modernisation Project",
    description: "Commissioning of €5.44M lab modernisation across 22 laboratories (2009)",
    category: "Speech",
    url: "/speeches",
    keywords: ["Turnkey", "laboratory", "modernisation", "equipment", "Physics", "Chemistry"],
    content: "Speech on the modernisation of 22 laboratories at approximately €5.44 million (US$8.1 million). Covered Physics, Chemistry, Biology, and Optometry labs, bringing them to international standards with new equipment, benches, networking, and air conditioning.",
  },

  // Additional Awards
  {
    id: "award-gsa",
    title: "Ghana Science Association Leadership",
    description: "Founding Editor of Journal, National President, and current Patron of GSA",
    category: "Award",
    url: "/awards",
    keywords: ["GSA", "Ghana Science Association", "editor", "president", "patron", "journal"],
    content: "Founding Editor-in-Chief of Journal of the GSA (1998), National Secretary (1996-97), National President (2001-2003), and current Patron. Instrumental in establishing Ghana's premier scientific journal and advocating for science-friendly national policies.",
  },
  {
    id: "award-citations-reference",
    title: "Research Cited in Major Reference Works",
    description: "Work cited in Encyclopedia of Geomagnetism, Rock Magnetism, Science Magazine, and more",
    category: "Award",
    url: "/publications",
    keywords: ["Encyclopedia", "Geomagnetism", "Rock Magnetism", "Science Magazine", "JSTOR", "NASA", "citations"],
    content: "Research cited in Encyclopedia of Geomagnetism and Paleomagnetism (Springer, 2007), Rock Magnetism: Fundamentals and Frontiers (Cambridge UP, 2001), Science Magazine, JSTOR Mars meteorite research, and NASA/ADS. Over 12,000 reads and 431 citations on ResearchGate.",
  },

  // Book
  {
    id: "book-raised-to-walk",
    title: "Raised to Walk, Raised to Praise",
    description: "Prof. Menyeh's personal testimony of surgery, faith, and miraculous recovery",
    category: "General",
    url: "/book",
    keywords: ["book", "raised to walk", "raised to praise", "testimony", "faith", "surgery", "recovery", "miracle", "restoration"],
    content: "Prof. Menyeh authored 'Raised to Walk, Raised to Praise: A Journey of God's Restoring Power' with a foreword by Rev Prof. Charles Ansah. The book chronicles his surgery in London (2024), recovery journey, and full restoration through faith. Available as a free PDF download.",
  },

  // General Content
  {
    id: "general-research-metrics",
    title: "Research Metrics and Impact",
    description: "517+ citations, h-index 12, 36+ publications",
    category: "General",
    url: "/publications",
    keywords: ["citations", "h-index", "research impact", "metrics", "publications"],
    content: "Professor Menyeh has 517+ citations, h-index of 12, i10-index of 14, with 36+ peer-reviewed publications spanning 33 years (1990-2023). Research topics include mineral magnetism, gold exploration, groundwater prospecting, and environmental geophysics.",
  },
  {
    id: "general-international-collaborations",
    title: "International Research Collaborations",
    description: "Partnerships with UK, Germany, USA, and Canada",
    category: "General",
    url: "/biography",
    keywords: ["international", "collaboration", "UK", "Germany", "Newcastle", "Munich"],
    content: "Established long-term research collaborations with University of Newcastle upon Tyne (UK), Ludwig Maximilian University Munich (Germany), University of Minnesota (USA), and University of Toronto (Canada). Co-investigator on Ghanaian-German Lake Bosumtwi Drilling Project.",
  },
  {
    id: "general-graduate-supervision",
    title: "Graduate Student Supervision",
    description: "Supervised 20+ M.Phil. and Ph.D. students",
    category: "General",
    url: "/biography",
    keywords: ["students", "supervision", "Ph.D.", "M.Phil.", "mentorship", "graduate education"],
    content: "Supervised over 20 graduate students including Dr. David Dotse Wemegah, Dr. Emmanuel Daanoba Forson, and Dr. Peter Deatanyah. Many former students now hold academic and research positions across Ghana and internationally.",
  },
  {
    id: "general-knust-physics",
    title: "KNUST Physics Department",
    description: "44+ years of service to KNUST Physics Department",
    category: "General",
    url: "/",
    keywords: ["KNUST", "Physics Department", "Kumasi", "Ghana", "university"],
    content: "Department of Physics, Aboagye Menyeh Complex, College of Science, KNUST, Kumasi, Ghana. Phone: +233 32 206 0319. Email: physics@knust.edu.gh. Office Hours: Monday-Friday, 8:00 AM - 5:00 PM GMT.",
  },
  {
    id: "general-contact",
    title: "Contact Information",
    description: "Get in touch about research, archives, or collaborations",
    category: "General",
    url: "/contact",
    keywords: ["contact", "email", "phone", "address", "inquiry", "collaboration"],
    content: "Contact the Department of Physics at KNUST for inquiries about Prof. Menyeh's research, archival materials, or collaboration opportunities. Response time: 2-3 business days.",
  },
  {
    id: "general-resources",
    title: "Downloadable Resources",
    description: "CV, publication list, and biographical summary PDFs",
    category: "General",
    url: "/publications",
    keywords: ["CV", "curriculum vitae", "publication list", "biography", "download", "PDF"],
    content: "Download comprehensive PDF documents including complete Curriculum Vitae (8 pages), chronological Publication List (6 pages), and detailed Biographical Summary (7 pages). Available for research, media inquiries, and reference purposes.",
  },
];

export function searchContent(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const queryTerms = normalizedQuery.split(/\s+/);

  return searchIndex
    .map((item) => {
      let score = 0;
      const searchableText = `${item.title} ${item.description} ${item.content} ${item.keywords.join(" ")}`.toLowerCase();

      // Exact title match (highest priority)
      if (item.title.toLowerCase().includes(normalizedQuery)) {
        score += 100;
      }

      // Exact keyword match
      if (item.keywords.some((kw) => kw.toLowerCase().includes(normalizedQuery))) {
        score += 50;
      }

      // Description match
      if (item.description.toLowerCase().includes(normalizedQuery)) {
        score += 30;
      }

      // Content match
      if (item.content.toLowerCase().includes(normalizedQuery)) {
        score += 20;
      }

      // Individual term matches
      queryTerms.forEach((term) => {
        if (searchableText.includes(term)) {
          score += 5;
        }
      });

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10); // Return top 10 results
}
