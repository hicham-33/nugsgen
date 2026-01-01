import React from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../constants';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 relative z-10">
      
      {/* Floating Assets Container */}
      <div className="relative w-full max-w-md h-48 mb-8 flex justify-center items-center">
        <motion.img 
            src={ASSETS.GOLD_NUGS}
            alt="Gold Nugs"
            className="absolute w-32 h-32 object-contain z-10 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
            animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ left: '10%' }}
        />
        <motion.img 
            src={ASSETS.RARE_EGG}
            alt="Rare Egg"
            className="absolute w-28 h-28 object-cover rounded-full border-2 border-brand-neon/50 z-0 drop-shadow-[0_0_15px_rgba(0,243,255,0.4)]"
            animate={{ y: [10, -10, 10], scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{ right: '10%' }}
        />
      </div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-neon to-brand-purple drop-shadow-sm mb-4"
      >
        UNLOCK UG VR <br /> REWARDS
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-400 text-lg md:text-xl font-medium mb-8 max-w-lg"
      >
        Get <span className="text-brand-gold">Gold Nugs</span> & <span className="text-brand-neon">Rare Items</span> instantly. <br/>
        <span className="text-sm opacity-70">Fast • Simple • Fan Utility</span>
      </motion.p>

      <motion.button
        onClick={onStart}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,243,255,0.4)" }}
        whileTap={{ scale: 0.95 }}
        className="bg-brand-neon text-black font-extrabold text-xl py-4 px-12 rounded-full shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all"
      >
        START GENERATOR
      </motion.button>
    </div>
  );
};

export default Hero;
