import React, { useState, useEffect, useRef } from 'react';
/* Fix: Type-cast motion to any to resolve multiple environment-specific TypeScript errors */
import { motion as motionBase, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
const motion = motionBase as any;
import Lenis from 'lenis';
import emailjs from '@emailjs/browser';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Moon, 
  Sun, 
  ArrowRight, 
  ExternalLink, 
  Layers,
  Menu,
  X,
  ShieldCheck,
  Cpu, 
  Globe,
  Zap,
  Binary,
  Rocket,
  Brain,
  CheckCircle2,
  ArrowUpRight,
  ChevronUp,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';
import { EXPERIENCES, PROJECTS, SKILLS } from './data.ts';

// --- Components ---

const ImageWithFallback: React.FC<{ src: string; alt: string; className?: string; fallbackSrc?: string }> = ({ 
  src, 
  alt, 
  className, 
  fallbackSrc = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={className}
      onError={() => {
        if (!isError) {
          setIsError(true);
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
};

const ProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-[4px] bg-zinc-950 dark:bg-white z-[100] origin-left"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};

const SectionNavigator: React.FC = () => {
  const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed left-6 lg:left-10 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-8">
      {sections.map((s) => (
        <a 
          key={s} 
          href={`#${s}`}
          aria-label={`Scroll to ${s}`}
          className="group relative flex items-center justify-center"
        >
          <div className={`w-1 h-1 rounded-full transition-all duration-500 ${active === s ? 'bg-zinc-950 dark:bg-white scale-[3]' : 'bg-zinc-300 dark:bg-zinc-800'}`} />
          <span className="absolute left-8 opacity-0 group-hover:opacity-100 transition-all text-[8px] font-black tracking-widest uppercase text-zinc-400 pointer-events-none whitespace-nowrap">
            {s}
          </span>
        </a>
      ))}
    </div>
  );
};

const Navbar: React.FC<{ dark: boolean; setDark: (v: boolean) => void }> = ({ dark, setDark }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Philosophy', href: '#about' },
    { name: 'Stack', href: '#skills' },
    { name: 'Timeline', href: '#experience' },
    { name: 'Work', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-900 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="text-xl font-black tracking-tighter mono">
          SABIR<span className="text-zinc-400">_ALI</span>
        </a>
        
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-all"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:scale-105"
          >
            {dark ? <Sun size={14} className="text-zinc-400" /> : <Moon size={14} className="text-zinc-600" />}
          </button>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <button onClick={() => setDark(!dark)} className="p-2" aria-label="Toggle dark mode">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2" aria-label="Toggle menu">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-900 overflow-hidden"
          >
            <div className="p-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-2xl font-black tracking-tight uppercase">
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading: React.FC<{ children: React.ReactNode; subtitle?: string; label?: string }> = ({ children, subtitle, label }) => (
  <div className="mb-20 lg:mb-32">
    {label && (
      <motion.span 
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="inline-block text-[10px] font-black tracking-[0.5em] text-zinc-400 uppercase mb-8"
      >
        // {label}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-5xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black tracking-tighter leading-[0.8] mb-10"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-zinc-500 max-w-3xl text-lg md:text-2xl font-light italic"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const FloatingChip: React.FC<{ children: React.ReactNode; icon?: React.ReactNode; delay?: number; x?: number; y?: number }> = ({ children, icon, delay = 0, x = 0, y = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
    transition={{ 
      opacity: { delay, duration: 0.8 },
      scale: { delay, duration: 0.8 },
      y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 } 
    }}
    className="absolute z-20 hidden lg:flex items-center gap-3 px-5 py-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    <div className="p-1.5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-lg">
      {icon}
    </div>
    <span className="text-[9px] font-black tracking-widest uppercase whitespace-nowrap">{children}</span>
  </motion.div>
);

const Tooltip: React.FC<{ children: React.ReactNode; text: string }> = ({ children, text }) => (
  <div className="group relative">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[8px] font-black tracking-widest uppercase rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-[60]">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-zinc-900 dark:border-t-white" />
    </div>
  </div>
);

// --- Main App ---

const App: React.FC = () => {
  const [dark, setDark] = useState(true);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -400]);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ 
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'name') {
      if (!value.trim()) error = 'Payload identity required';
      else if (value.trim().length < 2) error = 'Identify with at least 2 characters';
    }
    if (name === 'email') {
      if (!value.trim()) error = 'Dispatch protocol required';
      else if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid communication protocol (Email)';
    }
    if (name === 'message') {
      if (!value.trim()) error = 'Payload data required';
      else if (value.trim().length < 10) error = 'Minimum 10 characters for transmission';
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name as keyof typeof touched]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, formData[name as keyof typeof formData]) }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('sabirsheik12787@gmail.com');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);

    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      setIsSubmitting(true);
      
      const SERVICE_ID = 'service_j0j25eq';
      const PUBLIC_KEY = 'G3O5uK74c4TDZEODQ';
      const NOTIFICATION_TEMPLATE = 'template_sz8p0tl';

      emailjs.send(SERVICE_ID, NOTIFICATION_TEMPLATE, {
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        message: formData.message,
      }, PUBLIC_KEY)
        .then(() => {
          setIsSubmitting(false);
          setIsSuccess(true);
          setFormData({ name: '', email: '', message: '' });
          setTouched({ name: false, email: false, message: false });
          setTimeout(() => setIsSuccess(false), 5000);
        })
        .catch((err) => {
          console.error('TRANSMISSION FAILED:', err);
          setIsSubmitting(false);
          alert('Transmission failed. Please check your connection or contact directly via email.');
        });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-700">
      <ProgressBar />
      <SectionNavigator />
      <Navbar dark={dark} setDark={setDark} />

      {/* Hero Section */}
      <header id="hero" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden pt-24 lg:pt-32">
        <div className="max-w-screen-2xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-6 mb-10"
            >
              <div className="w-16 h-[1px] bg-zinc-900 dark:bg-white" />
              <span className="text-[10px] font-black tracking-[0.5em] uppercase text-zinc-400">FULLSTACK_ENGINEER.v3.0</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
              className="text-6xl md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-black tracking-tighter leading-[0.8] mb-12"
            >
              SABIR <br />
              <span className="text-zinc-200 dark:text-zinc-900 italic underline decoration-1 underline-offset-[20px]">ALI.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-xl text-2xl md:text-3xl lg:text-4xl text-zinc-400 font-light leading-snug mb-16"
            >
              Architecting <span className="text-zinc-950 dark:text-zinc-100 font-bold italic">resilient digital systems</span> with MERN stack & cloud infrastructure for global scalability.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-8 items-center"
            >
              <a href="#projects" className="group px-12 py-8 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-black rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-2xl active:scale-95">
                VIEW WORK <ArrowRight size={20} className="ml-4 transition-transform group-hover:translate-x-2" />
              </a>
              <div className="flex gap-8">
                <Tooltip text="GitHub">
                  <a href="https://github.com/sabirsheik" target="_blank" className="text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"><Github size={24} /></a>
                </Tooltip>
                <Tooltip text="LinkedIn">
                  <a href="https://linkedin.com/in/sabir-ali-837501340" target="_blank" className="text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"><Linkedin size={24} /></a>
                </Tooltip>
              </div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 relative group">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="relative w-full aspect-[4/5] max-w-[500px] mx-auto lg:ml-auto"
            >
              <FloatingChip icon={<Zap size={16}/>} delay={0.8} x={-10} y={15}>Optimized Core</FloatingChip>
              <FloatingChip icon={<Brain size={16}/>} delay={1} x={85} y={20}>MERN Specialist</FloatingChip>
              <FloatingChip icon={<Rocket size={16}/>} delay={1.2} x={5} y={85}>Scale Native</FloatingChip>

              <div className="reveal-container relative w-full h-full rounded-[5rem] overflow-hidden border-[15px] border-zinc-50 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900 shadow-4xl transition-all duration-700 group-hover:border-zinc-200 dark:group-hover:border-zinc-800">
                <ImageWithFallback 
                  src="https://i.postimg.cc/GtDNPywB/Sabir.jpg" 
                  alt="Sabir Ali" 
                  className="w-full h-full object-cover grayscale brightness-[0.7] transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100 scale-[1.1] group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent group-hover:opacity-0 transition-opacity duration-1000" />
              </div>
              <div className="absolute -inset-10 -z-10 border-2 border-dashed border-zinc-100 dark:border-zinc-900 rounded-[6rem] opacity-20 group-hover:opacity-60 transition-all duration-1000 group-hover:rotate-3" />
            </motion.div>
          </div>
        </div>

        <motion.div 
          style={{ y: yParallax }}
          className="absolute -right-40 -bottom-60 -z-0 opacity-[0.02] dark:opacity-[0.04] text-[40rem] font-black tracking-tighter select-none pointer-events-none italic"
        >
          CORE
        </motion.div>
      </header>

      {/* Philosophy Section */}
      <section id="about" className="py-48 lg:py-64 px-6 md:px-12 lg:px-24 bg-zinc-50/50 dark:bg-zinc-900/10">
        <div className="max-w-screen-2xl mx-auto">
          <SectionHeading label="01. PHILOSOPHY" subtitle="Prioritizing data integrity, performance, and long-term maintainability over superficial trends.">
            Systems-First <br /> Approach.
          </SectionHeading>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 mt-20 lg:mt-32">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12 text-2xl md:text-3xl lg:text-4xl text-zinc-500 font-light leading-snug"
            >
              <p>
                I develop <span className="text-zinc-950 dark:text-zinc-100 font-bold underline decoration-zinc-300 underline-offset-4">robust backend infrastructures</span> that empower seamless frontend experiences. Every line of code is written with scalability in mind.
              </p>
              <p>
                With multi-year experience at <span className="text-zinc-950 dark:text-zinc-100 font-bold">SPEDMIC</span> and <span className="text-zinc-950 dark:text-zinc-100 font-bold">Evoxty</span>, I've mastered the art of delivering production-ready MERN solutions for high-concurrency environments.
              </p>
              <div className="grid grid-cols-3 gap-8 pt-16 border-t border-zinc-200 dark:border-zinc-800">
                <div className="space-y-2">
                  <p className="text-5xl md:text-7xl font-black tracking-tighter">06+</p>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">Total_Experience</p>
                </div>
                <div className="space-y-2">
                  <p className="text-5xl md:text-7xl font-black tracking-tighter">50+</p>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">Project_Deliveries</p>
                </div>
                <div className="space-y-2">
                  <p className="text-5xl md:text-7xl font-black tracking-tighter">99.9</p>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">System_Uptime</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[4rem] lg:rounded-[6rem] overflow-hidden bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 group"
            >
              <div className="absolute inset-0 p-3">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=85&w=1400" 
                  alt="Infrastructure" 
                  className="w-full h-full object-cover rounded-[3.5rem] lg:rounded-[5.5rem] grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-60 group-hover:opacity-100"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-12 left-12 flex items-center gap-6">
                <div className="p-4 bg-white text-black rounded-2xl shadow-xl">
                   <ShieldCheck size={32} />
                </div>
                <h4 className="text-3xl font-black text-white tracking-tight uppercase">High Availability <br /> Security</h4>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-48 lg:py-64 px-6 md:px-12 lg:px-24">
        <div className="max-w-screen-2xl mx-auto">
          <SectionHeading label="02. INFRASTRUCTURE" subtitle="A curated stack designed for performance, security, and developer velocity.">
            Production <br /> Stack.
          </SectionHeading>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-20 lg:mt-32">
            {SKILLS.map((cat, idx) => (
              <motion.div 
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group p-10 rounded-[4rem] bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/50 hover:bg-white dark:hover:bg-zinc-900 transition-all duration-700 hover:shadow-4xl"
              >
                <div className="mb-16 flex items-center justify-between">
                  <h3 className="font-black text-2xl tracking-tighter uppercase">{cat.title}</h3>
                  <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 transition-all duration-700 group-hover:bg-zinc-950 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-950">
                    {idx === 0 && <Layers size={22} />}
                    {idx === 1 && <Binary size={22} />}
                    {idx === 2 && <Globe size={22} />}
                    {idx === 3 && <Cpu size={22} />}
                  </div>
                </div>
                <ul className="space-y-8">
                  {cat.skills.map(skill => (
                    <li key={skill} className="flex items-center text-zinc-500 group/item">
                      <div className="w-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 mr-6 transition-all group-hover/item:w-8 group-hover/item:bg-zinc-950 dark:group-hover/item:bg-zinc-100" />
                      <span className="text-xl font-medium transition-colors group-hover/item:text-zinc-950 dark:group-hover/item:text-zinc-100">{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-48 lg:py-64 px-6 md:px-12 lg:px-24 bg-zinc-50/50 dark:bg-zinc-900/10">
        <div className="max-w-5xl mx-auto">
          <SectionHeading label="03. TIMELINE" subtitle="Evolution of technical expertise through real-world challenges and enterprise leadership.">
            Work <br /> History.
          </SectionHeading>
          
          <div className="mt-20 lg:mt-32">
            {EXPERIENCES.map((exp) => (
              <motion.div 
                key={exp.id} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative pl-12 pb-24 last:pb-0 border-l border-zinc-200 dark:border-zinc-900"
              >
                <div className="absolute left-[-1px] top-0 w-[2px] h-full bg-gradient-to-b from-zinc-400 dark:from-zinc-600 to-transparent opacity-20" />
                <div className="absolute left-[-6px] top-0 w-3 h-3 rounded-full bg-zinc-950 dark:bg-white shadow-xl" />
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-8">
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-bold tracking-tighter mb-2">{exp.role}</h3>
                    <p className="text-zinc-500 font-medium text-xl italic tracking-tight">{exp.company}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="text-[10px] font-black tracking-[0.3em] mono text-zinc-400 px-6 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full">{exp.period}</span>
                  </div>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start text-zinc-500 dark:text-zinc-400 leading-relaxed text-lg font-light">
                      <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700 mt-2 mr-5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-48 lg:py-64 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto">
          <SectionHeading label="04. CASE STUDIES" subtitle="Solving complex business problems through tailored software engineering solutions.">
            Core <br /> Projects.
          </SectionHeading>
          
          <div className="mt-20 lg:mt-32 space-y-48 lg:space-y-64">
            {PROJECTS.map((project, idx) => (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, scale: 0.9, y: 60 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className="flex-1 w-full group overflow-hidden rounded-[3rem] lg:rounded-[4rem]">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-[16/10] bg-zinc-100 dark:bg-zinc-900 p-2 overflow-hidden reveal-container"
                  >
                    <ImageWithFallback 
                      src={idx === 0 ? "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200" : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"}
                      alt={project.title} 
                      className="w-full h-full object-cover rounded-[2.5rem] lg:rounded-[3.5rem] grayscale brightness-75 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                    {project.links?.live && (
                      <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        <a href={project.links.live} target="_blank" className="p-4 lg:p-6 bg-white text-black rounded-2xl lg:rounded-3xl shadow-3xl hover:scale-110 flex items-center justify-center">
                          <ExternalLink size={24} />
                        </a>
                      </div>
                    )}
                  </motion.div>
                </div>
                <div className="flex-1 space-y-10">
                  <div className="space-y-4">
                    <span className="text-[10px] font-black tracking-[0.4em] text-zinc-400 uppercase">PROJECT_MODULE_{idx + 1}</span>
                    <h3 className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-tight">{project.title}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-zinc-100 dark:border-zinc-900 pt-10">
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">Architecture</h4>
                      <p className="text-zinc-500 text-lg lg:text-xl leading-relaxed font-light">{project.architecture}</p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">Impact</h4>
                      <p className="text-zinc-500 text-lg lg:text-xl leading-relaxed font-light">{project.solution}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.stack.map(tech => (
                      <span key={tech} className="px-5 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-[9px] font-bold tracking-widest uppercase text-zinc-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-64 lg:py-80 px-6 md:px-12 lg:px-24 bg-zinc-950 text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[45rem] font-black text-white/5 tracking-tighter pointer-events-none select-none italic -z-0" aria-hidden="true">
          READY
        </div>
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 relative z-10">
          <div className="flex flex-col justify-center">
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-7xl lg:text-[10rem] xl:text-[12rem] font-black tracking-tighter leading-[0.7] mb-16"
            >
              LET'S <br /> <span className="text-zinc-800 italic">DEPLOY.</span>
            </motion.h2>
            <p className="text-2xl md:text-3xl lg:text-4xl text-zinc-500 mb-20 max-w-xl font-light leading-snug">
              Currently open for Senior Full Stack roles and impactful software partnerships.
            </p>
            <div className="space-y-16">
              <div className="group flex flex-col md:flex-row md:items-center w-full md:w-fit transition-all hover:translate-x-4">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2.5rem] md:rounded-[3rem] border border-zinc-800 flex items-center justify-center md:mr-10 mb-6 md:mb-0 group-hover:bg-white group-hover:text-zinc-950 transition-all duration-700 group-hover:rotate-12 group-hover:scale-110 shadow-4xl">
                  <Mail size={32} />
                </div>
                <div className="flex flex-col">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700 mb-3">Direct Protocol</p>
                  <div className="flex items-center gap-4">
                    <p className="text-xl md:text-3xl lg:text-4xl font-medium tracking-tighter break-all lg:break-normal overflow-hidden text-ellipsis">sabirsheik12787@gmail.com</p>
                    <button 
                      onClick={copyToClipboard}
                      aria-label="Copy email address"
                      className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors relative"
                    >
                      {isCopied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} className="text-zinc-500" />}
                      <AnimatePresence>
                        {isCopied && (
                          <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] font-black tracking-widest uppercase px-3 py-1 rounded-lg"
                          >
                            Copied!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-900/40 backdrop-blur-3xl border border-zinc-800/50 p-8 md:p-20 rounded-[3rem] md:rounded-[5rem] shadow-4xl relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-24 h-24 rounded-full bg-white text-zinc-950 flex items-center justify-center mb-10 shadow-4xl animate-pulse-slow">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-4xl font-black tracking-tighter mb-4">Handshake Complete</h3>
                  <p className="text-zinc-500 text-lg font-light max-w-xs">Data packet received. I will initiate transmission shortly.</p>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-12 md:space-y-16" 
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                    <div className="space-y-4 relative group">
                      <div className="flex justify-between items-center">
                        <label className={`text-[10px] font-black uppercase tracking-[0.5em] transition-colors ${errors.name && touched.name ? 'text-red-500' : 'text-zinc-600'}`}>Full Name</label>
                        {touched.name && !errors.name && formData.name && <Check size={14} className="text-emerald-500" />}
                      </div>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('name')}
                        autoComplete="name"
                        className={`w-full bg-transparent border-b ${touched.name && errors.name ? 'border-red-500/50' : touched.name && !errors.name ? 'border-emerald-500/30' : 'border-zinc-800'} py-6 outline-none focus:border-white transition-all text-2xl font-light placeholder:text-zinc-800`} 
                        placeholder="e.g. John Doe" 
                      />
                      <AnimatePresence>
                        {touched.name && errors.name && (
                          <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-red-500 text-[10px] font-black tracking-widest uppercase mt-2"
                          >
                            <AlertCircle size={12} />
                            <span>{errors.name}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="space-y-4 relative group">
                      <div className="flex justify-between items-center">
                        <label className={`text-[10px] font-black uppercase tracking-[0.5em] transition-colors ${errors.email && touched.email ? 'text-red-500' : 'text-zinc-600'}`}>Email Protocol</label>
                        {touched.email && !errors.email && formData.email && <Check size={14} className="text-emerald-500" />}
                      </div>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('email')}
                        autoComplete="email"
                        className={`w-full bg-transparent border-b ${touched.email && errors.email ? 'border-red-500/50' : touched.email && !errors.email ? 'border-emerald-500/30' : 'border-zinc-800'} py-6 outline-none focus:border-white transition-all text-2xl font-light placeholder:text-zinc-800`} 
                        placeholder="e.g. john@example.com" 
                      />
                      <AnimatePresence>
                        {touched.email && errors.email && (
                          <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-red-500 text-[10px] font-black tracking-widest uppercase mt-2"
                          >
                            <AlertCircle size={12} />
                            <span>{errors.email}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="space-y-4 relative group">
                    <div className="flex justify-between items-center">
                      <label className={`text-[10px] font-black uppercase tracking-[0.5em] transition-colors ${errors.message && touched.message ? 'text-red-500' : 'text-zinc-600'}`}>Requirements Payload</label>
                      {touched.message && !errors.message && formData.message && <Check size={14} className="text-emerald-500" />}
                    </div>
                    <textarea 
                      rows={3} 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('message')}
                      className={`w-full bg-transparent border-b ${touched.message && errors.message ? 'border-red-500/50' : touched.message && !errors.message ? 'border-emerald-500/30' : 'border-zinc-800'} py-6 outline-none focus:border-white transition-all text-2xl font-light resize-none placeholder:text-zinc-800`} 
                      placeholder="Project details, goals, or inquiry..." 
                    />
                    <AnimatePresence>
                      {touched.message && errors.message && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-500 text-[10px] font-black tracking-widest uppercase mt-2"
                        >
                          <AlertCircle size={12} />
                          <span>{errors.message}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="group w-full py-10 md:py-12 bg-white text-zinc-950 font-black rounded-[2rem] md:rounded-[2.5rem] transition-all duration-1000 hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-8 shadow-4xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="tracking-[0.4em] text-[10px] md:text-xs uppercase">{isSubmitting ? 'Transmitting...' : 'Initiate Handshake'}</span>
                    {!isSubmitting && <ArrowRight size={26} className="transition-transform group-hover:translate-x-6" />}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative pt-32 pb-16 px-6 md:px-12 lg:px-24 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-32 mb-32">
            <div className="space-y-12">
              <a href="#" className="text-4xl font-black tracking-tighter mono block">
                SABIR<span className="text-zinc-400">_ALI</span>
              </a>
              <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-xs">
                Architecting scalable, secure, and production-ready systems for the modern web.
              </p>
              <div className="flex gap-6">
                 <Tooltip text="GitHub">
                   <a href="https://github.com/sabirsheik" target="_blank" className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-950 dark:hover:bg-white hover:text-white dark:hover:text-zinc-950 transition-all duration-500">
                      <Github size={20} />
                   </a>
                 </Tooltip>
                 <Tooltip text="LinkedIn">
                   <a href="https://linkedin.com/in/sabir-ali-837501340/" target="_blank" className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-950 dark:hover:bg-white hover:text-white dark:hover:text-zinc-950 transition-all duration-500">
                      <Linkedin size={20} />
                   </a>
                 </Tooltip>
              </div>
            </div>

            <div className="space-y-10">
              <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">// NAVIGATION</h5>
              <ul className="space-y-6">
                {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-xl font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors uppercase tracking-tight">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-10">
              <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">// LOCATION</h5>
              <div className="space-y-6">
                <div>
                  <p className="text-xl font-medium tracking-tight uppercase">Pakistan</p>
                  <p className="text-zinc-500 font-light italic mt-2">Remote-First // Hybrid Ready</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 mt-10 mb-4">Local Context</p>
                  <p className="text-4xl font-black mono tracking-tighter">
                    {new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Karachi' })} PKT
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-end items-start md:items-end gap-12">
               <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Back to top"
                className="group w-20 h-20 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-950 dark:hover:bg-white hover:text-white dark:hover:text-zinc-950 transition-all duration-700"
               >
                 <ChevronUp size={28} className="group-hover:-translate-y-2 transition-transform" />
               </button>
               <div className="text-left md:text-right">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-4">Current Status</p>
                  <div className="flex items-center gap-4 justify-start md:justify-end">
                    <span className="text-xl font-medium tracking-tight uppercase">Accepting New Projects</span>
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
               </div>
            </div>
          </div>

          <div className="pt-16 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col gap-4 items-center md:items-start">
              <p className="text-[10px] font-black tracking-[0.5em] mono text-zinc-300 dark:text-zinc-800 uppercase italic">
                SABIR_ALI // FULLSTACK_ENGINEER // V3.0
              </p>
              <p className="text-[9px] text-zinc-400 font-medium tracking-[0.3em] uppercase">
                &copy; {new Date().getFullYear()} ALL NODES OPERATIONAL.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-12 text-[9px] font-black uppercase tracking-[0.7em] text-zinc-200 dark:text-zinc-800">
              <span>MERN</span>
              <span>•</span>
              <span>SECURITY</span>
              <span>•</span>
              <span>SCALE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;