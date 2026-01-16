import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WorkCard from './components/WorkCard';
import IdeationLab from './components/IdeationLab';
import Chatbot from './components/Chatbot';
import { Project, Service, TeamMember } from './types';
import { ArrowRight, ArrowLeft, Mail, MapPin, Phone, ChevronLeft, ChevronRight, Layers, PenTool, Layout, Share2, Quote, Filter, ArrowUp, ChevronDown, CheckCircle, Star, Move, Palette, MessageSquare } from 'lucide-react';

// --- Reusable Reveal Component for Animation on Scroll ---
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Trigger only once
      }
    }, { threshold: 0.1 }); // Trigger when 10% visible

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transform transition-all duration-1000 ease-out ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Animated Counter Component ---
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !hasAnimated) {
                setHasAnimated(true);
                let startTime: number | null = null;
                const animate = (currentTime: number) => {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    // Ease out quart
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    
                    setCount(Math.floor(easeOutQuart * end));
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };
                requestAnimationFrame(animate);
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [end, duration, hasAnimated]);

    return <span ref={ref}>{count}{suffix}</span>;
};

// --- Stats Section Component ---
const StatsSection = ({ className = "bg-white" }: { className?: string }) => (
  <section className={`py-40 border-y border-gray-100 relative overflow-hidden ${className}`}>
    {/* Subtle Background Decoration */}
    <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" 
         style={{ backgroundImage: 'radial-gradient(#f3f4f6 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
    </div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-12">
        {[
          { number: 50, suffix: "+", label: "Awards Won" },
          { number: 120, suffix: "+", label: "Projects Completed" },
          { number: 15, suffix: "", label: "Global Partners" },
          { number: 4, suffix: "y", label: "Years Active" }
        ].map((stat, idx) => (
          <Reveal key={idx} delay={idx * 100}>
            <div className="flex flex-col items-center justify-center text-center group cursor-default">
              <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 tracking-tighter group-hover:text-primary transition-colors duration-500">
                <AnimatedCounter end={stat.number} suffix={stat.suffix} />
              </div>
              <div className="h-1 w-12 bg-gray-200 mb-8 group-hover:w-24 group-hover:bg-primary transition-all duration-500 rounded-full"></div>
              <div className="text-sm md:text-base text-gray-500 font-bold uppercase tracking-[0.2em] group-hover:text-black transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// --- UPDATED DATASET WITH USER IMAGES ---
const projects: Project[] = [
  { id: '1', title: 'Global Identity', category: 'Logo & Brand Identity', image: 'https://i.ibb.co/27BfM9wD/image-8.jpg', description: 'Comprehensive brand architecture and visual language for an international tech firm.' },
  { id: '2', title: 'EcoPack Solutions', category: 'Packaging Design', image: 'https://i.ibb.co/8L6H9wXw/image-4.jpg', description: 'Sustainable packaging system designed to minimize footprint while maximizing shelf appeal.' },
  { id: '3', title: 'Nexus Dashboard', category: 'Web Development', image: 'https://i.ibb.co/Lzf3r6D4/image-7.jpg', description: 'A futuristic analytics dashboard focusing on clarity and real-time data visualization.' },
  { id: '4', title: 'Pulse Mobile', category: 'Mobile App Design', image: 'https://i.ibb.co/C5fT9N0N/image-1.jpg', description: 'High-conversion fintech app interface designed for seamless user onboarding.' },
  { id: '5', title: 'Corporate Vision', category: 'Advertising & Print', image: 'https://i.ibb.co/Pvj8gK5K/image-5.jpg', description: 'Large-format print campaign for a global logistics leader.' },
  { id: '6', title: 'Strategic Growth', category: 'Corporate Strategy', image: 'https://i.ibb.co/9mx6Yf30/image-3.jpg', description: 'Marketing roadmap and brand positioning for a Series B startup.' },
  { id: '7', title: 'Modern Collateral', category: 'Marketing Collateral', image: 'https://i.ibb.co/W4v8vVpB/image-6.jpg', description: 'Sales enablement tools and high-impact brochures for the healthcare sector.' },
  { id: '8', title: 'Brand Story', category: 'Visual Storytelling', image: 'https://i.ibb.co/VWVX57Vn/image-2.jpg', description: 'Editorial layout and custom illustrations defining a new brand narrative.' },
];

const services: Service[] = [
  { 
    id: '1', 
    title: 'Logo & Brand Identity', 
    description: 'Custom logos and visual identity systems.', 
    image: 'https://i.ibb.co/27BfM9wD/image-8.jpg' 
  },
  { 
    id: '2', 
    title: 'Packaging Design', 
    description: 'Innovative packaging and label designs.', 
    image: 'https://i.ibb.co/8L6H9wXw/image-4.jpg' 
  },
  { 
    id: '3', 
    title: 'Web Development', 
    description: 'High-performance, responsive websites.', 
    image: 'https://i.ibb.co/Lzf3r6D4/image-7.jpg' 
  },
  { 
    id: '4', 
    title: 'Mobile App Design', 
    description: 'Intuitive and engaging user experiences.', 
    image: 'https://i.ibb.co/C5fT9N0N/image-1.jpg' 
  },
  { 
    id: '5', 
    title: 'Advertising & Print', 
    description: 'Strategic print campaigns for impact.', 
    image: 'https://i.ibb.co/Pvj8gK5K/image-5.jpg' 
  },
  { 
    id: '6', 
    title: 'Corporate Strategy', 
    description: 'Business branding and marketing solutions.', 
    image: 'https://i.ibb.co/9mx6Yf30/image-3.jpg' 
  },
  { 
    id: '7', 
    title: 'Marketing Collateral', 
    description: 'Flyers and digital assets designed to convert.', 
    image: 'https://i.ibb.co/W4v8vVpB/image-6.jpg' 
  },
  { 
    id: '8', 
    title: 'Visual Storytelling', 
    description: 'Creative layouts that tell your unique story.', 
    image: 'https://i.ibb.co/VWVX57Vn/image-2.jpg' 
  }
];

const team: TeamMember[] = [
  { id: '1', name: 'Alex Rivera', role: 'Creative Director', image: 'https://picsum.photos/400/400?random=10', bio: 'Visionary with 15+ years leading design teams.' },
  { id: '2', name: 'Sarah Chen', role: 'Lead Developer', image: 'https://picsum.photos/400/400?random=11', bio: 'Full-stack wizard obsessed with performance.' },
  { id: '3', name: 'Jordan Lee', role: 'Strategist', image: 'https://picsum.photos/400/400?random=12', bio: 'Turning chaos into actionable marketing plans.' },
];

const testimonials = [
  {
    id: 1,
    quote: "MastDzyn transformed our vague vision into a market-dominating brand identity. Their strategic approach is unmatched.",
    name: "Elena Rodriguez",
    role: "CMO",
    company: "FutureScale",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=50&w=400",
    rating: 5
  },
  {
    id: 2,
    quote: "The web experience they built increased our conversion rate by 200% in the first month. Pure magic.",
    name: "Marcus Thorne",
    role: "Founder",
    company: "Apex Digital",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=50&w=400",
    rating: 5
  },
  {
    id: 3,
    quote: "Professional, creative, and incredibly efficient. They didn't just design a logo, they defined our soul.",
    name: "Sarah Jenkins",
    role: "Director",
    company: "GreenLife",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=50&w=400",
    rating: 5
  },
  {
    id: 4,
    quote: "I was blown away by the depth of creativity. They are not just an agency, they are partners in success.",
    name: "David Kim",
    role: "VP Marketing",
    company: "TechFlow",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=50&w=400",
    rating: 5
  }
];

// --- Form Component for Reuse ---
const ContactForm = () => (
  <div className="bg-white p-10 md:p-14 rounded-3xl border border-gray-100 shadow-2xl">
    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-3">Name</label>
          <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-5 py-4 text-lg text-gray-900 focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all font-light" placeholder="John Doe" />
        </div>
        <div>
            <label className="block text-base font-medium text-gray-700 mb-3">Email</label>
          <input type="email" className="w-full bg-white border border-gray-200 rounded-lg px-5 py-4 text-lg text-gray-900 focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all font-light" placeholder="john@example.com" />
        </div>
      </div>
      
      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">Subject</label>
        <select className="w-full bg-white border border-gray-200 rounded-lg px-5 py-4 text-lg text-gray-900 focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all font-light">
          <option>Project Inquiry</option>
          <option>Collaboration</option>
          <option>General Question</option>
          <option>Careers</option>
        </select>
      </div>

      <div>
          <label className="block text-base font-medium text-gray-700 mb-3">Message</label>
          <textarea rows={5} className="w-full bg-white border border-gray-200 rounded-lg px-5 py-4 text-lg text-gray-900 focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all font-light" placeholder="Tell us about your project..."></textarea>
      </div>

      <button className="w-full bg-black text-white font-bold py-5 rounded-lg text-lg hover:bg-primary transition-colors transform active:scale-95 shadow-md flex items-center justify-center group">
        Send Message <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  </div>
);


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleServiceClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('work');
  };

  const renderHome = () => (
    <>
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-primary/20">
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <Reveal className="order-2 lg:order-1">
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-[0.95] tracking-tight mb-8">
                        Design That <br/>
                        <span className="text-primary font-light italic">Inspires</span> <br/>
                        The Future.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-500 font-light max-w-lg mb-12 leading-relaxed">
                        MastDzyn is a digital playground where strategy meets chaos, and design meets function. We build brands that lead.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={() => setCurrentPage('work')} className="px-10 py-5 bg-black text-white font-medium text-lg rounded-full hover:bg-primary transition-all duration-300 transform hover:scale-105 shadow-xl">
                            View Portfolio
                        </button>
                        <button onClick={() => setCurrentPage('contact')} className="px-10 py-5 bg-white border border-gray-200 text-black font-medium text-lg rounded-full hover:bg-gray-50 hover:border-black transition-all duration-300">
                            Start Project
                        </button>
                    </div>
                </Reveal>

                {/* Right: Floating Collage showcasing USER WORK */}
                <div className="order-1 lg:order-2 relative h-[600px] w-full hidden md:block">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"></div>

                    {/* Image 1: Web Dash */}
                    <div className="absolute top-[-20px] right-0 w-80 h-96 rounded-[2rem] overflow-hidden shadow-2xl animate-float" style={{ animationDelay: '0s' }}>
                        <img src="https://i.ibb.co/Lzf3r6D4/image-7.jpg" alt="Web Dashboard Work" className="w-full h-full object-cover" />
                    </div>

                    {/* Image 2: Logo Brand */}
                    <div className="absolute top-32 -left-12 w-72 h-72 rounded-[2rem] overflow-hidden shadow-xl animate-float z-20" style={{ animationDelay: '1.5s' }}>
                         <img src="https://i.ibb.co/27BfM9wD/image-8.jpg" alt="Logo Brand Identity" className="w-full h-full object-cover" />
                    </div>

                    {/* Image 3: Layout Work */}
                    <div className="absolute bottom-10 right-20 w-60 h-60 rounded-[1.5rem] overflow-hidden shadow-lg animate-float z-10" style={{ animationDelay: '3s' }}>
                        <img src="https://i.ibb.co/VWVX57Vn/image-2.jpg" alt="Visual Storytelling" className="w-full h-full object-cover" />
                    </div>

                    {/* Image 4: Packaging */}
                    <div className="absolute -bottom-10 left-[-20px] w-96 h-56 rounded-[2rem] overflow-hidden shadow-2xl animate-float z-30" style={{ animationDelay: '2s' }}>
                         <img src="https://i.ibb.co/8L6H9wXw/image-4.jpg" alt="Packaging Design Work" className="w-full h-full object-cover" />
                    </div>
                </div>
                 {/* Mobile Image (Simplified) */}
                <div className="md:hidden order-1 mb-8">
                     <div className="w-full h-80 rounded-[2rem] overflow-hidden shadow-xl">
                        <img src="https://i.ibb.co/Lzf3r6D4/image-7.jpg" alt="Agency Work" className="w-full h-full object-cover" />
                     </div>
                </div>
            </div>
        </div>
      </section>

      {/* 2. Services Section */}
      <section className="py-40 bg-white relative z-10 overflow-hidden border-t border-gray-100">
        <Reveal>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
             <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 tracking-tight">Unleash Your Brand's Potential</h3>
          </div>
        </Reveal>
        
        <Reveal delay={200}>
          <div className="relative w-full overflow-hidden">
              <div className="flex w-max animate-scroll hover:[animation-play-state:paused] will-change-transform">
                  {[...services, ...services].map((service, index) => (
                     <div key={`${service.id}-${index}`} className="w-[85vw] md:w-[45vw] lg:w-[30vw] flex-shrink-0 px-4">
                        <div className="group cursor-pointer h-full" onClick={() => handleServiceClick(service.title)}>
                          <div className="relative aspect-[4/3] mb-8 overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                             <img 
                                src={service.image} 
                                alt={service.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                loading="lazy" 
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Service+Image'; }}
                             />
                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500 backdrop-blur-sm shadow-xl">
                                  <ArrowRight className="w-6 h-6 text-black" />
                                </div>
                             </div>
                          </div>
                          <div className="text-center px-4">
                            <h4 className="text-2xl font-medium text-gray-900 group-hover:text-primary transition-colors">
                                {service.title}
                            </h4>
                            <p className="text-base text-gray-500 mt-2 font-light max-w-sm mx-auto">{service.description}</p>
                          </div>
                        </div>
                     </div>
                   ))}
              </div>
          </div>
        </Reveal>
      </section>

      {/* 3. Stats */}
      <StatsSection className="bg-primary/20" />

      {/* 4. Testimonials */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
             <div className="text-center mb-20">
              <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Client Stories</h2>
              <h3 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight">Voices of Success</h3>
             </div>
          </Reveal>

          <div className="relative">
            <Reveal key={testimonialIndex} className="w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative flex justify-center lg:justify-end order-1 lg:order-1">
                  <div className="relative group">
                     <div className="absolute inset-0 bg-primary/20 rounded-tr-[5rem] rounded-bl-[5rem] rounded-tl-[2rem] rounded-br-[2rem] transform rotate-6 scale-105"></div>
                     <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-white rounded-tr-[5rem] rounded-bl-[5rem] rounded-tl-[2rem] rounded-br-[2rem] overflow-hidden relative z-10 shadow-2xl">
                        <img src={testimonials[testimonialIndex].image} alt={testimonials[testimonialIndex].name} className="w-full h-full object-cover scale-110" />
                     </div>
                     <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-full shadow-lg z-20">
                        <Quote className="w-8 h-8 text-primary fill-primary" />
                     </div>
                  </div>
                </div>
                <div className="order-2 lg:order-2">
                   <Quote className="w-16 h-16 text-gray-200 mb-8 opacity-50" />
                   <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug text-gray-900 mb-10">"{testimonials[testimonialIndex].quote}"</p>
                   <div className="flex space-x-1 mb-8">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} className={`w-6 h-6 ${i < testimonials[testimonialIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                     ))}
                   </div>
                   <div className="mb-10 border-l-4 border-primary pl-6">
                      <h4 className="text-2xl font-bold text-gray-900">{testimonials[testimonialIndex].name}</h4>
                      <p className="text-lg text-gray-500 font-light mt-1">{testimonials[testimonialIndex].role}</p>
                      <p className="text-base text-primary font-medium">{testimonials[testimonialIndex].company}</p>
                   </div>
                   <div className="flex space-x-4">
                      <button onClick={prevTestimonial} className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><ArrowLeft className="w-6 h-6" /></button>
                      <button onClick={nextTestimonial} className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><ArrowRight className="w-6 h-6" /></button>
                   </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. Ideation Lab */}
      <Reveal>
        <IdeationLab className="bg-primary/20" />
      </Reveal>

      {/* 6. Contact Section */}
      <section className="py-40 bg-white" id="contact-home">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
               <div className="text-center mb-24">
                  <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Start A Project</h2>
                  <h3 className="text-5xl md:text-6xl font-light text-gray-900 tracking-tight">Let's Build Something Great</h3>
               </div>
               <div className="max-w-4xl mx-auto">
                  <ContactForm />
               </div>
            </Reveal>
         </div>
      </section>
    </>
  );

  const renderWork = () => {
    const filteredProjects = selectedCategory
      ? projects.filter(p => p.category === selectedCategory)
      : projects;

    const getAspectRatio = (index: number) => {
        const ratios = ["aspect-[4/3]", "aspect-[3/4]", "aspect-square", "aspect-[16/9]"];
        return ratios[index % ratios.length];
    };

    return (
      <div className="pt-48 min-h-screen bg-background pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <Reveal>
            <div className="mb-24 text-center">
              <h1 className="text-[10vw] md:text-[7rem] font-medium text-primary leading-[0.8] tracking-tighter uppercase">Showcase</h1>
              <p className="mt-8 text-2xl text-gray-500 font-light max-w-2xl mx-auto">A selection of our latest works designed to elevate brands and drive results.</p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex flex-wrap justify-center gap-6 mb-24">
               <button onClick={() => setSelectedCategory(null)} className={`px-8 py-3 rounded-full text-lg transition-all ${!selectedCategory ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>All Work</button>
               {["Logo & Brand Identity", "Packaging Design", "Web Development", "Mobile App Design"].map(cat => (
                 <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-8 py-3 rounded-full text-lg transition-all ${selectedCategory === cat ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>{cat}</button>
               ))}
            </div>
          </Reveal>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="break-inside-avoid mb-8">
                  <Reveal delay={(index % 3) * 100}>
                      <WorkCard project={project} aspectRatio={getAspectRatio(index)} />
                  </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAbout = () => (
    <div className="min-h-screen bg-background pb-0">
      <section className="pt-48 pb-32 bg-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div>
                <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-10">We Are <span className="text-primary font-normal">MastDzyn.</span></h1>
                <p className="text-xl font-light text-gray-600 leading-relaxed">Born from a desire to break the mold, MastDzyn is a creative movement. We believe that true creativity lies at the intersection of data, human psychology, and artistic expression.</p>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative z-10 bg-gray-100">
                      <img src="https://i.ibb.co/W4v8vVpB/image-6.jpg" alt="Our Studio Work" className="w-full h-full object-cover" />
                  </div>
                </div>
            </div>
            </Reveal>
        </div>
      </section>
      <StatsSection className="bg-white" />
    </div>
  );

  return (
    <div className="bg-background min-h-screen text-gray-900 font-light relative">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="relative z-10">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'work' && renderWork()}
        {currentPage === 'about' && renderAbout()}
        {currentPage === 'contact' && renderHome() /* Scroll to contact on home */}
      </main>
      <Footer />
      <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      <button onClick={scrollToTop} className={`fixed bottom-24 right-8 z-40 p-4 bg-white text-black rounded-full shadow-2xl transition-all ${showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}><ArrowUp className="w-6 h-6" /></button>
    </div>
  );
}

export default App;