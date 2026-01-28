
import React, { useState } from 'react';
import { AppState } from '../types';
import AnalyticsView from './AnalyticsView';
import TaskManager from './TaskManager';
import AccountManager from './AccountManager';
import SharedMediaManager from './SharedMediaManager';
import EarningsManager from './EarningsManager';
import Sidebar from './Sidebar';
import Modal from './Modal';

interface Props {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const AdminDashboard: React.FC<Props> = ({ state, setState }) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'tasks' | 'accounts' | 'earnings' | 'media'>('analytics');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{title: string, message: string} | null>(null);

  const showAlert = (title: string, message: string) => {
    setModalContent({ title, message });
    setTimeout(() => setModalContent(null), 2500);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-slate-200 dark:border-border-dark bg-white dark:bg-sidebar-dark shrink-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-border-dark rounded-lg flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">menu</span>
            </button>
            <h2 className="text-lg lg:text-xl font-black text-slate-800 dark:text-white">
              {activeTab === 'analytics' && 'ড্যাশবোর্ড এনালাইসিস'}
              {activeTab === 'tasks' && 'কাজ ও ক্যাটাগরি'}
              {activeTab === 'accounts' && 'অ্যাকাউন্ট ম্যানেজমেন্ট'}
              {activeTab === 'earnings' && 'আয়ের রিপোর্ট'}
              {activeTab === 'media' && 'শেয়ারড কন্টেন্ট'}
            </h2>
          </div>
          <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
             <span className="material-symbols-outlined text-primary">person</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'analytics' && <AnalyticsView state={state} />}
            {activeTab === 'tasks' && <TaskManager state={state} setState={setState} showAlert={showAlert} />}
            {activeTab === 'accounts' && <AccountManager state={state} setState={setState} showAlert={showAlert} />}
            {activeTab === 'earnings' && <EarningsManager state={state} setState={setState} showAlert={showAlert} />}
            {activeTab === 'media' && <SharedMediaManager state={state} setState={setState} showAlert={showAlert} />}
          </div>
        </div>
      </main>

      {modalContent && (
        <Modal 
          title={modalContent.title} 
          message={modalContent.message} 
          onClose={() => setModalContent(null)} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;
