import { Navigation } from "@/components/Navigation";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

type GalleryImage = {
  id: string;
  src: string;
  title: string;
  description: string;
  category: string;
};

const galleryImages: GalleryImage[] = [
  { id: "1", src: "/images/gallery/aboagye-menyeh-complex.jpg", title: "Aboagye Menyeh Complex", description: "The College of Science building at KNUST, named in his honour in 2015.", category: "Legacy" },
  { id: "2", src: "/images/gallery/research-lab.jpg", title: "Research Laboratory", description: "Conducting experimental studies on mineral magnetism at KNUST.", category: "Research" },
  { id: "3", src: "/images/gallery/knust-campus.jpg", title: "KNUST Campus", description: "Aerial view of the Kwame Nkrumah University of Science and Technology.", category: "Institution" },
  { id: "4", src: "/images/gallery/graduation-ceremony.jpg", title: "Graduation Ceremony", description: "Celebrating academic milestones with graduating students.", category: "Milestones" },
  { id: "5", src: "/images/gallery/field-work.jpg", title: "Field Research", description: "Geophysical fieldwork for groundwater and mineral exploration in Ghana.", category: "Research" },
];

const categories = ["All", "Legacy", "Research", "Institution", "Milestones"];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = selectedCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory);

  useEffect(() => {
    if (!gridRef.current) return;
    const els = gridRef.current.querySelectorAll("[data-animate]");
    gsap.fromTo(els, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.08 });
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-[#050d1a]">
      <Navigation />

      <section className="relative pt-32 pb-16 border-b border-white/5">
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="text-[#c8a44e] text-xs tracking-[0.3em] uppercase mb-4">Visual Archive</p>
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-[1.1] mb-6">Gallery</h1>
          <p className="text-white/40 text-lg max-w-xl font-light leading-relaxed">A visual chronicle of research, leadership, and legacy at KNUST.</p>
        </div>
      </section>

      <main className="max-w-[1100px] mx-auto px-6 py-12 pb-32">
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-xs tracking-wider transition-colors ${selectedCategory === cat ? "bg-[#c8a44e]/15 text-[#c8a44e]" : "text-white/30 hover:text-white/50"}`}>
              {cat}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((img) => (
            <div key={img.id} data-animate className="group relative cursor-pointer overflow-hidden rounded-xl" onClick={() => setSelectedImage(img)}>
              <div className="aspect-[4/3] bg-[#0a1628]">
                <img src={img.src} alt={img.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[#c8a44e]/60 text-xs tracking-wider uppercase">{img.category}</span>
                <h3 className="text-white/90 text-sm font-medium mt-1">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && <div className="text-center py-24"><p className="text-white/30">No images in this category.</p></div>}
      </main>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-[#0a1628] border-white/10 p-0 overflow-hidden">
          {selectedImage && (
            <div>
              <div className="relative">
                <img src={selectedImage.src} alt={selectedImage.title} className="w-full max-h-[70vh] object-contain bg-black/50" />
                <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white/70 hover:text-white transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <span className="text-[#c8a44e]/50 text-xs tracking-wider uppercase">{selectedImage.category}</span>
                <h3 className="text-white/90 text-lg font-light mt-1">{selectedImage.title}</h3>
                <p className="text-white/40 text-sm mt-2">{selectedImage.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ChatWidget />
      <Footer />
    </div>
  );
}
