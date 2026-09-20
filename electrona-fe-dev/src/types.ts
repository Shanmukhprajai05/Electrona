export type PageTab =
  | 'HOME'
  | 'PRODUCTS'
  | 'SPORTS'
  | 'ABOUT'
  | 'LOGIN'
  | 'REGISTER'
  | 'PROFILE';

export type SachetType = 'PRE' | 'DURING' | 'POST';

export interface SachetInfo {
  id: SachetType;
  title: string;
  tagline: string;
  color: string;
  accentColor: string;
  benefits: string[];
  timing: string;
  impact: string;
  ingredients: { name: string; amount: string; purpose: string }[];
  gelFormat: boolean;
}

export type SportId = 'football' | 'cricket' | 'tennis' | 'badminton' | 'athletics' | 'fitness';

export interface SportData {
  id: SportId;
  name: string;
  sweatLoss: number; // in L/hr
  hydrationReq: string;
  electrolyteNeed: string; // in mg/hr
  recoveryReq: string;
  recommendedUsage: string;
  stats: {
    intensity: number; // 1-100
    staminaDrain: number; // 1-100
    electrolyteLoss: number; // 1-100
    focusNeed: number; // 1-100
  };
}

export type JourneyStage = 'PREPARE' | 'HYDRATE' | 'PERFORM' | 'RECOVER' | 'REPEAT';

export interface TimelineEvent {
  stage: JourneyStage;
  title: string;
  tagline: string;
  bgColor: string;
  accentColor: string;
  image: string;
  hudMetrics: { label: string; value: string; progress: number }[];
  description: string;
}
