
import React from 'react';

interface Props {
  activeTab: 'analytics' | 'tasks' | 'accounts' | 'earnings' | 'media';
  setActiveTab: (tab: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const navItems = [
    { id: 'analytics', label: 'ড্যাশবোর্ড', icon: 'dashboard' },
    { id: 'tasks', label: 'কাজ যোগ করুন', icon: 'add_task' },
    { id: 'accounts', label: 'অ্যাকাউন্ট সমূহ', icon: 'manage_accounts' },
    { id: 'earnings', label: 'আয়', icon: 'payments' },
    { id: 'media', label: 'শেয়ারড মিডিয়া', icon: 'share_reviews' },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/70 z-[70] transition-opacity lg:hidden backdrop-blur-sm ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside className={`fixed lg:static inset-y-0 left-0 w-72 lg:w-72 bg-white dark:bg-sidebar-dark border-r border-slate-200 dark:border-border-dark z-[80] transition-transform duration-500 lg:transform-none shadow-2xl lg:shadow-none ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary rounded-2xl p-3 flex items-center justify-center shadow-xl shadow-primary/30 rotate-3">
              <span className="material-symbols-outlined text-background-dark font-black">rocket_launch</span>
            </div>
            <div>
              <h1 className="font-black text-xl leading-tight tracking-tight">এডমিন</h1>
              <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">Micro-Job Pro</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-rose-500 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 px-6 space-y-2 mt-6">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">প্রধান মেনু</p>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); onClose(); }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-primary text-background-dark font-black shadow-2xl shadow-primary/20 scale-[1.02]' 
                  : 'text-slate-500 dark:text-[#92c9b7] hover:bg-slate-100 dark:hover:bg-border-dark/40 hover:translate-x-1'
              }`}
            >
              <span className={`material-symbols-outlined text-[24px] transition-transform group-hover:scale-110 ${activeTab === item.id ? 'fill-1' : ''}`}>
                {item.icon}
              </span>
              <span className="text-sm tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-8 mt-auto">
          <div className="bg-slate-50 dark:bg-border-dark/30 rounded-3xl p-5 border border-slate-200 dark:border-border-dark group">
             <div className="flex items-center gap-4">
                <div className="size-10 rounded-2xl bg-primary/20 flex items-center justify-center transition-transform group-hover:rotate-12">
                   <span className="material-symbols-outlined text-primary text-xl">verified_user</span>
                </div>
                <div>
                   <p className="text-xs font-black text-slate-800 dark:text-white">নিরাপদ সিস্টেম</p>
                   <p className="text-[10px] text-primary font-bold">এন্ড-টু-এন্ড প্রটেক্টেড</p>
                </div>
             </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
