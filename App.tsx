import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Background from './components/Background';
import Hero from './components/Hero';
import Generator from './components/Generator';
import Modal from './components/Modal';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';

export default function App() {
  const [started, setStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col items-center">
      <Background />

      <main className="flex-grow w-full flex flex-col items-center pt-8 md:pt-16 px-4">
        {/* Logo / Header - Always Visible */}
        <header className="relative z-10 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-brand-neon rotate-45 flex items-center justify-center shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                <div className="w-4 h-4 bg-black -rotate-45" />
            </div>
            <span className="font-bold tracking-widest text-white text-lg">UG<span className="text-brand-neon">TOOLS</span></span>
        </header>

        <AnimatePresence mode='wait'>
          {!started ? (
            <motion.div 
                key="hero"
                exit={{ opacity: 0, y: -20 }}
                className="w-full flex flex-col items-center"
            >
              <Hero onStart={() => setStarted(true)} />
            </motion.div>
          ) : (
            <motion.div 
                key="generator"
                className="w-full flex justify-center"
            >
              <Generator onComplete={() => setShowModal(true)} />
            </motion.div>
          )}
        </AnimatePresence>

        <SocialProof />
      </main>

      <Footer />

      {/* Final Step Modal */}
      <Modal isOpen={showModal} />

      {/* Mobile Sticky CTA - Only on Hero */}
      {!started && (
        <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent z-40 md:hidden">
            <button 
                onClick={() => setStarted(true)}
                className="w-full bg-brand-neon text-black font-bold py-4 rounded-xl shadow-lg"
            >
                Start Now
            </button>
        </div>
      )}
    </div>
  );
}
