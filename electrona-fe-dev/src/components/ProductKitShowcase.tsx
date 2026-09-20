import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MapPin, Activity, ShieldCheck, ArrowRight, Compass, Citrus, Leaf, ShieldAlert } from 'lucide-react';

interface FlavorProfile {
  id: string;
  name: string;
  origin: string;
  scientificName: string;
  tagline: string;
  description: string;
  story: string;
  performanceBenefit: string;
  themeColor: string; // Tailwind color class or hex
  accentBg: string; // tailwind glass background
  glowShadow: string; // custom color glow
  imageUrl: string;
  minerals: { name: string; amount: string }[];
  flavorNotes: string[];
}

export default function ProductKitShowcase() {
  const [selectedFlavor, setSelectedFlavor] = useState<string>('kokum');
  const [hoveredFlavor, setHoveredFlavor] = useState<string | null>(null);

  const flavors: FlavorProfile[] = [
    {
      id: 'kokum',
      name: 'KOKUM',
      origin: 'Konkan Coast',
      scientificName: 'Garcinia Indica',
      tagline: 'Traditional metabolic cooling active berry',
      description: 'Deep fruity flavour with a sharp, crisp profile traditionally valued across the coastal Konkan region.',
      story: 'Sourced directly from the vertical, mineral-rich slopes of the Western Ghats along the pristine Konkan Coast. Handpicked by local cooperatives, this wild forest fruit has been naturally sun-dried to secure its dense structure of Hydroxycitric Acid (HCA) and active garcinol. It acts as an organic cellular shield that stabilizes internal temperatures, enabling elite endurance and fast thirst-quenching under peak effort.',
      performanceBenefit: 'Decongests metabolic pathways, keeps body core temperature stable, and prevents early thermal muscle block.',
      themeColor: '#7C3AED', // Premium Deep Purple
      accentBg: 'rgba(124, 58, 237, 0.03)',
      glowShadow: 'rgba(124, 58, 237, 0.15)',
      imageUrl: '/kokum.webp',
      minerals: [
        { name: 'Garcinia Indica Active', amount: '450mg' },
        { name: 'Potassium Osmolyte', amount: '220mg' },
        { name: 'Active Polyphenols', amount: 'High' }
      ],
      flavorNotes: ['Tangy', 'Berry-rich', 'Astringent Reset']
    },
    {
      id: 'watermelon',
      name: 'WATERMELON',
      origin: 'Pan-India',
      scientificName: 'Citrullus Lanatus',
      tagline: 'Hydration powerhouse with premium L-Citrulline',
      description: 'Refreshing, juicy red hydration with naturally high free amino acids.',
      story: 'Cultivated in sandy riverbeds that promote deep potassium and mineral root absorption. Harvested at the absolute peak of solar ripeness, our watermelons are cold water extracted and freeze-dried at sub-zero temperatures within hours. This preserves the dense stores of L-Citrulline—a powerful natural precursor to nitric oxide synthesis that significantly accelerates joint re-oxygenation and limits oxygen debt.',
      performanceBenefit: 'Maximizes nitric oxide synthesis for enhanced oxygen delivery, delays lactic threshold buildup, and protects muscular stamina.',
      themeColor: '#EF4444', // Premium Fresh Red
      accentBg: 'rgba(239, 68, 68, 0.03)',
      glowShadow: 'rgba(239, 68, 68, 0.15)',
      imageUrl: '/watermelon.avif',
      minerals: [
        { name: 'Ultra L-Citrulline', amount: '600mg' },
        { name: 'Natural Citrullus Extract', amount: '500mg' },
        { name: 'Lycopene Defense Core', amount: '80mg' }
      ],
      flavorNotes: ['Sweet Crisp', 'Deep Melon Fresh', 'Clean Aftertaste']
    },
    {
      id: 'lime',
      name: 'LIME',
      origin: 'Kagzi Hills',
      scientificName: 'Citrus Aurantiifolia',
      tagline: 'Zesty electrolyte carrier with intense organic acids',
      description: 'Ultra-crisp classic citrus with instant salivary activation and sharp biological reset.',
      story: 'Sourced from the sun-drenched orchards of specialized Kagzi citrus terrains. These thin-skinned, organic heirloom limes are cold-pressed to extract their highly concentrated citric and ascorbic acids. The resulting formula triggers immediate salivary response—the first step in rehydration signaling—while generating a fast-acting alkaline ash that maintains cellular pH and prevents cramping.',
      performanceBenefit: 'Triggers fast metabolic salivary pathways, regulates deep systemic pH, and maximizes salt-ion cellular absorption.',
      themeColor: '#16A34A', // Premium Fresh Green
      accentBg: 'rgba(22, 163, 74, 0.03)',
      glowShadow: 'rgba(22, 163, 74, 0.15)',
      imageUrl: 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=600&q=80',
      minerals: [
        { name: 'Citric Acid Catalysts', amount: '380mg' },
        { name: 'Vitamin C Active', amount: '120mg' },
        { name: 'Sodium Ion Osmolytes', amount: '180mg' }
      ],
      flavorNotes: ['Zesty Citrus', 'Alkaline Sharp', 'Sprightly Cool']
    }
  ];

  const activeFlavor = flavors.find(f => f.id === selectedFlavor) || flavors[0];

  return (
    <section 
      className="relative bg-white py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-b border-neutral-100 font-sans" 
      id="flavours-section"
    >
      
      {/* Background Dynamic Spotlight Wash (Adapts beautifully based on hovered/selected flavor) */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out opacity-25"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${hoveredFlavor ? flavors.find(f => f.id === hoveredFlavor)?.themeColor : activeFlavor.themeColor}12 0%, transparent 65%)`
        }}
      />

      {/* Floating abstract lighting element */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-neutral-50/65 rounded-full filter blur-[120px] opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col items-center">
        
        {/* Elite Apple/Nike Style Header Section */}
        <div className="flex flex-col items-center text-center space-y-4 mb-24 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-50 border border-neutral-200/60 rounded-full font-mono text-[10px] text-neutral-600 font-bold tracking-widest uppercase shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B00] animate-pulse" />
            100% REAL FREEZE-DRIED BOTANICALS
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-neutral-950 uppercase leading-none"
          >
            FLAVOURS OF PERFORMANCE
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-neutral-500 text-base md:text-lg max-w-2xl leading-relaxed font-sans font-medium"
          >
            Clean hydration rooted in natural chemistry. Every fruit freeze-dried at the source of cultivation to secure maximum biological potential.
          </motion.p>
        </div>

        {/* 3 Premium Flavour Cards with Improved Spacing & Sizing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-11 w-full mb-24">
          {flavors.map((flavor) => {
            const isSelected = selectedFlavor === flavor.id;
            const isHovered = hoveredFlavor === flavor.id;
            
            return (
              <motion.div
                key={flavor.id}
                onClick={() => setSelectedFlavor(flavor.id)}
                onMouseEnter={() => setHoveredFlavor(flavor.id || null)}
                onMouseLeave={() => setHoveredFlavor(null)}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`relative overflow-hidden rounded-[3rem] border p-10 flex flex-col justify-between h-[550px] transition-all duration-500 bg-white group cursor-pointer ${
                  isSelected 
                    ? `border-neutral-200 shadow-[0_30px_70px_rgba(0,0,0,0.06)]` 
                    : `border-neutral-150/80 shadow-[0_15px_40px_rgba(0,0,0,0.015)] opacity-95 hover:opacity-100 hover:shadow-[0_25px_60px_rgba(0,0,0,0.04)]`
                }`}
                style={{ 
                  boxShadow: isSelected 
                    ? `0 35px 80px rgba(0,0,0,0.05), inset 0 0 0 1.5px ${flavor.themeColor}1a` 
                    : isHovered 
                      ? `0 25px 60px ${flavor.glowShadow}`
                      : undefined,
                  borderColor: isSelected ? `${flavor.themeColor}35` : undefined
                }}
              >
                {/* Spotlight Card Backlight */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${flavor.themeColor}04 0%, transparent 70%)`
                  }}
                />

                {/* Card Top Information */}
                <div className="flex justify-between items-start z-10 relative">
                  <div className="space-y-1.5">
                    <span className="font-mono text-[9px] text-neutral-400 tracking-widest block uppercase font-extrabold">SYSTEM ACTIVE BLOCK</span>
                    <h3 className="text-neutral-900 font-display font-black text-3xl tracking-tight block">{flavor.name}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-wider block font-black" style={{ color: flavor.themeColor }}>
                      {flavor.scientificName}
                    </span>
                  </div>

                  <span className="px-4 py-2 bg-neutral-50 border border-neutral-150 font-mono text-[9px] font-bold text-neutral-500 uppercase tracking-widest rounded-full flex items-center gap-1.5 transition-colors group-hover:bg-neutral-100 shadow-sm">
                    <Compass className="w-3.5 h-3.5" style={{ color: flavor.themeColor }} />
                    {flavor.origin}
                  </span>
                </div>

                {/* Card Center: Floating Realistic Product Image with glare reflections */}
                <div className="flex justify-center items-center py-6 relative">
                  {/* Subtle color flare backdrop */}
                  <motion.div 
                    animate={isSelected ? { scale: [1, 1.25, 1], opacity: [0.25, 0.45, 0.25] } : {}}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute w-52 h-52 rounded-full filter blur-[50px] pointer-events-none" 
                    style={{ backgroundColor: `${flavor.themeColor}1a` }} 
                  />
                  
                  {/* Motion floating capsule */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, isSelected ? 4 : isHovered ? 3 : 1.5, 0]
                    }}
                    transition={{
                      duration: isSelected ? 4 : isHovered ? 4.5 : 5.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative w-56 h-56 flex items-center justify-center transform-gpu"
                  >
                    <div className="relative w-48 h-48 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.06)] border-[6px] border-white overflow-hidden bg-neutral-50 transition-transform duration-700 group-hover:scale-106">
                      <img 
                        src={flavor.imageUrl} 
                        alt={flavor.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out"
                        style={{
                          objectFit: 'cover',
                          objectPosition: flavor.id === 'watermelon' ? 'calc(50% + 10px) center' : 'center center',
                        }}
                      />
                      {/* Specular glare sheen overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none mix-blend-overlay" />
                    </div>
                  </motion.div>
                </div>

                {/* Card Bottom Description */}
                <div className="border-t border-neutral-100 pt-6 space-y-2 z-10 relative text-left">
                  <span className="font-mono text-neutral-400 text-[9px] uppercase tracking-widest block font-extrabold">BOTANICAL NOTES</span>
                  <p className="text-[13px] md:text-sm text-neutral-500 font-medium leading-relaxed">
                    {flavor.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {flavor.flavorNotes.map((note, idx) => (
                      <span 
                        key={idx} 
                        className="px-2.5 py-1 rounded-full text-[9px] font-mono uppercase bg-neutral-50 border border-neutral-150 font-bold text-neutral-400"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Selected Interactive Product Details Showcase (The adapt-on-click module) */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFlavor.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="border border-neutral-200/80 rounded-[3rem] p-8 md:p-14 relative overflow-hidden text-left bg-white shadow-[0_30px_80px_rgba(0,0,0,0.03)] w-full"
            id="flavor-selected-insight"
          >
            {/* Minimal glowing top line color-coded precisely */}
            <div className="absolute top-0 left-0 right-0 h-[4px]" style={{ backgroundColor: activeFlavor.themeColor }} />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative">
              
              {/* Left Side: Premium Image Container representing active focus packaging */}
              <div className="lg:col-span-5 flex justify-center py-4 relative">
                {/* Spotlight halo aura */}
                <div 
                  className="absolute w-80 h-80 rounded-full filter blur-[100px] opacity-25 pointer-events-none" 
                  style={{ backgroundColor: activeFlavor.themeColor }} 
                />
                
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 25 }}
                  className="relative w-80 h-80 rounded-full overflow-hidden border-[8px] border-white shadow-[0_35px_70px_rgba(0,0,0,0.08)] flex justify-center items-center group/spot"
                >
                  <img 
                    src={activeFlavor.imageUrl} 
                    alt={activeFlavor.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-1000 scale-102 group-hover/spot:scale-106"
                    style={{
                      objectFit: 'cover',
                      objectPosition: activeFlavor.id === 'watermelon' ? 'calc(50% + 10px) center' : 'center center',
                    }}
                  />
                  {/* Outer gloss shield */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none mix-blend-overlay" />
                </motion.div>
              </div>

              {/* Middle Side: Dynamic scientific parameters and stories */}
              <div className="lg:col-span-4 space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] tracking-widest block uppercase font-black" style={{ color: activeFlavor.themeColor }}>
                      ACTIVE MINERAL CONCENTRATE
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeFlavor.themeColor }} />
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-black tracking-tight font-display text-neutral-900 leading-none">
                    {activeFlavor.name} PROFILE
                  </h3>
                  
                  <span className="inline-block font-mono text-[10px] uppercase font-bold text-neutral-400 bg-neutral-50 px-3 py-1 rounded-full border border-neutral-150">
                    Sourced: {activeFlavor.origin}
                  </span>
                </div>

                <div className="space-y-6">
                  <p className="text-sm md:text-base text-neutral-500 leading-relaxed font-sans font-medium">
                    {activeFlavor.story}
                  </p>
                  
                  <div className="bg-neutral-50/50 p-6 border border-neutral-150 rounded-[2rem] space-y-2 relative overflow-hidden">
                    {/* Tiny micro accent backing icon */}
                    <Leaf className="absolute -bottom-2 -right-2 w-16 h-16 text-neutral-200/50 pointer-events-none" />
                    
                    <div className="flex items-center gap-2 font-mono text-[9px] font-extrabold uppercase tracking-widest relative z-10" style={{ color: activeFlavor.themeColor }}>
                      <Activity className="w-4 h-4" />
                      <span>BIO-PHARMACOLOGICAL ADVANTAGE</span>
                    </div>
                    
                    <p className="text-xs text-neutral-500 leading-relaxed font-sans font-semibold relative z-10">
                      {activeFlavor.performanceBenefit}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: High Spec Table and Premium Price Callout */}
              <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-neutral-200/60 pt-8 lg:pt-0 lg:pl-8 space-y-8">
                <div className="space-y-5">
                  <span className="text-neutral-450 font-mono text-[9px] tracking-wider block uppercase font-extrabold">TRACE MINERAL CONCENTRATIONS</span>
                  
                  <div className="space-y-3 font-mono text-xs">
                    {activeFlavor.minerals.map((mineral, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-neutral-100">
                        <span className="text-neutral-500 font-semibold">{mineral.name}</span>
                        <span className="font-bold text-neutral-900" style={{ color: activeFlavor.themeColor }}>
                          {mineral.amount}
                        </span>
                      </div>
                    ))}
                    
                    <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                      <span className="text-neutral-500 font-semibold">Synthetic Dilutuents</span>
                      <span className="text-green-650 font-black flex items-center gap-1">
                        0.0% (PURE)
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2">
                      <span className="text-neutral-500 font-semibold">Stomach Sludge Factor</span>
                      <span className="text-green-650 font-black">ZERO</span>
                    </div>
                  </div>
                </div>

                {/* Refined pricing pill */}
                <div className="p-5 bg-white border border-neutral-150 rounded-2xl flex items-center justify-between shadow-sm relative overflow-hidden group">
                  <div className="text-left font-mono relative z-10">
                    <span className="text-neutral-400 text-[8px] uppercase block font-extrabold">PERFORMANCE PACK PRICE</span>
                    <span className="text-2xl font-black text-neutral-950">₹195 <span className="text-[10px] text-neutral-400 font-normal">/ 5-Kit</span></span>
                  </div>
                  
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded-full relative z-10 shadow-sm border border-neutral-150" style={{ backgroundColor: `${activeFlavor.themeColor}0a`, color: activeFlavor.themeColor }}>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    READY
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
