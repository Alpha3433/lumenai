
export type ForcesLevel = 'Low' | 'Medium' | 'High';

export interface PorterForce {
  category: 'threat-new-entry' | 'threat-substitution' | 'supplier-power' | 'buyer-power' | 'competitive-rivalry';
  title: string;
  level: ForcesLevel;
  points: string[];
  icon: string;
}

export type PorterFiveForcesData = {
  [key in PorterForce['category']]: PorterForce;
};
