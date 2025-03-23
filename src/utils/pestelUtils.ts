
// Helper functions for PESTEL analysis data extraction and processing

export interface PestelFactor {
  category: 'political' | 'economic' | 'social' | 'technological' | 'environmental' | 'legal';
  points: string[];
}

export type PestelData = {
  [key in PestelFactor['category']]: string[];
};

export const extractPestelData = (analysisText: string): PestelData => {
  // In a real implementation, we would parse the analysisText to extract PESTEL factors
  // For now, return mock data that demonstrates the component
  return {
    political: [
      "Potential changes in regulations affecting digital platforms and data privacy laws.",
      "Support for entertainment and tourism sectors may influence festival attendance positively or negatively.",
      "Governments may impose restrictions or regulations on event gatherings that could affect user engagement."
    ],
    economic: [
      "Economic fluctuations affecting attendance at music festivals, directly impacting app usage.",
      "Growth of the experience economy, where consumers prioritize experiential spending, could benefit user acquisition.",
      "Potential sponsorships or partnership opportunities with brands looking to reach festival-goers."
    ],
    social: [
      "Shifts in social behaviors toward online dating and community-building apps.",
      "Growing acceptance of diverse relationships and lifestyles, enhancing app appeal.",
      "Increasing festival culture and community development within music genres could attract users."
    ],
    technological: [
      "Advancements in mobile technology allowing better app functionalities and user experiences.",
      "Growth of social media platforms influencing how users discover and engage with dating apps.",
      "Integration of new features such as AR/VR experiences at festivals could enhance user engagement."
    ],
    environmental: [
      "Increased awareness of sustainability within the festival industry that could shape user preferences.",
      "Global efforts to minimize carbon footprints may affect festival operations.",
      "Natural disasters or climate change impact on festival scheduling and attendance."
    ],
    legal: [
      "Compliance with data protection regulations (e.g., GDPR) crucial for app development.",
      "Intellectual property laws relevant for branding and content creation within the app.",
      "Liability issues related to in-person events and group gatherings organized through the app."
    ]
  };
};

export const getCategoryIcon = (category: PestelFactor['category']): string => {
  const icons = {
    political: 'building',
    economic: 'dollar-sign',
    social: 'users',
    technological: 'cpu',
    environmental: 'leaf',
    legal: 'scale'
  };
  
  return icons[category];
};

export const getCategoryColor = (category: PestelFactor['category']): string => {
  const colors = {
    political: 'red',
    economic: 'blue',
    social: 'yellow',
    technological: 'purple',
    environmental: 'green',
    legal: 'orange'
  };
  
  return colors[category];
};
