
import React from 'react';

const UserDashboard: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background-dark text-white p-8 text-center">
      <div>
        <h1 className="text-2xl font-bold mb-4">ইউজার প্যানেল আলাদা করা হয়েছে</h1>
        <p className="text-slate-400">এই অ্যাপ্লিকেশনটি এখন শুধুমাত্র এডমিন প্যানেল হিসেবে কাজ করছে।</p>
      </div>
    </div>
  );
};

export default UserDashboard;
