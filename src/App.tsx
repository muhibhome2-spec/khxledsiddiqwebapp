import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import Community from './Community'; // Your existing Community file
import PremiumGlass from './components/ui/premium-glass';
import { cn } from '@/lib/utils';

// --- Animation Constants ---
const TRANSITION = { duration: 0.9, ease: [0.6, 0.01, 0.05, 0.95] };

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: TRANSITION 
  },
};

const revealText = {
  hidden: { y: "110%" },
  show: { 
    y: "0%", 
    transition: { ...TRANSITION, duration: 1.2 } 
  },
};

function App() {
  const [showCommunity, setShowCommunity] = useState(false);
  
  // --- Aura Spotlight Effect ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      className="relative min-h-[100dvh] bg-neutral-950 text-white overflow-hidden font-sans selection:bg-indigo-500/30 antialiased"
      onMouseMove={handleMouseMove}
    >
      {/* --- Premium Atmosphere --- */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-neutral-950" />
        {/* Static Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        
        {/* Dynamic Mouse Spotlight */}
        <motion.div
          className="absolute inset-0 z-0 opacity-40 mix-blend-screen"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(120,119,198,0.15),
                transparent 80%
              )
            `,
          }}
        />
        
        {/* Film Grain */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <AnimatePresence mode="wait">
        {showCommunity ? (
          <motion.div
            key="community"
            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
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
            {/* Background Image - Cinematic & Darkened */}
            <motion.div 
              className="fixed inset-0 z-0"
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-neutral-950/60 to-neutral-950 z-10" />
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat h-full w-full opacity-60 grayscale-[80%] contrast-[1.1]"
                style={{
                  backgroundImage: `url('/Khaled-Siddiq.jpeg')`, 
                }}
              />
            </motion.div>

            {/* Content Container */}
            <div className="relative z-20 flex-1 flex flex-col justify-between px-6 py-8 md:px-12 lg:px-20 max-w-screen-2xl mx-auto w-full">
              
              {/* Header spacer */}
              <div className="h-20" />

              {/* Main Hero */}
              <div className="flex-1 flex flex-col items-center justify-center w-full">
                <div className="w-full max-w-5xl text-center space-y-12">
                  
                  <div className="space-y-8">
                    {/* Hero Typography: Metallic Gradient Text */}
                    <h1 className="font-black tracking-tighter leading-[0.8] flex flex-col items-center
                                 text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
                      <div className="overflow-hidden">
                        <motion.span 
                          variants={revealText} 
                          className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-400 drop-shadow-2xl"
                        >
                          KHALED
                        </motion.span>
                      </div>
                      <div className="overflow-hidden">
                        <motion.span 
                          variants={revealText} 
                          className="block text-transparent bg-clip-text bg-gradient-to-b from-neutral-400 to-neutral-800"
                        >
                          SIDDIQ
                        </motion.span>
                      </div>
                    </h1>
                    
                    <motion.div variants={fadeInUp} className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto" />
                  </div>

                  {/* CTA Button: Optical Center Fixes */}
                  <motion.div variants={fadeInUp} className="w-full flex justify-center">
                    <PremiumGlass
                      variant="card"
                      intensity="medium"
                      glow={true}
                      className="group cursor-pointer rounded-full"
                      onClick={() => setShowCommunity(true)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <div className="relative py-5 px-12">
                         {/* Animated Shimmer Border */}
                         <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-white/30 transition-colors duration-500" />
                         
                         <span className="relative z-10 font-bold text-xs md:text-sm tracking-[0.25em] uppercase text-white group-hover:text-indigo-200 transition-colors duration-300 flex items-center justify-center gap-3 leading-none">
                           <span>Enter Community</span>
                           {/* Tiny animated arrow */}
                           <motion.svg 
                             viewBox="0 0 24 24" 
                             fill="none" 
                             stroke="currentColor" 
                             className="w-3 h-3 opacity-0 -ml-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-0 -translate-x-2 transition-all duration-300"
                           >
                             <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                           </motion.svg>
                         </span>
                      </div>
                    </PremiumGlass>
                  </motion.div>

                  {/* Social Links: Glass Pills */}
                  <motion.div 
                    variants={fadeInUp} 
                    className="flex flex-wrap justify-center gap-4"
                  >
                    {[
                      { name: 'SPOTIFY', url: '#' },
                      { name: 'APPLE', url: '#' },
                      { name: 'INSTAGRAM', url: '#' }
                    ].map((link) => (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        className="px-5 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm
                                   text-[10px] font-bold tracking-[0.2em] text-neutral-400 hover:text-white hover:border-white/20 hover:bg-white/[0.05]
                                   transition-all duration-300 leading-none"
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
                className="text-center md:text-right text-[9px] tracking-[0.3em] text-neutral-600 font-bold uppercase pb-4"
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