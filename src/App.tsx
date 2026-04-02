import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Instagram, 
  Twitter, 
  ExternalLink,
  Menu,
  X,
  Disc,
  Music,
  Layout,
  ChevronRight
} from 'lucide-react';
import { cn } from './lib/utils';
import innerCircleCover from './assets/inner-circle-cover.png';

// --- Components ---

const BackgroundEffects = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Radial Gradient Glow following mouse */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full bg-neon-green/5 blur-[120px] transition-transform duration-300 ease-out"
        style={{ 
          left: mousePos.x - 300, 
          top: mousePos.y - 300,
        }}
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neon-green/20 rounded-full"
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%',
            opacity: Math.random() * 0.5
          }}
          animate={{
            y: [null, '-20px', '20px', null],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
      isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
    )}>
      <div className="layout-container flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-2xl font-black tracking-tighter uppercase italic text-neon-green stretched-text">
            Ventura
          </span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-8">
          {['Work', 'Services', 'Philosophy', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-white/60 hover:text-neon-green transition-colors"
            >
              {item}
            </a>
          ))}
          <a href="https://tally.so/r/1AvJ6g" target="_blank" rel="noreferrer" className="px-5 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neon-green transition-all duration-300 neon-glow">
            Start Project
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {['Work', 'Services', 'Philosophy', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-lg font-bold text-white/80"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-28 md:py-32 text-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center motion-reduce:hidden">
        <motion.div
          initial={{ opacity: 0.5, scale: 0.2 }}
          animate={{ opacity: 0, scale: 1.9 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute w-[380px] h-[380px] rounded-full border border-neon-green/60"
        />
        <motion.div
          initial={{ opacity: 0.35, scale: 0.3 }}
          animate={{ opacity: 0, scale: 2.3 }}
          transition={{ duration: 1.35, ease: "easeOut", delay: 0.08 }}
          className="absolute w-[380px] h-[380px] rounded-full border border-neon-green/35"
        />
        <motion.div
          initial={{ opacity: 0.22, scale: 0.45 }}
          animate={{ opacity: 0, scale: 2.7 }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.14 }}
          className="absolute w-[380px] h-[380px] rounded-full bg-neon-green/10 blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="layout-container z-10 w-full max-w-[1200px] flex flex-col items-center justify-center"
      >
        <div className="mb-8 inline-flex items-center justify-center px-3 py-1 border border-neon-green/30 bg-neon-green/5 rounded-full">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neon-green">
            Visual Identity Studio
          </span>
        </div>
        
        <h1 className="w-full max-w-[1100px] mx-auto text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase italic leading-[0.85] mb-10 flex flex-col items-center">
          <span className="block text-white">Where sound</span>
          <span className="block text-neon-green neon-text-glow">meets vision.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 font-medium mb-12 leading-relaxed text-center">
          Ventura helps artists build clean, high-end visuals that match their sound.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <a href="https://tally.so/r/1AvJ6g" target="_blank" rel="noreferrer" className="group relative px-8 py-4 bg-neon-green text-black font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
              Start your project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          
          <button className="px-8 py-4 border border-white/20 hover:border-neon-green text-white font-bold uppercase tracking-widest transition-all duration-300 hover:bg-white/5">
            View work
          </button>
        </div>
      </motion.div>

      {/* Abstract Background Shape */}
      <motion.div 
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-neon-green/10 rounded-full pointer-events-none opacity-20"
      >
        <div className="absolute inset-0 border border-neon-green/5 rounded-full scale-75 rotate-45" />
        <div className="absolute inset-0 border border-neon-green/5 rounded-full scale-50 -rotate-12" />
      </motion.div>
    </section>
  );
};

const ValueProp = () => {
  const pillars = [
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Visual Identity",
      desc: "Comprehensive branding systems for artists and labels that command attention."
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Content Systems",
      desc: "Cover art, social assets, and vinyl packaging designed for the digital and physical age."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "High-End Design",
      desc: "Minimal, techno-inspired aesthetics that prioritize quality over clutter."
    }
  ];

  return (
    <section id="services" className="py-32 bg-black relative z-10">
      <div className="layout-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group p-8 glass-card hover:border-neon-green/50 transition-all duration-500 text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-neon-green/10 flex items-center justify-center mb-6 group-hover:bg-neon-green group-hover:text-black transition-all duration-300">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tighter mb-4 text-white group-hover:text-neon-green transition-colors">
                {pillar.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DeeperValue = () => {
  return (
    <section id="philosophy" className="py-32 relative overflow-hidden">
      <div className="layout-container grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic mb-8 leading-none">
            Built for <span className="text-neon-green">Music Culture.</span>
          </h2>
          <div className="space-y-8">
            <div className="flex flex-col items-center gap-4">
              <div className="flex-shrink-0 w-px h-12 bg-neon-green" />
              <div>
                <h4 className="text-lg font-bold uppercase tracking-widest mb-2">Not Generic</h4>
                <p className="text-white/50">Everything is tailored to your specific sound. We don't do templates.</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex-shrink-0 w-px h-12 bg-neon-green" />
              <div>
                <h4 className="text-lg font-bold uppercase tracking-widest mb-2">Underground Focus</h4>
                <p className="text-white/50">Deeply rooted in house, techno, and underground electronic music.</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex-shrink-0 w-px h-12 bg-neon-green" />
              <div>
                <h4 className="text-lg font-bold uppercase tracking-widest mb-2">Consistency</h4>
                <p className="text-white/50">Seamless visual experience across Spotify, Instagram, and physical media.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square"
        >
          <div className="absolute inset-0 bg-neon-green/5 rounded-full blur-3xl" />
          <div className="relative z-10 w-full h-full border border-white/10 p-4">
             <div className="w-full h-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                {/* Abstract Visual Representation */}
                <div className="relative w-64 h-64">
                   {[...Array(8)].map((_, i) => (
                     <motion.div
                       key={i}
                       className="absolute inset-0 border border-neon-green/20"
                       animate={{ 
                         rotate: i * 45,
                         scale: [1, 1.2, 1],
                         opacity: [0.2, 0.5, 0.2]
                       }}
                       transition={{ 
                         duration: 4, 
                         repeat: Infinity, 
                         delay: i * 0.5 
                       }}
                     />
                   ))}
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Disc className="w-12 h-12 text-neon-green animate-spin-slow" style={{ animationDuration: '10s' }} />
                   </div>
                </div>
             </div>
          </div>
          {/* Decorative Dotted Line */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 border-r border-b border-dashed border-neon-green/30" />
        </motion.div>
      </div>
    </section>
  );
};

const Proof = () => {
  const projects = [
    { title: "Inner Circle Cover", category: "Cover Art", img: innerCircleCover },
    { title: "Void Label", category: "Branding", img: "https://picsum.photos/seed/techno2/800/800" },
    { title: "Berlin Series", category: "Content System", img: "https://picsum.photos/seed/techno3/800/800" },
    { title: "Pulse Vinyl", category: "Packaging", img: "https://picsum.photos/seed/techno4/800/800" },
  ];

  return (
    <section id="work" className="py-32 bg-black">
      <div className="layout-container">
        <div className="flex flex-col items-center mb-16 gap-8 text-center">
          <div className="flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic mb-4">
              Selected <span className="text-neon-green">Works.</span>
            </h2>
            <p className="text-white/50 max-w-md">A glimpse into the visual worlds we've built for artists worldwide.</p>
          </div>
          <button className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neon-green">
            View Archive <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden aspect-[4/3] cursor-pointer"
            >
              <img 
                src={project.img} 
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 inset-x-0 p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 text-center">
                <span className="text-xs font-bold text-neon-green uppercase tracking-[0.2em] mb-2 block">{project.category}</span>
                <h3 className="text-2xl font-black uppercase italic text-white">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            {
              text: "Ventura understood my sound before I even explained it. The visuals they built for my last tour were game-changing.",
              author: "Kaelen",
              role: "Producer / DJ"
            },
            {
              text: "The minimal aesthetic is exactly what we needed for the label. Clean, high-end, and perfectly aligned with our techno roots.",
              author: "Marco S.",
              role: "Label Head, Void Records"
            }
          ].map((t, i) => (
            <div key={i} className="p-10 border border-neon-green/30 bg-white/5 text-center">
              <p className="text-xl text-white/80 italic mb-6">"{t.text}"</p>
              <div>
                <p className="font-bold uppercase tracking-widest text-neon-green">{t.author}</p>
                <p className="text-xs text-white/40 uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-40 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-neon-green/5 opacity-50" />
      <div className="layout-container max-w-4xl relative z-10">
        <h2 className="text-5xl md:text-8xl tracking-tighter uppercase italic mb-8 leading-none flex flex-col items-center">
          <span className="font-medium text-white">START RELEASING</span>
          <span className="font-black text-neon-green">GOOD MUSIC</span>
          <span className="font-medium text-white">WITH</span>
          <span className="font-black text-neon-green">GOOD VISUALS</span>
        </h2>
        <motion.a
          href="https://tally.so/r/1AvJ6g"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-lg hover:bg-neon-green transition-colors duration-300 neon-glow"
        >
          Work with Ventura
        </motion.a>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/10 bg-black">
      <div className="layout-container flex flex-col items-center gap-12 text-center">
        <div className="text-center flex flex-col items-center">
          <span className="text-3xl font-black tracking-tighter uppercase italic text-neon-green stretched-text mb-4 block">
            Ventura
          </span>
          <p className="text-white/40 text-sm max-w-md">
            A movement for artists who care about how their music looks. Based in Berlin. Available worldwide.
          </p>
        </div>

        <div className="flex gap-8">
          <a href="https://www.instagram.com/ventura.zip/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-neon-green transition-colors"><Instagram /></a>
          <a href="#" className="text-white/60 hover:text-neon-green transition-colors"><Twitter /></a>
          <a href="#" className="text-white/60 hover:text-neon-green transition-colors"><Music /></a>
        </div>

        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Inquiries</p>
          <a href="mailto:hello@ventura.studio" className="text-lg font-bold text-white hover:text-neon-green transition-colors">
            hello@ventura.studio
          </a>
        </div>
      </div>
      <div className="layout-container mt-20 pt-8 border-t border-white/5 flex flex-col items-center gap-2 text-[10px] uppercase tracking-widest text-white/20 text-center">
        <p>© 2026 Ventura Creative Studio</p>
        <p>All Rights Reserved</p>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="bg-black text-white selection:bg-neon-green selection:text-black min-h-screen font-sans">
      <BackgroundEffects />
      <Navbar />
      
      <main>
        <Hero />
        <ValueProp />
        <DeeperValue />
        <Proof />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
