
import React, { useState } from 'react';
import { AppState } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  state: AppState;
}

const AnalyticsView: React.FC<Props> = ({ state }) => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const today = new Date().toISOString().split('T')[0];
  
  const addedToday = state.tasks.filter(t => t.date.startsWith(today)).length;
  const reportedTasks = state.tasks.filter(t => t.isReported);
  const totalAccounts = state.accounts.length;
  const totalEarnings = state.earnings.reduce((sum, e) => sum + e.amount, 0);

  const getChartData = () => {
    // These would typically come from the state/database filtered by date
    if (timeframe === 'daily') {
      return [
        { name: 'সকাল', val: 4 }, { name: 'দুপুর', val: 7 }, { name: 'বিকাল', val: 12 }, 
        { name: 'সন্ধ্যা', val: 9 }, { name: 'রাত', val: 15 }
      ];
    } else if (timeframe === 'weekly') {
      return [
        { name: 'শনি', val: 20 }, { name: 'রবি', val: 35 }, { name: 'সোম', val: 25 }, 
        { name: 'মঙ্গল', val: 45 }, { name: 'বুধ', val: 30 }, { name: 'বৃহঃ', val: 55 }, { name: 'শুক্র', val: 40 }
      ];
    } else {
      return [
        { name: 'জানু', val: 120 }, { name: 'ফেব্রু', val: 180 }, { name: 'মার্চ', val: 240 }, 
        { name: 'এপ্রিল', val: 210 }, { name: 'মে', val: 290 }, { name: 'জুন', val: 350 }
      ];
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* 2x2 Stats Grid */}
      <div className="grid grid-cols-2 gap-4 lg:gap-8">
        <StatCard title="আজকে যুক্ত কাজ" value={addedToday} icon="add_task" color="blue" subtitle="নতুন কাজের সংখ্যা" />
        <StatCard title="রিপোর্ট কাজ" value={reportedTasks.length} icon="report_gmailerrorred" color="rose" subtitle="সমস্যাযুক্ত কাজ" />
        <StatCard title="মোট অ্যাকাউন্ট" value={totalAccounts} icon="manage_accounts" color="amber" subtitle="সকল ডিভাইস" />
        <StatCard title="মোট আয়" value={`$${totalEarnings.toFixed(2)}`} icon="payments" color="emerald" subtitle="মোট উপাৰ্জন" />
      </div>

      {/* Main Analytics Report with Timeframe Selection */}
      <div className="bg-white dark:bg-sidebar-dark border border-slate-200 dark:border-border-dark p-6 lg:p-10 rounded-[3rem] shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h4 className="text-2xl font-black text-slate-800 dark:text-white">এনালিটিক্স রিপোর্ট</h4>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">কাজের পারফরম্যান্স ট্র্যাকার</p>
          </div>
          <div className="flex bg-slate-100 dark:bg-border-dark/50 p-1.5 rounded-2xl w-full md:w-auto shadow-inner">
            {(['daily', 'weekly', 'monthly'] as const).map(type => (
              <button 
                key={type}
                onClick={() => setTimeframe(type)}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-xs font-black transition-all ${timeframe === type ? 'bg-primary text-background-dark shadow-xl scale-105' : 'text-slate-500 hover:text-primary'}`}
              >
                {type === 'daily' ? 'দৈনিক' : type === 'weekly' ? 'সাপ্তাহিক' : 'মাসিক'}
              </button>
            ))}
          </div>
        </div>

        <div className="h-80 w-full">
           <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getChartData()}>
                <defs>
                  <linearGradient id="colorReport" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#11d493" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#11d493" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#23483c" opacity={0.1} />
                <XAxis dataKey="name" stroke="#92c9b7" fontSize={11} tickLine={false} axisLine={false} dy={10} fontWeight="bold" />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#11221c', border: '1px solid #23483c', borderRadius: '16px', fontSize: '14px', color: '#fff' }}
                  itemStyle={{ color: '#11d493' }}
                />
                <Area type="monotone" dataKey="val" stroke="#11d493" fillOpacity={1} fill="url(#colorReport)" strokeWidth={5} />
              </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Reported Tasks Section */}
      <div className="bg-white dark:bg-sidebar-dark border border-slate-200 dark:border-border-dark rounded-[3rem] overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-slate-100 dark:border-border-dark flex justify-between items-center bg-slate-50/50 dark:bg-transparent">
           <h4 className="text-xl font-black flex items-center gap-3">
             <span className="material-symbols-outlined text-rose-500">warning</span>
             রিপোর্ট করা কাজের তালিকা
           </h4>
           <span className="bg-rose-500/10 text-rose-500 px-4 py-1.5 rounded-full text-xs font-black">
             {reportedTasks.length}টি অ্যাকশন প্রয়োজন
           </span>
        </div>
        <div className="max-h-[400px] overflow-y-auto divide-y divide-slate-50 dark:divide-border-dark scrollbar-hide">
          {reportedTasks.map(t => (
            <div key={t.id} className="p-6 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-rose-500/5 transition-all group">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                  <span className="material-symbols-outlined">report</span>
                </div>
                <div>
                  <div className="font-bold text-slate-800 dark:text-white group-hover:text-rose-500 transition-colors">{t.name}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.category}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-emerald-500">${t.earnings.toFixed(2)}</div>
                <div className="text-[10px] text-slate-400 font-bold">{new Date(t.date).toLocaleDateString('bn-BD')}</div>
              </div>
            </div>
          ))}
          {reportedTasks.length === 0 && (
            <div className="py-20 text-center text-slate-400">
               <span className="material-symbols-outlined text-5xl mb-4 opacity-10">verified</span>
               <p className="font-bold">বর্তমানে কোনো রিপোর্ট করা কাজ নেই</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, subtitle }: any) => {
  const colorMap: any = {
    blue: 'text-blue-500 bg-blue-500/10',
    rose: 'text-rose-500 bg-rose-500/10',
    amber: 'text-amber-500 bg-amber-500/10',
    emerald: 'text-emerald-500 bg-emerald-500/10',
  };

  return (
    <div className="bg-white dark:bg-sidebar-dark border border-slate-200 dark:border-accent-dark/20 p-6 lg:p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
      <div className={`size-14 rounded-2xl ${colorMap[color]} flex items-center justify-center mb-5 transition-transform group-hover:rotate-6 group-hover:scale-110`}>
        <span className="material-symbols-outlined text-3xl font-bold">{icon}</span>
      </div>
      <div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-2xl lg:text-3xl font-black text-slate-800 dark:text-white mb-1">
          {value}
        </h3>
        <p className="text-[10px] text-slate-500 font-bold">{subtitle}</p>
      </div>
      <div className={`absolute -right-4 -bottom-4 size-24 rounded-full opacity-5 bg-gradient-to-br from-current to-transparent ${colorMap[color].split(' ')[0]}`}></div>
    </div>
  );
};

export default AnalyticsView;
