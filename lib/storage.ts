import { BoardData, SectionType } from '@/types';

const STORAGE_KEY = 'helthy-meals-board';

const defaultSections = {
  menu: {
    id: 'menu' as SectionType,
    title: 'Menü Planlama',
    icon: '🍱',
    color: 'bg-green-100 dark:bg-green-900',
    notes: [],
    images: [],
    tasks: [],
    menuItems: [],
  },
  operations: {
    id: 'operations' as SectionType,
    title: 'Operasyon',
    icon: '⚙️',
    color: 'bg-blue-100 dark:bg-blue-900',
    notes: [],
    images: [],
    tasks: [],
  },
  location: {
    id: 'location' as SectionType,
    title: 'Lokasyon Stratejisi',
    icon: '📍',
    color: 'bg-purple-100 dark:bg-purple-900',
    notes: [],
    images: [],
    tasks: [],
  },
  financial: {
    id: 'financial' as SectionType,
    title: 'Finansal Model',
    icon: '💰',
    color: 'bg-yellow-100 dark:bg-yellow-900',
    notes: [],
    images: [],
    tasks: [],
  },
  branding: {
    id: 'branding' as SectionType,
    title: 'Marka & Pazarlama',
    icon: '🎨',
    color: 'bg-pink-100 dark:bg-pink-900',
    notes: [],
    images: [],
    tasks: [],
  },
  legal: {
    id: 'legal' as SectionType,
    title: 'Yasal Süreç',
    icon: '⚖️',
    color: 'bg-gray-100 dark:bg-gray-900',
    notes: [],
    images: [],
    tasks: [],
  },
};

const defaultBoardData: BoardData = {
  sections: defaultSections,
  roadmap: [],
  lastUpdated: new Date(),
};

export const loadBoardData = (): BoardData => {
  if (typeof window === 'undefined') return defaultBoardData;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultBoardData;

    const parsed = JSON.parse(stored);
    // Convert date strings back to Date objects
    return {
      ...parsed,
      lastUpdated: new Date(parsed.lastUpdated),
      roadmap: parsed.roadmap.map((item: any) => ({
        ...item,
        startDate: item.startDate ? new Date(item.startDate) : undefined,
        endDate: item.endDate ? new Date(item.endDate) : undefined,
        tasks: item.tasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        })),
      })),
      sections: Object.fromEntries(
        Object.entries(parsed.sections).map(([key, section]: [string, any]) => [
          key,
          {
            ...section,
            notes: section.notes.map((note: any) => ({
              ...note,
              createdAt: new Date(note.createdAt),
              updatedAt: new Date(note.updatedAt),
            })),
            images: section.images.map((img: any) => ({
              ...img,
              uploadedAt: new Date(img.uploadedAt),
            })),
            tasks: section.tasks.map((task: any) => ({
              ...task,
              createdAt: new Date(task.createdAt),
              dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
            })),
            menuItems: section.menuItems ? section.menuItems.map((item: any) => ({
              ...item,
              createdAt: new Date(item.createdAt),
              updatedAt: new Date(item.updatedAt),
            })) : undefined,
          },
        ])
      ),
    };
  } catch (error) {
    console.error('Error loading board data:', error);
    return defaultBoardData;
  }
};

export const saveBoardData = (data: BoardData): void => {
  if (typeof window === 'undefined') return;

  try {
    const toSave = {
      ...data,
      lastUpdated: new Date(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (error) {
    console.error('Error saving board data:', error);
  }
};

export const exportBoardData = (): string => {
  const data = loadBoardData();
  return JSON.stringify(data, null, 2);
};

export const importBoardData = (jsonString: string): boolean => {
  try {
    const data = JSON.parse(jsonString);
    saveBoardData(data);
    return true;
  } catch (error) {
    console.error('Error importing board data:', error);
    return false;
  }
};
