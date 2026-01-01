import React, { useState, useEffect } from 'react';

const SocialProof: React.FC = () => {
  const [users, setUsers] = useState(3420);

  useEffect(() => {
    const interval = setInterval(() => {
      setUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 px-4 z-10 relative">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
        <div className="text-brand-neon font-bold text-lg animate-pulse">{users.toLocaleString()}</div>
        <div className="text-gray-400 text-sm">Users Online</div>
      </div>
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
        <div className="text-green-400 font-bold text-lg">Verified</div>
        <div className="text-gray-400 text-sm">Safe & Secure</div>
      </div>
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
        <div className="text-brand-gold font-bold text-lg">2026 Updated</div>
        <div className="text-gray-400 text-sm">Latest Patch</div>
      </div>
    </div>
  );
};

export default SocialProof;
