import { SportData, SachetInfo, TimelineEvent } from '../types';
import repeatImage from '../assets/repeat.jpg';

export const sportsData: SportData[] = [
  {
    id: 'football',
    name: 'Football',
    sweatLoss: 1.8,
    hydrationReq: '1200ml - 1500ml / match',
    electrolyteNeed: '1100mg / hour',
    recoveryReq: 'Glycogen loading & high peptide repair formulation within 30 mins',
    recommendedUsage: 'PRE-MATCH (Focus Ignition) 45m prior + DURING-MATCH (Endurance Flow) at Half-Time + POST-MATCH (Recovery Reset) post-match.',
    stats: {
      intensity: 88,
      staminaDrain: 94,
      electrolyteLoss: 85,
      focusNeed: 80,
    }
  },
  {
    id: 'cricket',
    name: 'Cricket',
    sweatLoss: 1.4,
    hydrationReq: '800ml - 1000ml / session',
    electrolyteNeed: '900mg / hour',
    recoveryReq: 'Active muscle cooling and thermal reset minerals',
    recommendedUsage: 'PRE-MATCH 30m prior + DURING-MATCH after each spell/session + POST-MATCH immediately after play.',
    stats: {
      intensity: 72,
      staminaDrain: 80,
      electrolyteLoss: 78,
      focusNeed: 95,
    }
  },
  {
    id: 'tennis',
    name: 'Tennis',
    sweatLoss: 2.2,
    hydrationReq: '1500ml - 1800ml / match',
    electrolyteNeed: '1400mg / hour',
    recoveryReq: 'Joint anti-inflammatory electrolytes + fast-chain amino acids',
    recommendedUsage: 'PRE-MATCH (Focus Ignition) 30m before + DURING-MATCH sip every changeover + POST-MATCH inside locker room.',
    stats: {
      intensity: 95,
      staminaDrain: 90,
      electrolyteLoss: 92,
      focusNeed: 98,
    }
  },
  {
    id: 'badminton',
    name: 'Badminton',
    sweatLoss: 1.6,
    hydrationReq: '1000ml - 1200ml / match',
    electrolyteNeed: '1000mg / hour',
    recoveryReq: 'ATP replenishment, tendon support, and rehydration reset',
    recommendedUsage: 'PRE-MATCH 30m prior + DURING-MATCH sip between games + POST-MATCH recovery shake within 45 mins.',
    stats: {
      intensity: 92,
      staminaDrain: 85,
      electrolyteLoss: 82,
      focusNeed: 96,
    }
  },
  {
    id: 'athletics',
    name: 'Track & Field',
    sweatLoss: 2.5,
    hydrationReq: '1800ml - 2200ml / training',
    electrolyteNeed: '1600mg / hour',
    recoveryReq: 'Lactic acid flush mechanism + deep glycogen peptide synthesis',
    recommendedUsage: 'PRE-MATCH 60m before heat + DURING-MATCH diluted sips between events + POST-MATCH full sachet immediately.',
    stats: {
      intensity: 98,
      staminaDrain: 89,
      electrolyteLoss: 96,
      focusNeed: 85,
    }
  },
  {
    id: 'fitness',
    name: 'Fitness Training',
    sweatLoss: 1.5,
    hydrationReq: '900ml - 1200ml / workout',
    electrolyteNeed: '850mg / hour',
    recoveryReq: 'Fast-twitch muscle tissue restoration & cortisol controller support',
    recommendedUsage: 'DURING-MATCH sachet active throughout high-intensity session + POST-MATCH repair reset.',
    stats: {
      intensity: 85,
      staminaDrain: 82,
      electrolyteLoss: 80,
      focusNeed: 75,
    }
  }
];

