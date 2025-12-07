'use client';

import { RoadmapItem } from '@/types';
import { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiCheck } from 'react-icons/fi';

interface RoadmapProps {
  items: RoadmapItem[];
  onUpdate: (items: RoadmapItem[]) => void;
}

export default function Roadmap({ items, onUpdate }: RoadmapProps) {
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [showForm, setShowForm] = useState(false);

  const addItem = () => {
    if (!newItemTitle.trim()) return;

    const newItem: RoadmapItem = {
      id: Date.now().toString(),
      title: newItemTitle,
      description: newItemDescription,
      phase: 'planning',
      tasks: [],
    };

    onUpdate([...items, newItem]);
    setNewItemTitle('');
    setNewItemDescription('');
    setShowForm(false);
  };

  const deleteItem = (id: string) => {
    onUpdate(items.filter(item => item.id !== id));
  };

  const updatePhase = (id: string, phase: RoadmapItem['phase']) => {
    onUpdate(items.map(item => item.id === id ? { ...item, phase } : item));
  };

  const getPhaseColor = (phase: RoadmapItem['phase']) => {
    switch (phase) {
      case 'planning':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'completed':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
    }
  };

  const getPhaseLabel = (phase: RoadmapItem['phase']) => {
    switch (phase) {
      case 'planning':
        return 'Planlama';
      case 'in-progress':
        return 'Devam Ediyor';
      case 'completed':
        return 'Tamamlandı';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          🗺️ Yol Haritası
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Yeni Adım
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-6 space-y-3">
          <input
            type="text"
            placeholder="Başlık..."
            value={newItemTitle}
            onChange={(e) => setNewItemTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <textarea
            placeholder="Açıklama..."
            value={newItemDescription}
            onChange={(e) => setNewItemDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <div className="flex gap-2">
            <button
              onClick={addItem}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <FiCheck className="w-4 h-4" />
              Ekle
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>Henüz yol haritası eklenmemiş.</p>
            <p className="text-sm mt-2">Başlamak için &quot;Yeni Adım&quot; butonuna tıklayın.</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className="relative pl-8 pb-8 border-l-2 border-gray-300 dark:border-gray-600 last:pb-0"
            >
              <div className="absolute left-0 top-0 w-4 h-4 -ml-[9px] rounded-full bg-green-600 border-4 border-white dark:border-gray-800" />

              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                      {index + 1}. {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                  </div>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => updatePhase(item.id, 'planning')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      item.phase === 'planning'
                        ? getPhaseColor('planning')
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Planlama
                  </button>
                  <button
                    onClick={() => updatePhase(item.id, 'in-progress')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      item.phase === 'in-progress'
                        ? getPhaseColor('in-progress')
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Devam Ediyor
                  </button>
                  <button
                    onClick={() => updatePhase(item.id, 'completed')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      item.phase === 'completed'
                        ? getPhaseColor('completed')
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Tamamlandı
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
