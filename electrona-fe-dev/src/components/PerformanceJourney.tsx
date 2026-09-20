import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { journeyTimeline } from '../data/sportsData';
import { JourneyStage } from '../types';
import { 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';

export default function PerformanceJourney() {
  const [activeStage, setActiveStage] = useState<JourneyStage>('PREPARE');
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(true);
  const [preloadedImages, setPreloadedImages] = useState<Record<string, boolean>>({});

  const stagesList: JourneyStage[] = ['PREPARE', 'HYDRATE', 'PERFORM', 'RECOVER', 'REPEAT'];

  // Preload all high-res sports action images on mount
  useEffect(() => {
    journeyTimeline.forEach((item) => {
      const img = new Image();
      img.src = item.image;
      img.onload = () => {
        setPreloadedImages((prev) => ({ ...prev, [item.stage]: true }));
      };
      img.onerror = () => {
        // Fallback to avoid blocking just in case of environment networks
        setPreloadedImages((prev) => ({ ...prev, [item.stage]: true }));
      };
    });
  }, []);

  const getStageColor = (stage: JourneyStage) => {
    switch (stage) {
      case 'PREPARE': return '#FF6A00'; // Orange
      case 'HYDRATE': return '#00CBDD'; // Cyan
      case 'PERFORM': return '#00CBDD'; // Vibrant Cyan
      case 'RECOVER': return '#00E575'; // Electric Green
      case 'REPEAT': return '#FF6A00'; // Gold Orange
      default: return '#FF6A00';
    }
  };

  const getStageColorBg = (stage: JourneyStage) => {
    switch (stage) {
      case 'PREPARE': return 'rgba(255, 106, 0, 0.03)';
      case 'HYDRATE': return 'rgba(0, 203, 221, 0.03)';
      case 'PERFORM': return 'rgba(0, 203, 221, 0.03)';
      case 'RECOVER': return 'rgba(0, 229, 117, 0.03)';
      case 'REPEAT': return 'rgba(255, 106, 0, 0.03)';
      default: return 'rgba(255, 106, 0, 0.03)';
    }
  };

  const getStageImgStyle = (stage: JourneyStage): React.CSSProperties => {
    switch (stage) {
      case 'PREPARE':
        return {
          objectFit: 'cover',
          objectPosition: 'center 35%',
          width: '100%',
          height: '100%',
          imageRendering: 'high-quality',
        };
      case 'HYDRATE':
        return {
          objectFit: 'cover',
          objectPosition: 'center center',
          width: '100%',
          height: '100%',
          imageRendering: 'high-quality',
        };
      case 'PERFORM':
        return {
          objectFit: 'cover',
          objectPosition: 'center 40%',
          width: '100%',
          height: '100%',
          imageRendering: 'high-quality',
        };
      case 'RECOVER':
        return {
          objectFit: 'cover',
          objectPosition: 'center center',
          width: '100%',
          height: '100%',
          imageRendering: 'high-quality',
        };
      case 'REPEAT':
        return {
          objectFit: 'cover',
          objectPosition: 'center center',
          width: '100%',
          height: '100%',
          imageRendering: 'high-quality',
        };
      default:
        return {
          objectFit: 'cover',
          objectPosition: 'center center',
          width: '100%',
          height: '100%',
        };
    }
  };

  // Auto-demo mode sequence cycling every 5 seconds
  useEffect(() => {
    if (!isAutoPlayActive) return;

    const interval = setInterval(() => {
      setActiveStage((current) => {
        const currentIndex = stagesList.indexOf(current);
        const nextIndex = (currentIndex + 1) % stagesList.length;
        return stagesList[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlayActive]);

  // Pause auto-demo immediately on user click
  const handleStageSelection = (stage: JourneyStage) => {
    setIsAutoPlayActive(false);
    setActiveStage(stage);
  };

  const activeStageInfo = journeyTimeline.find(t => t.stage === activeStage) || journeyTimeline[0];
  const activeColor = getStageColor(activeStage);

  return (
    <section 
      className="relative bg-white py-16 md:py-24 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-b border-neutral-100 font-sans" 
      id="journey-timeline-section"
    >
      {/* Background Soft Spotlight Wash adaptive */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out opacity-[0.12]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${activeColor}12 0%, transparent 60%)`
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 w-full">
        
        {/* Supreme Header Section */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-50 border border-neutral-200/60 rounded-full font-mono text-[9px] text-neutral-600 font-bold tracking-widest uppercase shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF6A00] animate-pulse" />
            UNBROKEN BIOLOGICAL CYCLE
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-neutral-900 uppercase leading-tight">
            THE PERFORMANCE JOURNEY
          </h2>
          
          <p className="text-neutral-500 text-sm md:text-base max-w-2xl leading-relaxed font-sans font-medium">
            Sustained athletic dominance demands an unbroken chain of biological excellence. Flow through the stages of Electrona’s structural performance cycle.
          </p>
        </div>

        {/* Compact Interactive Horizontal Timeline */}
        <div className="relative mb-10 max-w-3xl mx-auto px-4">
          {/* Timeline connecting track */}
          <div className="absolute left-6 right-6 top-5 -translate-y-1/2 h-[3px] bg-neutral-100 z-0 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-700 ease-in-out"
              style={{ 
                width: `${(stagesList.indexOf(activeStage) / (stagesList.length - 1)) * 100}%`,
                backgroundColor: activeColor
              }}
            />
          </div>

          <div className="flex justify-between items-start relative z-10">
            {stagesList.map((stage, idx) => {
              const isSelected = activeStage === stage;
              const isPassed = stagesList.indexOf(activeStage) >= idx;
              const stageColor = getStageColor(stage);
              
              return (
                <button
                  key={stage}
                  onClick={() => handleStageSelection(stage)}
                  className="flex flex-col items-center select-none cursor-pointer group focus:outline-none"
                >
                  <motion.div 
                    whileHover={{ scale: 1.08 }}
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono text-xs font-black transition-all duration-300 relative bg-white"
                    style={{
                      borderColor: isSelected 
                        ? stageColor 
                        : isPassed 
                          ? '#111111' 
                          : '#e5e7eb',
                      color: isSelected 
                        ? '#ffffff' 
                        : isPassed 
                          ? '#111111' 
                          : '#a3a3a3',
                      backgroundColor: isSelected ? stageColor : '#ffffff',
                      boxShadow: isSelected ? `0 10px 25px ${stageColor}35` : 'none'
                    }}
                  >
                    {isSelected && (
                      <motion.div 
                        layoutId="activeTimelinePillGlow"
                        className="absolute -inset-1.5 rounded-full filter blur-[4px] -z-10 opacity-40"
                        style={{ backgroundColor: stageColor }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    0{idx + 1}
                  </motion.div>
                  <span 
                    className="text-[9px] font-mono tracking-wider font-extrabold uppercase mt-2 transition-colors duration-300 hidden sm:inline-block"
                    style={{
                      color: isSelected ? '#111111' : '#a3a3a3'
                    }}
                  >
                    {stage}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Phase Single Content Panel */}
        <div className="relative max-w-4xl mx-auto">
          <div
            className="border border-neutral-200/75 rounded-[2.5rem] p-6 sm:p-10 text-left bg-white relative overflow-hidden transition-all duration-500"
            style={{
              boxShadow: `0 30px 80px rgba(0,0,0,0.03), inset 0 0 0 1.5px ${activeColor}15`,
              minHeight: '440px'
            }}
          >
            {/* Subtle Color Accent Top Border Strip */}
            <div className="absolute top-0 left-0 right-0 h-[4px] transition-colors duration-500" style={{ backgroundColor: activeColor }} />

            {/* Background back wash spotlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.06] filter blur-[60px] transition-all duration-1000"
              style={{
                background: `radial-gradient(circle at 10% 20%, ${activeColor} 0%, transparent 65%)`
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10"
              >
                {/* Left Side: Premium Athlete Action Image */}
                <div className="col-span-1 md:col-span-5 relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-50 border border-neutral-200/50 shadow-lg group">
                  <motion.img 
                    src={activeStageInfo.image} 
                    alt=""
                    referrerPolicy="no-referrer"
                    initial={{ scale: 0.98, opacity: 0, x: -8 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                    style={getStageImgStyle(activeStage)}
                    className="select-none"
                    whileHover={{ scale: 1.02 }}
                  />
                  {/* Subtle dynamic color wash overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none mix-blend-color opacity-[0.08] transition-colors duration-500"
                    style={{ backgroundColor: activeColor }}
                  />
                </div>

                {/* Right Side: Narrative and Metrics */}
                <div className="col-span-1 md:col-span-7 space-y-6">
                  {/* Category and tagline */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-neutral-100">
                    <span 
                      className="font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-neutral-50 border border-neutral-200 rounded-full"
                      style={{ color: activeColor }}
                    >
                      0{stagesList.indexOf(activeStage) + 1} — {activeStage} PHASE
                    </span>
                    <span className="font-mono text-neutral-400 text-[10px] uppercase tracking-wider font-extrabold">
                      {activeStageInfo.tagline}
                    </span>
                  </div>

                  {/* Title and description */}
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider block font-bold text-neutral-400">
                      SPECS TARGET
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black font-display text-neutral-900 tracking-tight uppercase leading-none">
                      {activeStageInfo.title}
                    </h3>
                    <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-sans font-medium">
                      {activeStageInfo.description}
                    </p>
                  </div>

                  {/* HUD metrics dashboard */}
                  <div className="space-y-3">
                    <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest block">TELEMETRY STATS</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeStageInfo.hudMetrics.map((met, i) => (
                        <div key={i} className="bg-neutral-50/70 p-3 sm:p-4 border border-neutral-100 rounded-xl space-y-2">
                          <span className="text-neutral-400 text-[9px] font-bold font-mono block truncate">
                            {met.label}
                          </span>
                          <div className="flex justify-between items-baseline">
                            <span className="text-base font-black text-neutral-950 font-sans" style={{ color: activeColor }}>
                              {met.value}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${met.progress}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: activeColor }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Anti-doping & regulatory status bottom strip */}
                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center bg-neutral-50 border border-neutral-200">
                        <ShieldCheck className="w-3 h-3" style={{ color: activeColor }} />
                      </div>
                      <span className="font-mono text-[9px] text-neutral-400 uppercase font-black tracking-widest">
                        BIOSTABILITY VERIFIED
                      </span>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
