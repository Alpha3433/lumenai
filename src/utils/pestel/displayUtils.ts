
import { PestelFactor } from './types';

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
