
export interface PetProfile {
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'other';
  age: number;
  weight: number;
  activityLevel: 'low' | 'moderate' | 'high';
  allergies: string[];
}

export interface GuaranteedAnalysis {
  protein: number;
  fat: number;
  fiber: number;
  moisture?: number;
}

export interface FoodProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  unitSize: string;
  rating: number;
  category: string;
  isSale: boolean;
  salePrice?: number;
  image: string;
  ingredients: string[];
  analysis: GuaranteedAnalysis;
  suitability: string[];
}

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type: 'store' | 'hospital';
  name: string;
  address: string;
}

export enum AppTab {
  MAP = 'map',
  SHOP = 'shop',
  PROFILE = 'profile',
  VACATION = 'vacation'
}
