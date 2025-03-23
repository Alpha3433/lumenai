
// Helper functions for Porter's Five Forces analysis data extraction and processing

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

export const extractPorterFiveForcesData = (analysisText: string): PorterFiveForcesData => {
  // In a real implementation, we would parse the analysisText to extract Porter's Five Forces
  // For now, return mock data that demonstrates the component
  return {
    'threat-new-entry': {
      category: 'threat-new-entry',
      title: 'Threat of new entry',
      level: 'Medium',
      icon: 'log-in',
      points: [
        "Low entry barriers for mobile app development; many new players can enter the market quickly.",
        "Established players have strong brand loyalty, but a niche focus could appeal to some users.",
        "Need for significant marketing investment to gain traction."
      ]
    },
    'threat-substitution': {
      category: 'threat-substitution',
      title: 'Threat of substitution',
      level: 'High',
      icon: 'shuffle',
      points: [
        "General dating apps are powerful substitutes that can pivot quickly to niche markets.",
        "Social media and networking platforms offer alternative ways to connect with like-minded people.",
        "Event-based meeting spots (like festivals) serve as natural environments for organic connections."
      ]
    },
    'supplier-power': {
      category: 'supplier-power',
      title: 'Supplier power',
      level: 'Low',
      icon: 'truck',
      points: [
        "Suppliers for app development (e.g., software developers) have abundant availability.",
        "Partnerships with festivals provide benefits but are not the primary income source.",
        "Variety of existing tech solutions that can be customized for various needs."
      ]
    },
    'buyer-power': {
      category: 'buyer-power',
      title: 'Buyer power',
      level: 'High',
      icon: 'users',
      points: [
        "Users have numerous dating options available, leading to high bargaining power.",
        "Expectations for user experience on par with established dating apps are high.",
        "Users may demand unique features that deliver added value beyond standard dating offerings."
      ]
    },
    'competitive-rivalry': {
      category: 'competitive-rivalry',
      title: 'Competitive rivalry',
      level: 'High',
      icon: 'swords',
      points: [
        "Many dating apps exist, leading to intense competition and the challenge of differentiation.",
        "Existing platforms could create similar features or sections for festival-goers quickly.",
        "High user expectations create constant demands for innovation."
      ]
    }
  };
};

export const getLevelColor = (level: ForcesLevel): string => {
  const colors = {
    'Low': 'green',
    'Medium': 'orange',
    'High': 'red'
  };
  
  return colors[level];
};
