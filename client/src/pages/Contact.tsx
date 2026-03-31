import { Navigation } from "@/components/Navigation";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { MapPin, Clock, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import gsap from "gsap";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", affiliation: "", inquiryType: "general", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll("[data-animate]");
    gsap.fromTo(els, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.08 });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    toast.success("Message sent. We'll respond within 2-3 business days.");
    setFormData({ name: "", email: "", affiliation: "", inquiryType: "general", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050d1a]">
      <Navigation />

      <section className="relative pt-32 pb-16 border-b border-white/5">
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="text-[#c8a44e] text-xs tracking-[0.3em] uppercase mb-4">Get in Touch</p>
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-[1.1] mb-6">Contact</h1>
          <p className="text-white/40 text-lg max-w-xl font-light leading-relaxed">
            For research collaborations, archival materials, or student inquiries.
          </p>
        </div>
      </section>

      <main ref={sectionRef} className="max-w-[1100px] mx-auto px-6 py-16 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-24">

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div data-animate>
                <label className="text-white/30 text-xs tracking-wider uppercase block mb-2">Name *</label>
                <input name="name" value={formData.name} onChange={handleChange} required className="w-full bg-transparent border-b border-white/10 pb-3 text-white/80 text-sm focus:outline-none focus:border-[#c8a44e]/40 transition-colors placeholder:text-white/15" placeholder="Full name" />
              </div>
              <div data-animate>
                <label className="text-white/30 text-xs tracking-wider uppercase block mb-2">Email *</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full bg-transparent border-b border-white/10 pb-3 text-white/80 text-sm focus:outline-none focus:border-[#c8a44e]/40 transition-colors placeholder:text-white/15" placeholder="your@email.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div data-animate>
                <label className="text-white/30 text-xs tracking-wider uppercase block mb-2">Affiliation</label>
                <input name="affiliation" value={formData.affiliation} onChange={handleChange} className="w-full bg-transparent border-b border-white/10 pb-3 text-white/80 text-sm focus:outline-none focus:border-[#c8a44e]/40 transition-colors placeholder:text-white/15" placeholder="University or organisation" />
              </div>
              <div data-animate>
                <label className="text-white/30 text-xs tracking-wider uppercase block mb-2">Inquiry Type *</label>
                <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} required className="w-full bg-transparent border-b border-white/10 pb-3 text-white/80 text-sm focus:outline-none focus:border-[#c8a44e]/40 transition-colors appearance-none cursor-pointer">
                  <option value="general" className="bg-[#0a1628]">General Inquiry</option>
                  <option value="research" className="bg-[#0a1628]">Research Collaboration</option>
                  <option value="archival" className="bg-[#0a1628]">Archival Materials</option>
                  <option value="student" className="bg-[#0a1628]">Student Inquiry</option>
                </select>
              </div>
            </div>

            <div data-animate>
              <label className="text-white/30 text-xs tracking-wider uppercase block mb-2">Subject *</label>
              <input name="subject" value={formData.subject} onChange={handleChange} required className="w-full bg-transparent border-b border-white/10 pb-3 text-white/80 text-sm focus:outline-none focus:border-[#c8a44e]/40 transition-colors placeholder:text-white/15" placeholder="Brief subject line" />
            </div>

            <div data-animate>
              <label className="text-white/30 text-xs tracking-wider uppercase block mb-2">Message *</label>
              <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full bg-transparent border-b border-white/10 pb-3 text-white/80 text-sm focus:outline-none focus:border-[#c8a44e]/40 transition-colors resize-none placeholder:text-white/15" placeholder="Your message..." />
            </div>

            <div data-animate>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#c8a44e]/40 text-[#c8a44e] text-sm tracking-wider uppercase hover:bg-[#c8a44e]/10 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Sidebar info */}
          <div className="space-y-12">
            <div data-animate>
              <span className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase">Office</span>
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-white/20 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white/60 text-sm">Room TF4, Aboagye Menyeh Complex</p>
                    <p className="text-white/40 text-sm">College of Science, KNUST</p>
                    <p className="text-white/40 text-sm">Kumasi, Ghana</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-white/20 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white/60 text-sm">Mon - Fri, 8:00 AM - 5:00 PM</p>
                    <p className="text-white/30 text-xs">Ghana Mean Time (GMT)</p>
                  </div>
                </div>
              </div>
            </div>

            <div data-animate className="border-t border-white/5 pt-8">
              <span className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase">Department</span>
              <p className="text-white/50 text-sm mt-4 leading-relaxed">
                Department of Physics<br />
                College of Science<br />
                Kwame Nkrumah University of<br />Science and Technology
              </p>
              <p className="text-white/30 text-xs mt-4">+233 32 206 0319</p>
              <p className="text-white/30 text-xs">physics@knust.edu.gh</p>
            </div>

            <div data-animate className="border-t border-white/5 pt-8">
              <span className="text-[#c8a44e]/50 text-xs tracking-[0.2em] uppercase">Response Time</span>
              <p className="text-white/40 text-sm mt-4 leading-relaxed">
                We typically respond within 2-3 business days. For urgent research matters, please indicate in the subject line.
              </p>
            </div>
          </div>
        </div>
      </main>

      <ChatWidget />
      <Footer />
    </div>
  );
}
