import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, Activity, Clock, Zap, RotateCcw, Cpu, 
  Award, ShieldCheck, ArrowRight, Play, Pause,
  Sparkles, CheckCircle2, FlaskConical, Target, Flag
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

// Reusable Animated Counter component for that premium investor-ready feel
function AnimatedCounter({ target, suffix = "", prefix = "", className = "text-white" }: { target: number; suffix?: string; prefix?: string; className?: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    let start = 0;
    const end = target;

    const runCounter = () => {
      const duration = 1200; // ms
      const increment = end / (duration / 16); 
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      return () => clearInterval(timer);
    };

    if (elementRef.current) {
      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          runCounter();
          observer.disconnect();
        }
      }, { threshold: 0.2 });
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [target]);

  return (
    <span ref={elementRef} className={`font-sans font-black tracking-tight ${className}`}>
      {prefix}
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

// Robust fallback image component that handles loading and failure gracefully
function TimelineImage({ src, alt }: { src: string; alt: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full bg-neutral-100 overflow-hidden">
      {/* Premium Shimmer Skeleton Loader */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-neutral-200 animate-pulse flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
        </div>
      )}

      {/* If error: show custom sports science vector display instead of native broken icon */}
      {hasError ? (
        <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center p-6 text-center space-y-2 select-none border border-neutral-800">
          <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-orange-500">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">ELECTRONA GRAPHICS</p>
          <p className="text-[10px] text-neutral-500">Data Feed Offline</p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out filter contrast-[1.02] brightness-95 ${
            isLoaded ? 'opacity-100 scale-100 group-hover:scale-105' : 'opacity-0 scale-105'
          }`}
        />
      )}
    </div>
  );
}

// Structured high-end timeline roadmap stages
const timelineData = [
  {
    phase: "01 — Phase Identified",
    heading: "Problem Identified",
    desc: "Observing sub-optimal physical stamina and severe cramping among academy athletes competing under hot regional climates with sugar-loaded sports drinks.",
    img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800&auto=format&fit=crop",
    metric: "500+ Athletes Studied",
    metricColor: "text-orange-600 bg-orange-50 border-orange-100",
    nodeColor: "#FF6A00",
  },
  {
    phase: "02 — Research & Formulation",
    heading: "Research & Formulation",
    desc: "Formulating a dynamic electrolyte matrix based on sweat-rates using freeze-dried regional fruits (Kokum, Jamun, Lime) rich in bio-active cellular osmolytes.",
    img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800&auto=format&fit=crop",
    metric: "3 Years Research",
    metricColor: "text-amber-600 bg-amber-50 border-amber-100",
    nodeColor: "#FFAA00",
  },
  {
    phase: "03 — Product Development",
    heading: "Product Development",
    desc: "Converting biochemistry metrics into secure phase sachet packaging. Securing WADA compliance limits while retaining fruit enzymes without chemical preservatives.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    metric: "WADA Compliant",
    metricColor: "text-cyan-600 bg-cyan-50 border-cyan-100",
    nodeColor: "#06B6D4",
  },
  {
    phase: "04 — Athlete Testing",
    heading: "Athlete Testing",
    desc: "Running field tests across competitive state sports academies showing 3x speedier de-acidification, robust fluid-osmotic balance, and zero localized muscle cramps.",
    img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    metric: "100+ Trial Sessions",
    metricColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
    nodeColor: "#10B981",
  },
  {
    phase: "05 — Launch & Growth",
    heading: "Launch & Growth",
    desc: "Supporting team development across India from primary school leagues to elite state chapters, securing national innovation titles and scientific startup backing.",
    img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop",
    metric: "National Recognition",
    metricColor: "text-[#84CC16] bg-lime-50 border-lime-100",
    nodeColor: "#84CC16",
  }
];

// Fade in up animation variants for standard scroll entries
const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const slideVariants = {
  enter: { opacity: 0, scale: 0.98 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 1.01, transition: { duration: 0.4, ease: "easeIn" } }
};

export default function AboutTab() {
  // Carousel State for Section 03
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], ["0%", "15%"]);

  const roadmapContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: roadmapScrollYProgress } = useScroll({
    target: roadmapContainerRef,
    offset: ["start end", "end start"]
  });
  const lineReveal = useTransform(roadmapScrollYProgress, [0.15, 0.75], [0, 1]);

  const carouselSlides = [
    {
      phase: "PREPARE",
      title: "Build Hydration and Readiness",
      description: "Build deep hydration reserves and physiological readiness before competition. Lock in potassium and natural osmolytes to prime active muscles before sweat rates escalate.",
      color: "#8B5CF6", // Purple
      bgGradient: "from-purple-500/10 via-purple-500/5 to-transparent",
      badgeColor: "bg-purple-150 text-purple-700 border-purple-200/50 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/40",
      accentLine: "bg-purple-500",
      target: "Focus & Osmotic Pre-Load",
      icon: Clock
    },
    {
      phase: "PERFORM",
      title: "Sustain Energy and Mineral Balance",
      description: "Maintain core endurance, cardiovascular oxygenation, and fluid balance during play. Sustain active hydration parameters as sports stress accelerates.",
      color: "#EA580C", // Orange
      bgGradient: "from-orange-500/10 via-orange-500/5 to-transparent",
      badgeColor: "bg-orange-100/70 text-orange-700 border-orange-200/40 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800/40",
      accentLine: "bg-orange-500",
      target: "VO2 Max & Hydration Sustain",
      icon: Zap
    },
    {
      phase: "RECOVER",
      title: "Restore and De-Acidify Fast",
      description: "Neutralize biochemical lactic acid, speed up overall glycogen restoration levels, and reset systemic cell pH fast to combat localized muscle fatigue.",
      color: "#16A34A", // Green
      bgGradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200/50 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40",
      accentLine: "bg-emerald-500",
      target: "Lactic Reset & Muscle Restore",
      icon: RotateCcw
    }
  ];

  // Auto rotation of slides
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, carouselSlides.length]);

  return (
    <div className="relative bg-white text-left font-sans overflow-hidden" id="about-story-page">
      
      {/* ---------------- SECTION 01 — HERO (REDESIGNED) ---------------- */}
      <section className="relative min-h-[92vh] flex items-center p-6 md:p-12 lg:p-24 overflow-hidden border-b border-neutral-900 bg-neutral-950 text-white" id="about-hero">
        {/* Full-width Background Image Layer with Zoom & Subtle Parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            style={{ 
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(10, 10, 10, 0.6)), url('/about.jpg'), url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2200&auto=format&fit=crop')`,
              y: yBg
            }}
            className="absolute inset-0 w-full h-[120%] -translate-y-[10%] bg-cover bg-center bg-no-repeat"
          />
        </div>

        {/* Cinematic Vignette Overlay mapping out soft lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(0,0,0,0)_20%,rgba(10,10,10,0.6)_60%,rgba(10,10,10,0.9)_100%)] pointer-events-none z-[1]" />
        
        {/* Soft Organic Glow Background Backdrops (Subtle orange glow) */}
        <div className="absolute top-[25%] left-[20%] w-[250px] md:w-[600px] h-[250px] md:h-[600px] bg-[#FF6A00]/[0.08] rounded-full filter blur-[150px] pointer-events-none z-[1]" />
        
        <div className="w-full max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-20">
          {/* Left Side Content Block */}
          <div className="lg:col-span-7 space-y-8 flex flex-col items-start text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 font-mono text-[10px] font-bold text-[#FF6A00] tracking-[0.25em] uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse" />
              ABOUT ELECTRONA
            </motion.div>

            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-sans font-black tracking-tight leading-[1.05] text-white"
              >
                Engineering Athlete <br className="hidden md:inline" />
                <span className="text-[#FF6A00]">Performance</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed"
              >
                Electrona engineered a sophisticated, athlete-first hydration approach targeting the specific metabolic parameters of human performance. We formulate high-science hydration to fuel preparation, sustain core endurance, and accelerate recovery.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-2"
            >
              <button 
                onClick={() => {
                  const targetSec = document.getElementById('why-exists-section');
                  if (targetSec) targetSec.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative inline-flex items-center gap-3 bg-white/5 hover:bg-[#FF6A00]/10 border border-white/10 hover:border-[#FF6A00]/40 text-white font-mono text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,106,0,0.15)] cursor-pointer backdrop-blur-md"
              >
                Explore Our Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#FF6A00]" />
              </button>
            </motion.div>
          </div>

          {/* Right Side Glass Metric Panels */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.12
                  }
                }
              }}
              className="space-y-4 md:space-y-6"
            >
              {[
                {
                  value: "350+",
                  label: "Athletes Reached",
                  desc: "Formulated for elite sports academies and physical demands."
                },
                {
                  value: "3-Phase",
                  label: "Hydration System",
                  desc: "Science-backed formulas targeting before, during, and after play."
                },
                {
                  value: "100%",
                  label: "Natural Ingredients",
                  desc: "Zero synthetic chemicals or artificial colors. Pure cellular fuel."
                }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, x: 20, y: 10 },
                    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  whileHover={{ scale: 1.025, y: -4 }}
                  className="group relative bg-black/40 backdrop-blur-md border border-white/[0.08] hover:border-[#FF6A00]/30 rounded-2xl p-6 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(255,106,0,0.06)]"
                >
                  {/* Subtle Top Accent Line inside hover container */}
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-[#FF6A00] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
                  
                  <div className="flex justify-between items-start">
                    <div className="space-y-1.5 text-left">
                      <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans flex items-baseline gap-1">
                        {stat.value}
                      </div>
                      <div className="font-mono text-[10px] font-bold text-[#FF6A00] tracking-wider uppercase">
                        {stat.label}
                      </div>
                      <p className="text-neutral-400 text-xs sm:text-[13px] leading-relaxed pt-1 max-w-[90%]">
                        {stat.desc}
                      </p>
                    </div>
                    {/* Tiny visual premium detail */}
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-700 group-hover:bg-[#FF6A00] transition-colors duration-500 mt-2" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>      {/* ---------------- SECTION 02 — WHY ELECTRONA EXISTS (REDESIGNED) ---------------- */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white via-neutral-50/20 to-white border-b border-neutral-100 scroll-mt-10 overflow-hidden" id="why-exists-section">
        {/* Subtle, expensive background details - soft warm/orange glow & high-end grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#FF6A00]/[0.03] rounded-full filter blur-[120px]" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT SIDE: Storytelling & Statements */}
            <div className="lg:col-span-7 space-y-8 flex flex-col items-start text-left">
              <div className="space-y-4">
                <motion.span 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="font-mono text-xs font-bold text-[#FF6A00] uppercase tracking-[0.25em] block"
                >
                  WHY ELECTRONA EXISTS
                </motion.span>
                
                <div className="space-y-3">
                  <motion.h2 
                    initial={{ opacity: 0, y: 25, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-[1.1] font-sans"
                  >
                    Athletes Don't Need Another Sports Drink.
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl sm:text-3xl font-bold text-neutral-700 font-sans"
                  >
                    They Need <span className="text-[#FF6A00]">Performance Support.</span>
                  </motion.p>
                </div>
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-neutral-500 text-sm sm:text-base leading-relaxed max-w-xl select-none"
              >
                Traditional hydration options are built for mass-market refreshment, overloaded with sugar and chemical additives. Electrona was founded to pioneer clean, phase-specific physiological support. We design targeted electrolyte structures that align perfectly with the metabolic demands of preparation, sustained exertion, and muscle recovery.
              </motion.p>
              
              {/* Subtle thin decorative layout accent line */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-[1px] w-48 bg-neutral-205 bg-neutral-200 origin-left"
              />
            </div>

            {/* RIGHT SIDE: Exquisite Stat Cards */}
            <div className="lg:col-span-5">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.15
                    }
                  }
                }}
                className="space-y-6"
              >
                {[
                  {
                    value: 40,
                    suffix: "%",
                    title: "Athletes experience performance decline from poor hydration.",
                    icon: Activity
                  },
                  {
                    value: 1,
                    suffix: " Coach",
                    title: "Often supports hundreds of young athletes.",
                    icon: Trophy
                  },
                  {
                    value: 3,
                    suffix: " Critical Phases",
                    title: "Before, During, After competition.",
                    icon: Zap
                  }
                ].map((stat, idx) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, x: 40, y: 20 },
                        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      className="group relative bg-white/70 backdrop-blur-md border border-neutral-200/50 rounded-2xl p-6 hover:border-[#FF6A00]/30 transition-all duration-500 hover:shadow-[0_12px_45px_rgba(255,106,0,0.06)] flex items-start gap-5 text-left"
                    >
                      {/* Subtle side accent line */}
                      <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-[#FF6A00] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-middle rounded-full" />
                      
                      {/* Premium subtle icon container */}
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-orange-50/50 text-[#FF6A00] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Stats and text display */}
                      <div className="space-y-1.5 flex-1">
                        <div className="text-3xl sm:text-4xl font-black font-sans tracking-tight text-neutral-900 flex items-baseline">
                          <AnimatedCounter 
                            target={stat.value} 
                            suffix={stat.suffix} 
                            className="text-neutral-900 group-hover:text-[#FF6A00] transition-colors duration-300"
                          />
                        </div>
                        <p className="text-neutral-520 text-xs sm:text-[13px] leading-relaxed text-neutral-500 select-none">
                          {stat.title}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- SECTION 03 — A SIMPLE IDEA (FIXED SIZE PREMIUM CAROUSEL) ---------------- */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-white border-b border-neutral-100" id="carousel-mission">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-3">
            <span className="font-mono text-xs font-bold text-purple-600 uppercase tracking-widest block">
              PHYSIOLOGICAL CONTEXT
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight uppercase font-display">
              A SIMPLE IDEA.
            </h2>
            <p className="text-neutral-450 font-mono text-xs font-semibold uppercase tracking-wider">
              One athlete. One match. Three performance moments.
            </p>
            <div className="w-12 h-1 bg-purple-600 mx-auto rounded-full mt-4" />
          </div>

          {/* Redesigned Fixed-Width, Fixed-Height Carousel Card (No Jumps, No Shifts) */}
          <div 
            className="relative bg-neutral-950 border border-neutral-800 rounded-[30px] p-8 md:p-12 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl h-[340px] md:h-[300px] w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            id="premium-athlete-carousel"
          >
            {/* Ambient subtle colored backing matching active slide */}
            <div className="absolute inset-0 bg-neutral-950 transition-colors duration-1000" />
            <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-1000 opacity-20 pointer-events-none ${carouselSlides[currentSlide].bgGradient}`} />
            
            {/* Dynamic content holder with fixed height constraints */}
            <div className="relative z-10 flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                >
                  {/* Column 1: Core content */}
                  <div className="md:col-span-9 text-left space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-neutral-700 bg-neutral-900 text-[10px] font-mono font-bold uppercase tracking-wider text-white">
                        {React.createElement(carouselSlides[currentSlide].icon, { className: "w-3 h-3 animate-pulse", style: { color: carouselSlides[currentSlide].color } })}
                        {carouselSlides[currentSlide].phase}
                      </span>
                      <span className="font-mono text-[9px] text-neutral-450 font-bold uppercase tracking-wider">TARGET: {carouselSlides[currentSlide].target}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase font-display leading-tight tracking-tight">
                      {carouselSlides[currentSlide].title}
                    </h3>

                    {/* Restrict paragraph strictly to maximum 2 lines with robust truncation / length limit */}
                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-2xl font-light line-clamp-2">
                      {carouselSlides[currentSlide].description}
                    </p>
                  </div>

                  {/* Column 2: Ambient circular icon */}
                  <div className="md:col-span-3 hidden md:flex justify-end">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center border border-neutral-800 bg-neutral-900 shadow-lg relative shrink-0">
                      {React.createElement(carouselSlides[currentSlide].icon, { 
                        className: "w-8 h-8 transition-colors duration-500",
                        style: { color: carouselSlides[currentSlide].color }
                      })}
                      {/* Interactive ring highlight */}
                      <div 
                        className="absolute inset-[-4px] border border-dashed rounded-full animate-spin [animation-duration:35s] opacity-30" 
                        style={{ borderColor: carouselSlides[currentSlide].color }}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Custom high-end visual progress indicator timeline (No Chevrons, No Manual Nav Jumps) */}
            <div className="relative z-10 flex items-center justify-between border-t border-neutral-900/60 pt-4 mt-4">
              
              {/* Play / Pause indicator label */}
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 font-mono text-[8px] font-black text-orange-400 bg-orange-950/20 px-2 py-0.5 rounded uppercase">
                  <Play className="w-2.5 h-2.5" /> Auto rotating
                </span>
              </div>

              {/* Progress Bar Dots */}
              <div className="flex items-center gap-3">
                {carouselSlides.map((slide, idx) => {
                  const isActive = idx === currentSlide;
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className="relative h-1.5 rounded-full overflow-hidden transition-all duration-500 cursor-pointer"
                      style={{ 
                        width: isActive ? '36px' : '12px',
                        backgroundColor: isActive ? slide.color : '#333333'
                      }}
                      title={`Show Phase: ${slide.phase}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  );
                })}
              </div>

              {/* Minimalist branding label */}
              <span className="font-mono text-[8px] tracking-widest text-[#7C3AED] leading-none font-bold uppercase">
                ELECTRONA CYCLE
              </span>

            </div>

          </div>
        </div>
      </section>

      {/* ---------------- SECTION 04 — THE ELECTRONA JOURNEY TIMELINE (REDESIGNED) ---------------- */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white border-b border-neutral-100 scroll-mt-6 overflow-hidden" id="the-journey-section">
        {/* Sports Science grid texture & faint dot pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          {/* Very faint grid */}
          <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:36px_36px]" />
          {/* Faint science dots */}
          <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#808080_1.2px,transparent_1.2px)] [background-size:18px_18px]" />
          {/* Soft ambient radial glows centered behind active journey phases */}
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FF6A00]/[0.02] rounded-full filter blur-[140px]" />
          <div className="absolute top-[55%] left-1/3 w-[500px] h-[500px] bg-[#06B6D4]/[0.015] rounded-full filter blur-[120px]" />
          <div className="absolute bottom-[10%] right-1/4 w-[500px] h-[500px] bg-[#84CC16]/[0.015] rounded-full filter blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24 space-y-4">
            <span className="font-mono text-xs font-bold text-[#FF6A00] uppercase tracking-[0.25em] block">
              ORIGINS & MILESTONES
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight uppercase font-sans">
              THE ELECTRONA JOURNEY
            </h2>
            <div className="w-12 h-1 bg-[#FF6A00] mx-auto rounded-full" />
            <p className="text-neutral-500 text-sm md:text-base font-normal max-w-xl mx-auto leading-relaxed pt-2 select-none">
              From identifying the physiological problem to testing sachet stability and pioneering athlete-first hydration systems.
            </p>
          </div>

          {/* Premium Vertical Alternating Timeline with Centered Node Line on Desktop */}
          <div className="relative w-full">
            
            {/* Background track line */}
            <div className="absolute left-[24px] md:left-1/2 top-10 bottom-10 w-[3px] bg-neutral-100/80 -translate-x-1/2 z-0 rounded-full" />
            
            {/* Gradient timeline path: Electrona Orange -> Cyan -> Lime Green */}
            <motion.div 
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-[24px] md:left-1/2 top-10 bottom-10 w-[3px] bg-gradient-to-b from-[#FF6A00] via-[#06B6D4] to-[#84CC16] origin-top -translate-x-1/2 z-0 rounded-full"
            />

            {/* Compact timeline cards spacing */}
            <div className="space-y-12 md:space-y-20 relative">
              {timelineData.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                
                return (
                  <motion.div 
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-120px" }}
                    variants={{
                      hidden: {},
                      visible: {}
                    }}
                    className={`relative flex flex-col md:flex-row ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center justify-between w-full`}
                  >
                    {/* Centered Node of the current stage: White center, Colored ring, Smooth pulse animation */}
                    <motion.div 
                      variants={{
                        hidden: { scale: 0.6, opacity: 0 },
                        visible: { scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.1 } }
                      }}
                      className="absolute left-[24px] md:left-1/2 -translate-x-1/2 top-7 md:top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center z-20 shadow-[0_3px_10px_rgba(0,0,0,0.06)] border cursor-pointer group"
                      style={{ borderColor: item.nodeColor }}
                    >
                      {/* Colored central ring with white inner dot */}
                      <div 
                        className="w-4 h-4 rounded-full flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: item.nodeColor }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      
                      {/* Ambient delicate pulsing ring */}
                      <div 
                        className="absolute inset-[-4px] rounded-full border border-dashed opacity-40 animate-[spin_10s_linear_infinite]"
                        style={{ borderColor: item.nodeColor }}
                      />
                      <div 
                        className="absolute inset-[-2px] rounded-full animate-ping opacity-15"
                        style={{ backgroundColor: item.nodeColor }}
                      />
                    </motion.div>

                    {/* Timeline card container spacing sit compact: brought closer */}
                    <div className="w-full md:w-[46%] pl-14 md:pl-0">
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 30 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        whileHover={{ y: -6, scale: 1.01 }}
                        className="group w-full bg-white/70 backdrop-blur-md border border-neutral-200/50 hover:border-[#FF6A00]/25 rounded-[24px] p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(255,106,0,0.07)] transition-all duration-500 text-left relative overflow-hidden"
                      >
                        {/* Interactive glow spotlight behind hovered card */}
                        <div className="absolute -inset-px bg-gradient-to-tr from-[#FF6A00]/[0.02] via-[#06B6D4]/[0.01] to-[#84CC16]/[0.02] rounded-[24px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative z-10 space-y-4">
                          {/* [ Large Image ] - all identical aspect-ratio and height with smooth parallax zoom effect */}
                          <div className="h-52 w-full rounded-[18px] overflow-hidden bg-neutral-100 border border-neutral-200/40 relative shadow-inner">
                            <motion.div 
                              variants={{
                                hidden: { scale: 1.05 },
                                visible: { scale: 1, transition: { duration: 1.2, ease: "easeOut" } }
                              }}
                              className="w-full h-full"
                            >
                              <TimelineImage src={item.img} alt={item.heading} />
                            </motion.div>
                          </div>

                          <div className="space-y-2">
                            {/* Small Phase Label */}
                            <span className="font-mono text-[10px] font-bold text-neutral-400 tracking-wider uppercase block">
                              {item.phase}
                            </span>
                            
                            {/* Large Heading */}
                            <h3 className="text-xl font-bold font-sans text-neutral-900 tracking-tight uppercase group-hover:text-[#FF6A00] transition-colors duration-300">
                              {item.heading}
                            </h3>

                            {/* Short Description */}
                            <p className="text-neutral-500 text-xs sm:text-[13px] leading-relaxed select-none">
                              {item.desc}
                            </p>
                          </div>

                          {/* Optional Metric Badge - premium slide transition-all */}
                          <div className="pt-3 border-t border-neutral-100/80 flex items-center justify-between">
                            <motion.div 
                              variants={{
                                hidden: { opacity: 0, x: -10 },
                                visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
                              }}
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider ${item.metricColor}`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                              {item.metric}
                            </motion.div>

                            {/* Subtle premium action arrow indicator */}
                            <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-[#FF6A00] group-hover:translate-x-1.5 transition-all duration-300" />
                          </div>

                        </div>
                      </motion.div>
                    </div>

                    {/* Empty placeholder column on standard alternating side */}
                    <div className="hidden md:block md:w-[46%]" />

                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- SECTION 05 — PEOPLE BUILDING ELECTRONA ---------------- */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white border-b border-neutral-100 scroll-mt-6" id="the-team">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
            <span className="font-mono text-xs font-bold text-orange-600 uppercase tracking-widest block">
              FOUNDERS & BUILDERS
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight uppercase font-display">
              PEOPLE BUILDING ELECTRONA
            </h2>
            <p className="text-neutral-500 text-sm md:text-base font-normal max-w-2xl mx-auto leading-relaxed pt-1">
              The multidisciplinary team powering athlete-focused hydration innovation.
            </p>
          </div>

          {/* Premium Startup Leadership Grid (3x2 layout on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                name: "P. JANAKIRAM REDDY",
                role: "Founder & CEO",
                contribution: "Leads Electrona's vision, product strategy, partnerships, and overall business growth.",
                img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=500&fit=crop&auto=format"
              },
              {
                name: "T. SAI PRAGATHI",
                role: "Sports Nutritionist & Product Lead",
                contribution: "Designs athlete-focused formulations and oversees nutrition science behind all Electrona products.",
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&fit=crop&auto=format"
              },
              {
                name: "RAMA KRISHNA RAJU",
                role: "Digital Marketing Manager",
                contribution: "Drives brand awareness, digital campaigns, athlete engagement, and online growth.",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500&fit=crop&auto=format"
              },
              {
                name: "DEO GRACIAS ILUNGA",
                role: "Brand Strategy Lead",
                contribution: "Shapes Electrona's brand identity, positioning, storytelling, and long-term market presence.",
                img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&fit=crop&auto=format"
              },
              {
                name: "VINAY KUMAR",
                role: "Finance Manager",
                contribution: "Manages financial planning, operational budgets, and sustainable business expansion.",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&fit=crop&auto=format"
              },
              {
                name: "DHANA REDDY",
                role: "Sales & Marketing Lead",
                contribution: "Builds customer relationships, expands market reach, and drives revenue growth.",
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&fit=crop&auto=format"
              }
            ].map((member, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="group relative bg-white border border-neutral-200/80 rounded-[24px] overflow-hidden shadow-sm hover:shadow-[0_24px_50px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
              >
                {/* 1. Large Portrait Image Frame */}
                <div className="h-80 w-full overflow-hidden bg-neutral-50 relative border-b border-neutral-100">
                  <img 
                    src={member.img} 
                    alt={`${member.name} - ${member.role}`} 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* 2. Text Content Panel with typography & spacing inspired by Stripe */}
                <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="text-left space-y-3">
                    {/* Animated Orange Accent Line */}
                    <div className="w-8 h-[3px] bg-orange-500 transition-all duration-500 group-hover:w-16 group-hover:bg-orange-600 rounded-full" />
                    
                    <h3 className="text-xl font-bold font-display text-neutral-900 tracking-tight leading-tight pt-1">
                      {member.name}
                    </h3>
                    
                    <p className="font-mono text-[11px] font-bold text-orange-600 tracking-wider uppercase">
                      {member.role}
                    </p>
                    
                    <p className="text-neutral-500 text-sm font-normal leading-relaxed pt-1 select-none">
                      {member.contribution}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 06 — ADVISORS & MENTORS ---------------- */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-neutral-50/50 border-b border-neutral-100" id="advisors-mentors">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="font-mono text-xs font-bold text-purple-600 uppercase tracking-widest block">
              SCIENTIFIC BOARD
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight uppercase font-display">
              ADVISORS & MENTORS
            </h2>
            <div className="w-12 h-1 bg-purple-600 mx-auto rounded-full" />
            <p className="text-neutral-500 text-sm md:text-base font-normal max-w-xl mx-auto leading-relaxed pt-2">
              Collaborating with leading minds across university incubators, sports medicine, and biochemistry.
            </p>
          </div>

          {/* Premium Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Prof. M. Radhakrishna",
                title: "Research & Systems Mentor",
                institution: "IIIT Kottayam Incubation Wing",
                description: "Facilitating scalable local platforms, secure digital testing interfaces, and university incubator integrations."
              },
              {
                name: "Dr. K. Srinivasa Rao",
                title: "Sports Nutrition Board",
                institution: "Clinical Trials Coordinator",
                description: "Overlooks cellular dynamic evaluations, raw mineral retention trials, and strict WADA guidelines compliance."
              },
              {
                name: "Raja Sekhar V.",
                title: "Agronomy Bio-Extraction Expert",
                institution: "Fresh Freeze-Drying Council",
                description: "Pioneered low-temperature regional dehydration pathways to lock in fragile fruit osmolytes & vital potassium."
              },
              {
                name: "Northeastern Venture Board",
                title: "Venture Scale Advisors",
                institution: "Boston, USA Mentor Group",
                description: "Advising strategic brand development, venture investment ready structures, and compliance scaling."
              }
            ].map((advisor, i) => (
              <div 
                key={i}
                className="bg-white border border-neutral-200/80 rounded-2xl p-6 flex flex-col justify-between h-[285px] hover:border-purple-500/35 hover:shadow-md transition-all self-stretch text-left"
              >
                <div className="space-y-3">
                  <span className="font-mono text-[8px] font-black text-purple-600 uppercase tracking-widest bg-purple-500/5 px-2.5 py-0.5 rounded-full border border-purple-100 inline-block">
                    BOARD ADVISOR
                  </span>
                  <h4 className="text-base font-black text-neutral-900 uppercase font-display tracking-tight leading-tight pt-1">
                    {advisor.name}
                  </h4>
                  <p className="font-mono text-[9px] font-bold text-zinc-500 leading-none uppercase">
                    {advisor.title}
                  </p>
                  <p className="text-[10px] text-zinc-400 font-mono tracking-tight leading-none pt-0.5">
                    {advisor.institution}
                  </p>
                  <p className="text-neutral-500 text-xs leading-relaxed pt-2">
                    {advisor.description}
                  </p>
                </div>
                <div className="border-t border-neutral-100 pt-3 text-[9px] font-mono text-emerald-600 uppercase flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  VERIFIED ADVISORY ROLE
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ---------------- SECTION 07 — STARTUP MOMENTUM (ACHIEVEMENTS) ---------------- */}
      <section className="py-24 md:py-36 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-neutral-950 via-[#0a0a0c] to-[#0e0d11] text-white relative overflow-hidden" id="about-achievements">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#fff_1.2px,transparent_1.2px)] [background-size:24px_24px] select-none" />
        
        {/* Soft orange ambient spotlight behind the header */}
        <div className="absolute left-1/2 top-[15%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FF6A00]/[0.035] rounded-full filter blur-[110px] pointer-events-none select-none" />
        
        {/* Soft decorative glow backdrops */}
        <div className="absolute top-[30%] left-[5%] w-[450px] h-[450px] bg-[#FF6A00]/[0.012] rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] bg-[#06B6D4]/[0.012] rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28 space-y-5">
            <span className="font-mono text-xs font-bold text-[#FF6A00] uppercase tracking-[0.25em] block">
              VALIDATED MOMENTUM
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase font-sans">
              MOMENTUM
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-sans">
              Independent recognition from institutions, government programs, universities, innovation ecosystems, and national competitions.
            </p>
            <div className="w-16 h-[3px] bg-gradient-to-r from-[#FF6A00] to-[#FF9000] mx-auto rounded-full mt-4" />
          </div>

          {/* Premium Asymmetric Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* 1. DPIIT Recognition Card (Primary Feature — spans 7 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="group relative md:col-span-7 col-span-12 bg-gradient-to-br from-[#141417] to-[#0c0c0e] border border-zinc-900 hover:border-[#FF6A00]/30 p-8 md:p-10 rounded-[24px] flex flex-col justify-between min-h-[340px] md:min-h-[360px] transition-all duration-350 shadow-[0_12px_40px_rgba(0,0,0,0.55)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.75)]"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-950 border border-neutral-850/80 flex items-center justify-center text-[#FF6A00] group-hover:text-orange-400 transition-all duration-300">
                    <ShieldCheck className="w-5.5 h-5.5 stroke-[1.8]" />
                  </div>
                  <span className="font-mono text-[9px] text-[#FF6A00] tracking-[0.25em] font-extrabold uppercase bg-[#FF6A00]/5 px-2.5 py-1 rounded border border-[#FF6A00]/15">
                    PRIMARY RECORD
                  </span>
                </div>
                
                <div className="space-y-3">
                  <span className="font-mono text-[9px] text-zinc-500 tracking-[0.2em] font-bold uppercase block">CERTIFICATE</span>
                  <h3 className="text-2xl font-bold font-sans text-white tracking-tight leading-tight group-hover:text-[#FF6A00] transition-colors duration-300">
                    DPIIT Recognition
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-[14px] leading-relaxed max-w-2xl pt-1">
                    Formally recognized startup venture by the Department for Promotion of Industry and Internal Trade (DIPP185029), validating our national regulatory compliance.
                  </p>
                </div>
              </div>

              <div className="border-t border-zinc-900/60 pt-5 flex justify-between items-center mt-6">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.15em] font-bold">VENTURE ID</span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-950 border border-zinc-850 rounded-lg text-xs font-mono font-bold text-[#FF6A00] uppercase tracking-wider shadow-inner">
                  DIPP185029
                </span>
              </div>
            </motion.div>

            {/* 2. GITAM Prototype Grant Card (Standard — spans 5 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="group relative md:col-span-5 col-span-12 bg-[#0d0d10] border border-zinc-900/80 hover:border-orange-400/20 p-8 md:p-10 rounded-[24px] flex flex-col justify-between min-h-[340px] md:min-h-[360px] transition-all duration-350 shadow-[0_12px_40px_rgba(0,0,0,0.55)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.75)]"
            >
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <div className="w-11 h-11 rounded-1.5xl bg-neutral-950 border border-neutral-850/60 flex items-center justify-center text-zinc-400 group-hover:text-orange-400 transition-all duration-300">
                    <Trophy className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="font-mono text-[9px] text-zinc-500 tracking-[0.2em] font-bold uppercase">SEED GRANT</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-sans text-white tracking-tight leading-tight group-hover:text-[#FF6A00] transition-colors duration-300">
                    GITAM Prototype Grant
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed pt-1">
                    Granted essential prototype development backing and equity-free funding to establish early batch trials and preliminary pouch clinical formulations.
                  </p>
                </div>
              </div>

              <div className="border-t border-zinc-900/60 pt-5 flex justify-between items-center mt-6">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.15em] font-bold">PROTOTYPE FUND</span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-950 border border-zinc-850 rounded-lg text-xs font-mono font-bold text-[#FF6A00] uppercase tracking-wider shadow-inner">
                  <AnimatedCounter target={2} prefix="₹ " suffix=" Lakhs" />
                </span>
              </div>
            </motion.div>

            {/* 3. YES Summit Winner Card (Primary Feature — spans 7 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="group relative md:col-span-12 lg:col-span-7 col-span-12 bg-gradient-to-br from-[#141417] to-[#0c0c0e] border border-zinc-900 hover:border-[#FF6A00]/30 p-8 md:p-10 rounded-[24px] flex flex-col justify-between min-h-[340px] md:min-h-[360px] transition-all duration-350 shadow-[0_12px_40px_rgba(0,0,0,0.55)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.75)]"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-950 border border-neutral-850/80 flex items-center justify-center text-[#FF6A00] group-hover:text-orange-400 transition-all duration-300">
                    <Award className="w-5.5 h-5.5 stroke-[1.8]" />
                  </div>
                  <span className="font-mono text-[9px] text-[#FF6A00] tracking-[0.25em] font-extrabold uppercase bg-[#FF6A00]/5 px-2.5 py-1 rounded border border-[#FF6A00]/15">
                    TOP ACCREDITATION
                  </span>
                </div>
                
                <div className="space-y-3">
                  <span className="font-mono text-[9px] text-zinc-500 tracking-[0.2em] font-bold uppercase block">FIRST PLACE</span>
                  <h3 className="text-2xl font-bold font-sans text-white tracking-tight leading-tight group-hover:text-[#FF6A00] transition-colors duration-300">
                    YES Summit Winner
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-[14px] leading-relaxed max-w-2xl pt-1">
                    National gold champion for high-impact technical business innovations, commended by elite venture and industry integration panels.
                  </p>
                </div>
              </div>

              <div className="border-t border-zinc-900/60 pt-5 flex justify-between items-center mt-6">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.15em] font-bold">NATIONAL GRADE</span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-950 border border-zinc-850 rounded-lg text-xs font-mono font-black text-[#FF6A00] uppercase tracking-wider shadow-inner">
                  RANK 01
                </span>
              </div>
            </motion.div>

            {/* 4. American Telugu Association Prize Card (Standard — spans 5 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="group relative md:col-span-12 lg:col-span-5 col-span-12 bg-[#0d0d10] border border-zinc-900/80 hover:border-orange-400/20 p-8 md:p-10 rounded-[24px] flex flex-col justify-between min-h-[340px] md:min-h-[360px] transition-all duration-350 shadow-[0_12px_40px_rgba(0,0,0,0.55)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.75)]"
            >
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <div className="w-11 h-11 rounded-1.5xl bg-neutral-950 border border-neutral-850/60 flex items-center justify-center text-zinc-400 group-hover:text-orange-400 transition-all duration-300">
                    <Trophy className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="font-mono text-[9px] text-zinc-500 tracking-[0.2em] font-bold uppercase">INTERNATIONAL</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-sans text-white tracking-tight leading-tight group-hover:text-[#FF6A00] transition-colors duration-300">
                    ATA Prize Winner
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed pt-1">
                    Distinguished third place honors in competitive global diaspora business startup showcases, evaluating our food tech metrics and scale economics.
                  </p>
                </div>
              </div>

              <div className="border-t border-zinc-900/60 pt-5 flex justify-between items-center mt-6">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.15em] font-bold">COMPETITION RANK</span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-950 border border-zinc-850 rounded-lg text-xs font-mono font-bold text-[#FF6A00] uppercase tracking-wider shadow-inner">
                  TOP 3 GLOBAL
                </span>
              </div>
            </motion.div>

            {/* 5. Ready Stage Certification Card (Standard — spans 6 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="group relative md:col-span-6 col-span-12 bg-[#0d0d10] border border-zinc-900/80 hover:border-[#06B6D4]/30 p-8 md:p-10 rounded-[24px] flex flex-col justify-between min-h-[340px] md:min-h-[365px] transition-all duration-350 shadow-[0_12px_40px_rgba(0,0,0,0.55)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.75)]"
            >
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <div className="w-11 h-11 rounded-1.5xl bg-neutral-950 border border-neutral-850/60 flex items-center justify-center text-[#06B6D4] group-hover:text-[#00CBDD] transition-all duration-300">
                    <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="font-mono text-[9px] text-[#06B6D4] tracking-[0.2em] font-bold uppercase">AUDITED</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-sans text-white tracking-tight leading-tight group-hover:text-[#06B6D4] transition-colors duration-300">
                    Ready Stage Audited
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed pt-1">
                    Formally audited and certified scale-ready by Northeastern University Venture Mentors (Boston, USA), demonstrating strong product stability.
                  </p>
                </div>
              </div>

              <div className="border-t border-zinc-900/60 pt-5 flex justify-between items-center mt-6">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.15em] font-bold">AUDITOR BOARD</span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-950 border border-zinc-850 rounded-lg text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-wider shadow-inner select-none">
                  BOSTON, USA
                </span>
              </div>
            </motion.div>

            {/* 6. Central Incubation Recognition Card (Standard — spans 6 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="group relative md:col-span-6 col-span-12 bg-[#0d0d10] border border-zinc-900/80 hover:border-[#84CC16]/30 p-8 md:p-10 rounded-[24px] flex flex-col justify-between min-h-[340px] md:min-h-[365px] transition-all duration-350 shadow-[0_12px_40px_rgba(0,0,0,0.55)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.75)]"
            >
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <div className="w-11 h-11 rounded-1.5xl bg-neutral-950 border border-neutral-850/65 flex items-center justify-center text-[#84CC16] group-hover:text-lime-400 transition-all duration-300">
                    <Cpu className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="font-mono text-[9px] text-[#84CC16] tracking-[0.2em] font-bold uppercase">INCUBATED</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-sans text-white tracking-tight leading-tight group-hover:text-[#84CC16] transition-colors duration-300">
                    Central Govt Support
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed pt-1">
                    Supported and incubated via MANAGE RKVY-RAFTAAR and hosted in association with the IIIT Kottayam technology research support facilities.
                  </p>
                </div>
              </div>

              <div className="border-t border-zinc-900/60 pt-5 flex justify-between items-center mt-6">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.15em] font-bold">INCUBATION WING</span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-950 border border-zinc-850 rounded-lg text-xs font-mono font-bold text-[#84CC16] uppercase tracking-wider shadow-inner">
                  RKVY-RAFTAAR
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ---------------- SECTION 08 — ADVISORS & MENTORS FUTURE ROADMAP ---------------- */}
      <section 
        className="py-24 md:py-36 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-neutral-950 via-[#0d0c10] to-neutral-950 text-white relative overflow-hidden" 
        id="about-future"
        ref={roadmapContainerRef}
      >
        {/* Subtle orange ambient light behind the heading */}
        <div className="absolute left-1/2 top-[12%] -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-[#FF6A00]/[0.05] rounded-full filter blur-[100px] pointer-events-none select-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-20 md:space-y-28">
          
          {/* Header */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="font-mono text-xs font-bold text-[#FF6A00] uppercase tracking-[0.25em] block">
              THE STRATEGIC HORIZON
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase font-sans">
              WHERE WE'RE GOING
            </h2>
            <div className="w-16 h-[3px] bg-gradient-to-r from-[#FF6A00] to-[#FF9000] mx-auto rounded-full" />
          </div>

          {/* Connected Alternating Roadmap — Desktop Only Layout */}
          <div className="hidden md:block relative py-12">
            
            {/* The Horizontal Line Track */}
            <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-[1px] bg-zinc-850 z-0 select-none">
              <motion.div 
                style={{ scaleX: lineReveal, transformOrigin: "left" }}
                className="h-full bg-gradient-to-r from-[#FF6A00] via-orange-400 to-[#FF9000]"
              />
            </div>

            {/* Small Active Progress Indicator Dot moving across */}
            <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-0 z-10 pointer-events-none select-none">
              <motion.div 
                style={{ left: useTransform(lineReveal, [0, 1], ["0%", "100%"]) }}
                className="absolute -translate-y-1/2 -ml-2.5 w-5 h-5 rounded-full bg-neutral-950 border border-[#FF6A00]/60 flex items-center justify-center shadow-lg"
              >
                <div className="w-2 h-2 rounded-full bg-[#FF6A00]" />
              </motion.div>
            </div>

            {/* 4-Column Alternating Grid */}
            <div className="grid grid-cols-4 gap-8 relative z-10">
              {[
                {
                  id: "01",
                  title: "Scale Across India",
                  desc: "Rolling out premium certified athletic hydration sachets to thousands of grassroots players in state sports centers.",
                  isTop: true
                },
                {
                  id: "02",
                  title: "Academy Partnerships",
                  desc: "Forging strategic collaborations with badminton clubs, cricket academies, and regional Olympic preparation teams.",
                  isTop: false
                },
                {
                  id: "03",
                  title: "Nutrition Intelligence",
                  desc: "Blending product biochemical formulations with on-device sensors to feed dynamic cellular demands live.",
                  isTop: true
                },
                {
                  id: "04",
                  title: "Global Expansion",
                  desc: "Expanding safe, zero-banned-substance formulas across international sports federations and medical testing rings.",
                  isTop: false
                }
              ].map((item, idx) => (
                <div key={item.id} className="flex flex-col items-center h-[460px] group">
                  
                  {/* Upper Half (Card Content if isTop is True) */}
                  <div className="h-[210px] w-full flex flex-col justify-end">
                    {item.isTop && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-3.5 pr-3 text-left"
                      >
                        <div className="flex items-baseline justify-between">
                          <span className="text-[52px] font-black font-sans leading-none tracking-tight text-neutral-850 group-hover:text-[#FF6A00]/25 transition-colors duration-500 select-none">
                            {item.id}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 bg-neutral-900 border border-neutral-850 rounded-full text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                            2026-2028
                          </span>
                        </div>
                        <div className="space-y-1.5 pb-2">
                          <h4 className="text-base font-bold font-sans text-neutral-200 group-hover:text-[#FF6A00] transition-colors duration-300">
                            {item.title}
                          </h4>
                          <p className="text-neutral-400 text-[12.5px] leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                        {/* Anchor Line down to the central thread */}
                        <div className="w-[1px] h-6 bg-gradient-to-b from-neutral-800 to-transparent mx-auto opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    )}
                  </div>

                  {/* Center Node Hub on the central horizontal line */}
                  <div className="h-[40px] relative flex flex-col items-center justify-center w-full">
                    {/* Vertical guideline segment */}
                    <div className="w-[1px] h-full bg-neutral-900 group-hover:bg-[#FF6A00]/30 transition-colors duration-300" />
                    
                    {/* Intersection micro dot */}
                    <div className="absolute w-[13px] h-[13px] rounded-full bg-[#0a0a0c] border border-neutral-800 group-hover:border-[#FF6A00] transition-colors duration-300 flex items-center justify-center z-10 shadow-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-[#FF6A00] transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Lower Half (Card Content if isTop is False) */}
                  <div className="h-[210px] w-full flex flex-col justify-start">
                    {!item.isTop && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-3.5 pr-3 text-left pt-2"
                      >
                        {/* Anchor Line up to the central thread */}
                        <div className="w-[1px] h-6 bg-gradient-to-t from-neutral-800 to-transparent mx-auto opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="flex items-baseline justify-between pt-1">
                          <span className="text-[52px] font-black font-sans leading-none tracking-tight text-neutral-850 group-hover:text-[#FF6A00]/25 transition-colors duration-500 select-none">
                            {item.id}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 bg-neutral-900 border border-neutral-850 rounded-full text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                            2026-2028
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          <h4 className="text-base font-bold font-sans text-neutral-200 group-hover:text-[#FF6A00] transition-colors duration-300">
                            {item.title}
                          </h4>
                          <p className="text-neutral-400 text-[12.5px] leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Premium Vertical Progression — Mobile Only Layout */}
          <div className="block md:hidden relative text-left py-4 pl-8 select-none">
            
            {/* Direct Vertical Rail */}
            <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-neutral-900 z-0">
              <motion.div 
                style={{ scaleY: lineReveal, transformOrigin: "top" }}
                className="w-full h-full bg-[#FF6A00]"
              />
            </div>

            <div className="space-y-12 relative z-10">
              {[
                {
                  id: "01",
                  title: "Scale Across India",
                  desc: "Rolling out premium certified athletic hydration sachets to thousands of grassroots players in state sports centers."
                },
                {
                  id: "02",
                  title: "Academy Partnerships",
                  desc: "Forging strategic collaborations with badminton clubs, cricket academies, and regional Olympic preparation teams."
                },
                {
                  id: "03",
                  title: "Nutrition Intelligence",
                  desc: "Blending product biochemical formulations with on-device sensors to feed dynamic cellular demands live."
                },
                {
                  id: "04",
                  title: "Global Expansion",
                  desc: "Expanding safe, zero-banned-substance formulas across international sports federations and medical testing rings."
                }
              ].map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative group space-y-3"
                >
                  {/* Small Intersection Point Dot */}
                  <div className="absolute -left-[25px] top-6 w-2.5 h-2.5 rounded-full bg-neutral-950 border border-neutral-800 group-hover:border-[#FF6A00] transition-colors duration-300 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#FF6A00]" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[42px] font-black font-sans leading-none tracking-tight text-neutral-850 group-hover:text-[#FF6A00]/20 transition-all duration-350">
                      {item.id}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 bg-neutral-900 border border-neutral-850 rounded-full text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                      2026-2028
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-base font-bold font-sans text-neutral-200 group-hover:text-[#FF6A00] transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-neutral-400 text-xs sm:text-[13px] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* Core Footer tag */}
          <div className="pt-8 text-neutral-500 text-[10px] font-mono flex justify-center items-center gap-2 uppercase tracking-widest select-none">
            <span>ELECTRONA PERFORMANCE SCIENCE CORE</span>
            <span>•</span>
            <span>INVESTOR READY INITIATIVE</span>
          </div>

        </div>
      </section>

    </div>
  );
}
