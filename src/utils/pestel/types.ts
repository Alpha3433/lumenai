
// Core PESTEL analysis types

export interface PestelFactor {
  category: 'political' | 'economic' | 'social' | 'technological' | 'environmental' | 'legal';
  points: string[];
}

export type PestelData = {
  [key in PestelFactor['category']]: string[];
};
