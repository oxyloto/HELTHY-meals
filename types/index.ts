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
}

export interface BoardData {
  sections: Record<SectionType, Section>;
  roadmap: RoadmapItem[];
  lastUpdated: Date;
}
