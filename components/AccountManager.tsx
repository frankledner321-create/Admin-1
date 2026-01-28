
import React, { useState } from 'react';
import { AppState, Device, Account } from '../types';

interface Props {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  showAlert: (title: string, message: string) => void;
}

const AccountManager: React.FC<Props> = ({ state, setState, showAlert }) => {
  const [deviceName, setDeviceName] = useState('');
  const [accName, setAccName] = useState('');
  const [accEmail, setAccEmail] = useState('');
  const [accPass, setAccPass] = useState('');
  const [accDeviceId, setAccDeviceId] = useState('');
  const [accLink, setAccLink] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const addDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deviceName) return;
    const newDevice: Device = { id: `dev-${Date.now()}`, name: deviceName };
    setState(prev => ({ ...prev, devices: [...prev.devices, newDevice] }));
    setDeviceName('');
    showAlert('সফল', 'ডিভাইসটি যুক্ত করা হয়েছে');
  };

  const addAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accName || !accDeviceId) return;
    const newAcc: Account = {
      id: `acc-${Date.now()}`,
      deviceId: accDeviceId,
      name: accName,
      email: accEmail,
      password: accPass,
      link: accLink
    };
    setState(prev => ({ ...prev, accounts: [...prev.accounts, newAcc] }));
    setAccName('');
    setAccEmail('');
    setAccPass('');
    setAccLink('');
    showAlert('সফল', 'অ্যাকাউন্টটি যুক্ত করা হয়েছে');
  };

  const deleteAccount = (id: string) => {
    setState(prev => ({ ...prev, accounts: prev.accounts.filter(a => a.id !== id) }));
    showAlert('ডিলেট', 'অ্যাকাউন্ট মুছে ফেলা হয়েছে');
  };

  const deleteDevice = (id: string) => {
    setState(prev => ({ ...prev, devices: prev.devices.filter(d => d.id !== id) }));
    showAlert('ডিলেট', 'ডিভাইস মুছে ফেলা হয়েছে');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <div className="space-y-8">
        <section className="bg-white dark:bg-sidebar-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">smartphone</span> ডিভাইস যোগ করুন
          </h3>
          <form onSubmit={addDevice} className="flex gap-2">
            <input 
              type="text" value={deviceName} onChange={e => setDeviceName(e.target.value)}
              className="flex-1 bg-slate-100 dark:bg-border-dark border-none rounded-lg focus:ring-2 focus:ring-primary" 
              placeholder="ডিভাইস নেইম (যেমন: Samsung A52)"
            />
            <button type="submit" className="bg-primary px-4 rounded-lg text-background-dark font-bold">যোগ করুন</button>
          </form>
        </section>

        <section className="bg-white dark:bg-sidebar-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">person_add</span> অ্যাকাউন্ট যোগ করুন
          </h3>
          <form onSubmit={addAccount} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">ডিভাইস নির্বাচন</label>
              <select 
                value={accDeviceId} onChange={e => setAccDeviceId(e.target.value)}
                className="w-full bg-slate-100 dark:bg-border-dark border-none rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="">নির্বাচন করুন</option>
                {state.devices.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <input 
              type="text" value={accName} onChange={e => setAccName(e.target.value)}
              className="w-full bg-slate-100 dark:bg-border-dark border-none rounded-lg focus:ring-2 focus:ring-primary" 
              placeholder="অ্যাকাউন্টের নাম"
            />
            <input 
              type="email" value={accEmail} onChange={e => setAccEmail(e.target.value)}
              className="w-full bg-slate-100 dark:bg-border-dark border-none rounded-lg focus:ring-2 focus:ring-primary" 
              placeholder="ইমেইল"
            />
            <input 
              type="password" value={accPass} onChange={e => setAccPass(e.target.value)}
              className="w-full bg-slate-100 dark:bg-border-dark border-none rounded-lg focus:ring-2 focus:ring-primary" 
              placeholder="পাসওয়ার্ড"
            />
            <input 
              type="url" value={accLink} onChange={e => setAccLink(e.target.value)}
              className="w-full bg-slate-100 dark:bg-border-dark border-none rounded-lg focus:ring-2 focus:ring-primary" 
              placeholder="লিংক (অপশনাল)"
            />
            <button type="submit" className="w-full bg-primary text-background-dark font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors">
              অ্যাকাউন্ট যুক্ত করুন
            </button>
          </form>
        </section>
      </div>

      <div className="space-y-8">
        <section className="bg-white dark:bg-sidebar-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-border-dark font-bold">যোগ করা ডিভাইস ও অ্যাকাউন্ট</div>
          <div className="p-4 space-y-6">
            {state.devices.map(d => (
              <div key={d.id} className="space-y-2">
                <div className="flex justify-between items-center border-b border-primary/20 pb-1">
                  <h4 className="font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">phone_iphone</span> {d.name}
                  </h4>
                  <button onClick={() => deleteDevice(d.id)} className="text-rose-500 hover:text-rose-700">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
                <div className="space-y-1">
                  {state.accounts.filter(a => a.deviceId === d.id).map(acc => (
                    <div 
                      key={acc.id} 
                      onClick={() => setSelectedAccount(acc)}
                      className="flex justify-between items-center p-3 bg-slate-50 dark:bg-border-dark/30 rounded-lg cursor-pointer hover:border-primary border border-transparent transition-all"
                    >
                      <div className="text-sm font-medium">{acc.name}</div>
                      <div className="flex gap-2">
                        <span className="material-symbols-outlined text-slate-400 text-sm">visibility</span>
                        <button onClick={(e) => { e.stopPropagation(); deleteAccount(acc.id); }} className="text-rose-500">
                           <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  {state.accounts.filter(a => a.deviceId === d.id).length === 0 && (
                    <div className="text-xs text-slate-400 italic py-2">কোন অ্যাকাউন্ট নেই</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {selectedAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-sidebar-dark w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in">
            <div className="p-6 border-b border-slate-100 dark:border-border-dark flex justify-between items-center">
              <h3 className="font-bold text-lg">অ্যাকাউন্ট বিস্তারিত</h3>
              <button onClick={() => setSelectedAccount(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-border-dark rounded-full">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div><span className="text-xs text-slate-500 block">নাম:</span><span className="font-bold">{selectedAccount.name}</span></div>
              <div><span className="text-xs text-slate-500 block">ইমেইল:</span><span className="font-bold">{selectedAccount.email}</span></div>
              <div><span className="text-xs text-slate-500 block">পাসওয়ার্ড:</span><span className="font-bold">{selectedAccount.password}</span></div>
              {selectedAccount.link && (
                <div>
                  <span className="text-xs text-slate-500 block">লিংক:</span>
                  <a href={selectedAccount.link} target="_blank" rel="noopener" className="text-primary font-bold break-all hover:underline">{selectedAccount.link}</a>
                </div>
              )}
            </div>
            <div className="p-6 pt-0">
               <button onClick={() => setSelectedAccount(null)} className="w-full bg-slate-100 dark:bg-border-dark font-bold py-3 rounded-xl">বন্ধ করুন</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManager;
