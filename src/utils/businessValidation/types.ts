
export interface ValidationData {
  overallScore: number;
  category?: string;
  description?: string;
  categories: {
    name: string;
    score: number;
    icon: string;
    color: string;
  }[];
  positives: string[];
  negatives: string[];
  recommendations: string[];
}

export interface ValidationMetric {
  title: string;
  value: number;
  description: string;
  trend?: number;
}
