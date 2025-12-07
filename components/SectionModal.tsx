'use client';

import { Section, Note, ImageItem, Task, MenuItem } from '@/types';
import { useState } from 'react';
import Image from 'next/image';
import { FiX, FiPlus, FiTrash2, FiEdit2, FiSave, FiImage, FiFileText, FiCheckSquare } from 'react-icons/fi';
import { MdRestaurantMenu } from 'react-icons/md';
import MenuManager from './MenuManager';

interface SectionModalProps {
  section: Section | null;
  onClose: () => void;
  onUpdate: (section: Section) => void;
}

type TabType = 'notes' | 'images' | 'tasks' | 'menu';

export default function SectionModal({ section, onClose, onUpdate }: SectionModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>(section?.id === 'menu' ? 'menu' : 'notes');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');

  if (!section) return null;

  const addNote = () => {
    if (!noteTitle.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      title: noteTitle,
      content: noteContent,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    onUpdate({
      ...section,
      notes: [...section.notes, newNote],
    });

    setNoteTitle('');
    setNoteContent('');
  };

  const updateNote = (noteId: string) => {
    onUpdate({
      ...section,
      notes: section.notes.map(note =>
        note.id === noteId
          ? { ...note, title: noteTitle, content: noteContent, updatedAt: new Date() }
          : note
      ),
    });
    setEditingNote(null);
    setNoteTitle('');
    setNoteContent('');
  };

  const deleteNote = (noteId: string) => {
    onUpdate({
      ...section,
      notes: section.notes.filter(note => note.id !== noteId),
    });
  };

  const addImage = () => {
    if (!imageUrl.trim()) return;

    const newImage: ImageItem = {
      id: Date.now().toString(),
      url: imageUrl,
      caption: imageCaption,
      uploadedAt: new Date(),
    };

    onUpdate({
      ...section,
      images: [...section.images, newImage],
    });

    setImageUrl('');
    setImageCaption('');
  };

  const deleteImage = (imageId: string) => {
    onUpdate({
      ...section,
      images: section.images.filter(img => img.id !== imageId),
    });
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      priority: 'medium',
      createdAt: new Date(),
    };

    onUpdate({
      ...section,
      tasks: [...section.tasks, newTask],
    });

    setNewTaskTitle('');
  };

  const toggleTask = (taskId: string) => {
    onUpdate({
      ...section,
      tasks: section.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    });
  };

  const deleteTask = (taskId: string) => {
    onUpdate({
      ...section,
      tasks: section.tasks.filter(task => task.id !== taskId),
    });
  };

  const startEditNote = (note: Note) => {
    setEditingNote(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className={`${section.color} rounded-t-2xl p-6 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{section.icon}</span>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {section.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/30 dark:hover:bg-black/30 transition-colors"
          >
            <FiX className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
              activeTab === 'notes'
                ? 'text-green-600 border-b-2 border-green-600 bg-white dark:bg-gray-800'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <FiFileText className="w-4 h-4" />
            Notlar ({section.notes.length})
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
              activeTab === 'images'
                ? 'text-green-600 border-b-2 border-green-600 bg-white dark:bg-gray-800'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <FiImage className="w-4 h-4" />
            Görseller ({section.images.length})
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
              activeTab === 'tasks'
                ? 'text-green-600 border-b-2 border-green-600 bg-white dark:bg-gray-800'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <FiCheckSquare className="w-4 h-4" />
            Görevler ({section.tasks.filter(t => t.completed).length}/{section.tasks.length})
          </button>
          {section.id === 'menu' && (
            <button
              onClick={() => setActiveTab('menu')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === 'menu'
                  ? 'text-green-600 border-b-2 border-green-600 bg-white dark:bg-gray-800'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <MdRestaurantMenu className="w-4 h-4" />
              Menü ({section.menuItems?.length || 0})
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'notes' && (
            <div className="space-y-4">
              {/* Add/Edit Note Form */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 space-y-3">
                <input
                  type="text"
                  placeholder="Not başlığı..."
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <textarea
                  placeholder="Not içeriği..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <button
                  onClick={editingNote ? () => updateNote(editingNote) : addNote}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  {editingNote ? <FiSave className="w-4 h-4" /> : <FiPlus className="w-4 h-4" />}
                  {editingNote ? 'Kaydet' : 'Not Ekle'}
                </button>
              </div>

              {/* Notes List */}
              <div className="space-y-3">
                {section.notes.map((note) => (
                  <div key={note.id} className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-900 dark:text-gray-100">{note.title}</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditNote(note)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        >
                          <FiEdit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                          <FiTrash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{note.content}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {note.updatedAt.toLocaleString('tr-TR')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="space-y-4">
              {/* Add Image Form */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 space-y-3">
                <input
                  type="text"
                  placeholder="Görsel URL'si..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <input
                  type="text"
                  placeholder="Açıklama (opsiyonel)..."
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <button
                  onClick={addImage}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <FiPlus className="w-4 h-4" />
                  Görsel Ekle
                </button>
              </div>

              {/* Images Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {section.images.map((image) => (
                  <div key={image.id} className="relative group">
                    <div className="relative w-full h-48 rounded-lg overflow-hidden">
                      <Image
                        src={image.url}
                        alt={image.caption || 'Image'}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <button
                      onClick={() => deleteImage(image.id)}
                      className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                    {image.caption && (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{image.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-4">
              {/* Add Task Form */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Yeni görev..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <button
                  onClick={addTask}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <FiPlus className="w-4 h-4" />
                  Ekle
                </button>
              </div>

              {/* Tasks List */}
              <div className="space-y-2">
                {section.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 p-4 rounded-lg border ${
                      task.completed
                        ? 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                        : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span
                      className={`flex-1 ${
                        task.completed
                          ? 'line-through text-gray-400'
                          : 'text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      {task.title}
                    </span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    >
                      <FiTrash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'menu' && section.id === 'menu' && (
            <div>
              <MenuManager
                menuItems={section.menuItems || []}
                onUpdate={(items: MenuItem[]) => {
                  onUpdate({
                    ...section,
                    menuItems: items,
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
