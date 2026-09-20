import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, Sparkles, Droplet, User, Flame, ArrowRight, Zap, RefreshCw } from 'lucide-react';

interface EducationNode {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

export default function ScienceTechnology() {
  const [activeConcept, setActiveConcept] = useState<string>('what-are');
  // Interactive Simulation State
  const [simulationMode, setSimulationMode] = useState<'water' | 'sugar' | 'electrona'>('electrona');
  const [sweatRate, setSweatRate] = useState<number>(1.2); // liters per hour
  const [elapsedMinutes, setElapsedMinutes] = useState<number>(45);

  const educationalPoints: EducationNode[] = [
    {
      id: 'what-are',
      title: 'What are Electrolytes?',
      subtitle: 'The spark plugs of athletic motion',
      description: 'Electrolytes are essential mineral salts—including Sodium, Potassium, and Magnesium—that carry small electrical charges. They are responsible for transmitting nerve signals, contracting muscle fibers, and maintaining cellular pressure throughout your body.',
      icon: <Zap className="w-5 h-5 text-brand-orange" />
    },
    {
      id: 'why-lose',
      title: 'Loss Through Sweat',
      subtitle: 'How active efforts deplete reserves',
      description: 'As your internal temperature rises during exercise, your body releases sweat to cool down. Sweat is not just water; it is packed with dissolved electrolytes, primarily sodium. A heavy workout can easily drain over 1,000mg of critical sodium per hour.',
      icon: <Flame className="w-5 h-5 text-red-400" />
    },
    {
      id: 'water-limit',
      title: 'Why Water Alone Fails',
      subtitle: 'The dilution risk of hyponatremia',
      description: 'Drinking plain water when you are sweating heavily dilutes the remaining electrolytes in your bloodstream. Your body senses this dilution and signals your kidneys to flush out water, leading to quicker bathroom trips, sudden cramps, and premature muscle exhaustion.',
      icon: <ShieldAlert className="w-5 h-5 text-yellow-500" />
    },
    {
      id: 'sodium-lock',
      title: 'How Sodium Unlocks Hydration',
      subtitle: 'The molecular straw for fluid absorption',
      description: 'Sodium behaves like a magnet in your bowel and stomach. It activates the sodium-glucose cotransporter channels, pulling water molecules instantly across the cell walls and into your bloodstream. Without sodium, water simply pools heavily in your stomach.',
      icon: <Droplet className="w-5 h-5 text-brand-cyan" />
    },
    {
      id: 'endurance-impact',
      title: 'Impact on Endurance & Focus',
      subtitle: 'Sustaining optimal performance',
      description: 'When electrolyte balance drops, muscles lose contractility, leading to weakness and muscle spasms. More importantly, your brain loses cellular firing efficiency, causing cognitive fatigue, slower reflexes, and decreased situational awareness.',
      icon: <Activity className="w-5 h-5 text-purple-400" />
    },
    {
      id: 'proper-recovery',
      title: 'Better Hydration, Better Recovery',
      subtitle: 'Flushing lactic acid build-up',
      description: 'Replacing fluids and electrolytes concurrently after play helps restore blood plasma volumes immediately. This allows your cardiorespiratory system to pump oxygenated blood straight back to damaged tissues, clearing lactic acid and initiating supercompensation.',
      icon: <RefreshCw className="w-5 h-5 text-green-400" />
    }
  ];

  // Calculations based on interactive simulation values
  const totalSweatLost = (sweatRate * (elapsedMinutes / 60)).toFixed(2);
  const estimateSodiumLost = Math.round(sweatRate * 900 * (elapsedMinutes / 60)); // ~900mg sodium per liter of sweat

  // Animated particle flow simulation configuration based on selected fluid
  const getSimulationMetrics = () => {
    switch(simulationMode) {
      case 'water':
        return {
          absorptionSpeed: 'Slower / Incomplete',
          absorptionPct: 35,
          cellularBloatIndex: 'High Risk (Dilution)',
          metabolicDrain: 'High (Triggers Cramps)',
          description: 'Plain water blocks dynamic fluid balance when salt reservoirs are dry. Fluid is poorly retained and triggers rapid excretion.',
          color: 'text-blue-400',
          borderColor: 'border-blue-500/30',
          bgGlow: 'bg-blue-500/10'
        };
      case 'sugar':
        return {
          absorptionSpeed: 'Delayed (Gastric Arrest)',
          absorptionPct: 50,
          cellularBloatIndex: 'Medium (Stomach Heavy)',
          metabolicDrain: 'Insulin Crash Risk',
          description: 'High sugar concentrations draw water out of tissues back into the stomach, delaying quick hydration and causing sugar spikes.',
          color: 'text-red-400',
          borderColor: 'border-red-500/30',
          bgGlow: 'bg-red-500/10'
        };
      case 'electrona':
        default:
        return {
          absorptionSpeed: 'Instant Direct Absorption',
          absorptionPct: 98,
          cellularBloatIndex: 'Zero (Optimal Isotonicity)',
          metabolicDrain: 'None (Maintains Endurance)',
          description: 'Precisely calibrated isotonic balance matches the osmotic pressure of cell walls, channeling hydration and minerals directly to the muscles.',
          color: 'text-brand-cyan',
          borderColor: 'border-brand-cyan/40',
          bgGlow: 'bg-brand-cyan/10 animate-pulse'
        };
    }
  };

  const simMetrics = getSimulationMetrics();

  return (
    <section className="relative bg-[#050505] py-24 px-6 md:px-12 lg:px-24 border-b border-white/5" id="science-section">
      {/* Subtle Grid backdrop */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-brand-cyan/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full text-left">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4 mb-16 border-b border-white/5 pb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full font-mono text-[9px] text-brand-cyan tracking-widest uppercase">
            <Activity className="w-3.5 h-3.5" />
            ATHLETE HYDRATION ACADEMY
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white">
            HOW ELECTROLYTES WORK
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-light max-w-4xl leading-relaxed">
            Understanding why staying hydrated is more than just drinking water. Proper athletic cellular fluid balance is a direct equation of water volume locked by targeted electrolyte ions.
          </p>
        </div>

        {/* SECTION SPLIT: 2-Column Info Deck & Interactive Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Flow Infographic & Educational Grid */}
          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase pb-1.5 border-b border-white/5 block">
              CHOOSE CORE EDUCATION PARAMETERS
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {educationalPoints.map((pt) => {
                const isActive = activeConcept === pt.id;
                return (
                  <button
                    key={pt.id}
                    onClick={() => setActiveConcept(pt.id)}
                    className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 relative overflow-hidden group flex flex-col justify-between ${
                      isActive 
                        ? 'bg-neutral-900 border-brand-cyan text-white glow-cyan' 
                        : 'bg-black/35 border-white/5 text-zinc-400 hover:border-white/10 hover:text-white'
                    }`}
                    id={`edu-pt-${pt.id}`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <div className={`p-2.5 rounded-xl ${isActive ? 'bg-brand-cyan/10 text-brand-cyan' : 'bg-white/5 text-zinc-500 group-hover:text-white'}`}>
                        {pt.icon}
                      </div>
                      <span className={`text-[8px] font-mono text-zinc-600 font-bold ${isActive ? 'text-brand-orange' : ''}`}>
                        {isActive ? 'ACTIVE VIEW' : 'CLICK TO EXPAND'}
                      </span>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-bold tracking-wider font-display font-sans">{pt.title}</h4>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">{pt.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Expanded Content Readout Screen */}
            <div className="bg-zinc-950/70 border border-white/5 rounded-2.5xl p-6 relative overflow-hidden mt-6 text-left">
              <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none animate-scanline bg-gradient-to-b from-transparent via-brand-cyan/3 to-transparent h-1" />
              <span className="font-mono text-[8px] text-zinc-500 tracking-widest uppercase block mb-1">
                DETAILED DIAGNOSTIC REPORT
              </span>
              <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                {educationalPoints.find(p => p.id === activeConcept)?.title}
              </h3>
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light mt-3">
                {educationalPoints.find(p => p.id === activeConcept)?.description}
              </p>
            </div>

          </div>

          {/* Right Column: HUMAN PERFORMANCE DASHBOARD & CELL FLUID STIMULATOR */}
          <div className="lg:col-span-6 flex flex-col space-y-6" id="hydration-simulation-panel">
            
            <div className="glass-panel p-6 md:p-8 rounded-[2rem] border border-white/10 bg-black/60 relative overflow-hidden">
              
              <div className="flex justify-between items-start pb-4 border-b border-white/5 mb-6">
                <div>
                  <span className="font-mono text-brand-orange text-[9px] tracking-widest uppercase block font-bold">
                    BIOPHYSICAL SIMULATION LAYER
                  </span>
                  <h3 className="text-2xl font-black font-display text-white mt-1">
                    CELLULAR INGESTION SIMULATOR
                  </h3>
                </div>
                <div className="px-2.5 py-1 bg-[#00D9FF]/5 border border-[#00D9FF]/10 rounded font-mono text-[8.5px] text-[#00D9FF] uppercase tracking-wider font-bold">
                  ACTIVE SIM
                </div>
              </div>

              {/* Simulation Mode Select Tab */}
              <div className="grid grid-cols-3 gap-2.5 mb-6">
                {(['water', 'sugar', 'electrona'] as const).map((mode) => {
                  const isActive = simulationMode === mode;
                  return (
                    <button
                      key={mode}
                      onClick={() => setSimulationMode(mode)}
                      className={`py-3 px-1 rounded-xl border font-mono text-[9px] font-bold tracking-widest text-center uppercase cursor-pointer transition-all ${
                        isActive 
                          ? mode === 'electrona'
                            ? 'bg-[#FF6B00]/15 border-brand-orange text-brand-orange shadow-lg glow-orange'
                            : 'bg-[#00D9FF]/15 border-brand-cyan text-brand-cyan shadow-lg'
                          : 'bg-black/30 border-white/5 text-zinc-500 hover:text-white hover:border-white/10'
                      }`}
                    >
                      {mode === 'water' ? 'Plain Water' : mode === 'sugar' ? 'Sugary Sport Drink' : 'Electrona Isotonic'}
                    </button>
                  );
                })}
              </div>

              {/* Interactive Dynamic Particle flow channel box */}
              <div className="h-44 w-full bg-zinc-950/80 rounded-2xl border border-white/5 relative p-4 mb-6 overflow-hidden flex flex-col justify-between">
                
                {/* Visualizer cells gateway */}
                <div className="flex justify-between items-center w-full h-24 relative">
                  
                  {/* Left Side: Extracellular fluid gate */}
                  <div className="flex flex-col items-center justify-center space-y-1 font-mono text-[7px] text-zinc-500">
                    <Droplet className="w-5 h-5 text-brand-cyan" />
                    <span>STOMACH LAYER</span>
                  </div>

                  {/* Flow Channel line representation */}
                  <div className="flex-1 px-4 relative h-10 border-t border-b border-dashed border-white/10 flex items-center justify-around overflow-hidden">
                    
                    {/* Animated moving particles */}
                    <div className={`absolute inset-0 flex items-center justify-around`}>
                      {[1, 2, 3, 4, 5].map((i) => {
                        let colorClass = 'bg-brand-cyan';
                        let glowClass = 'shadow-[0_0_8px_#00D9FF]';
                        let sizeClass = 'w-1.5 h-1.5';
                        let labelText = 'H2O';
                        
                        if (simulationMode === 'sugar' && i % 2 === 0) {
                          colorClass = 'bg-red-400';
                          glowClass = 'shadow-[0_0_8px_#F87171]';
                          sizeClass = 'w-3 h-3'; // large bloating glucose molecules
                          labelText = 'Sugar';
                        } else if (simulationMode === 'electrona') {
                          if (i % 2 === 0) {
                            colorClass = 'bg-brand-orange';
                            glowClass = 'shadow-[0_0_8px_#FF6B00]';
                            sizeClass = 'w-2 h-2';
                            labelText = 'Na+';
                          } else if (i % 3 === 0) {
                            colorClass = 'bg-purple-400';
                            glowClass = 'shadow-[0_0_8px_#C084FC]';
                            sizeClass = 'w-1.5 h-1.5';
                            labelText = 'Mg2+';
                          }
                        }

                        return (
                          <div
                            key={i}
                            className={`rounded-full ${colorClass} ${glowClass} ${sizeClass} relative flex items-center justify-center`}
                            style={{
                              animationName: 'flowRight',
                              animationDuration: simulationMode === 'electrona' ? '1.5s' : simulationMode === 'water' ? '3s' : '5s',
                              animationIterationCount: 'infinite',
                              animationDelay: `${i * 0.3}s`,
                              animationTimingFunction: 'linear'
                            }}
                          >
                            <span className="absolute -top-3.5 font-mono text-[5px] text-zinc-400 tracking-none scale-90">{labelText}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Gastric Arrest Grid Overlay for sugar drink blockage */}
                    {simulationMode === 'sugar' && (
                      <div className="absolute inset-x-8 h-full bg-red-950/20 text-red-400 font-mono text-[7px] font-bold flex items-center justify-center uppercase tracking-widest border border-dashed border-red-500/25 animate-pulse text-center leading-tight">
                        SUGAR VISCOSITY GATEWAY CLOSED
                      </div>
                    )}

                  </div>

                  {/* Right Side: Intracellular muscle layer gate */}
                  <div className="flex flex-col items-center justify-center space-y-1 font-mono text-[7px] text-zinc-500">
                    <User className="w-5 h-5 text-brand-orange" />
                    <span>MUSCLE CELLS</span>
                  </div>

                </div>

                {/* Simulation Output Stats Info */}
                <div className="flex justify-between items-center text-xs border-t border-white/5 pt-3">
                  <div>
                    <span className="font-mono text-[8px] text-zinc-500 uppercase block">ABSORPTION POWER LEVEL</span>
                    <span className="text-white font-mono font-bold flex items-center gap-2 mt-0.5">
                      <span className={`inline-block w-2.5 h-2.5 rounded-sm bg-neutral-900 border ${simMetrics.borderColor} relative overflow-hidden`}>
                        <span className="absolute left-0 bottom-0 top-0 bg-brand-cyan" style={{ width: `${simMetrics.absorptionPct}%` }} />
                      </span>
                      {simMetrics.absorptionPct}% ({simMetrics.absorptionSpeed})
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[8px] text-zinc-500 uppercase block">BLOAT PENALTY RISK</span>
                    <span className={`font-mono font-bold ${simulationMode === 'water' ? 'text-red-400' : simulationMode === 'sugar' ? 'text-yellow-400' : 'text-green-400'}`}>
                      {simMetrics.cellularBloatIndex}
                    </span>
                  </div>
                </div>

              </div>

              {/* Diagnostic Breakdown Note */}
              <div className={`${simMetrics.bgGlow} border ${simMetrics.borderColor} rounded-2xl p-5 text-left space-y-2`}>
                <span className={`font-mono text-[9px] font-bold tracking-widest uppercase ${simMetrics.color}`}>
                  {simulationMode === 'water' ? 'PLAIN HYDRATION CONFLICT' : simulationMode === 'sugar' ? 'HIGH OSMOLAR OSMOLARITY BLOCK' : 'OPTIMAL ELECTROLYTE CHANNELS ACTIVE'}
                </span>
                <p className="text-neutral-300 text-xs font-light leading-relaxed">
                  {simMetrics.description}
                </p>
              </div>

              {/* Interactive sliders for sweat depletion mapping */}
              <div className="space-y-4 mt-6 pt-6 border-t border-white/5">
                <span className="font-mono text-zinc-500 text-[9px] tracking-widest uppercase block text-left">
                  DYNAMIC BIOMETRIC COEFFICIENTS
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Slider A: Sweat rate */}
                  <div className="space-y-2 bg-neutral-950 border border-white/5 p-3 rounded-xl text-left">
                    <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono">
                      <span>SWEAT INTENSITY FLOW</span>
                      <span className="text-white font-bold">{sweatRate} L/hr</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="2.5" 
                      step="0.1"
                      value={sweatRate}
                      onChange={(e) => setSweatRate(parseFloat(e.target.value))}
                      className="w-full accent-brand-cyan cursor-pointer"
                    />
                  </div>

                  {/* Slider B: Elapsed workout */}
                  <div className="space-y-2 bg-neutral-950 border border-white/5 p-3 rounded-xl text-left">
                    <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono">
                      <span>ELAPSED GAME INTERVENT</span>
                      <span className="text-white font-bold">{elapsedMinutes} Minutes</span>
                    </div>
                    <input 
                      type="range" 
                      min="15" 
                      max="120" 
                      step="5"
                      value={elapsedMinutes}
                      onChange={(e) => setElapsedMinutes(parseInt(e.target.value))}
                      className="w-full accent-brand-orange cursor-pointer"
                    />
                  </div>
                </div>

                {/* Sweat calculation result line */}
                <div className="bg-neutral-900 border border-white/10 p-4 rounded-xl flex justify-between items-center text-[11px] font-mono">
                  <div className="text-left">
                    <span className="text-zinc-500 text-[8px] uppercase block">TOTAL SWEAT VOLUME DRAINED</span>
                    <span className="text-white font-bold text-sm tracking-tight">{totalSweatLost} Liters</span>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-500 text-[8px] uppercase block">ESTIMATED SODIUM LEAK</span>
                    <span className="text-brand-orange font-bold text-sm tracking-tight">{estimateSodiumLost} mg</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Styled inline animation for simulation flow */}
      <style>{`
        @keyframes flowRight {
          0% {
            transform: translateX(-40px);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(180px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
