
// Core PESTEL analysis types

export interface PestelFactor {
  category: 'political' | 'economic' | 'social' | 'technological' | 'environmental' | 'legal';
  points: string[];
}

export interface PestelData {
  political: string[];
  economic: string[];
  social: string[];
  technological: string[];
  environmental: string[];
  legal: string[];
}
