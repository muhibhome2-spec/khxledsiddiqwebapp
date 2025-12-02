import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- COMPONENT: PremiumGlass ---
// Used for the main CTA button
const PremiumGlass = ({ 
  children, 
  className = "", 
  variant = "card", 
  intensity = "medium", 
  glow = false,
  onClick,
  whileHover,
  whileTap
}) => {
  // Base styles for glassmorphism
  const baseStyles = "relative backdrop-blur-xl border border-white/10 transition-all duration-300";
  
  // Variants
  const variants = {
    card: "rounded-3xl bg-neutral-900/40",
    pill: "rounded-full bg-neutral-900/40"
  };

  // Intensity levels (opacity of background)
  const intensities = {
    low: "bg-neutral-900/20",
    medium: "bg-neutral-900/40",
    high: "bg-neutral-900/60"
  };

  return (
    <motion.div
      className={`${baseStyles} ${variants[variant] || variants.card} ${intensities[intensity] || intensities.medium} ${className} ${glow ? 'shadow-[0_0_40px_-10px_rgba(255,255,255,0.05)]' : ''}`}
      onClick={onClick}
      whileHover={whileHover}
      whileTap={whileTap}
    >
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay rounded-[inherit]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      {children}
    </motion.div>
  );
};

// --- COMPONENT: Community (The Destination) ---
// UPDATED: Removed form. Pure "Access Granted" view.
const Community = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-6">
       <div className="max-w-4xl w-full text-center space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase mix-blend-screen text-glow">
              Welcome Home
            </h2>
            
            <div className="flex flex-col items-center gap-4">
                <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
                <p className="text-white/50 text-sm md:text-base tracking-[0.3em] uppercase font-bold">
                  The Inner Circle
                </p>
            </div>
          </motion.div>

       </div>
    </div>
  );
};

// --- APP COMPONENT ---

const LUXURY_EASE = [0.6, 0.01, 0.05, 0.95]; 
const TRANSITION = { duration: 1.5, ease: LUXURY_EASE };

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const textReveal = {
  hidden: { y: "110%", opacity: 0, filter: "blur(10px)" },
  show: { 
    y: "0%", 
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.6, ease: LUXURY_EASE } 
  },
  exit: { opacity: 0, filter: "blur(5px)" }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: LUXURY_EASE } 
  },
  exit: { opacity: 0, y: -20 }
};

function App() {
  const [showCommunity, setShowCommunity] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-neutral-950 text-white overflow-hidden font-sans selection:bg-indigo-500/20 antialiased text-rendering-geometricPrecision">
      
      <style>{`
        .text-glow {
          text-shadow: 0 0 40px rgba(255,255,255,0.15);
        }
      `}</style>

      {/* --- ATMOSPHERE LAYER (Lighting & Noise) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{
            backgroundImage: `url('/Khaled-Siddiq.jpeg')`,
            filter: 'grayscale(100%) brightness(0.65) contrast(1.15)', 
          }}
        />
        
        {/* Spotlight - Persists across views */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)] blur-[60px] mix-blend-overlay pointer-events-none" />
        
        {/* Deep Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.95)_100%)]" />
        
        {/* Film Grain */}
        <div 
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {showCommunity ? (
          <motion.div
            key="community"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: LUXURY_EASE }}
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
            {/* Top Spacer */}
            <header className="flex-none h-32 w-full" />

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center w-full px-6">
              <div className="max-w-screen-xl mx-auto w-full text-center space-y-16">
                
                {/* HERO TEXT STACK */}
                <div className="relative group cursor-default">
                   {/* Main Title */}
                   <h1 className="font-black tracking-tight leading-[0.85] text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white mix-blend-screen text-glow">
                      <div className="overflow-hidden py-2">
                        <motion.div variants={textReveal} className="origin-bottom">KHALED</motion.div>
                      </div>
                      <div className="overflow-hidden py-2">
                        <motion.div 
                          variants={textReveal} 
                          className="text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/40"
                        >
                          SIDDIQ
                        </motion.div>
                      </div>
                   </h1>
                   
                   {/* Elegant Divider */}
                   <motion.div 
                      variants={fadeUp} 
                      className="w-px h-20 bg-gradient-to-b from-transparent via-white/30 to-transparent mx-auto mt-10"
                   />
                </div>

                {/* EXCLUSIVE BUTTON */}
                <motion.div variants={fadeUp} className="flex justify-center">
                   <PremiumGlass
                      variant="pill"
                      intensity="medium"
                      glow={true}
                      className="group relative cursor-pointer overflow-hidden rounded-full border border-white/10 hover:border-white/40 transition-all duration-700 shadow-[0_0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.15)]"
                      onClick={() => setShowCommunity(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                   >
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />

                      <div className="py-5 px-12 flex items-center justify-center space-x-4 relative z-10">
                         <span className="text-sm md:text-[15px] font-medium tracking-wide text-white/90 lowercase group-hover:text-white transition-colors duration-300 font-mono">
                            join the crew
                         </span>
                         
                         <motion.div 
                            className="text-white/60 group-hover:text-white transition-colors duration-300"
                            initial={{ x: 0 }}
                            whileHover={{ x: 4 }}
                         >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                         </motion.div>
                      </div>
                   </PremiumGlass>
                </motion.div>

                {/* MINIMALIST SOCIALS */}
                <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-10 pt-4">
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
                        className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-neutral-500 hover:text-white uppercase transition-colors duration-500 ease-out flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-neutral-700 group-hover:bg-white transition-colors duration-500" />
                        {link.name}
                      </a>
                    ))}
                </motion.div>
              </div>
            </main>

            <motion.footer variants={fadeUp} className="flex-none py-10 text-center">
               <p className="text-[9px] tracking-[0.3em] text-white/20 font-bold uppercase mix-blend-plus-lighter">
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