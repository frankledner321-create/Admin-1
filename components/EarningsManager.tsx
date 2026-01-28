
import React, { useState } from 'react';
import { AppState, EarningRecord } from '../types';

interface Props {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  showAlert: (title: string, message: string) => void;
}

const EarningsManager: React.FC<Props> = ({ state, setState, showAlert }) => {
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');

  const filteredAccounts = state.accounts.filter(a => a.deviceId === selectedDevice);

  const handleAddEarning = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDevice || !selectedAccount || !amount) return;

    const newRecord: EarningRecord = {
      id: `earn-${Date.now()}`,
      deviceId: selectedDevice,
      accountId: selectedAccount,
      amount: parseFloat(amount),
      date: new Date().toISOString()
    };

    setState(prev => ({
      ...prev,
      earnings: [newRecord, ...prev.earnings]
    }));

    setAmount('');
    showAlert('সফল', 'আয়ের হিসাব যুক্ত হয়েছে');
  };

  const deleteEarning = (id: string) => {
    setState(prev => ({
      ...prev,
      earnings: prev.earnings.filter(e => e.id !== id)
    }));
    showAlert('ডিলেট', 'আয়ের হিসাব মুছে ফেলা হয়েছে');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <div className="space-y-8">
        <section className="bg-white dark:bg-sidebar-dark p-6 lg:p-8 rounded-3xl border border-slate-200 dark:border-border-dark shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-xl">paid</span>
            আয় যোগ করুন
          </h3>
          <form onSubmit={handleAddEarning} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">ডিভাইস নির্বাচন করুন</label>
              <select 
                value={selectedDevice} 
                onChange={e => { setSelectedDevice(e.target.value); setSelectedAccount(''); }}
                className="w-full bg-slate-50 dark:bg-border-dark border-2 border-transparent focus:border-primary rounded-2xl py-3 px-4 outline-none transition-all text-sm"
              >
                <option value="">ডিভাইস পছন্দ করুন</option>
                {state.devices.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">অ্যাকাউন্ট নির্বাচন করুন</label>
              <select 
                value={selectedAccount} 
                onChange={e => setSelectedAccount(e.target.value)}
                disabled={!selectedDevice}
                className="w-full bg-slate-50 dark:bg-border-dark border-2 border-transparent focus:border-primary disabled:opacity-50 rounded-2xl py-3 px-4 outline-none transition-all text-sm"
              >
                <option value="">অ্যাকাউন্ট পছন্দ করুন</option>
                {filteredAccounts.map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">আয়ের পরিমাণ (USD)</label>
              <input 
                type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)}
                className="w-full bg-slate-50 dark:bg-border-dark border-2 border-transparent focus:border-primary rounded-2xl py-3 px-4 outline-none transition-all text-sm font-bold" 
                placeholder="0.00"
              />
            </div>

            <button type="submit" className="w-full bg-primary text-background-dark font-black py-4 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
              রেকর্ড সেভ করুন
            </button>
          </form>
        </section>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-bold px-2 flex items-center justify-between">
          <span>আয়ের তালিকা</span>
        </h3>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
          {state.earnings.map(earn => {
            const device = state.devices.find(d => d.id === earn.deviceId);
            const account = state.accounts.find(a => a.id === earn.accountId);
            return (
              <div key={earn.id} className="bg-white dark:bg-sidebar-dark p-5 rounded-3xl border border-slate-200 dark:border-border-dark shadow-sm flex justify-between items-center group">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-black">$</div>
                  <div>
                    <div className="font-bold text-slate-800 dark:text-white">{account?.name || 'অজানা'}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">{device?.name || 'ডিভাইস নেই'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-black text-emerald-500">${earn.amount.toFixed(2)}</div>
                    <div className="text-[10px] text-slate-400">{new Date(earn.date).toLocaleDateString('bn-BD')}</div>
                  </div>
                  <button onClick={() => deleteEarning(earn.id)} className="text-rose-500 p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EarningsManager;
