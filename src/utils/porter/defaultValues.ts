
import { PorterFiveForcesData } from './types';

// Default result structure with empty values
export const getDefaultForcesData = (): PorterFiveForcesData => ({
  'threat-new-entry': {
    category: 'threat-new-entry',
    title: 'Threat of new entry',
    level: 'Medium',
    icon: 'log-in',
    points: []
  },
  'threat-substitution': {
    category: 'threat-substitution',
    title: 'Threat of substitution',
    level: 'Medium',
    icon: 'shuffle',
    points: []
  },
  'supplier-power': {
    category: 'supplier-power',
    title: 'Supplier power',
    level: 'Medium',
    icon: 'truck',
    points: []
  },
  'buyer-power': {
    category: 'buyer-power',
    title: 'Buyer power',
    level: 'Medium',
    icon: 'users',
    points: []
  },
  'competitive-rivalry': {
    category: 'competitive-rivalry',
    title: 'Competitive rivalry',
    level: 'Medium',
    icon: 'swords',
    points: []
  }
});

// Provide default points if none were extracted
export const getFallbackPoints = (category: keyof PorterFiveForcesData): string[] => {
  switch (category) {
    case 'threat-new-entry':
      return [
        "Entry barriers depend on capital requirements and economies of scale.",
        "Brand loyalty and switching costs affect new entrants.",
        "Access to distribution channels can limit new competitors."
      ];
    case 'threat-substitution':
      return [
        "Customers may find alternative products or services.",
        "Price-performance trade-offs of substitutes influence decisions.",
        "Switching costs impact likelihood of substitution."
      ];
    case 'supplier-power':
      return [
        "Supplier concentration relative to industry concentration.",
        "Availability of substitute inputs affects supplier leverage.",
        "Importance of volume to suppliers impacts negotiating power."
      ];
    case 'buyer-power':
      return [
        "Buyer concentration relative to firm concentration.",
        "Degree of standardization or differentiation.",
        "Switching costs for buyers influence their power."
      ];
    case 'competitive-rivalry':
      return [
        "Number and balance of competitors in the market.",
        "Industry growth rate affects competition intensity.",
        "Fixed costs and exit barriers impact competitive behavior."
      ];
  }
};
