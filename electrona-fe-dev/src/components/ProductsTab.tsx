import React, { useState } from 'react';
import { sachetData } from '../data/sportsData';
import { SachetType } from '../types';
import { motion } from 'motion/react';
import ProductKitShowcase from './ProductKitShowcase';
import { 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown, 
  Flame, 
  ShoppingBag, 
  Check, 
  X, 
  Award, 
  Sparkles, 
  Info,
  AlertTriangle,
  Minus,
  ArrowRight
} from 'lucide-react';

// Premium high-credibility competitor comparison matrix data
interface ComparisonRow {
  feature: string;
  electrona: { status: 'check' | 'warning' | 'cross'; text: string };
  sports: { status: 'check' | 'warning' | 'cross'; text: string };
  energy: { status: 'check' | 'warning' | 'cross'; text: string };
  water: { status: 'check' | 'warning' | 'cross'; text: string };
}

const comparisonFeatures: ComparisonRow[] = [
  {
    feature: "Hydration",
    electrona: { status: "check", text: "Instant Cellular Osmosis" },
    sports: { status: "warning", text: "Basic Osmotic Fluid" },
    energy: { status: "cross", text: "Dehydrating Effect" },
    water: { status: "check", text: "Pure Hydration Only" }
  },
  {
    feature: "Energy Support",
    electrona: { status: "check", text: "Sustained Smart Carbs" },
    sports: { status: "warning", text: "Sudden Sugar Spikes" },
    energy: { status: "cross", text: "Jittery Caffeine Crash" },
    water: { status: "cross", text: "Zero Fuel Provided" }
  },
  {
    feature: "Recovery Support",
    electrona: { status: "check", text: "Rapid Muscle Restoration" },
    sports: { status: "cross", text: "No Post-Match Buffers" },
    energy: { status: "cross", text: "Vascular Acidity Stress" },
    water: { status: "cross", text: "No Recovery Support" }
  },
  {
    feature: "Electrolytes",
    electrona: { status: "check", text: "Balanced Quad-Mineral" },
    sports: { status: "warning", text: "Trace Sodium Only" },
    energy: { status: "cross", text: "Potassium Depleting" },
    water: { status: "cross", text: "No Vital Minerals" }
  },
  {
    feature: "Sugar Content",
    electrona: { status: "check", text: "0g Added Sugars" },
    sports: { status: "warning", text: "High Corn Syrup/Sucrose" },
    energy: { status: "cross", text: "Extreme Sugar Loading" },
    water: { status: "check", text: "0g Added Sugars" }
  },
  {
    feature: "Muscle Support",
    electrona: { status: "check", text: "L-Citrulline Buffer" },
    sports: { status: "cross", text: "No Muscle Support" },
    energy: { status: "cross", text: "Risk of Muscle Jitter" },
    water: { status: "cross", text: "Zero Muscle Synthesis" }
  },
  {
    feature: "Absorption Speed",
    electrona: { status: "check", text: "Ultra-Fast Isotonic Speed" },
    sports: { status: "warning", text: "Delayed Gastric Clearing" },
    energy: { status: "cross", text: "Stomach Bloating Pools" },
    water: { status: "warning", text: "Slow Diffusion Rate" }
  }
];

function StatusCell({ status, text, isHighlighted = false }: { status: 'check' | 'warning' | 'cross'; text: string; isHighlighted?: boolean }) {
  let icon = null;
  let textColorClass = "";
  
  if (status === 'check') {
    icon = <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />;
    textColorClass = isHighlighted ? "text-[#FF6B00] font-black text-[12.5px]" : "text-slate-800 font-semibold text-[11.5px]";
  } else if (status === 'warning') {
    icon = <AlertTriangle className="w-4 h-4 text-amber-500 stroke-[2.5]" />;
    textColorClass = "text-slate-600 font-medium text-[11.5px]";
  } else {
    icon = <X className="w-4 h-4 text-rose-500 stroke-[3]" />;
    textColorClass = "text-slate-400 font-light text-[11.5px]";
  }

  return (
    <div className="flex items-center gap-2 text-left leading-tight w-full justify-start px-2">
      <div className="shrink-0 flex items-center justify-center w-5 h-5">{icon}</div>
      <span className={`font-sans tracking-tight ${textColorClass}`}>{text}</span>
    </div>
  );
}

