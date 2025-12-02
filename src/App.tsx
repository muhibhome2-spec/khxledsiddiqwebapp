import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Community from './Community';
import PremiumGlass from './components/ui/premium-glass';

// --- Animation Constants ---
const TRANSITION = { duration: 0.8, ease: [0.6, 0.01, 0.05, 0.9] };

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: TRANSITION 
  },
  exit: { 
    opacity: 0, 
    y: -30, 
    transition: { duration: 0.5, ease: "easeInOut" } 
  },
};

const revealText = {
  hidden: { y: "110%" },
  show: { 
    y: "0%", 
    transition: TRANSITION 
  },
  exit: {
    y: "-110%",
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};

function App() {
  const [showCommunity, setShowCommunity] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-neutral-950 text-white overflow-hidden font-sans selection:bg-indigo-500/30 antialiased text-rendering-geometricPrecision">
      {/* Premium background environment */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-neutral-950" />
        {/* Static optimized gradients - no animation for 60fps performance */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_120%_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      </div>

      <AnimatePresence mode="wait">
        {showCommunity ? (
          <motion.div
            key="community"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={TRANSITION}
            className="h-full"
          >
            <Community />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            className="relative min-h-[100dvh] flex flex-col"
            variants={containerVars}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* Background Image - Sharpened via CSS Filters */}
            <motion.div 
              className="fixed inset-0 z-0"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black z-10 pointer-events-none" />
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 h-full w-full"
                style={{
                  backgroundImage: `url('/Khaled-Siddiq.jpeg')`,
                  // Boosted contrast for "Retina" look, lowered brightness to let white text pop
                  filter: 'grayscale(100%) contrast(1.25) brightness(0.9)',
                }}
              />
              {/* Noise overlay - reduced opacity for subtlety */}
              <div 
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  backgroundSize: '256px 256px'
                }}
              />
            </motion.div>

            {/* Content Container */}
            <div className="relative z-20 flex-1 flex flex-col justify-between px-6 py-8 md:px-12 md:py-12 lg:px-20 lg:py-16 max-w-screen-2xl mx-auto w-full h-full">
              
              {/* Header */}
              <motion.header variants={fadeInUp} className="flex justify-between items-center w-full opacity-80">
                 {/* Empty header for spacing balance */}
              </motion.header>

              {/* Main Hero */}
              <div className="flex-1 flex flex-col items-center justify-center w-full py-8 md:py-0">
                <div className="w-full max-w-4xl text-center space-y-10 md:space-y-12">
                  
                  <div className="space-y-6 md:space-y-8">
                    {/* Refined Typography: Smaller Size, Wider Tracking */}
                    <h1 className="font-black tracking-tighter leading-[0.85] overflow-hidden
                                 text-5xl         
                                 sm:text-6xl      
                                 md:text-7xl      
                                 lg:text-8xl antialiased">
                      <div className="overflow-hidden">
                        <motion.div variants={revealText} className="tracking-tight">KHALED</motion.div>
                      </div>
                      <div className="overflow-hidden">
                        <motion.div variants={revealText} className="tracking-tight text-gray-300">SIDDIQ</motion.div>
                      </div>
                    </h1>
                    
                    <motion.div variants={fadeInUp} className="h-px w-12 bg-white/50 mx-auto" />
                  </div>

                  {/* Sharper Button */}
                  <motion.div variants={fadeInUp} className="w-full flex justify-center">
                    <PremiumGlass
                      variant="card"
                      intensity="medium"
                      glow={true}
                      className="group cursor-pointer"
                      onClick={() => setShowCommunity(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="py-4 px-10 font-bold text-sm tracking-widest uppercase text-white group-hover:text-indigo-200 transition-colors duration-300 flex items-center justify-center min-h-[20px] leading-none antialiased">
                        <span className="leading-none">Enter Community</span>
                      </div>
                    </PremiumGlass>
                  </motion.div>

                  {/* Social Links - Smaller & Sharper */}
                  <motion.div 
                    variants={fadeInUp} 
                    className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] md:text-xs font-bold tracking-widest text-gray-500 leading-none antialiased"
                  >
                    {[
                      { name: 'SPOTIFY', url: 'https://open.spotify.com/artist/2XYgHUbsmab6VT4a3FF9mX' },
                      { name: 'APPLE', url: 'https://music.apple.com/my/artist/kh%C4%81led-sidd%C4%ABq/1170959386' },
                      { name: 'INSTAGRAM', url: 'https://www.instagram.com/khxledsiddiq/?hl=en' }
                    ].map((link) => (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2, color: "#ffffff" }}
                        className="hover:text-indigo-300 transition-colors inline-block border-b border-transparent hover:border-indigo-400/50 pb-0.5 leading-none"
                      >
                        {link.name}
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Footer */}
              <motion.footer 
                variants={fadeInUp} 
                className="text-center text-[9px] tracking-widest text-gray-700 font-bold uppercase pb-safe leading-none antialiased"
              >
                © 2025 Khaled Siddiq
              </motion.footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;