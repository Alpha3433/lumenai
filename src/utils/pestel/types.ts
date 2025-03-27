
// Core PESTEL analysis types

export interface PestelFactor {
  category: 'political' | 'economic' | 'social' | 'technological' | 'environmental' | 'legal';
  points: string[];
}

export interface PestelData {
  [key in PestelFactor['category']]: string[];
}
