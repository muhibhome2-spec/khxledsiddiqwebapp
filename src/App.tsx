import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Community from './Community';
import PremiumGlass from './components/ui/premium-glass';

// --- Cinematic Easing (Slow, smooth start and stop) ---
const LUXURY_EASE = [0.6, 0.01, 0.05, 0.9];
const TRANSITION = { duration: 1.2, ease: LUXURY_EASE };

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const textReveal = {
  hidden: { y: "100%", opacity: 0 },
  show: { 
    y: "0%", 
    opacity: 1, 
    transition: { duration: 1.4, ease: LUXURY_EASE } 
  },
  exit: { opacity: 0 }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: LUXURY_EASE } 
  },
  exit: { opacity: 0, y: -10 }
};

function App() {
  const [showCommunity, setShowCommunity] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-neutral-950 text-white overflow-hidden font-sans selection:bg-white/30 antialiased text-rendering-geometricPrecision">
      
      {/* --- STABLE BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* The Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/Khaled-Siddiq.jpeg')`,
            // Cinematic grade: Desaturated, slightly darkened for text contrast
            filter: 'grayscale(100%) brightness(0.7) contrast(1.1)', 
          }}
        />
        
        {/* Vignette (Draws eye to center) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_90%)]" />
        
        {/* Subtle Grain (Static, no animation for performance) */}
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {showCommunity ? (
          <motion.div
            key="community"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: LUXURY_EASE }}
            className="h-full relative z-20"
          >
            <Community />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            className="relative z-10 min-h-[100dvh] flex flex-col"
            variants={containerVars}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* Header / Top Spacer */}
            <header className="flex-none h-24 w-full" />

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center w-full px-6">
              <div className="max-w-screen-xl mx-auto w-full text-center space-y-12">
                
                {/* HERO TEXT */}
                <div className="relative">
                   {/* Main Title */}
                   <h1 className="font-black tracking-tight leading-[0.85] text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white mix-blend-screen">
                      <div className="overflow-hidden">
                        <motion.div variants={textReveal}>KHALED</motion.div>
                      </div>
                      <div className="overflow-hidden">
                        <motion.div variants={textReveal} className="text-white/60">SIDDIQ</motion.div>
                      </div>
                   </h1>
                   
                   {/* Divider */}
                   <motion.div 
                      variants={fadeUp} 
                      className="w-px h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0 mx-auto mt-8"
                   />
                </div>

                {/* CALL TO ACTION */}
                <motion.div variants={fadeUp} className="flex justify-center">
                   <PremiumGlass
                      variant="pill" // Pill shape
                      intensity="medium"
                      glow={true}
                      className="group cursor-pointer hover:border-white/50 transition-colors duration-500 rounded-full"
                      onClick={() => setShowCommunity(true)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                   >
                      <div className="py-4 px-10 flex items-center justify-center space-x-3">
                         <span className="text-sm md:text-base font-medium tracking-wide text-white lowercase group-hover:text-white transition-colors">
                            join the crew
                         </span>
                         {/* Subtle Arrow */}
                         <motion.svg 
                            width="14" height="14" viewBox="0 0 14 14" fill="none" 
                            className="text-white/50 group-hover:text-white transition-colors"
                            initial={{ x: 0 }}
                            whileHover={{ x: 3 }}
                         >
                            <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                         </motion.svg>
                      </div>
                   </PremiumGlass>
                </motion.div>

                {/* SOCIAL LINKS */}
                <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-8 pt-8">
                    {[
                      { name: 'Spotify', url: 'https://open.spotify.com/artist/2XYgHUbsmab6VT4a3FF9mX' },
                      { name: 'Apple', url: 'https://music.apple.com/my/artist/kh%C4%81led-sidd%C4%ABq/1170959386' },
                      { name: 'Instagram', url: 'https://www.instagram.com/khxledsiddiq/?hl=en' }
                    ].map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white/40 hover:text-white uppercase transition-colors duration-300 border-b border-transparent hover:border-white/50 pb-1"
                      >
                        {link.name}
                      </a>
                    ))}
                </motion.div>
              </div>
            </main>

            {/* Footer */}
            <motion.footer variants={fadeUp} className="flex-none py-8 text-center">
               <p className="text-[9px] tracking-[0.2em] text-white/30 font-bold uppercase">
                  © 2025 Khaled Siddiq
               </p>
            </motion.footer>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;