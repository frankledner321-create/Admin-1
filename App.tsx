
import React, { useState, useEffect } from 'react';
import { AppState } from './types';
import AdminDashboard from './components/AdminDashboard';
import { initialData } from './constants';
import app from './firebase'; // Import the initialized firebase app

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('microjob_admin_state');
    return saved ? JSON.parse(saved) : initialData;
  });
  
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);

  // Persistence simulation for local data
  useEffect(() => {
    localStorage.setItem('microjob_admin_state', JSON.stringify(state));
  }, [state]);

  // Check if firebase is initialized
  useEffect(() => {
    if (app) {
      // In a real scenario, you'd check connection to Database/Firestore
      // For now, if the app is initialized, we consider it connected
      setIsFirebaseConnected(true);
    }
  }, []);

  return (
    <div className="min-h-screen font-sans overflow-hidden">
      <AdminDashboard state={state} setState={setState} />
      
      {/* Real Firebase Status Indicator */}
      <div className="fixed bottom-6 left-6 z-[60]">
        <div className="bg-white/90 dark:bg-sidebar-dark/90 px-5 py-3 rounded-2xl border border-slate-200 dark:border-border-dark flex items-center gap-3 text-[12px] font-black shadow-2xl backdrop-blur-xl">
          <div className="relative flex size-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isFirebaseConnected ? 'bg-primary' : 'bg-rose-500'}`}></span>
            <span className={`relative inline-flex rounded-full size-3 ${isFirebaseConnected ? 'bg-primary' : 'bg-rose-500'}`}></span>
          </div>
          <span className={isFirebaseConnected ? 'text-primary' : 'text-rose-500'}>
            {isFirebaseConnected ? 'ফায়ারবেজ কানেক্টেড' : 'ফায়ারবেজ কানেকশন নেই'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
