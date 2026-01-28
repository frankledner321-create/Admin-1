
import React, { useState } from 'react';
import { AppState, SharedItem } from '../types';

interface Props {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  showAlert: (title: string, message: string) => void;
}

const SharedMediaManager: React.FC<Props> = ({ state, setState, showAlert }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'link' | 'image' | 'note'>('link');

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content) return;
    
    // For Image, we simulate a free API link usage or the user provides a direct URL
    // In a real scenario, an image upload API like imgbb would be used.
    
    const newItem: SharedItem = {
      id: `s-${Date.now()}`,
      type,
      name,
      description: desc,
      content,
      date: new Date().toISOString()
    };
    setState(prev => ({ ...prev, sharedItems: [newItem, ...prev.sharedItems] }));
    setName('');
    setDesc('');
    setContent('');
    showAlert('সফল', 'শেয়ার সফল হয়েছে');
  };

  const deleteItem = (id: string) => {
    setState(prev => ({ ...prev, sharedItems: prev.sharedItems.filter(i => i.id !== id) }));
    showAlert('ডিলেট', 'আইটেম মুছে ফেলা হয়েছে');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <div className="space-y-8">
        <section className="bg-white dark:bg-sidebar-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
          <h3 className="text-lg font-bold mb-4">মিডিয়া শেয়ার করুন</h3>
          <div className="flex gap-2 mb-6">
            {(['link', 'image', 'note'] as const).map(t => (
              <button 
                key={t} onClick={() => setType(t)}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${type === t ? 'bg-primary text-background-dark' : 'bg-slate-100 dark:bg-border-dark text-slate-500'}`}
              >
                {t === 'link' && 'লিংক'}
                {t === 'image' && 'ছবি'}
                {t === 'note' && 'নোট'}
              </button>
            ))}
          </div>

          <form onSubmit={addItem} className="space-y-4">
            <input 
              type="text" value={name} onChange={e => setName(e.target.value)}
              className="w-full bg-slate-100 dark:bg-border-dark border-none rounded-lg focus:ring-2 focus:ring-primary" 
              placeholder="আইটেম নাম"
            />
            <textarea 
              value={desc} onChange={e => setDesc(e.target.value)}
              className="w-full bg-slate-100 dark:bg-border-dark border-none rounded-lg focus:ring-2 focus:ring-primary h-24" 
              placeholder="সংক্ষিপ্ত বর্ণনা"
            />
            <input 
              type={type === 'link' || type === 'image' ? 'url' : 'text'} 
              value={content} onChange={e => setContent(e.target.value)}
              className="w-full bg-slate-100 dark:bg-border-dark border-none rounded-lg focus:ring-2 focus:ring-primary" 
              placeholder={type === 'link' ? 'https://...' : type === 'image' ? 'ইমেজ ইউআরএল (Free API Link)' : 'নোট টেক্সট'}
            />
            <button type="submit" className="w-full bg-primary text-background-dark font-bold py-3 rounded-lg">শেয়ার করুন</button>
          </form>
        </section>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-bold px-2">শেয়ারকৃত আইটেম সমূহ</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {state.sharedItems.map(item => (
            <div key={item.id} className="bg-white dark:bg-sidebar-dark rounded-xl overflow-hidden border border-slate-200 dark:border-border-dark shadow-sm group">
              {item.type === 'image' && (
                <div className="h-32 bg-slate-200 overflow-hidden relative">
                  <img src={item.content} alt={item.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    item.type === 'link' ? 'bg-blue-100 text-blue-600' : 
                    item.type === 'image' ? 'bg-emerald-100 text-emerald-600' : 
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {item.type}
                  </span>
                  <button onClick={() => deleteItem(item.id)} className="text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
                <h4 className="font-bold mb-1 truncate">{item.name}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">{item.description}</p>
                {item.type !== 'image' && (
                   <div className="p-2 bg-slate-50 dark:bg-border-dark/50 rounded text-xs break-all text-primary font-mono truncate">
                     {item.content}
                   </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SharedMediaManager;
