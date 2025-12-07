'use client';

import { Section } from '@/types';
import { FiImage, FiFileText, FiCheckSquare, FiPlus } from 'react-icons/fi';
import { MdRestaurantMenu } from 'react-icons/md';

interface SectionCardProps {
  section: Section;
  onClick: () => void;
}

export default function SectionCard({ section, onClick }: SectionCardProps) {
  const stats = {
    notes: section.notes.length,
    images: section.images.length,
    tasks: section.tasks.length,
    completedTasks: section.tasks.filter(t => t.completed).length,
    menuItems: section.menuItems?.length || 0,
  };

  return (
    <div
      onClick={onClick}
      className={`${section.color} rounded-xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{section.icon}</span>
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {section.title}
            </h3>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-black/20 transition-colors">
          <FiPlus className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        {section.id === 'menu' ? (
          <>
            <div className="bg-white/60 dark:bg-black/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1">
                <MdRestaurantMenu className="w-4 h-4" />
                <span className="text-xs font-medium">Menü</span>
              </div>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stats.menuItems}</p>
            </div>
            <div className="bg-white/60 dark:bg-black/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1">
                <FiFileText className="w-4 h-4" />
                <span className="text-xs font-medium">Notlar</span>
              </div>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stats.notes}</p>
            </div>
            <div className="bg-white/60 dark:bg-black/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1">
                <FiImage className="w-4 h-4" />
                <span className="text-xs font-medium">Görseller</span>
              </div>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stats.images}</p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white/60 dark:bg-black/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1">
                <FiFileText className="w-4 h-4" />
                <span className="text-xs font-medium">Notlar</span>
              </div>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stats.notes}</p>
            </div>

            <div className="bg-white/60 dark:bg-black/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1">
                <FiImage className="w-4 h-4" />
                <span className="text-xs font-medium">Görseller</span>
              </div>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stats.images}</p>
            </div>

            <div className="bg-white/60 dark:bg-black/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1">
                <FiCheckSquare className="w-4 h-4" />
                <span className="text-xs font-medium">Görevler</span>
              </div>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {stats.completedTasks}/{stats.tasks}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
