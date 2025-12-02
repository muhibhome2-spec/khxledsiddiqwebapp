import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import CommunityPage from './components/CommunityPage';

// --- Animation Constants ---
const TRANSITION = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'community'>('landing');

  const handleEnterCommunity = () => {
    setCurrentView('community');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-sans selection:bg-indigo-500/40 antialiased">
      
      {/* Global Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Grain Texture */}
        <div 
          className="absolute inset-0 z-20 opacity-[0.15] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {currentView === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={TRANSITION}
            className="h-full relative z-30"
          >
            <LandingPage onEnterCommunity={handleEnterCommunity} />
          </motion.div>
        ) : (
          <motion.div
            key="community"
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={TRANSITION}
            className="h-full relative z-30"
          >
            <CommunityPage onBack={handleBackToLanding} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;