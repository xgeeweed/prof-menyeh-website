import { Navigation } from "@/components/Navigation";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SpeechEntry = {
  id: string;
  title: string;
  date: string;
  location: string;
  context: string;
  content: string[];
};

const speeches: SpeechEntry[] = [
  {
    id: "commissioning",
    title: "Commissioning of the Science Building Complex",
    date: "June 28, 2010",
    location: "Fore Court of the New Building, KNUST",
    context: "This address was delivered by Prof. Aboagye Menyeh as Provost of the College of Science at the commissioning of the Science Building Complex. The building he championed from inception in 2001 was later named the 'Aboagye Menyeh Complex' in 2015.",
    content: [
      "I deem it a great privilege and honour to be asked to welcome you on this historic occasion. I am indeed delighted and grateful to God that at long last, the vision to have a College Building Complex to provide a permanent accommodation for some of our departments as well as offices, has become a reality. Therefore, for us in the College of Science, and all our friends and well wishers, together let us say this is the day the Lord has made. We will rejoice and be glad that this event is taking place.",
      "Distinguished ladies and gentlemen, before welcoming you formally, please permit me to give a little background information about the vision to put up this magnificent edifice. The total enrolment of students in 1961 when the Faculty was established was 227. In 2001, exactly 40 years later when I took over as a Dean, the total enrolment had reached 2,300, that is, about 10 times as it was in 1961. As at the beginning of the 2009/2010 Academic Year, our population was nearly 4,000, almost 20 times as it was in 1961.",
      "Despite the steady rise in student intake, the infrastructure and teaching facilities did not see any expansion over the years, resulting in overcrowding in our lecture rooms, laboratories and libraries originally designed to accommodate between 30 and 50 students at a time. It will interest you to note that currently, you can have as many as between 100 and 200 students in a class for most of our programmes. In some cases, students will be standing on the verandah listening to the lecturer, while holding their notebooks in hand.",
      "Ladies and gentlemen, it is against this background that when I took over in 2001, and during my first Faculty Board meeting, which happened to be the 183rd Faculty Board meeting, I presented a proposal to the Board to consider the construction of a building Complex on this very ground, to address these weaknesses. The Board agreed to the proposal, following which a Committee was set up to provide recommendations.",
      "After several consultative meetings between the Faculty and the Development Office, a formal request was made to the then Vice Chancellor Professor J.S.K. Ayim in 2002 for GETFund Support. On Thursday 9th October, 2003, having received approval from the GETFund to provide the necessary funds, the sod was cut by his successor, Prof. Kwesi Andam for the commencement of the project. CONSAR Ltd was awarded the contract to complete the project within 24 months at a cost of about 2.6 million Ghana cedis. As you can see, we have come a long way since then and it has taken us almost seven years or 84 months to complete the building.",
      "The College from its own resources has so far provided funds to the tune of about GH\u20B560,000.00 to facilitate the completion of the building, including purchasing and installing a transformer without which there will be no power supply to the building, and networking the entire building which is about 70% complete.",
      "Though we as a College are happy that this edifice is being commissioned today, it is with sadness that I present the other side of the story. You will notice should you decide to go round that it is virtually an empty shell \u2014 no furnishing has been provided at the moment. The immediate implication is that we cannot meet the great expectation of staff and students to move in immediately after the commissioning. This situation is worrying since any delay to occupy it will certainly lead to the deterioration of the facility. Another source of worry is that not even one of the two lifts for the building has been provided as I speak.",
      "I will like to thank the Vice Chancellor and Central Administration for the support over the years. I also thank our two past Vice Chancellors, Prof. Ayim and the late Prof. Andam for the keen interest and support for the project. Members of the Building Committee chaired by then Dr. Abaidoo, now Prof. R.C. Abaidoo, also deserve commendation. Prof. Boakye made a personal effort to lobby for support at a very high level and we acknowledge that singular effort.",
      "We wish to thank GETFund, particularly the past Administrator Mr. Banahene, who I saw on several occasions coming over to inspect progress of work, demonstrating that his heart was attached to this magnificent edifice. The former Director of Works Mr. Victor Anim and the present Mr. Ben Oppong, we say Ayekoo to you and your team of Architects and Quantity Surveyors \u2014 Mr. Adonteng, Mr. Asilevi, Mr. S. Yeboah, Mr. A.K. Painstil, Mr. Seth Yeboah, Mr. Jimmy Nkrumah, Mr. Kojo Kyereme, Mrs. Harriet Eshun, and many others at the Development Office.",
      "To the Contractor, CONSAR Ltd: the late Mr. Renzo, succeeded by Mr. Ziad Abou-Chakra who has been exceptionally committed to his work, Mr. Peter Boateng, and Kennedy Adusei \u2014 I call him 'all-rounder' because he is almost everywhere on this site \u2014 we say Bravo for a job well done. The other contractors: Prof. I.K. Djokoto of Sonic Engineering, Mr. Bempah of Beam Electrical and Construction, we are grateful. To the Project Manager Dr. A.B.C. Dadson, assisted by Mr. Alex Adu Acheampong and Mr. Joseph Azumah \u2014 well done for a good job. You were selfless. You worked tirelessly to ensure this project was completed successfully.",
      "Lastly to my wife Adelaide who has been consistently over the years praying with me for resources to complete this building so that it does not become a white elephant, I say God bless you for the strong faith exhibited. On that note, I wish to welcome all of you to this historic event. Mema mo nyinaa Akwaaba.",
    ],
  },
  {
    id: "technocrat",
    title: "Technocrat Magazine Interview",
    date: "October 2009",
    location: "KNUST",
    context: "A comprehensive interview published in the Technocrat Magazine, covering Prof. Menyeh's life story from childhood in Asikasu village through his career at KNUST.",
    content: [
      "FAMILY AND BACKGROUND: I was born to Opanyin Kwasi Menyeh of blessed memory, and Madam Rosina Amma Okyerebea, both natives of Abiriw, Akwapim. My father was a cocoa farmer, in fact he was the Chief Cocoa farmer for a long time before his demise. My mother, though involved in much of the cocoa farming activities, also engaged in petty trading. I am the third born of my mother's five children. I am married to Mrs. Adelaide Aboagye, a Principal Technician in the Department of Computer Science. Between us, we have four children: Theodosia, Emmanuel, Godfried, and Elizabeth.",
      "EARLY SCHOOL LIFE: My early childhood days were spent at Asikasu (literally, the Golden River), a village about 15 kilometers from Koforidua. My primary schooling began at the Asikasu Presbyterian School. The two primary schools were separated by a distance of about 5 kilometres. I did a lot of walking to school, rain or shine. There was no middle school in the village so I continued at the Jumapo Methodist Middle School, where I completed in 1967 with a distinction in the Middle School Leaving Certificate Examination. So you can see that I have had a taste of both Presbyterian and Methodist training, which I should say has been a blessing to me in my life.",
      "For my secondary education, I passed the Common Entrance Examination while in Middle Form Two and was offered admission to Prempeh College. The Headmaster even visited my school hoping that I would take up the offer. Unfortunately, my father insisted that I should complete the middle school first: 'Get one certificate before trying to get another one.' While in Form Four, I sat for both entry examinations and received three admissions: Aburi Methodist Training College, Asuansi Technical Institute, and surprisingly, Asankrangwa Secondary School in the Western Region.",
      "I settled for a secondary education upon the advice of my late elder brother. A very long journey indeed, from Asikasu village to Koforidua, then from Koforidua to Tarkwa by train, and from Tarkwa to Asankrangwa by a mummy truck. I discovered to my delight that Asankrangwa was such a beautiful school, one of the several Educational Trust Institutions put up by Osagyefo Dr. Kwame Nkrumah. After the first term examinations I was awarded a Ghana Cocoa Marketing Board Scholarship. I obtained very good grades at the O-Level (Division One) and subsequently gained 6th Form admission to Adisadel College in Cape Coast.",
      "HOW I CAME TO KNUST: In our time, the destination of most 6th Form science graduates was either Tech (KNUST) or Legon. During my secondary school education, my interest was in Mathematics, Physics and Chemistry. So, the common phrase 'Medico or suicide' was out of the question. I wanted to do Engineering, but had to accept the offer to do Physics. Perhaps, looking back, I see this as a fulfilment of what my Physics Teacher at Asankrangwa, Mr. Anthony Aggrey, had often said about me \u2014 that one day, he expected me to be a Professor of Physics. I graduated with a Second Class Upper Division in Physics in 1980. Only three of us out of 16 had Second Upper in Physics.",
      "RESEARCH: My research areas in Geophysics deal with the experimental studies of the physical properties of rocks, particularly rock and mineral magnetism, which are vital for the interpretation of geophysical survey data. Another aspect is the application of suitable geophysical techniques to explore for mineral deposits as well as locating suitable sites for boreholes to provide potable water for rural communities in Ghana.",
      "ON PYRRHOTITE: I take great satisfaction in my research on the mineral pyrrhotite, which is associated with the mineralization of gold deposits. It is a complex mineral which hitherto had not been well understood. The results of my research on pyrrhotite have been published not only in Ghanaian journals but also in reputable journals in Europe, the USA and Japan.",
      "NO REGRETS: I will categorically say I have no regrets whatsoever! In life one should do what one can do to the best of his or her ability if one is to derive maximum job satisfaction. Physics is a fascinating subject and I have enjoyed pursuing it as a career. I have noted with deep satisfaction how students I have taught, be it at the secondary school level on part-time basis or in the university as a lecturer, have been very much excited because I am able to make the subject more interesting to them rather than making it a boring or dry subject. As a Christian, I also believe that God does not make a mistake, so opening the door for me to pursue a career in Physics is not by chance.",
      "PATRIOTISM: I remember in the late 70s and early 80s when the 'Agege Craze' was on in Ghana. I was enticed on numerous occasions by some friends to join the bandwagon to Nigeria but I stood my ground! All my Teaching Assistant colleagues left but I decided to stay put at KNUST to contribute my little quota despite the poor remuneration. In short, it is patriotism, perhaps infused in me during my Young Pioneer Days, that has kept me here! I had offers in the US and the UK soon after my PhD, but I decided to honour the bond I had signed to return to Ghana. In fact, I have not gone on Sabbatical for the last fourteen years! I should also mention that I have been a Fellow of Republic Hall of Residence since 1982.",
      "THE COLLEGIATE SYSTEM: In my opinion, the Collegiate system has come to stay and it is up to all of us to see to it that it works. The original idea was to restructure the faculties into six semi-autonomous colleges. Apart from the semi-autonomous status, I see the Collegiate system as an opportunity to promote a healthy competition in terms of growth and development among the colleges. Unfortunately, the semi-autonomous status is far from the reality. The devolution of some responsibilities to the colleges is yet to materialize after about five years.",
      "ACHIEVEMENTS AS PROVOST: In respect of infrastructure development, the College stands tall among the Colleges. We have introduced more academic programmes which are unique and very relevant to Ghana's socio-economic development. We have modernized twenty two basic laboratories at a huge cost to bring them in line with international standards. The College, with assistance from the French Embassy in Accra, has established a French Resource Centre to boost the learning of the French language. I also initiated income generation activities: production of yogurt and other products in Biochemistry, a glass blowing unit in Chemistry, an Eye Clinic in Optometry, production of laboratory apparatus for senior high schools in Physics, using the Botanic Gardens in Biology, and software development in Mathematics and Computer Science.",
      "MY ADVICE: In everything we do, we should do it with the best of our ability. I believe in the adage 'What is worth doing is worth doing well.' I expect students to show more commitment to their studies since their parents and guardians have invested so much in them. The whole nation is also looking up to them as future leaders, to come up with solutions to our socio-economic problems. For the staff, the work attitude of some at all levels leaves much to be desired. Lack of initiative is a major problem. All hands must be on deck if we want to move the university forward.",
    ],
  },
  {
    id: "freshers",
    title: "Freshers' Orientation Address",
    date: "2009/2010 Academic Year",
    location: "College of Science, KNUST",
    context: "An address to incoming students at the College of Science, outlining the College's structure, programmes, vision, and challenges.",
    content: [
      "It gives me great pleasure to welcome all of you to this Freshers' Orientation. The purpose of this orientation is to introduce you to the College, its structure and administration, programmes being offered, to share our successes and challenges and most importantly, give you the opportunity to interact with management and staff.",
      "The College of Science emerged from the former Faculty of Science, established in 1961 with an initial intake of 221 students. The student population is nearly 4,000 as at the beginning of this academic year. You can therefore see that the College has grown by about 18 times over the last 48 years. The College is the third largest in terms of student enrolment, constituting about 20% of the total student population of KNUST.",
      "Since its establishment, the College has produced a large number of graduates \u2014 over 10,000 \u2014 to provide the manpower requirements of the country. Today, graduates of the College are playing leading roles in almost every sector of the national economy. From Professors to Parliamentarians, Ministers of State, Chief Executives of Companies, Directors, Rectors of Polytechnic, Deans and Heads of Departments, Research Scientists, Graduate Teachers, Pilots, Meteorologists, and more.",
      "CAREER PROSPECTS FOR SCIENTISTS: The career opportunities are vast \u2014 All Sector Ministries, Educational and Research Institutions such as the Universities, Polytechnics, CSIR with its 13 Research Institutes, Noguchi Memorial Institute, Centre for Research into Plant Medicine, Ghana Atomic Energy Commission. Also: Information and Communication Technology, the Telecommunications industry, Medical Laboratories, Civil Aviation, the Armed Forces, Police and Prison Service, Water Companies, Groundwater and Mineral Exploration, GNPC, Environmental Protection Agency, Ghana Standards Board, Food and Drugs Board, Energy and Mining Industries, Tema Oil Refinery, Ghana Meteorological Services, Food, Beverage and Cosmetic Industries, Financial Institutions (Banks, Insurance Companies, Stock Brokers), Drug Manufacturing, Breweries, and International institutions such as WHO, UNESCO, UNICEF, UNDP. The list is endless.",
      "I will also mention that the female enrolment in science has improved significantly. In the Biosciences, female enrolment on average is about 40% of total students. In the Physical Sciences, it is about 20%. We are encouraging more female students to read science, and gradually this is paying off.",
      "Our VISION as a Science College is to be recognised as a leading scientific institution which produces well trained and highly competent young men and women in science. Our MISSION is to provide high quality teaching, research, entrepreneurship training, and service to the community in the basic and applied sciences for the industrial and socio-economic development of Ghana and Africa.",
      "In my position as the Provost of the College of Science, I can say without any doubt that our future lies in our collective ability as a people to create a new Science Culture in our society. It is rather alarming that whereas the world is becoming more and more entrenched in science, our society is becoming more and more estranged from science. The best students from the Senior Secondary Schools would rather go into the business professions than go into any of the basic sciences.",
      "Just as in the advanced and the advancing world, the new generation goes into Science as a matter of choice, our new generation must also get into Science with the passion of the Newtons and the Einsteins. It is the only way we can secure our future. I wish to appeal to Government to create some incentives for science students, such as scholarships to motivate brilliant students to pursue careers in the basic sciences.",
    ],
  },
  {
    id: "turnkey",
    title: "Turnkey Laboratory Modernisation Project",
    date: "2009",
    location: "College of Science, KNUST",
    context: "An address on the occasion of the commissioning of modernised laboratories across four departments. The project, worth approximately \u20AC5.44 million (US$8.1 million), transformed 22 laboratories to international standards.",
    content: [
      "The genesis of this project, which has been dubbed the TURNKEY Project, began in 2005 during the commissioning of the Modern Telecommunications Engineering Laboratory at the College of Engineering. I was very much impressed after going round and there and then, I approached the then Vice Chancellor, the late Prof. Andam, to express keen interest on behalf of the College. He readily agreed but cautioned that because of the huge cost involved, the College should start with the basic laboratories \u2014 Physics, Chemistry and Biology. Later, Optometry had to be included because the department had virtually none of the basic laboratory equipment.",
      "How were we going to fund the Project? That was the big question. If all the normal AFUF was allocated to the College on a yearly basis to cater solely for the project, the total cost would have been paid in over 20 years. Yes, you heard me right, 20 years!",
      "We are very grateful to the Vice Chancellor, Prof. Adarkwa, for giving his blessings to the project and sustaining the momentum to modernise our laboratories. The total cost of the project is about \u20AC5.44 million or US$8.1 million or GH\u20B511.7 million. The payment is spread over three years.",
      "Scripture says you cannot put new wine into an old wine skin. In the same vein, we couldn't have put all these new equipment into these old laboratories. We had to renovate the laboratories to enable the installation of the equipment. The benches and work tops, aluminium glazing doors and windows, LCD projectors, networking of all experiments, air conditioners \u2014 all have been provided. The environment for laboratory work has been made cozy indeed.",
      "Benjamin Franklin, a well known physicist and inventor, says 'An investment in knowledge pays the best interest.' You will find this written on the first page of all the Physics and Chemistry Laboratory manuals which came with this project. Your parents, the Government and indeed the university have invested and still are investing heavily in your training. We hope your training will pay the nation the best interest.",
      "Now you have no excuse to grumble. Some of you have been complaining that you worked with better equipment at the Science Resource Centres in your senior high schools. You can judge for yourselves if this is the case now. You are to use these facilities to acquire practical and experimental skills. Please, use the equipment with care.",
    ],
  },
];

