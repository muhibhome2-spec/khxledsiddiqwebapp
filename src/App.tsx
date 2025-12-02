import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Community from './Community';
import PremiumGlass from './components/ui/premium-glass';

// --- Animation Constants ---
const TRANSITION_HEAVY = { duration: 1.5, ease: [0.19, 1, 0.22, 1] }; // "Rolls Royce" feel: heavy start, smooth stop
const TRANSITION_SNAP = { duration: 0.8, ease: [0.16, 1, 0.3, 1] }; 

// --- Magnetic Component (The "Next Level" Physics) ---
const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };
  
  const smoothX = useSpring(position.x, { stiffness: 150, damping: 15, mass: 0.1 });
  const smoothY = useSpring(position.y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // The divisor determines the "magnetic pull" strength. Lower = stronger.
    position.x.set(middleX / 6); 
    position.y.set(middleY / 6);
  };

  const handleMouseLeave = () => {
    position.x.set(0);
    position.y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
    >
      {children}
    </motion.div>
  );
};

// --- Standard Variants ---
const containerVars = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const textReveal = {
  hidden: { y: "110%", opacity: 0, rotateX: 20 },
  show: { y: "0%", opacity: 1, rotateX: 0, transition: TRANSITION_HEAVY },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

function App() {
  const [showCommunity, setShowCommunity] = useState(false);

  // --- Environmental Physics ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // Subtle parallax for background
  const bgX = useTransform(smoothX, [-1, 1], ["-2%", "2%"]);
  const bgY = useTransform(smoothY, [-1, 1], ["-2%", "2%"]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize -1 to 1
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative min-h-[100dvh] bg-neutral-950 text-white overflow-hidden font-sans antialiased text-rendering-geometricPrecision selection:bg-white/20">
      
      {/* --- LAYER 0: The Background Image (Fixed) --- */}
      {/* We use negative z-index to ensure it sits behind everything but stays visible */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        style={{ x: bgX, y: bgY, scale: 1.1 }} // Scale ensures edges don't show on move
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/Khaled-Siddiq.jpeg')`,
            // Adjusted filter: Less contrast, more brightness to ensure visibility through overlays
            filter: 'grayscale(100%) contrast(1.1) brightness(0.85)', 
          }}
        />
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)]" />
      </motion.div>

      {/* --- LAYER 1: Atmosphere & Grain (Overlay) --- */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {/* Grain */}
        <div 
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Subtle Ambient Light (Follows Mouse slightly) */}
        <motion.div 
            className="absolute inset-0 opacity-30 mix-blend-soft-light"
            style={{
                background: useTransform(
                    [smoothX, smoothY],
                    ([x, y]) => `radial-gradient(circle 800px at ${50 + x * 20}% ${50 + y * 20}%, rgba(255,255,255,0.15), transparent 60%)`
                )
            }}
        />
      </div>

      {/* --- LAYER 2: Content --- */}
      <AnimatePresence mode="wait">
        {showCommunity ? (
          <motion.div
            key="community"
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
            transition={TRANSITION_SNAP}
            className="h-full relative z-30"
          >
            <Community />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            className="relative z-20 min-h-[100dvh] flex flex-col justify-between px-6 py-8 md:px-12 md:py-12"
            variants={containerVars}
            initial="hidden"
            animate="show"
            exit="exit"
          >
             {/* Header Spacer */}
             <div className="h-10" />

             {/* Center Content */}
             <div className="flex-1 flex flex-col items-center justify-center space-y-16">
                
                {/* Titles */}
                <div className="text-center space-y-2 mix-blend-screen">
                  <h1 className="font-black tracking-tighter leading-[0.8] text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] text-white">
                    <div className="overflow-hidden">
                      <motion.div variants={textReveal} className="tracking-[-0.05em]">
                        KHALED
                      </motion.div>
                    </div>
                    <div className="overflow-hidden">
                      <motion.div variants={textReveal} className="tracking-[-0.05em] text-white/50">
                        SIDDIQ
                      </motion.div>
                    </div>
                  </h1>
                </div>

                {/* MAGNETIC BUTTON */}
                <motion.div 
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.8, duration: 1 } } }}
                    className="relative z-50"
                >
                    <Magnetic>
                        <PremiumGlass
                            variant="pill" // Pill shape works best for lowercase
                            intensity="low"
                            glow={true}
                            className="group cursor-pointer border border-white/10 hover:border-white/40 transition-all duration-500 overflow-hidden rounded-full"
                            onClick={() => setShowCommunity(true)}
                        >
                            <div className="py-4 px-10 relative flex items-center justify-center gap-3">
                                {/* Text */}
                                <span className="font-medium text-sm md:text-base tracking-normal lowercase text-white/90 group-hover:text-white transition-colors duration-300 z-10 font-mono">
                                    join the crew
                                </span>

                                {/* Animated Arrow (Only appears on hover) */}
                                <motion.span 
                                    className="w-0 overflow-hidden group-hover:w-auto group-hover:pl-2 transition-all duration-300 text-white z-10 flex items-center"
                                >
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </motion.span>

                                {/* Background Hover Fill */}
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 ease-out" />
                            </div>
                        </PremiumGlass>
                    </Magnetic>
                </motion.div>

             </div>

             {/* Footer / Socials */}
             <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { delay: 1, duration: 1 } } }}
                className="flex flex-col items-center gap-6"
             >
                <div className="flex gap-8 md:gap-12">
                     {[
                      { name: 'spotify', url: 'https://open.spotify.com/artist/2XYgHUbsmab6VT4a3FF9mX' },
                      { name: 'apple', url: 'https://music.apple.com/my/artist/kh%C4%81led-sidd%C4%ABq/1170959386' },
                      { name: 'instagram', url: 'https://www.instagram.com/khxledsiddiq/?hl=en' }
                    ].map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300 hover:scale-110 transform inline-block"
                      >
                        {link.name}
                      </a>
                    ))}
                </div>
                <div className="h-px w-full max-w-[100px] bg-white/10" />
             </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;