export const sachetData: SachetInfo[] = [
  {
    id: 'PRE',
    title: 'FOCUS IGNITION',
    tagline: 'PRE-MATCH NEURO-HYDRATOR',
    color: 'from-[#FF6B00] to-[#E05300]',
    accentColor: '#FF6B00',
    benefits: [
      'Amplifies neural reaction speeds and cognitive trackability',
      'Loads cellular hyperhydration reserves to delay core heating',
      'Offsets pre-competition adrenaline fatigue'
    ],
    timing: 'Consume 30-45 minutes before intense sports activity',
    impact: 'Up to 22% improvement in situational focus metrics and high-intensity stamina reserves.',
    ingredients: [
      { name: 'Beta-Alanine', amount: '2000mg', purpose: 'Lactic buffering' },
      { name: 'L-Tyrosine + Taurine', amount: '1500mg', purpose: 'Adrenal / Focus shield' },
      { name: 'Active Sodium Complex', amount: '450mg', purpose: 'Pre-hydration cellular capacity' },
      { name: 'Electrona Focus Blend', amount: '350mg', purpose: 'Myelin transmission support' }
    ],
    gelFormat: false
  },
  {
    id: 'DURING',
    title: 'ENDURANCE FLOW',
    tagline: 'INTRA-MATCH INTENSITY BOOSTER',
    color: 'from-[#00D9FF] to-[#00A1CC]',
    accentColor: '#00D9FF',
    benefits: [
      'Sustains ultra-fast high-potency fluid absorption via active Osmotic gradient',
      'Provides steady-state biological energy without glucose spikes or crashes',
      'Supplements magnesium, calcium and zinc to prevent critical muscle cramping'
    ],
    timing: 'Consume periodically during match or intensive training cycles',
    impact: 'Stamina capacity elongation by 34%, eliminating cramping risks under severe heat.',
    ingredients: [
      { name: 'Quad-Electrolyte Mineral Base', amount: '1100mg', purpose: 'Rapid sweat loss replacement' },
      { name: 'Isomaltulose Sustained Sugar', amount: '12g', purpose: 'Intense metabolic energy flow' },
      { name: 'Coconut Water Extract', amount: '1000mg', purpose: 'Natural nutrient transport' },
      { name: 'Magnesium Chelated', amount: '150mg', purpose: 'Neuro-muscular firing safety' }
    ],
    gelFormat: true
  },
  {
    id: 'POST',
    title: 'RECOVERY RESET',
    tagline: 'POST-MATCH REGENERATION ACCELERATOR',
    color: 'from-[#FF6B00] via-[#8035CC] to-[#00D9FF]',
    accentColor: '#AB3BFF',
    benefits: [
      'Replenishes muscle glycogen stores rapidly at a cellular level',
      'Reduces muscle soreness and oxidative stress signaling pathways',
      'Flushes accumulated metabolic byproduct and lactic acid toxicity'
    ],
    timing: 'Consume within 30-45 minutes immediately following competition',
    impact: 'Reduces typical muscular reset downtime from 72 hours down to 24 hours.',
    ingredients: [
      { name: 'L-Glutamine & Leucine', amount: '3500mg', purpose: 'Myofibrillar tissue synthesis' },
      { name: 'Tart Cherry Antioxidants', amount: '400mg', purpose: 'Oxidative inflammation block' },
      { name: 'Zinc & Vitamin D3 Support', amount: '50mg', purpose: 'Immune response reactivation' },
      { name: 'Full Spectrum Electrolytes', amount: '600mg', purpose: 'Structural moisture locking' }
    ],
    gelFormat: false
  }
];

export const journeyTimeline: TimelineEvent[] = [
  {
    stage: 'PREPARE',
    title: 'Preparation & Readiness',
    tagline: 'T-Minus 45 Minutes',
    bgColor: '#FF6B00',
    accentColor: 'text-orange-500',
    image: '/prepare1.jpg',
    hudMetrics: [
      { label: 'MUSCLE ACTIVATION', value: 'OPTIMAL', progress: 90 },
      { label: 'PRE-TRAINING HYDRATION', value: 'LOADED', progress: 95 }
    ],
    description: 'Prepare your body and mind before training. Start hydrated and focused so you are ready to perform at your best.'
  },
  {
    stage: 'HYDRATE',
    title: 'Hydration & Balance',
    tagline: 'T-Minus 0 Minutes',
    bgColor: '#00D9FF',
    accentColor: 'text-cyan-400',
    image: '/hydrate2.jpg',
    hudMetrics: [
      { label: 'ELECTROLYTE ABSORPTION', value: '4.8x FASTER', progress: 98 },
      { label: 'FLUID BALANCE EFFICIENCY', value: '100%', progress: 100 }
    ],
    description: 'Electrolytes help replace fluids lost through sweat and keep your body properly hydrated during activity.'
  },
  {
    stage: 'PERFORM',
    title: 'Performance Support',
    tagline: 'Active Competition',
    bgColor: '#00D9FF',
    accentColor: 'text-cyan-300',
    image: '/perform3.jpg',
    hudMetrics: [
      { label: 'SUSTAINED ENERGY', value: 'PEAK FLOW', progress: 95 },
      { label: 'ENDURANCE LEVEL', value: 'MAX CAPACITY', progress: 92 }
    ],
    description: 'Maintain energy, endurance, and focus throughout training and competition.'
  },
  {
    stage: 'RECOVER',
    title: 'Recovery & Repair',
    tagline: 'T-Minus 30 Minutes',
    bgColor: '#8035CC',
    accentColor: 'text-purple-500',
    image: '/recover4.jpg',
    hudMetrics: [
      { label: 'REHYDRATION TARGET', value: '100%', progress: 96 },
      { label: 'FATIGUE REDUCTION', value: 'ACTIVE', progress: 90 }
    ],
    description: 'Restore fluids and nutrients after exercise to help your body recover faster and reduce fatigue.'
  },
  {
    stage: 'REPEAT',
    title: 'Consistent Progress',
    tagline: 'Continuous Superiority',
    bgColor: '#FF6B00',
    accentColor: 'text-orange-400',
    image: repeatImage,
    hudMetrics: [
      { label: 'TRAINING CYCLE SYNC', value: 'LOCKED', progress: 100 },
      { label: 'DAILY PROGRESS TRACK', value: 'CONSISTENT', progress: 95 }
    ],
    description: 'Stay ready for your next session by maintaining proper hydration and recovery every day.'
  }
];
