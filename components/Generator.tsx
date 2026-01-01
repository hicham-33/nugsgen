import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS, STEPS } from '../constants';
import { UserConfig } from '../types';

interface GeneratorProps {
  onComplete: () => void;
}

const Generator: React.FC<GeneratorProps> = ({ onComplete }) => {
  const [config, setConfig] = useState<UserConfig>({
    username: '',
    platform: 'Quest',
    nugs: 1000,
    rareEgg: false,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(STEPS[0]);
  // Use ReturnType<typeof setInterval> instead of NodeJS.Timeout for better compatibility
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const startGeneration = () => {
    if (!config.username) {
        // Shake animation could go here, but native validation is fine for now
        return;
    }
    setIsProcessing(true);
  };

  useEffect(() => {
    if (isProcessing) {
      let currentProgress = 0;
      
      progressInterval.current = setInterval(() => {
        // Variable speed to look realistic
        const increment = Math.random() * 1.5 + 0.2;
        currentProgress += increment;

        // Update text based on progress milestones
        const stepIndex = Math.min(
          Math.floor((currentProgress / 90) * STEPS.length),
          STEPS.length - 1
        );
        setStatusText(STEPS[stepIndex]);

        if (currentProgress >= 90) {
            // Stop at 90%
            currentProgress = 90;
            if (progressInterval.current) clearInterval(progressInterval.current);
            onComplete();
        }

        setProgress(Math.min(currentProgress, 90));
      }, 100);
    }

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isProcessing, onComplete]);

  // View: Processing State
  if (isProcessing) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,243,255,0.1)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple via-brand-neon to-brand-purple opacity-50"></div>
        
        <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 relative">
                 <div className="absolute inset-0 border-4 border-brand-neon/30 rounded-full animate-spin border-t-brand-neon"></div>
                 <img src={ASSETS.GOLD_NUGS} alt="Loading" className="w-full h-full object-contain p-3 animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Generating Rewards</h3>
            <p className="text-brand-neon text-sm font-mono animate-pulse">{statusText}</p>
        </div>

        {/* Console Log Look */}
        <div className="bg-black/80 rounded-lg p-4 mb-6 font-mono text-xs text-green-400 h-32 overflow-hidden border border-white/5 flex flex-col justify-end">
             <div className="opacity-50">Initializing connection...</div>
             <div className="opacity-70">Target: {config.username} [{config.platform}]</div>
             <div className="opacity-80">Injecting {config.nugs} Gold Nugs...</div>
             {config.rareEgg && <div className="opacity-90 text-yellow-400">Unlock Sequence: RARE_EGG...</div>}
             <div className="text-white">&gt; {statusText}</div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-purple to-brand-neon"
                style={{ width: `${progress}%` }}
            />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Progress</span>
            <span>{Math.floor(progress)}%</span>
        </div>
      </motion.div>
    );
  }

  // View: Config Form
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl z-20"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-1">Configure Rewards</h2>
        <p className="text-gray-400 text-sm">Enter your details to begin.</p>
      </div>

      <div className="space-y-6">
        {/* Username */}
        <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Username / ID</label>
            <input 
                type="text" 
                placeholder="Enter UG VR Username"
                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
                value={config.username}
                onChange={(e) => setConfig({...config, username: e.target.value})}
            />
        </div>

        {/* Platform */}
        <div className="grid grid-cols-2 gap-3">
             <button 
                onClick={() => setConfig({...config, platform: 'Quest'})}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${config.platform === 'Quest' ? 'bg-brand-purple/50 border-brand-neon text-white shadow-[0_0_15px_rgba(0,243,255,0.2)]' : 'bg-black/20 border-white/10 text-gray-400 hover:bg-white/5'}`}
             >
                <span className="font-bold">Meta Quest</span>
             </button>
             <button 
                onClick={() => setConfig({...config, platform: 'PC'})}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${config.platform === 'PC' ? 'bg-brand-purple/50 border-brand-neon text-white shadow-[0_0_15px_rgba(0,243,255,0.2)]' : 'bg-black/20 border-white/10 text-gray-400 hover:bg-white/5'}`}
             >
                <span className="font-bold">PCVR / Steam</span>
             </button>
        </div>

        {/* Gold Nugs Slider */}
        <div className="space-y-3 p-4 bg-black/20 rounded-xl border border-white/5">
            <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-brand-gold flex items-center gap-2">
                    <img src={ASSETS.GOLD_NUGS} className="w-5 h-5" alt="icon" /> Gold Nugs
                </label>
                <span className="font-mono text-brand-neon">{config.nugs.toLocaleString()}</span>
            </div>
            <input 
                type="range" 
                min="1000" 
                max="50000" 
                step="1000"
                value={config.nugs}
                onChange={(e) => setConfig({...config, nugs: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-neon"
            />
        </div>

        {/* Rare Egg Toggle */}
        <div 
            onClick={() => setConfig({...config, rareEgg: !config.rareEgg})}
            className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center justify-between group ${config.rareEgg ? 'bg-gradient-to-r from-purple-900/50 to-brand-dark border-brand-neon/50' : 'bg-black/20 border-white/5'}`}
        >
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-black/50 border border-white/10 p-1">
                    <img src={ASSETS.RARE_EGG} className="w-full h-full object-cover" alt="Rare Egg" />
                </div>
                <div className="text-left">
                    <div className={`font-bold text-sm ${config.rareEgg ? 'text-white' : 'text-gray-400'}`}>Unlock Rare Egg</div>
                    <div className="text-xs text-gray-500">Legendary Item</div>
                </div>
             </div>
             <div className={`w-12 h-6 rounded-full p-1 transition-colors ${config.rareEgg ? 'bg-brand-neon' : 'bg-gray-700'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${config.rareEgg ? 'translate-x-6' : 'translate-x-0'}`} />
             </div>
        </div>

        {/* Action Button */}
        <button
            onClick={startGeneration}
            disabled={!config.username}
            className={`w-full py-4 rounded-xl font-bold text-lg uppercase tracking-wide transition-all ${
                config.username 
                ? 'bg-gradient-to-r from-brand-neon to-blue-600 text-black shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:scale-[1.02]' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
        >
            Generate Rewards
        </button>

      </div>
    </motion.div>
  );
};

export default Generator;