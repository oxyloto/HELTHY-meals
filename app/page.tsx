'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SectionCard from '@/components/SectionCard';
import SectionModal from '@/components/SectionModal';
import Roadmap from '@/components/Roadmap';
import { BoardData, Section, SectionType } from '@/types';
import { loadBoardData, saveBoardData, exportBoardData } from '@/lib/storage';

export default function Home() {
  const [boardData, setBoardData] = useState<BoardData | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const data = loadBoardData();
    setBoardData(data);
    setLastSaved(data.lastUpdated);
  }, []);

  useEffect(() => {
    if (boardData) {
      saveBoardData(boardData);
      setLastSaved(new Date());
    }
  }, [boardData]);

  const handleSectionUpdate = (updatedSection: Section) => {
    if (!boardData) return;

    setBoardData({
      ...boardData,
      sections: {
        ...boardData.sections,
        [updatedSection.id]: updatedSection,
      },
    });
  };

  const handleRoadmapUpdate = (roadmap: BoardData['roadmap']) => {
    if (!boardData) return;

    setBoardData({
      ...boardData,
      roadmap,
    });
  };

  const handleExport = () => {
    const data = exportBoardData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `helthy-meals-board-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        setBoardData(data);
      } catch (error) {
        alert('Dosya içe aktarılırken hata oluştu!');
      }
    };
    reader.readAsText(file);
  };

  if (!boardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const sections = Object.values(boardData.sections);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header onExport={handleExport} onImport={handleImport} lastSaved={lastSaved} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            🚀 Hoş Geldiniz!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            HELTHY Meals projesi için dijital çalışma alanınız. Her bölümü tıklayarak notlarınızı,
            görsellerinizi ve görevlerinizi yönetebilirsiniz.
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
              💡 Konsept Özeti:
            </h3>
            <ul className="space-y-1 text-sm text-green-700 dark:text-green-400">
              <li>✅ Vakumlu kaselerde sağlıklı kahvaltı + öğle yemeği</li>
              <li>✅ Entegre mikrodalgalı akıllı otomatlar</li>
              <li>✅ Hedef: Çalışanlar ve öğrenciler</li>
              <li>✅ Fark: Sıcak/soğuk seçenek + anında ısıtma</li>
            </ul>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              onClick={() => setSelectedSection(section)}
            />
          ))}
        </div>

        {/* Roadmap */}
        <Roadmap items={boardData.roadmap} onUpdate={handleRoadmapUpdate} />
      </main>

      {/* Section Modal */}
      <SectionModal
        section={selectedSection}
        onClose={() => setSelectedSection(null)}
        onUpdate={handleSectionUpdate}
      />
    </div>
  );
}
