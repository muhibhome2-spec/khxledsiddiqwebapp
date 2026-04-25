import { Suspense, lazy, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';

const CommunityPage = lazy(() => import('./components/CommunityPage'));

const TRANSITION = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const };

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'community'>('landing');

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-sans selection:bg-indigo-500/40 antialiased">
      <AnimatePresence mode="wait">
        {currentView === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
            transition={TRANSITION}
            className="h-full relative z-30"
          >
            <LandingPage onEnterCommunity={() => setCurrentView('community')} />
          </motion.div>
        ) : (
          <motion.div
            key="community"
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0 }}
            transition={TRANSITION}
            className="h-full relative z-30"
          >
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <CommunityPage onBack={() => setCurrentView('landing')} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
