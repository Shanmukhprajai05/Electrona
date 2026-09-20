import React, { useState } from 'react';
import { sachetData } from '../data/sportsData';
import { SachetInfo } from '../types';
import { Sparkles, Zap, BrainCircuit, Activity, Heart, RefreshCw, Award } from 'lucide-react';

export default function PerformanceSystem() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const getThemeVars = (id: string) => {
    switch (id) {
      case 'PRE':
        return {
          glowColor: 'shadow-[#FF6B00]/40',
          borderColor: 'border-[#FF6B00]/30 hover:border-[#FF6B00]/80',
          textColor: 'text-[#FF6B00]',
          bulletColor: 'bg-[#FF6B00]',
          accentText: 'FOCUS_INITIATED',
          gradientHex: '#FF6B00'
        };
      case 'DURING':
        return {
          glowColor: 'shadow-[#00D9FF]/40',
          borderColor: 'border-[#00D9FF]/30 hover:border-[#00D9FF]/80',
          textColor: 'text-[#00D9FF]',
          bulletColor: 'bg-[#00D9FF]',
          accentText: 'OSMOTIC_ACTIVE',
          gradientHex: '#00D9FF'
        };
      case 'POST':
      default:
        return {
          glowColor: 'shadow-purple-500/30',
          borderColor: 'border-[#AB3BFF]/30 hover:border-[#AB3BFF]/85',
          textColor: 'text-[#AB3BFF]',
          bulletColor: 'bg-[#AB3BFF]',
          accentText: 'CELLULAR_RESET',
          gradientHex: '#AB3BFF'
        };
    }
  };

  return (
    <section className="relative bg-[#050505] py-24 px-6 md:px-12 lg:px-24 border-t border-white/5" id="performance-system-section">
      
      {/* Structural background details */}
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-orange/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[9px] text-zinc-400 tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            3-STEP ATHLETE TIMELINE
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white">
            THE PERFORMANCE SYSTEM
          </h2>
          <p className="text-neutral-400 text-sm md:text-md max-w-2xl leading-relaxed font-sans font-light">
            Electrona is scientifically structured to optimize your cellular potential across three vital stages. Target hydration, lock in focus, and reset tissue fatigue with clinical-grade timing accuracy.
          </p>
        </div>

        {/* 3 Premium Interactive Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sachetData.map((sachet) => {
            const isExpanded = activeCard === sachet.id;
            const vars = getThemeVars(sachet.id);

            return (
              <div
                key={sachet.id}
                onClick={() => setActiveCard(isExpanded ? null : sachet.id)}
                className={`relative overflow-hidden rounded-[1.5rem] bg-neutral-950/60 p-8 border ${vars.borderColor} shadow-xl transition-all duration-500 ease-out cursor-pointer hover:-translate-y-2 flex flex-col justify-between select-none ${
                  isExpanded ? 'lg:col-span-1 border-white/20 shadow-2xl bg-neutral-950/95 ring-2 ring-brand-cyan/20 scale-[1.02]' : ''
                }`}
                id={`perf-card-${sachet.id.toLowerCase()}`}
              >
                
                {/* Embedded custom glow spotlight */}
                <div 
                  className="absolute -top-12 -right-12 w-48 h-48 rounded-full filter blur-[60px] opacity-20 pointer-events-none transition-all duration-500" 
                  style={{ backgroundColor: vars.gradientHex }}
                />

                {/* Card Header */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <span className="font-mono text-xs text-neutral-500 tracking-widest leading-none">
                      STAGE 0{sachet.id === 'PRE' ? '1' : sachet.id === 'DURING' ? '2' : '3'}
                    </span>
                    <div className="flex items-center gap-1">
                      {sachet.id === 'PRE' && <BrainCircuit className="w-4 h-4 text-brand-orange" />}
                      {sachet.id === 'DURING' && <Activity className="w-4 h-4 text-brand-cyan" />}
                      {sachet.id === 'POST' && <RefreshCw className="w-4 h-4 text-[#AB3BFF] animate-spin" style={{ animationDuration: '6s' }} />}
                      <span className={`font-mono text-[9px] tracking-widest ${vars.textColor} font-bold`}>
                        {vars.accentText}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display text-white">
                    {sachet.title}
                  </h3>
                  <span className="inline-block text-[10px] tracking-widest font-mono text-neutral-400 bg-white/5 px-2.5 py-1 rounded">
                    {sachet.tagline}
                  </span>
                </div>

                {/* Animated visual representation according to the brand specs */}
                <div className="relative my-8 h-32 w-full flex items-center justify-center rounded-lg bg-black/40 overflow-hidden border border-white/5">
                  
                  {/* Background scanner line overlay */}
                  <div className="absolute inset-0 cyber-grid-orange opacity-40" />

                  {/* Dynamic Visual Effects depending on the stage */}
                  {sachet.id === 'PRE' && (
                    /* Orange Energy Charging Effect */
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-brand-orange flex items-center justify-center animate-spin" style={{ animationDuration: '12s' }}>
                        <div className="w-10 h-10 rounded-full border-2 border-brand-orange/40 flex items-center justify-center animate-ping" />
                      </div>
                      <div className="absolute flex flex-col items-center font-mono text-[9px] text-[#FF6B00]">
                        <Zap className="w-4 h-4 text-brand-orange animate-bounce" />
                        <span className="tracking-widest">CHARGING</span>
                      </div>
                    </div>
                  )}

                  {sachet.id === 'DURING' && (
                    /* Electric Blue Moving Energy Streams */
                    <div className="w-full px-6 flex flex-col justify-center space-y-4">
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/10">
                        <div className="absolute top-0 left-0 h-full w-2/3 bg-brand-cyan rounded-full animate-pulse transition-all duration-500" />
                        <div className="absolute top-0 right-0 h-full w-12 bg-white/30 animate-shimmer" />
                      </div>
                      <div className="flex justify-between items-center font-mono text-[8px] text-[#00D9FF]">
                        <span>HYDRATION RATE: 4.8L/HR</span>
                        <span className="animate-pulse">OSMOSIS FLOW →</span>
                      </div>
                      <div className="flex justify-around absolute inset-0 opacity-20 pointer-events-none">
                        <div className="w-[1px] h-full bg-[#00D9FF] animate-bounce" />
                        <div className="w-[1px] h-full bg-[#00D9FF] animate-bounce delay-100" />
                        <div className="w-[1px] h-full bg-[#00D9FF] animate-bounce delay-300" />
                        <div className="w-[1px] h-full bg-[#00D9FF] animate-bounce delay-700" />
                      </div>
                    </div>
                  )}

                  {sachet.id === 'POST' && (
                    /* Regeneration biological hex grid system / effects */
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded bg-gradient-to-tr from-[#AB3BFF] to-brand-cyan opacity-45 flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex flex-col text-left font-mono">
                        <span className="text-[10px] text-purple-400 font-bold">REGENERATION: 98%</span>
                        <span className="text-[8px] text-zinc-400">LACTIC DOWNTIME: -66%</span>
                        <div className="w-24 h-1.5 bg-neutral-900 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-purple-500 to-brand-cyan w-[98%] animate-pulse" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Description */}
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
                  {sachet.id === 'PRE' && "Build concentration, hydration reserves and mental readiness before competition."}
                  {sachet.id === 'DURING' && "Maintain hydration, electrolyte balance and sustained performance under pressure."}
                  {sachet.id === 'POST' && "Accelerate recovery, replenish nutrients and prepare for the next challenge."}
                </p>

                {/* Expanded parameters */}
                <div className={`transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'max-h-[300px] opacity-100 mb-6' : 'max-h-0 opacity-0'
                }`}>
                  <div className="space-y-4 pt-4 border-t border-white/5 font-sans">
                    <div>
                      <h5 className="font-mono text-[9px] text-[#FF6B00] tracking-widest uppercase">Target Window</h5>
                      <span className="text-xs text-white tracking-wide">{sachet.timing}</span>
                    </div>
                    <div>
                      <h5 className="font-mono text-[9px] text-[#00D9FF] tracking-widest uppercase">Immediate Functional Impact</h5>
                      <span className="text-xs text-zinc-300 leading-normal">{sachet.impact}</span>
                    </div>
                    <div>
                      <h5 className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase mb-1">Key Scientific Actives</h5>
                      <div className="flex flex-wrap gap-2">
                        {sachet.ingredients.slice(0, 3).map((ing, i) => (
                          <span key={i} className="text-[9px] font-mono bg-white/5 text-zinc-300 border border-white/10 px-2 py-0.5 rounded">
                            {ing.name} ({ing.amount})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action CTA indicator */}
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-xs text-zinc-500 font-mono tracking-wider font-semibold group-hover:text-white transition-colors">
                    {isExpanded ? 'REDUCE DETAILS' : 'INTERACTIVE OVERVIEW'}
                  </span>
                  <span className={`w-6 h-6 rounded-full border bg-black flex items-center justify-center text-xs transition-transform duration-300 ${isExpanded ? 'rotate-180 border-white text-white' : `border-white/10 ${vars.textColor}`}`}>
                    ↓
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
