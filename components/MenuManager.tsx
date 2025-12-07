'use client';

import { MenuItem, MealCategory, TemperatureType } from '@/types';
import { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiSave, FiX } from 'react-icons/fi';

interface MenuManagerProps {
  menuItems: MenuItem[];
  onUpdate: (items: MenuItem[]) => void;
}

export default function MenuManager({ menuItems, onUpdate }: MenuManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<MealCategory>('breakfast');
  const [activeTemp, setActiveTemp] = useState<TemperatureType>('hot');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'breakfast' as MealCategory,
    temperature: 'hot' as TemperatureType,
    price: '',
    cost: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    shelfLife: '',
    ingredients: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'breakfast',
      temperature: 'hot',
      price: '',
      cost: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
      shelfLife: '',
      ingredients: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) return;

    const menuItem: MenuItem = {
      id: editingId || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      temperature: formData.temperature,
      price: formData.price ? parseFloat(formData.price) : undefined,
      cost: formData.cost ? parseFloat(formData.cost) : undefined,
      calories: formData.calories ? parseInt(formData.calories) : undefined,
      protein: formData.protein ? parseFloat(formData.protein) : undefined,
      carbs: formData.carbs ? parseFloat(formData.carbs) : undefined,
      fats: formData.fats ? parseFloat(formData.fats) : undefined,
      shelfLife: formData.shelfLife ? parseInt(formData.shelfLife) : undefined,
      ingredients: formData.ingredients ? formData.ingredients.split(',').map(i => i.trim()) : undefined,
      createdAt: editingId ? menuItems.find(i => i.id === editingId)?.createdAt || new Date() : new Date(),
      updatedAt: new Date(),
    };

    if (editingId) {
      onUpdate(menuItems.map(item => item.id === editingId ? menuItem : item));
    } else {
      onUpdate([...menuItems, menuItem]);
    }

    resetForm();
  };

  const handleEdit = (item: MenuItem) => {
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      temperature: item.temperature,
      price: item.price?.toString() || '',
      cost: item.cost?.toString() || '',
      calories: item.calories?.toString() || '',
      protein: item.protein?.toString() || '',
      carbs: item.carbs?.toString() || '',
      fats: item.fats?.toString() || '',
      shelfLife: item.shelfLife?.toString() || '',
      ingredients: item.ingredients?.join(', ') || '',
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    onUpdate(menuItems.filter(item => item.id !== id));
  };

  const filteredItems = menuItems.filter(
    item => item.category === activeCategory && item.temperature === activeTemp
  );

  const getCategoryLabel = (cat: MealCategory) => cat === 'breakfast' ? 'Kahvaltı' : 'Öğle Yemeği';
  const getTempLabel = (temp: TemperatureType) => temp === 'hot' ? '🔥 Sıcak' : '❄️ Soğuk';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          🍱 Menü Yönetimi
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Yeni Ürün
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 space-y-4 border-2 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
              {editingId ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
            </h4>
            <button onClick={resetForm} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ürün Adı *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Örn: Protein Bowl, Yumurtalı Sandviç"
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Açıklama
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Ürün açıklaması..."
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kategori *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as MealCategory })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="breakfast">Kahvaltı</option>
                <option value="lunch">Öğle Yemeği</option>
              </select>
            </div>

            {/* Temperature */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sıcaklık *
              </label>
              <select
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value as TemperatureType })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="hot">🔥 Sıcak</option>
                <option value="cold">❄️ Soğuk</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Satış Fiyatı (₺)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="0.00"
              />
            </div>

            {/* Cost */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Maliyet (₺)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="0.00"
              />
            </div>

            {/* Calories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kalori (kcal)
              </label>
              <input
                type="number"
                value={formData.calories}
                onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="0"
              />
            </div>

            {/* Protein */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Protein (g)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.protein}
                onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="0"
              />
            </div>

            {/* Carbs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Karbonhidrat (g)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.carbs}
                onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="0"
              />
            </div>

            {/* Fats */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Yağ (g)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.fats}
                onChange={(e) => setFormData({ ...formData, fats: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="0"
              />
            </div>

            {/* Shelf Life */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Raf Ömrü (gün)
              </label>
              <input
                type="number"
                value={formData.shelfLife}
                onChange={(e) => setFormData({ ...formData, shelfLife: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="0"
              />
            </div>

            {/* Ingredients */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Malzemeler (virgülle ayırın)
              </label>
              <input
                type="text"
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Örn: Yumurta, Ekmek, Peynir, Domates"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <FiSave className="w-4 h-4" />
              {editingId ? 'Güncelle' : 'Ekle'}
            </button>
            <button
              onClick={resetForm}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveCategory('breakfast')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeCategory === 'breakfast'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          🥐 Kahvaltı ({menuItems.filter(i => i.category === 'breakfast').length})
        </button>
        <button
          onClick={() => setActiveCategory('lunch')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeCategory === 'lunch'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          🍽️ Öğle Yemeği ({menuItems.filter(i => i.category === 'lunch').length})
        </button>
      </div>

      {/* Temperature Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTemp('hot')}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTemp === 'hot'
              ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 border-2 border-orange-500'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          🔥 Sıcak ({menuItems.filter(i => i.category === activeCategory && i.temperature === 'hot').length})
        </button>
        <button
          onClick={() => setActiveTemp('cold')}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTemp === 'cold'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-2 border-blue-500'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          ❄️ Soğuk ({menuItems.filter(i => i.category === activeCategory && i.temperature === 'cold').length})
        </button>
      </div>

      {/* Menu Items List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <p className="text-lg font-medium mb-2">
              {getCategoryLabel(activeCategory)} - {getTempLabel(activeTemp)} kategorisinde ürün yok
            </p>
            <p className="text-sm">
              &quot;Yeni Ürün&quot; butonuna tıklayarak ekleyin
            </p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const margin = item.price && item.cost ? ((item.price - item.cost) / item.price * 100).toFixed(0) : null;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {item.name}
                      </h4>
                      {item.price && (
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold">
                          ₺{item.price.toFixed(2)}
                        </span>
                      )}
                      {margin && (
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          parseFloat(margin) > 50
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                        }`}>
                          Kar: %{margin}
                        </span>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {item.description}
                      </p>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      {item.calories && (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded px-3 py-2">
                          <span className="text-gray-500 dark:text-gray-400">Kalori:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">
                            {item.calories} kcal
                          </span>
                        </div>
                      )}
                      {item.protein && (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded px-3 py-2">
                          <span className="text-gray-500 dark:text-gray-400">Protein:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">
                            {item.protein}g
                          </span>
                        </div>
                      )}
                      {item.cost && (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded px-3 py-2">
                          <span className="text-gray-500 dark:text-gray-400">Maliyet:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">
                            ₺{item.cost.toFixed(2)}
                          </span>
                        </div>
                      )}
                      {item.shelfLife && (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded px-3 py-2">
                          <span className="text-gray-500 dark:text-gray-400">Raf Ömrü:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">
                            {item.shelfLife} gün
                          </span>
                        </div>
                      )}
                    </div>

                    {item.ingredients && item.ingredients.length > 0 && (
                      <div className="mt-3">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Malzemeler: </span>
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {item.ingredients.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <FiEdit2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Summary Stats */}
      {menuItems.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <p className="text-sm text-green-700 dark:text-green-400 mb-1">Toplam Ürün</p>
            <p className="text-2xl font-bold text-green-900 dark:text-green-100">{menuItems.length}</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <p className="text-sm text-blue-700 dark:text-blue-400 mb-1">Kahvaltı</p>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {menuItems.filter(i => i.category === 'breakfast').length}
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <p className="text-sm text-purple-700 dark:text-purple-400 mb-1">Öğle Yemeği</p>
            <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {menuItems.filter(i => i.category === 'lunch').length}
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <p className="text-sm text-orange-700 dark:text-orange-400 mb-1">Ortalama Fiyat</p>
            <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {menuItems.filter(i => i.price).length > 0
                ? `₺${(menuItems.reduce((sum, i) => sum + (i.price || 0), 0) / menuItems.filter(i => i.price).length).toFixed(2)}`
                : '-'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