function SpeechCard({ speech, index }: { speech: SpeechEntry; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll("[data-animate]");
    gsap.fromTo(els, { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.08,
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
    });
  }, []);

  return (
    <div ref={ref} className="py-20 border-b border-white/5 last:border-0">
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
        <div data-animate>
          <span className="text-[#c8a44e]/40 text-xs font-mono tracking-wider">0{index + 1}</span>
          <div className="mt-2 space-y-1">
            <div className="text-white/30 text-xs">{speech.date}</div>
            <div className="text-white/20 text-xs">{speech.location}</div>
          </div>
        </div>

        <div>
          <h2 data-animate className="text-2xl md:text-3xl font-light text-white tracking-tight mb-6">{speech.title}</h2>

          <div data-animate className="border-l-2 border-[#c8a44e]/20 pl-6 mb-10">
            <p className="text-white/45 text-[15px] leading-relaxed italic">{speech.context}</p>
          </div>

          {/* First paragraph always visible */}
          <p data-animate className="text-white/50 text-[15px] leading-[1.8]">{speech.content[0]}</p>

          {/* Expanded content */}
          {isExpanded && (
            <div className="mt-6 space-y-5">
              {speech.content.slice(1).map((para, i) => (
                <p key={i} className="text-white/45 text-[15px] leading-[1.8]">{para}</p>
              ))}
            </div>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-8 flex items-center gap-2 text-[#c8a44e]/60 hover:text-[#c8a44e] text-sm transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Read full text ({speech.content.length} paragraphs)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Speeches() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050d1a]">
      <Navigation />

      <section className="relative pt-32 pb-16 border-b border-white/5">
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="text-[#c8a44e] text-xs tracking-[0.3em] uppercase mb-4">Primary Sources</p>
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-[1.1] mb-6">
            Speeches &<br />Interviews
          </h1>
          <p className="text-white/40 text-lg max-w-xl font-light leading-relaxed">
            In his own words &mdash; historic addresses and first-person accounts that document the institutional history of the College of Science.
          </p>
        </div>
      </section>

      <main className="max-w-[1100px] mx-auto px-6">
        {speeches.map((speech, i) => (
          <SpeechCard key={speech.id} speech={speech} index={i} />
        ))}
      </main>

      <ChatWidget />
      <Footer />
    </div>
  );
}
