'use client';

import { useState } from 'react';
import { FiDownload, FiUpload, FiSave } from 'react-icons/fi';

interface HeaderProps {
  onExport: () => void;
  onImport: (file: File) => void;
  lastSaved?: Date;
}

export default function Header({ onExport, onImport, lastSaved }: HeaderProps) {
  const [importing, setImporting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      setImporting(false);
    }
  };

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-800 dark:to-green-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              🍱 HELTHY Meals
            </h1>
            <p className="text-green-100 mt-1 text-sm">
              Sağlıklı Meal Vending Konsepti - Dijital Çalışma Alanı
            </p>
          </div>

          <div className="flex items-center gap-3">
            {lastSaved && (
              <div className="hidden md:flex items-center gap-2 text-sm text-green-100">
                <FiSave className="w-4 h-4" />
                Son kaydedildi: {lastSaved.toLocaleTimeString('tr-TR')}
              </div>
            )}

            <button
              onClick={onExport}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <FiDownload className="w-4 h-4" />
              <span className="hidden sm:inline">Dışa Aktar</span>
            </button>

            <label className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer">
              <FiUpload className="w-4 h-4" />
              <span className="hidden sm:inline">İçe Aktar</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </header>
  );
}
