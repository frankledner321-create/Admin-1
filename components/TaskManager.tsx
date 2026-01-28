
import React, { useState } from 'react';
import { AppState, Category, Task } from '../types';

interface Props {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  showAlert: (title: string, message: string) => void;
}

const TaskManager: React.FC<Props> = ({ state, setState, showAlert }) => {
  const [taskName, setTaskName] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [taskEarnings, setTaskEarnings] = useState('');
  const [taskLink, setTaskLink] = useState('');
  const [newCatName, setNewCatName] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName || !taskCategory) return;
    const newTask: Task = {
      id: Date.now().toString(),
      name: taskName,
      category: taskCategory,
      earnings: parseFloat(taskEarnings) || 0,
      link: taskLink,
      date: new Date().toISOString(),
      status: 'pending'
    };
    setState(prev => ({ ...prev, tasks: [newTask, ...prev.tasks] }));
    setTaskName('');
    setTaskEarnings('');
    setTaskLink('');
    showAlert('সফল', 'কাজটি সফলভাবে যোগ করা হয়েছে');
  };

  const addCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    const newCat: Category = { id: `cat-${Date.now()}`, name: newCatName };
    setState(prev => ({ ...prev, categories: [...prev.categories, newCat] }));
    setNewCatName('');
    showAlert('সফল', 'ক্যাটাগরি সফলভাবে যোগ করা হয়েছে');
  };

  const deleteCategory = (id: string) => {
    setState(prev => ({ ...prev, categories: prev.categories.filter(c => c.id !== id) }));
    showAlert('ডিলেট', 'ক্যাটাগরি মুছে ফেলা হয়েছে');
  };

  const deleteTask = (id: string) => {
    setState(prev => ({ ...prev, tasks: prev.tasks.filter(t => t.id !== id) }));
    showAlert('ডিলেট', 'কাজটি মুছে ফেলা হয়েছে');
  };

  const toggleReport = (id: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, isReported: !t.isReported } : t)
    }));
    const task = state.tasks.find(t => t.id === id);
    showAlert(task?.isReported ? 'বাতিল' : 'রিপোর্ট', 'টাস্ক রিপোর্ট আপডেট করা হয়েছে');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <div className="space-y-8">
        <section className="bg-white dark:bg-sidebar-dark p-6 lg:p-8 rounded-3xl border border-slate-200 dark:border-border-dark shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-xl">add_circle</span>
            কাজ যোগ করুন
          </h3>
          <form onSubmit={addTask} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">ক্যাটাগরি নির্বাচন</label>
              <select 
                value={taskCategory} 
                onChange={e => setTaskCategory(e.target.value)}
                className="w-full bg-slate-50 dark:bg-border-dark border-2 border-transparent focus:border-primary rounded-2xl py-3 px-4 outline-none transition-all text-sm"
              >
                <option value="">নির্বাচন করুন</option>
                {state.categories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">কাজের নাম</label>
              <input 
                type="text" value={taskName} onChange={e => setTaskName(e.target.value)} 
                className="w-full bg-slate-50 dark:bg-border-dark border-2 border-transparent focus:border-primary rounded-2xl py-3 px-4 outline-none transition-all text-sm" 
                placeholder="যেমন: টুইটার ফলো"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">আয় (USD)</label>
                <input 
                  type="number" step="0.01" value={taskEarnings} onChange={e => setTaskEarnings(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-border-dark border-2 border-transparent focus:border-primary rounded-2xl py-3 px-4 outline-none transition-all text-sm" 
                  placeholder="0.05"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">লিংক</label>
                <input 
                  type="url" value={taskLink} onChange={e => setTaskLink(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-border-dark border-2 border-transparent focus:border-primary rounded-2xl py-3 px-4 outline-none transition-all text-sm" 
                  placeholder="https://..."
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-primary text-background-dark font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all">
              কাজ যুক্ত করুন
            </button>
          </form>
        </section>

        <section className="bg-white dark:bg-sidebar-dark p-6 lg:p-8 rounded-3xl border border-slate-200 dark:border-border-dark shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-xl">category</span>
            ক্যাটাগরি যোগ করুন
          </h3>
          <form onSubmit={addCategory} className="flex gap-2">
            <input 
              type="text" value={newCatName} onChange={e => setNewCatName(e.target.value)}
              className="flex-1 bg-slate-50 dark:bg-border-dark border-2 border-transparent focus:border-primary rounded-2xl py-3 px-4 outline-none transition-all text-sm" 
              placeholder="ক্যাটাগরির নাম"
            />
            <button type="submit" className="bg-primary px-6 rounded-2xl text-background-dark font-bold shadow-md">যোগ</button>
          </form>
        </section>
      </div>

      <div className="space-y-8">
         <section className="bg-white dark:bg-sidebar-dark p-6 rounded-3xl border border-slate-200 dark:border-border-dark shadow-sm">
          <h3 className="text-lg font-bold mb-4">ক্যাটাগরি সমূহ</h3>
          <div className="flex flex-wrap gap-2">
            {state.categories.map(c => (
              <div key={c.id} className="flex items-center gap-2 bg-slate-100 dark:bg-border-dark/50 px-4 py-2 rounded-full text-sm font-medium">
                <span>{c.name}</span>
                <button onClick={() => deleteCategory(c.id)} className="text-rose-500 hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-sidebar-dark rounded-3xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-50 dark:border-border-dark flex justify-between items-center">
            <span className="font-bold">রানিং টাস্ক সমূহ</span>
            <span className="text-xs bg-rose-500/10 text-rose-500 px-3 py-1 rounded-full font-bold">
              {state.tasks.filter(t => t.isReported).length} রিপোর্ট
            </span>
          </div>
          <div className="max-h-[500px] overflow-y-auto divide-y divide-slate-50 dark:divide-border-dark scrollbar-hide">
            {state.tasks.map(t => (
              <div key={t.id} className={`p-5 flex justify-between items-center transition-all ${t.isReported ? 'bg-rose-50/50 dark:bg-rose-900/10' : 'hover:bg-slate-50 dark:hover:bg-border-dark/30'}`}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{t.category}</span>
                    {t.isReported && <span className="text-[9px] font-black text-rose-500 uppercase flex items-center gap-0.5"><span className="material-symbols-outlined text-[10px]">warning</span> REPORTED</span>}
                  </div>
                  <div className="font-bold text-slate-800 dark:text-white">{t.name}</div>
                  <div className="text-xs font-bold text-emerald-500 mt-0.5">${t.earnings.toFixed(2)}</div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleReport(t.id)} 
                    title={t.isReported ? "রিপোর্ট সরান" : "রিপোর্ট করুন"}
                    className={`p-2 rounded-xl transition-all ${t.isReported ? 'bg-rose-500 text-white' : 'text-slate-400 hover:bg-slate-200 dark:hover:bg-border-dark'}`}
                  >
                    <span className="material-symbols-outlined text-sm">report</span>
                  </button>
                  <button onClick={() => deleteTask(t.id)} className="text-rose-500 p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            ))}
            {state.tasks.length === 0 && (
              <div className="py-20 text-center text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-20">inventory_2</span>
                <p className="text-sm">কোন কাজ যুক্ত করা হয়নি</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TaskManager;
