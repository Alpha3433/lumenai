
/**
 * Type definitions for competitor data
 */
export type Competitor = {
  name: string;
  marketShare: string;
  founded: number;
  annualRevenue: string;
  strength: string;
  weakness: string;
  threatScore?: number;
  logo?: string;
  pricingModel?: string;
};
