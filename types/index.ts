export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ImageItem {
  id: string;
  url: string;
  caption?: string;
  uploadedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
}

export type MealCategory = 'breakfast' | 'lunch';
export type TemperatureType = 'hot' | 'cold';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MealCategory;
  temperature: TemperatureType;
  price?: number;
  cost?: number;
  ingredients?: string[];
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  image?: string;
  shelfLife?: number; // days
  createdAt: Date;
  updatedAt: Date;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  phase: 'planning' | 'in-progress' | 'completed';
  startDate?: Date;
  endDate?: Date;
  tasks: Task[];
}

export type SectionType = 'menu' | 'operations' | 'location' | 'financial' | 'branding' | 'legal';

export interface Section {
  id: SectionType;
  title: string;
  icon: string;
  color: string;
  notes: Note[];
  images: ImageItem[];
  tasks: Task[];
  menuItems?: MenuItem[]; // Only for menu section
}

export interface BoardData {
  sections: Record<SectionType, Section>;
  roadmap: RoadmapItem[];
  lastUpdated: Date;
}
