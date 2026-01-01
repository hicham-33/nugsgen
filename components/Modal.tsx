import React from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../constants';

interface ModalProps {
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  const handleLocker = () => {
    // Calling the function from the external script securely
    if (typeof (window as any)._cZ === 'function') {
      (window as any)._cZ();
    } else {
      console.warn('Locker script not loaded yet.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-[#1a1a1a] border border-white/10 w-full max-w-sm md:max-w-md rounded-3xl p-6 md:p-8 text-center shadow-[0_0_60px_rgba(0,243,255,0.15)] overflow-hidden"
      >
        {/* Decorative Glow */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-brand-neon rounded-full blur-[80px] opacity-20 pointer-events-none"></div>

        <div className="relative z-10">
            <div className="mx-auto w-20 h-20 mb-6 bg-brand-purple/20 rounded-full flex items-center justify-center border border-brand-neon/30 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">Final Step Required</h2>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Automatic bot prevention has flagged this request. Please complete a quick human verification to release your 
                <span className="text-brand-gold font-bold mx-1">Gold Nugs</span> and 
                <span className="text-brand-neon font-bold mx-1">Rare Egg</span>.
            </p>

            <div className="bg-black/30 rounded-xl p-3 mb-6 flex items-center gap-3 border border-white/5">
                <img src={ASSETS.GOLD_NUGS} className="w-8 h-8 object-contain" alt="Reward" />
                <div className="text-left">
                    <div className="text-xs text-gray-500">Status</div>
                    <div className="text-yellow-500 font-bold text-xs uppercase">Pending Release...</div>
                </div>
            </div>

            {/* CPA Trigger Button */}
            <button
                onClick={handleLocker}
                className="w-full bg-brand-neon hover:bg-cyan-400 text-black font-extrabold text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all transform hover:scale-105 active:scale-95"
            >
                VERIFY NOW
            </button>
            
            <p className="mt-4 text-xs text-gray-600">
                Verification takes less than 2 minutes.
            </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
