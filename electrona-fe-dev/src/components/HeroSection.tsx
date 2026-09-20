import React, { useEffect, useRef, useState } from 'react';
import { Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onExplore: () => void;
  onViewProducts: () => void;
}

export default function HeroSection({ onExplore, onViewProducts }: HeroSectionProps) {
  const playlist = ['/videos/stock.mp4', '/cricket.mp4', '/videos/stock.mp4'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [srcA, setSrcA] = useState(playlist[0]);
  const [srcB, setSrcB] = useState(playlist[1]);
  const [activeVideo, setActiveVideo] = useState<'A' | 'B'>('A');
  const [videoError, setVideoError] = useState(false);
  const videoRefA = useRef<HTMLVideoElement | null>(null);
  const videoRefB = useRef<HTMLVideoElement | null>(null);
  const transitioningRef = useRef(false);

  // Auto-play initially
  useEffect(() => {
    if (videoError) return;

    // Trigger play for the active video on load
    const activeRef = activeVideo === 'A' ? videoRefA : videoRefB;
    if (activeRef.current) {
      activeRef.current.play().catch(() => {});
    }
  }, [videoError, activeVideo]);

  const handleTransition = () => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;

    const nextIndex = (currentIndex + 1) % playlist.length;
    const nextRef = activeVideo === 'A' ? videoRefB.current : videoRefA.current;

    if (nextRef) {
      nextRef.currentTime = 0;
      nextRef.play()
        .then(() => {
          const prevVideo = activeVideo;
          const nextVideo = activeVideo === 'A' ? 'B' : 'A';

          setActiveVideo(nextVideo);
          setCurrentIndex(nextIndex);

          // Update source of the now-faded video after transition length is complete
          setTimeout(() => {
            const finishedNextIndex = (nextIndex + 1) % playlist.length;
            if (prevVideo === 'A') {
              setSrcA(playlist[finishedNextIndex]);
            } else {
              setSrcB(playlist[finishedNextIndex]);
            }
            transitioningRef.current = false;
          }, 1100);
        })
        .catch((err) => {
          console.warn("Autoplay or play issue, forcing immediately", err);
          const prevVideo = activeVideo;
          const nextVideo = activeVideo === 'A' ? 'B' : 'A';
          setActiveVideo(nextVideo);
          setCurrentIndex(nextIndex);
          setTimeout(() => {
            const finishedNextIndex = (nextIndex + 1) % playlist.length;
            if (prevVideo === 'A') {
              setSrcA(playlist[finishedNextIndex]);
            } else {
              setSrcB(playlist[finishedNextIndex]);
            }
            transitioningRef.current = false;
          }, 1100);
        });
    } else {
      transitioningRef.current = false;
    }
  };

  const handleTimeUpdate = (videoKey: 'A' | 'B') => {
    if (activeVideo !== videoKey) return;
    const ref = videoKey === 'A' ? videoRefA : videoRefB;
    if (ref.current) {
      const current = ref.current;
      if (current.duration && !isNaN(current.duration)) {
        const timeRemaining = current.duration - current.currentTime;
        // Start crossfading 0.8 seconds before the current finishes for smooth overlap
        if (timeRemaining <= 0.8) {
          handleTransition();
        }
      }
    }
  };

  const handleEnded = (videoKey: 'A' | 'B') => {
    if (activeVideo !== videoKey) return;
    handleTransition();
  };

  return (
    <section className="relative min-h-screen bg-white flex flex-col justify-center overflow-hidden pt-28 pb-16 px-6 md:px-12 lg:px-24">
      {/* Layer 1 (bottom): Double-Buffer Video Background / Fallback */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {!videoError ? (
          <>
            {/* Video Element A */}
            <video
              ref={videoRefA}
              src={srcA}
              autoPlay
              muted
              playsInline
              preload="auto"
              onTimeUpdate={() => handleTimeUpdate('A')}
              onEnded={() => handleEnded('A')}
              onError={() => setVideoError(true)}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
              style={{
                opacity: activeVideo === 'A' ? 1 : 0,
                transform: 'translate3d(0, 0, 0)',
                willChange: 'transform',
              }}
            />
            {/* Video Element B */}
            <video
              ref={videoRefB}
              src={srcB}
              muted
              playsInline
              preload="auto"
              onTimeUpdate={() => handleTimeUpdate('B')}
              onEnded={() => handleEnded('B')}
              onError={() => setVideoError(true)}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
              style={{
                opacity: activeVideo === 'B' ? 1 : 0,
                transform: 'translate3d(0, 0, 0)',
                willChange: 'transform',
              }}
            />
          </>
        ) : (
          /* Fallback: Premium hero athletic track visual */
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=2000&q=80')",
            }}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20 w-full max-w-7xl mx-auto">
        
        {/* Left Side: Hyper-Spaced Premium Text Assembly with crisp vector rendering */}
        <div 
          className="lg:col-span-7 flex flex-col items-start space-y-8 text-left antialiased subpixel-antialiased" 
          id="hero-left-content"
        >
          
          {/* Premium Massive Launch Slogans */}
          <h1 className="flex flex-col font-display leading-[1.0] text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black select-none gap-2">
            <span className="relative inline-block text-[#FF6A00] hover:text-[#FF6A00] transition-colors duration-300 group cursor-default">
              FUEL.
              <span className="absolute bottom-1 left-0 w-1/4 h-1 bg-[#FF6B00] group-hover:w-full transition-all duration-500 rounded animate-none" />
              <span className="absolute -top-1 left-0.5 right-0 text-[10px] tracking-widest font-mono text-neutral-500 group-hover:text-[#FF6B00]">PRE-MATCH</span>
            </span>
            <span className="relative inline-block text-[#00D9FF] hover:text-neutral-900 transition-colors duration-300 group cursor-default">
              PERFORM.
              <span className="absolute bottom-1 left-0 w-1/3 h-1 bg-[#00D9FF] group-hover:w-full transition-all duration-500 rounded animate-none" />
              <span className="absolute -top-1 left-0.5 right-0 text-[10px] tracking-widest font-mono text-neutral-500 group-hover:text-[#00D9FF]">INTRA-MATCH</span>
            </span>
            <span className="relative inline-block text-[#00E575] hover:text-neutral-900 transition-colors duration-300 group cursor-default">
              RECOVER.
              <span className="absolute bottom-1 left-0 w-1/5 h-1 bg-[#00E575] group-hover:w-full transition-all duration-500 rounded animate-none" />
              <span className="absolute -top-1 left-0.5 right-0 text-[10px] tracking-widest font-mono text-neutral-500 group-hover:text-[#00E575]">POST-MATCH</span>
            </span>
          </h1>

          {/* Premium Slogan Description inside a floating glass card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileInView={{
              y: [0, -6, 0],
              transition: {
                y: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 4,
                  ease: "easeInOut"
                }
              }
            }}
            className="rounded-3xl border border-white/50 p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.06)] max-w-xl text-left"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.88)', 
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <h4 className="text-base md:text-lg tracking-[0.15em] font-display text-neutral-950 font-bold uppercase border-l-4 border-[#FF6B00] pl-4 mb-3 leading-snug">
              ENGINEERED FOR EVERY MINUTE OF COMPETITION.
            </h4>
            <p className="text-neutral-800 text-sm md:text-base leading-relaxed tracking-wide font-sans font-medium">
              From preparation to peak performance and complete recovery, Electrona delivers targeted hydration technology designed to support focus, endurance, electrolyte balance and post-game restoration.
            </p>
          </motion.div>

        </div>

        {/* Right Side: Glowing 3D Electrona Floating Kit Container */}
        <div className="lg:col-span-5 relative flex flex-col justify-center items-center py-8" id="hero-right-visual">
          
          {/* Glowing Background Glows for the canisters */}
          <div className="absolute w-72 h-72 bg-[#00D9FF]/10 rounded-full filter blur-[80px] -z-10 animate-pulse-slow font-sans" />
          <div className="absolute w-60 h-60 bg-[#FF6B00]/10 rounded-full filter blur-[60px] delay-1000 -z-10" />

          {/* Premium Floating 3D Simulated Canister Container */}
          <div className="relative w-64 h-80 perspective-[1000px] animate-float">
            
            {/* Specular premium product box */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 border border-neutral-200 rounded-[2rem] p-6 shadow-2xl flex flex-col justify-between overflow-hidden group">
              
              {/* Product Pack Metallic sheen overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000" />

              {/* Box Top Header */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-display font-black text-neutral-900 text-lg tracking-widest leading-none">ELECTRONA</span>
                  <span className="font-mono text-[6px] text-neutral-500 uppercase tracking-widest mt-1">3-IN-1 HYDRATION ENGINEERING KIT</span>
                </div>
              </div>

              {/* Multi-layered Visual Representation of the Sachets */}
              <div className="my-auto flex flex-col justify-center items-center relative py-6">
                
                {/* 3 Floating Metallic Sachets stack */}
                <div className="relative w-full h-32 flex justify-center items-center">
                  
                  {/* Sachet 1: PRE-MATCH (Orange, Layer behind left) */}
                  <div className="absolute left-6 bottom-4 w-24 h-28 bg-gradient-to-b from-[#FF6B00] to-neutral-900 border border-[#FF6B00]/40 rounded-lg shadow-lg rotate-[-12deg] transform-gpu hover:translate-y-[-10px] transition-all duration-300 cursor-pointer flex flex-col justify-between p-2">
                    <span className="font-display text-[9px] font-black text-white leading-none">PRE_MATCH</span>
                    <span className="font-mono text-[5px] text-zinc-300">FOCUS IGNITE // S01</span>
                    <div className="w-full h-0.5 bg-brand-orange opacity-40" />
                  </div>

                  {/* Sachet 3: POST-MATCH (Green, Layer behind right) */}
                  <div className="absolute right-6 bottom-4 w-24 h-28 bg-gradient-to-b from-[#00E575] to-neutral-900 border border-[#00E575]/40 rounded-lg shadow-lg rotate-[12deg] transform-gpu hover:translate-y-[-10px] transition-all duration-300 cursor-pointer flex flex-col justify-between p-2">
                    <span className="font-display text-[9px] font-black text-white leading-none">POST_MATCH</span>
                    <span className="font-mono text-[5px] text-zinc-300">RECOVER RESET // S03</span>
                    <div className="w-full h-0.5 bg-[#00E575] opacity-40" />
                  </div>

                  {/* Sachet 2: DURING-MATCH (Electric Cyan, Centered Top) */}
                  <div className="absolute z-10 w-26 h-30 bg-gradient-to-b from-[#00D9FF] via-neutral-950 to-neutral-850 border-2 border-[#00D9FF]/70 rounded-lg shadow-2xl scale-105 transform hover:scale-110 hover:translate-y-[-10px] transition-all duration-300 cursor-pointer flex flex-col justify-between p-3">
                    <span className="font-display text-[10px] font-black text-white leading-none tracking-wide text-center">DURING_MATCH</span>
                    <span className="font-mono text-[6px] text-neutral-300 text-center uppercase tracking-wider">ENDURANCE FLOW // S02</span>
                    <div className="flex justify-between items-center bg-[#00D9FF]/10 px-1 py-0.5 rounded text-[5px] font-mono text-[#00D9FF] font-bold">
                       <span>GEL SYSTEM</span>
                      <Zap className="w-2 h-2" />
                    </div>
                  </div>

                </div>

              </div>

              {/* Brand tag line at footer */}
              <div className="flex justify-between items-end border-t border-neutral-250 pt-3">
                <span className="font-display font-medium text-[8px] text-neutral-400 tracking-widest">POWER. HYDRATE. RECOVER.</span>
                <span className="font-mono text-[7px] text-[#00AECF] font-bold">NET VOL: 3X PACK</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
