
export interface BusinessModel {
  name: string;
  description: string;
  fitScore: number;
  keyBenefits: string[];
  implementationComplexity: 'Low' | 'Medium' | 'High';
}
