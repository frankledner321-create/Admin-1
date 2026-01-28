
import React from 'react';

interface Props {
  title: string;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ title, message, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4">
      <div className="bg-white dark:bg-sidebar-dark border border-primary/30 rounded-2xl shadow-2xl p-6 w-full max-w-sm flex items-center gap-4 animate-in slide-in-from-bottom-8 pointer-events-auto">
        <div className="bg-primary/20 rounded-full p-3 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-3xl">check_circle</span>
        </div>
        <div>
          <h4 className="font-bold text-lg leading-tight">{title}</h4>
          <p className="text-sm text-slate-500 dark:text-[#92c9b7]">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
