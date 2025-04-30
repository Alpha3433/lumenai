
export interface SwotComponents {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export const extractSwotData = (text: string): SwotComponents => {
  // Default example data (in a real app this would parse the text)
  return {
    strengths: [
      "Personalized AI workout plans",
      "Recurring revenue subscription model",
      "Growing market demand",
      "Mobile-first approach"
    ],
    weaknesses: [
      "High customer acquisition costs",
      "New entrant in competitive market",
      "Initial development costs",
      "Requires ongoing content updates"
    ],
    opportunities: [
      "Partnership with health insurers",
      "Corporate wellness programs",
      "International expansion",
      "Premium coaching features"
    ],
    threats: [
      "Established competitors",
      "Market saturation",
      "Changing fitness trends",
      "Privacy regulations"
    ]
  };
};