interface PurchaseSelection {
  kitQty: number; // 1 kit (3 sachets), 3 kits (9 sachets), 9 kits (27 sachets)
  flavor: 'KOKUM' | 'WATERMELON' | 'LIME';
  sachetFocus: SachetType;
}

export default function ProductsTab() {
  const [activeTab, setActiveTab] = useState<SachetType>('DURING');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Checkout simulator state
  const [order, setOrder] = useState<PurchaseSelection>({
    kitQty: 3, // default to 3 kits (9 sachets)
    flavor: 'KOKUM',
    sachetFocus: 'DURING'
  });
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const keySachet = sachetData.find(s => s.id === activeTab) || sachetData[1];

  const faqs = [
    {
      q: 'Why does Electrona split hydration into three distinct sachets?',
      a: 'The physiological state of an athlete shifts dramatically during play. Pre-match calls for mental focus-loading and hyperhydration fluid reserves. During-match requires high-speed isotonic mineral delivery. Post-match demands amino peptide muscle reconstruction and metabolic recovery. Combining them into one dilutes their individual targeted efficacy.'
    },
    {
      q: 'Is Electrona fully WADA compliant and safe for competitive sports?',
      a: 'Absolutely. Every batch of Electrona is manufactured under strict quality standards and conforms to World Anti-Doping Agency (WADA) compliance parameters. There are zero synthetic muscle stimulants or restricted chemicals — 100% clean and safe for professional play.'
    },
    {
      q: 'How does natural fruit extract compare to synthetic chemistry of legacy brands?',
      a: 'Conventional hydration brands are packed with synthetic artificial flavor chemistry, high-fructose corn syrups, and bright artificial food dye chemicals. Electrona uses real freeze-dried Indian fruit extracts (Kokum, Watermelon, Lime) that trigger immediate salivary amylase digestion and are gentle on active stomachs.'
    },
    {
      q: 'How does the Isotonic balance absorption multiplier work?',
      a: 'An active drink is only absorbed as fast as it crosses raw cell membranes. Heavy high-sugar electrolyte solutions are hypertonic, meanings fluid gets drawn out of tissues into the gut to digest them, resulting in stomach sloshing. Electrona matches your body’s natural cell fluids (285 mOsm/kg), allowing instant hydration with zero bloating.'
    }
  ];

  // Base pricing:
  // Complete 3-In-1 Kit (3 sachets): ₹195
  // Cost per kit remains flat at ₹195
  const getPrice = () => {
    return order.kitQty * 195;
  };

  const currentPrice = getPrice();

  return (
    <>
      <div className="relative min-h-screen bg-brand-dark pt-28 pb-16 px-6 md:px-12 lg:px-24 text-left font-sans text-white animate-fade-in" id="products-detail-page">
      
      {/* Background gradients */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* THE ELECTRONA SYSTEM Showcase - Centered Strong Heading Header */}
        <div className="text-center max-w-[800px] mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-3 py-1 rounded-full font-mono text-[9px] text-brand-orange tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            THE TRILOGY PARADIGM
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight font-display text-white uppercase select-none">
            3-IN-1 <span className="text-[#FF6B00]">PERFORMANCE</span> KIT
          </h1>
          <p className="text-zinc-400 text-sm md:text-base font-light max-w-[700px] mx-auto leading-relaxed">
            One kit. Three phases. Complete performance support for before, during, and after activity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24" id="electrona-phases-showcase">
          
          {/* PHASE 01 — PRE-MATCH */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5, boxShadow: "0 20px 40px -12px rgba(255, 107, 0, 0.12)" }}
            className="group relative bg-[#09090b]/90 border border-white/5 hover:border-brand-orange/30 rounded-2xl p-5 flex flex-col justify-between min-h-[420px] transition-all duration-300 overflow-hidden cursor-pointer shadow-lg text-left"
            onClick={() => {
              setOrder(o => ({ ...o, sachetFocus: 'PRE' }));
              const element = document.getElementById('products-checkout-simulator');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-orange/5 to-transparent rounded-full filter blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />
            
            <div className="space-y-3.5 relative z-10 text-left flex-grow flex flex-col">
              <div className="flex justify-between items-center bg-white/2 p-2 rounded-lg border border-white/5">
                <span className="font-mono text-brand-orange text-[9px] tracking-wider uppercase font-extrabold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                  PHASE 01 — PRE-MATCH
                </span>
                <span className="text-zinc-500 font-mono text-[9px] font-bold tracking-widest">SACHET</span>
              </div>

              {/* Premium Image Container with light background, uncropped, clean ratio */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200/50 p-1.5 flex items-center justify-center shadow-inner">
                <img 
                  src="/prematch.jpeg" 
                  alt="Pre-Match Igniter"
                  className="w-full h-full object-contain select-none transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black font-display text-white tracking-tight uppercase leading-snug">
                  Pre-Match Igniter
                </h3>
                <p className="text-[#00D9FF] font-mono text-[9px] font-bold tracking-widest uppercase mt-0.5">
                  FOCUS IGNITION
                </p>
              </div>

              <p className="text-xs text-zinc-400 font-light leading-relaxed flex-grow">
                Boost focus, readiness, and energy before activity.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-white/5">
                {['Focus', 'Energy', 'Readiness'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 text-zinc-350 rounded text-[9px] font-mono tracking-wider uppercase font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-3.5 mt-4 flex justify-between items-center relative z-10">
              <div className="flex flex-col text-left">
                <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">UNIT RATE</span>
                <span className="text-base font-extrabold text-white font-sans">
                  ₹65 <span className="text-[10px] text-zinc-500 font-normal">/ each</span>
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-brand-orange/10 text-brand-orange group-hover:bg-[#FF6B00] group-hover:text-black border border-brand-orange/20 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-300">
                <span>SELECT</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </motion.div>

          {/* PHASE 02 — DURING-MATCH */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 20px 40px -12px rgba(255, 107, 0, 0.12)" }}
            className="group relative bg-[#09090b]/90 border border-white/5 hover:border-brand-orange/30 rounded-2xl p-5 flex flex-col justify-between min-h-[420px] transition-all duration-300 overflow-hidden cursor-pointer shadow-lg text-left"
            onClick={() => {
              setOrder(o => ({ ...o, sachetFocus: 'DURING' }));
              const element = document.getElementById('products-checkout-simulator');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-orange/5 to-transparent rounded-full filter blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />
            
            <div className="space-y-3.5 relative z-10 text-left flex-grow flex flex-col">
              <div className="flex justify-between items-center bg-white/2 p-2 rounded-lg border border-white/5">
                <span className="font-mono text-brand-orange text-[9px] tracking-wider uppercase font-extrabold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                  PHASE 02 — DURING-MATCH
                </span>
                <span className="text-zinc-500 font-mono text-[9px] font-bold tracking-widest">SACHET</span>
              </div>

              {/* Premium Image Container with light background, uncropped, clean ratio */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200/50 p-1.5 flex items-center justify-center shadow-inner">
                <img 
                  src="/endurance.jpeg" 
                  alt="2-in-1 Endurance Gel"
                  className="w-full h-full object-contain select-none transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black font-display text-white tracking-tight uppercase leading-snug">
                  2-in-1 Endurance Gel
                </h3>
                <p className="text-brand-orange font-mono text-[9px] font-bold tracking-widest uppercase mt-0.5">
                  ENDURANCE FLOW
                </p>
              </div>

              <p className="text-xs text-zinc-400 font-light leading-relaxed flex-grow">
                Provides hydration and sustained energy during performance.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-white/5">
                {['Hydration', 'Electrolytes', 'Sustained Energy'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 text-zinc-355 rounded text-[9px] font-mono tracking-wider uppercase font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-3.5 mt-4 flex justify-between items-center relative z-10">
              <div className="flex flex-col text-left">
                <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">UNIT RATE</span>
                <span className="text-base font-extrabold text-white font-sans">
                  ₹65 <span className="text-[10px] text-zinc-500 font-normal">/ each</span>
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-brand-orange/10 text-brand-orange group-hover:bg-[#FF6B00] group-hover:text-black border border-brand-orange/20 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-300">
                <span>SELECT</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </motion.div>

          {/* PHASE 03 — POST-MATCH */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            whileHover={{ y: -5, boxShadow: "0 20px 40px -12px rgba(255, 107, 0, 0.12)" }}
            className="group relative bg-[#09090b]/90 border border-white/5 hover:border-brand-orange/30 rounded-2xl p-5 flex flex-col justify-between min-h-[420px] transition-all duration-300 overflow-hidden cursor-pointer shadow-lg text-left"
            onClick={() => {
              setOrder(o => ({ ...o, sachetFocus: 'POST' }));
              const element = document.getElementById('products-checkout-simulator');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-orange/5 to-transparent rounded-full filter blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />
            
            <div className="space-y-3.5 relative z-10 text-left flex-grow flex flex-col">
              <div className="flex justify-between items-center bg-white/2 p-2 rounded-lg border border-white/5">
                <span className="font-mono text-brand-orange text-[9px] tracking-wider uppercase font-extrabold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                  PHASE 03 — POST-MATCH
                </span>
                <span className="text-zinc-500 font-mono text-[9px] font-bold tracking-widest">SACHET</span>
              </div>

              {/* Premium Image Container with light background, uncropped, clean ratio */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200/50 p-1.5 flex items-center justify-center shadow-inner">
                <img 
                  src="/recovery-poster.png" 
                  alt="Post-Match Recovery"
                  className="w-full h-full object-contain select-none transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black font-display text-white tracking-tight uppercase leading-snug">
                  Post-Match Recovery
                </h3>
                <p className="text-purple-400 font-mono text-[9px] font-bold tracking-widest uppercase mt-0.5">
                  RECOVERY RESET
                </p>
              </div>

              <p className="text-xs text-zinc-400 font-light leading-relaxed flex-grow">
                Fosters rapid muscle restoration, electrolyte recovery, and replenishment after high-intensity performance.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-white/5">
                {['Recovery', 'Replenishment', 'Muscle Restoration', 'Electrolyte Recovery', 'Lime Flavor'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 text-zinc-350 rounded text-[9px] font-mono tracking-wider uppercase font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-3.5 mt-4 flex justify-between items-center relative z-10">
              <div className="flex flex-col text-left">
                <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">UNIT RATE</span>
                <span className="text-base font-extrabold text-white font-sans">
                  ₹65 <span className="text-[10px] text-zinc-500 font-normal">/ each</span>
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-brand-orange/10 text-brand-orange group-hover:bg-[#FF6B00] group-hover:text-black border border-brand-orange/20 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-300">
                <span>SELECT</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </div>

    {/* Flavours Section replicated from Home Page */}
    <ProductKitShowcase />

    {/* Continuation of details page */}
    <div className="relative bg-brand-dark py-24 px-6 md:px-12 lg:px-24 text-left font-sans text-white" id="products-detail-page-part2">
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">

        {/* SECTION B: Competitive Analysis Redesign */}
        <div className="mb-24 max-w-5xl mx-auto bg-white border border-neutral-200/90 rounded-3xl overflow-hidden shadow-2xl relative" id="products-comparison-grid">
          {/* Subtle Accent Glow Header Stripe */}
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#FF6B00] via-amber-500 to-[#10B981]" />
          
          {/* Section Header */}
          <div className="bg-white px-6 py-8 md:px-10 md:py-10 text-left border-b border-neutral-100">
            <div className="space-y-2.5 max-w-3xl">
              <span className="font-mono text-[#FF6B00] text-[9.5px] font-extrabold tracking-widest uppercase bg-[#FF6B00]/8 px-2.5 py-0.5 rounded-full border border-[#FF6B00]/15 inline-block">
                PERFORMANCE COMPARISON
              </span>
              <h2 className="text-2xl md:text-3xl font-black font-display text-slate-900 uppercase tracking-tight leading-none animate-fade-in">
                PERFORMANCE COMPARISON
              </h2>
              <p className="text-slate-500 text-xs font-light leading-relaxed">
                See how Electrona compares against traditional hydration and energy solutions at a glance.
              </p>
            </div>
          </div>

          {/* Desktop/Tablet Grid - Clean comparison matrix with Premium Dark Header Row */}
          <div className="hidden md:block bg-white p-0">
            {/* Premium Dark Header Row */}
            <div className="grid grid-cols-12 gap-4 bg-zinc-950 text-white py-5 px-6 items-center">
              <div className="col-span-3 text-[11px] font-mono font-black tracking-widest text-zinc-400 uppercase">
                PHYSIOLOGICAL METRIC
              </div>
              <div className="col-span-3 text-center bg-[#FF6B00] text-zinc-950 font-display font-black text-xs py-2 px-3 rounded-xl uppercase tracking-wider relative">
                Electrona 3-in-1
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FF6B00] rotate-45" />
              </div>
              <div className="col-span-2 text-center text-zinc-300 font-display font-bold text-[11px] uppercase tracking-wide">
                Regular Sports Drinks
              </div>
              <div className="col-span-2 text-center text-zinc-300 font-display font-bold text-[11px] uppercase tracking-wide">
                Energy Drinks
              </div>
              <div className="col-span-2 text-center text-zinc-300 font-display font-bold text-[11px] uppercase tracking-wide">
                Plain Water
              </div>
            </div>

            {/* Matrix Comparison Rows */}
            <div className="divide-y divide-zinc-100">
              {comparisonFeatures.map((row, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-12 gap-4 items-center py-4 px-6 hover:bg-[#FF6B00]/[0.015] transition-all duration-200 group/row"
                >
                  {/* Column 1: Feature Title */}
                  <div className="col-span-3 text-left">
                    <h4 className="font-sans font-extrabold text-zinc-900 text-sm leading-tight">
                      {row.feature}
                    </h4>
                  </div>

                  {/* Column 2: Electrona (Subtly highlighted) */}
                  <div className="col-span-3 py-1 bg-[#FF6B00]/[0.025] rounded-xl border border-dashed border-[#FF6B00]/15 shadow-[inset_0_1px_2px_rgba(255,107,0,0.01)] h-full flex items-center">
                    <StatusCell status={row.electrona.status} text={row.electrona.text} isHighlighted />
                  </div>

                  {/* Column 3: Regular Sports Drinks */}
                  <div className="col-span-2 flex items-center h-full">
                    <StatusCell status={row.sports.status} text={row.sports.text} />
                  </div>

                  {/* Column 4: Energy Drinks */}
                  <div className="col-span-2 flex items-center h-full">
                    <StatusCell status={row.energy.status} text={row.energy.text} />
                  </div>

                  {/* Column 5: Plain Water */}
                  <div className="col-span-2 flex items-center h-full">
                    <StatusCell status={row.water.status} text={row.water.text} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Layout: Vertical Stacking, completely avoiding horizontal scroll */}
          <div className="block md:hidden bg-white p-4">
            <div className="space-y-4">
              {comparisonFeatures.map((row, index) => (
                <div key={index} className="border border-neutral-100 rounded-2xl p-4 bg-slate-50/40 space-y-3 shadow-sm text-left">
                  {/* Feature Title */}
                  <div className="border-b border-zinc-100 pb-2">
                    <span className="font-mono text-[7.5px] text-[#FF6B00] font-black uppercase tracking-widest block mb-0.5">
                      METRIC 0{index + 1}
                    </span>
                    <h4 className="font-sans font-black text-slate-900 text-sm">
                      {row.feature}
                    </h4>
                  </div>

                  {/* Comparisons stack */}
                  <div className="space-y-2">
                    {/* Electrona Highlighted */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl border border-[#FF6B00]/30 bg-[#FF6B00]/[0.02] shadow-sm">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                        <span className="font-sans font-bold text-xs text-[#FF6B00]">{row.electrona.text}</span>
                      </div>
                      <span className="font-mono text-[8px] font-black text-white bg-[#FF6B00] px-1.5 py-0.5 rounded uppercase tracking-wider">
                        Electrona
                      </span>
                    </div>

                    {/* Regular Sports */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-200/50 bg-white">
                      <div className="flex items-center gap-2">
                        {row.sports.status === 'check' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                        ) : row.sports.status === 'warning' ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 stroke-[2.5]" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-rose-500 stroke-[3]" />
                        )}
                        <span className="font-sans text-xs text-slate-750">{row.sports.text}</span>
                      </div>
                      <span className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                        Regular Sports
                      </span>
                    </div>

                    {/* Energy Drinks */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-200/50 bg-white">
                      <div className="flex items-center gap-2">
                        {row.energy.status === 'check' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                        ) : row.energy.status === 'warning' ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 stroke-[2.5]" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-rose-500 stroke-[3]" />
                        )}
                        <span className="font-sans text-xs text-slate-600">{row.energy.text}</span>
                      </div>
                      <span className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                        Energy Drinks
                      </span>
                    </div>

                    {/* Water */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-200/50 bg-white">
                      <div className="flex items-center gap-2">
                        {row.water.status === 'check' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                        ) : row.water.status === 'warning' ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 stroke-[2.5]" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-rose-500 stroke-[3]" />
                        )}
                        <span className="font-sans text-xs text-slate-600">{row.water.text}</span>
                      </div>
                      <span className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                        Plain Water
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION C: Immersive Purchase Box Simulator - Adjusted to Indian prices */}
        <div className="mb-24 bg-gradient-to-br from-neutral-950 via-zinc-950 to-neutral-950 border border-brand-orange/20 p-8 md:p-12 rounded-[2.5rem] relative animate-fade-in" id="products-checkout-simulator">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Checkout Selector Controls */}
            <div className="lg:col-span-7 text-left space-y-6">
              <span className="font-mono text-brand-orange text-[9px] tracking-widest uppercase font-bold bg-[#FF6B00]/10 px-2.5 py-1 rounded-full border border-[#FF6B00]/25">
                ATHLETE LOCKER SELECTOR
              </span>

              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display text-white">
                BUILD YOUR PERFORMANCE CRATE
              </h2>

              <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed">
                Choose your sachet quantity kits and primary natural local fruit extraction formula. Each custom pack contains a balanced arrangement of Pre, Play and Post session fuels.
              </p>

              {/* Kit count pick */}
              <div className="space-y-3 font-mono">
                <span className="text-[10px] text-zinc-500 tracking-wider uppercase block">
                  SELECT QUANTITY CONFIGURATION
                </span>
                
                <div className="grid grid-cols-3 gap-3">
                  {[1, 3, 9].map((kits) => {
                    const isPick = order.kitQty === kits;
                    const totalSachets = kits * 3;
                    return (
                      <button
                        key={kits}
                        onClick={() => {
                          setOrder(o => ({ ...o, kitQty: kits }));
                          setCheckoutComplete(false);
                        }}
                        className={`p-4 rounded-xl border text-center transition-all cursor-pointer font-bold select-none ${
                          isPick 
                            ? 'bg-[#00D9FF]/10 border-brand-cyan text-white glow-cyan' 
                            : 'bg-black/40 border-white/5 text-zinc-500 hover:border-white/10'
                        }`}
                      >
                        <div className="text-sm">{kits} Pack Kit{kits > 1 ? 's' : ''}</div>
                        <div className="text-[9.5px] text-brand-cyan">{totalSachets} Sachets</div>
                        <div className="text-[7.5px] text-zinc-500 tracking-widest mt-1 uppercase block truncate">
                          {kits === 1 ? 'Trial Pack' : kits === 3 ? 'Tournament Chest' : 'Season Vault'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Flavor pick */}
              <div className="space-y-3 font-mono">
                <span className="text-[10px] text-zinc-500 tracking-wider uppercase block">
                  SELECT FREEZE-DRIED INDIAN FRUIT FRAGMENTS
                </span>
                
                <div className="grid grid-cols-3 gap-3">
                  {(['KOKUM', 'WATERMELON', 'LIME'] as const).map((flav) => {
                    const isF = order.flavor === flav;
                    return (
                      <button
                        key={flav}
                        onClick={() => {
                          setOrder(o => ({ ...o, flavor: flav }));
                          setCheckoutComplete(false);
                        }}
                        className={`p-3 rounded-lg border text-xs text-center transition-all cursor-pointer select-none font-bold ${
                          isF 
                            ? 'bg-neutral-900 border-[#FF6B00]/40 text-[#FF6B00] glow-orange' 
                            : 'bg-black/30 border-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {flav}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Simulated Live Invoice Panel */}
            <div className="lg:col-span-5" id="checkout-invoice-panel">
              
              <div className="bg-zinc-950/80 border border-white/10 rounded-[1.5rem] p-6 space-y-6 relative text-left">
                
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="font-display font-black text-md text-white">ELECTRONA ORDER SPEC</span>
                  <span className="font-mono text-[7px] text-zinc-500">CODE // IND-KIT-00{order.kitQty}</span>
                </div>

                {/* Pricing spec breakdown */}
                <ul className="space-y-3 font-mono text-xs">
                  <li className="flex justify-between text-zinc-400">
                    <span>{order.kitQty}x Performance 3-In-1 Kit</span>
                    <span className="text-white font-bold">₹{order.kitQty * 195}</span>
                  </li>
                  <li className="flex justify-between text-zinc-400">
                    <span>Includes {order.kitQty * 3} individual sachets</span>
                    <span className="text-neutral-400">32g per sachet</span>
                  </li>
                  <li className="flex justify-between text-zinc-400">
                    <span>Infused Botanical Flavor</span>
                    <span className="text-[#FF6B00] font-bold">{order.flavor}</span>
                  </li>
                  <li className="flex justify-between text-zinc-400 border-b border-white/5 pb-2">
                    <span>Active Shipping Logistics</span>
                    <span className="text-green-400 font-bold uppercase">FREE DISPATCH</span>
                  </li>
                  <li className="flex justify-between text-white font-bold text-sm">
                    <span>TOTAL PRICE (INR)</span>
                    <span className="text-brand-orange text-lg">₹{currentPrice}</span>
                  </li>
                </ul>

                {checkoutComplete ? (
                  <div className="bg-green-950/30 border border-green-500/20 rounded-2xl p-4 text-center space-y-2 animate-pulse">
                    <Check className="w-6 h-6 text-green-400 mx-auto" />
                    <span className="font-mono text-[9px] text-green-300 tracking-wider block font-bold uppercase">
                      SYSTEM TRANSACTION SECURED
                    </span>
                    <p className="text-zinc-300 text-[10px] leading-relaxed">
                      Your Electrona Chest has been scheduled for priority delivery. Telemetry tracking coordinates will be transmitted to your athlete inbox instantly.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setCheckoutComplete(true)}
                    className="w-full py-4 text-center text-[11px] font-bold font-sans uppercase tracking-[0.2em] bg-[#FF6B00] text-black hover:bg-white hover:text-black transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center gap-1.5 shadow-lg active:scale-[0.98] select-none"
                    id="btn-buy-now-simulator"
                  >
                    DEPLOY PERFORMANCE SYSTEM
                    <Award className="w-4 h-4 text-black font-bold shrink-0" />
                  </button>
                )}

                <div className="flex justify-center items-center gap-2 text-[8px] font-mono text-zinc-600">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  BIO-SECURE ATHLETE CHECKOUT ENCRYPT
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* SECTION D: FAQ Accordion Deck */}
        <div className="mb-10" id="products-faq-tabs">
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[9px] text-zinc-400 tracking-widest uppercase">
              <HelpCircle className="w-3.5 h-3.5 text-[#00D9FF]" />
              ELECTRONA ATHLETIC KNOWLEDGE DIRECTORY
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display text-white uppercase">
              FREQUENTLY ASKED INTEGRITY QUESTIONS
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div 
                  key={i} 
                  className="bg-neutral-950/60 border border-white/5 rounded-xl overflow-hidden transition-all duration-300"
                  id={`fq-${i}`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full py-5 px-6 flex justify-between items-center text-left focus:outline-none select-none cursor-pointer"
                  >
                    <span className="text-sm md:text-base font-bold font-display text-white pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#00D9FF] shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[300px] border-t border-white/5 bg-zinc-950/40' : 'max-h-0'}`}>
                    <p className="py-5 px-6 text-zinc-400 text-xs md:text-sm font-light leading-relaxed block">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  </>
);
}
