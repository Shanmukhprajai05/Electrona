import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Activity, 
  Droplet, 
  Award, 
  Info, 
  Settings, 
  ChevronRight, 
  ShieldAlert, 
  Thermometer, 
  Zap, 
  Heart,
  Calendar
} from 'lucide-react';

interface SportProfile {
  id: string;
  name: string;
  baseSweatRate: number; // liters/hour
  baseSodiumConcentration: number; // mg per Liter
  iconName: string;
  recoveryTip: string;
}

export default function SportsHub() {
  // Input parameters state
  const [weight, setWeight] = useState<number>(72); // kg
  const [selectedSportId, setSelectedSportId] = useState<string>('football');
  const [duration, setDuration] = useState<number>(60); // minutes
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [weather, setWeather] = useState<'cool' | 'temperate' | 'warm' | 'hot'>('warm');

  const sportsList: SportProfile[] = [
    {
      id: 'football',
      name: 'Football',
      baseSweatRate: 1.5,
      baseSodiumConcentration: 950,
      iconName: '⚽',
      recoveryTip: 'Re-establish glycogen reservoirs with high low-glycemic smart carbs and supplement high active sodium to prevent deep calf cramping.'
    },
    {
      id: 'cricket',
      name: 'Cricket',
      baseSweatRate: 1.1,
      baseSodiumConcentration: 855,
      iconName: '🏏',
      recoveryTip: 'Long standing exposure drains electrolytes even during quiet intervals. Sip small isotonic quantities and rehydrate with a post-game amino deck.'
    },
    {
      id: 'tennis',
      name: 'Tennis',
      baseSweatRate: 1.4,
      baseSodiumConcentration: 1050,
      iconName: '🎾',
      recoveryTip: 'Explosive baseline changes trigger sudden lactic acid build-up. Ingest beta-alanine muscle buffers to maintain multi-set reflex speeds.'
    },
    {
      id: 'badminton',
      name: 'Badminton',
      baseSweatRate: 1.25,
      baseSodiumConcentration: 900,
      iconName: '🏸',
      recoveryTip: 'Rapid indoor shuttle exchanges drain neurological focus fast. Keep magnesium levels locked during court switches to prevent finger and wrist stiffness.'
    },
    {
      id: 'athletics',
      name: 'Athletics',
      baseSweatRate: 1.8,
      baseSodiumConcentration: 1100,
      iconName: '🏃',
      recoveryTip: 'Maximum aerobic exertion depletes blood volume instantly. Consume amino peptides for instant muscle synthesis and continuous tissue restoration.'
    },
    {
      id: 'fitness',
      name: 'Fitness Training',
      baseSweatRate: 1.2,
      baseSodiumConcentration: 800,
      iconName: '🏋️',
      recoveryTip: 'Muscular stress from active conditioning requires immediate cellular potassium recovery to repair micro-tears in hypertrophic fibers.'
    },
    {
      id: 'table-tennis',
      name: 'Table Tennis',
      baseSweatRate: 0.8,
      baseSodiumConcentration: 750,
      iconName: '🏓',
      recoveryTip: 'Fast optical tracking demands alpha neural clarity. Ensure steady-state sodium and zinc lock to sustain peak hand-eye reaction pathways.'
    },
    {
      id: 'teqball',
      name: 'Teqball',
      baseSweatRate: 1.15,
      baseSodiumConcentration: 880,
      iconName: '🛹',
      recoveryTip: 'Acrobatic skill reflexes require optimal physical elastic rebound. Focus on core hydration to prevent joint socket dehydration and stiffness.'
    }
  ];

  const currentSport = sportsList.find(s => s.id === selectedSportId) || sportsList[0];

  // Dynamic Equation Multipliers
  const intensityMultiplier = intensity === 'low' ? 0.75 : intensity === 'medium' ? 1.0 : 1.35;
  const weatherMultiplier = weather === 'cool' ? 0.8 : weather === 'temperate' ? 1.0 : weather === 'warm' ? 1.25 : 1.5;
  const weightFactor = weight / 70; // baseline 70kg athlete
  const hoursFraction = duration / 60;

  // Real-world Hydration Estimates calculations
  const sweatLoss = Math.max(0.1, parseFloat((currentSport.baseSweatRate * weightFactor * hoursFraction * intensityMultiplier * weatherMultiplier).toFixed(2)));
  
  // Sodium, Potassium and Magnesium loss estimates (mg)
  const sodiumLost = Math.round(sweatLoss * currentSport.baseSodiumConcentration);
  const potassiumLost = Math.round(sweatLoss * 180); // ~180mg potassium lost per liter of sweat
  const magnesiumLost = Math.round(sweatLoss * 35); // ~35mg magnesium lost per liter of sweat
  const totalElectrolytesLost = sodiumLost + potassiumLost + magnesiumLost;

  // Recommended fluid intake (120% of sweat loss to offset recovery debt)
  const recommendedFluid = parseFloat((sweatLoss * 1.2).toFixed(2));

  // Determine Electrona Usage Plan
  const getUsagePlan = () => {
    if (recommendedFluid <= 0.6) {
      return {
        sachetsCount: 1,
        kitsCount: 0,
        text: '1 sachet of DURING-MATCH Electrona dissolved in 500ml water.',
        details: 'Ideal for short training periods where simple cellular fueling is key.'
      };
    } else if (recommendedFluid > 0.6 && recommendedFluid <= 1.4) {
      return {
        sachetsCount: 3,
        kitsCount: 1,
        text: '1 Complete 3-In-1 Performance Kit (1 Pre + 1 During + 1 Post sachet).',
        details: 'Splits hydration into pre-hydration loading, intra-game endurance holding, and complete muscle flush post-game.'
      };
    } else if (recommendedFluid > 1.4 && recommendedFluid <= 2.4) {
      return {
        sachetsCount: 4,
        kitsCount: 1, // 1 kit + 1 extra during
        text: '1 Complete 3-In-1 Kit + 1 Extra DURING sachet dissolved in 700ml water.',
        details: 'Compensates for extended cardiovascular exertion periods with enhanced electrolyte buffers.'
      };
    } else {
      return {
        sachetsCount: 6,
        kitsCount: 2,
        text: '2 Complete 3-In-1 Performance Kits (split across pre, play, and post cycles).',
        details: 'Provides heavy hydration shield to withstand extreme electrolyte depletions in tropical competitive matches.'
      };
    }
  };

  const usagePlan = getUsagePlan();

  return (
    <div className="relative min-h-screen bg-brand-dark pt-28 pb-16 px-6 md:px-12 lg:px-24 flex flex-col justify-space text-left font-sans text-white" id="sports-hub-page">
      
      {/* Dynamic scanline grids */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 right-[10%] w-[500px] h-[500px] bg-brand-cyan/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-[500px] h-[500px] bg-brand-orange/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header Title Grid */}
        <div className="flex flex-col items-start space-y-4 mb-16 border-b border-white/5 pb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange/10 border border-brand-orange/20 rounded-full font-mono text-[9px] text-[#FF6B00] tracking-widest uppercase">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            ELECTRAATHLETE FLUID CALCULATOR
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight font-display text-white uppercase">
            SPORTS HYDRATION HUD
          </h1>
          <p className="text-zinc-400 text-sm md:text-base font-light max-w-4xl leading-relaxed">
            Every athletic discipline has a unique sweat loss rate and electrolyte discharge gradient. Use our real-world biophysical simulator below to calculate your dynamic physical depletions and review calibrated Electrona usage schemes.
          </p>
        </div>

        {/* Dynamic Calculator Workspace layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Form Variables (Col-lg-5) */}
          <div className="lg:col-span-5 bg-neutral-950/80 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
            
            <div className="flex items-center gap-2 pb-4 border-b border-white/5">
              <Settings className="w-4 h-4 text-brand-cyan" />
              <span className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase font-bold">
                ATHLETE BIOMETRICS INPUT
              </span>
            </div>

            {/* Parameter A: Weight Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400 uppercase">Body Weight (kg)</span>
                <span className="text-white font-bold">{weight} kg</span>
              </div>
              <div className="flex gap-4 items-center">
                <input 
                  type="range" 
                  min="40" 
                  max="120"
                  step="1"
                  value={weight}
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                  className="w-full accent-brand-cyan cursor-pointer"
                />
                <input 
                  type="number"
                  min="40"
                  max="120"
                  value={weight}
                  onChange={(e) => setWeight(Math.min(120, Math.max(40, parseInt(e.target.value) || 70)))}
                  className="w-16 bg-neutral-900 border border-white/10 rounded-lg px-2 py-1 text-xs font-mono text-center text-white focus:outline-none focus:border-brand-cyan"
                />
              </div>
            </div>

            {/* Parameter B: Sport Selection */}
            <div className="space-y-2 font-mono">
              <span className="text-xs text-zinc-400 uppercase block">Sport Discipline</span>
              <div className="grid grid-cols-2 gap-2">
                {sportsList.map((sport) => {
                  const isS = selectedSportId === sport.id;
                  return (
                    <button
                      key={sport.id}
                      onClick={() => setSelectedSportId(sport.id)}
                      className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer font-sans select-none flex items-center gap-1.5 justify-center text-xs font-semibold ${
                        isS 
                          ? 'bg-[#FF6B00]/10 border-brand-orange text-white glow-orange' 
                          : 'bg-black/40 border-white/5 text-zinc-400 hover:border-white/15'
                      }`}
                      id={`sel-sp-${sport.id}`}
                    >
                      <span className="text-sm">{sport.iconName}</span>
                      <span className="truncate">{sport.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Parameter C: Duration Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400 uppercase">Duration Played</span>
                <span className="text-white font-bold">{duration} mins ({(duration/60).toFixed(1)} hrs)</span>
              </div>
              <div className="flex gap-4 items-center">
                <input 
                  type="range" 
                  min="15" 
                  max="240"
                  step="5"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full accent-brand-orange cursor-pointer"
                />
                <input 
                  type="number"
                  min="15"
                  max="240"
                  value={duration}
                  onChange={(e) => setDuration(Math.min(240, Math.max(15, parseInt(e.target.value) || 60)))}
                  className="w-16 bg-neutral-900 border border-white/10 rounded-lg px-2 py-1 text-xs font-mono text-center text-white focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            {/* Parameter D: Intensity selections */}
            <div className="space-y-2 font-mono">
              <span className="text-xs text-zinc-400 uppercase block">Training Intensity</span>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'medium', 'high'] as const).map((lvl) => {
                  const isI = intensity === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => setIntensity(lvl)}
                      className={`py-2 rounded-lg border text-center text-[10px] font-bold tracking-widest uppercase cursor-pointer transition-all ${
                        isI 
                          ? 'bg-[#00D9FF]/10 border-brand-cyan text-[#00D9FF] glow-cyan' 
                          : 'bg-black/35 border-white/5 text-zinc-500 hover:text-white'
                      }`}
                    >
                      {lvl === 'low' ? 'Low (Warmup)' : lvl === 'medium' ? 'Medium (Active)' : 'High (Match Max)'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Parameter E: Weather Condition selections */}
            <div className="space-y-2 font-mono">
              <div className="flex gap-1 items-center text-xs text-zinc-400 uppercase">
                <Thermometer className="w-3.5 h-3.5 text-red-400" />
                <span>Weather Conditions</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(['cool', 'temperate', 'warm', 'hot'] as const).map((wet) => {
                  const isW = weather === wet;
                  return (
                    <button
                      key={wet}
                      onClick={() => setWeather(wet)}
                      className={`py-2.5 rounded-lg border text-center text-[9px] font-bold tracking-widest uppercase cursor-pointer transition-all ${
                        isW 
                          ? 'bg-neutral-900 border-[#FF6B00]/40 text-[#FF6B00]' 
                          : 'bg-black/35 border-white/5 text-zinc-500 hover:text-white'
                      }`}
                    >
                      {wet === 'cool' ? 'Cool (< 18°C)' : wet === 'temperate' ? 'Temperate (18-25°C)' : wet === 'warm' ? 'Warm (26-32°C)' : 'Hot & Humid (> 33°C)'}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: High-Fidelity Performance HUD (Col-lg-7) */}
          <div className="lg:col-span-7 flex flex-col space-y-6" id="sports-calculator-visual-hud">
            
            <div className="glass-panel p-6 md:p-8 rounded-[2.5rem] border border-white/10 bg-black/60 relative overflow-hidden flex flex-col justify-between">
              {/* Scanline animations */}
              <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none animate-scanline bg-gradient-to-b from-transparent via-[#FF6B00]/2 to-transparent h-1" />

              <div className="flex justify-between items-start pb-4 border-b border-white/5 mb-6">
                <div>
                  <span className="font-mono text-zinc-500 text-[8px] tracking-widest uppercase">
                    DYNAMIC CALIBRATED INTELLIGENCE HUD
                  </span>
                  <h2 className="text-2xl font-black font-display text-white mt-0.5">
                    FLUID DEFICIT READOUT
                  </h2>
                </div>
                
                <span className="px-2.5 py-1 bg-[#00D9FF]/5 border border-[#00D9FF]/20 rounded font-mono text-[9px] text-[#00D9FF] tracking-widest uppercase font-black">
                  MATCH STATS // LIVE
                </span>
              </div>

              {/* Dynamic summary phrase */}
              <div className="bg-brand-orange/10 border border-brand-orange/30 p-5 rounded-2xl mb-6 relative">
                <div className="absolute -top-2 left-4 px-2 py-0.5 bg-[#FF6B00] text-black font-mono text-[8px] font-black uppercase rounded">
                  PERSONALIZED ATHLETE PRESCRIPTION
                </div>
                <p className="text-xs md:text-sm text-neutral-100 font-medium font-sans leading-relaxed">
                  "Based on your body weight of {weight} kg, activity duration of {duration} minutes, and high {intensity} intensity play of {currentSport.name}, you should consume <span className="text-[#FF6B00] font-black">{usagePlan.sachetsCount} sachet{usagePlan.sachetsCount > 1 ? 's' : ''}</span> of Electrona and <span className="text-brand-cyan font-black">{recommendedFluid} liters</span> of fluids to protect your tissue endurance and prevent sudden physical depletions."
                </p>
              </div>

              {/* Grid: Sweat & Electrolyte Deletion meters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                
                {/* Sweat Loss card */}
                <div className="bg-zinc-950/80 p-5 rounded-2xl border border-white/5 flex flex-col justify-between relative overflow-hidden">
                  <span className="font-mono text-zinc-500 text-[9px] tracking-wider uppercase">HOURLY LIQUID EXPULSION</span>
                  
                  <div className="flex items-baseline gap-1.5 py-3">
                    <span className="text-3xl font-mono font-bold text-white">{sweatLoss}</span>
                    <span className="text-xs text-zinc-400">Liters (Total Lost)</span>
                  </div>

                  {/* Meter visual element */}
                  <div className="space-y-1 mt-2">
                    <div className="flex justify-between font-mono text-[8.5px] text-zinc-500">
                      <span>STAMINA THERMAL DRAIN</span>
                      <span>{(sweatLoss * 10).toFixed(0)}% Cap</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-cyan" style={{ width: `${Math.min(100, sweatLoss * 25)}%` }} />
                    </div>
                  </div>
                </div>

                {/* Electrolyte Loss card */}
                <div className="bg-zinc-950/80 p-5 rounded-2xl border border-white/5 flex flex-col justify-between relative overflow-hidden">
                  <span className="font-mono text-zinc-500 text-[9px] tracking-wider uppercase">ELECTROLYTE RESERVOIR LEAK</span>
                  
                  <div className="flex items-baseline gap-1.5 py-3">
                    <span className="text-3xl font-mono font-bold text-brand-orange">{totalElectrolytesLost}</span>
                    <span className="text-xs text-[#FF6B00] font-mono">mg Lost</span>
                  </div>

                  {/* Meter visual element */}
                  <div className="space-y-1 mt-2">
                    <div className="flex justify-between font-mono text-[8.5px] text-zinc-500">
                      <span>SODIUM RESERVOIR EMPTY RATE</span>
                      <span>{Math.round(totalElectrolytesLost / 30)}% depletion</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-orange" style={{ width: `${Math.min(100, totalElectrolytesLost / 32)}%` }} />
                    </div>
                  </div>
                </div>

              </div>

              {/* Graphic charts: Detailed Mineral Depletion breakdown bars */}
              <div className="bg-zinc-950/40 border border-white/5 p-5 rounded-2xl mb-6 space-y-4">
                <span className="font-mono text-zinc-500 text-[9px] tracking-widest uppercase block text-left">
                  BIO-INTEL DEPLETIAN COEFFICIENTS Breakdown
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Sodium bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-zinc-400">Sodium (Na+)</span>
                      <span className="text-white font-bold">{sodiumLost} mg</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF6B00]" style={{ width: `${Math.min(100, sodiumLost / 25)}%` }} />
                    </div>
                  </div>

                  {/* Potassium bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-zinc-400">Potassium (K+)</span>
                      <span className="text-white font-bold">{potassiumLost} mg</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-cyan" style={{ width: `${Math.min(100, potassiumLost / 5)}%` }} />
                    </div>
                  </div>

                  {/* Magnesium bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-zinc-400">Magnesium (Mg2+)</span>
                      <span className="text-white font-bold">{magnesiumLost} mg</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-400" style={{ width: `${Math.min(100, magnesiumLost / 1)}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive SVG Water Canister Fluid Gauge Fills */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-black/40 border border-white/5 p-4 rounded-2xl mb-6">
                
                {/* Left side: canister graphics */}
                <div className="md:col-span-5 flex justify-center items-center">
                  <div className="relative w-28 h-36 border border-white/10 rounded-2.5xl p-1 bg-zinc-950 flex flex-col justify-end overflow-hidden">
                    
                    {/* Glowing water volume shader */}
                    <div 
                      className="w-full bg-gradient-to-t from-brand-cyan/80 to-brand-cyan/40 shadow-[0_0_15px_#00D9FF] rounded-b-xl relative transition-all duration-700 animate-pulse"
                      style={{ height: `${Math.min(100, recommendedFluid * 35)}%` }}
                    >
                      {/* Floating bubbles inside flow */}
                      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FFF 20%, transparent 20%)', backgroundSize: '10px 10px' }} />
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center font-mono select-none">
                      <span className="text-xl font-bold font-sans text-white">{recommendedFluid}L</span>
                      <span className="text-[7.5px] text-zinc-500 uppercase tracking-wider">Required Fluid</span>
                    </div>

                  </div>
                </div>

                {/* Right side: Detailed Electrona sachet delivery breakdown */}
                <div className="md:col-span-7 space-y-3 text-left">
                  <span className="font-mono text-zinc-500 text-[8.5px] uppercase tracking-wider block">Calibrated Electrona Intake Scheme</span>
                  
                  <div className="bg-[#00D9FF]/5 border border-[#00D9FF]/20 px-4 py-3 rounded-xl flex items-start gap-3">
                    <Zap className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-medium text-xs text-white uppercase">{usagePlan.text}</h4>
                      <p className="text-[11px] text-zinc-400 font-light mt-1">
                        {usagePlan.details}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Recovery tips tailored to selected sport */}
              <div className="border-t border-white/5 pt-5 space-y-2">
                <span className="font-mono text-zinc-500 text-[8px] uppercase tracking-widest block">
                  {currentSport.name.toUpperCase()} POST-MATCH CELL RECOVERY TIP 
                </span>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {currentSport.recoveryTip}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
