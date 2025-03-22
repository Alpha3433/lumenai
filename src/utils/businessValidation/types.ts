
export interface ValidationCategory {
  name: string;
  score: number;
  icon: any;
  color: string;
}

export interface ValidationData {
  overallScore: number;
  categories: ValidationCategory[];
  positives: string[];
  negatives: string[];
  recommendations: string[];
}
