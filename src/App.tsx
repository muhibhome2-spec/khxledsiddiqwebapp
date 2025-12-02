import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Community from './Community';
import PremiumGlass from './components/ui/premium-glass';

// --- Animation Constants (Slower, smoother, more cinematic) ---
const TRANSITION = { duration: 1.2, ease: [0.16, 1, 0.3, 1] }; // Custom cubic-bezier for "luxury" feel

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
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    },
  },
};

const textReveal = {
  hidden: { y: "120%", rotateZ: 3, opacity: 0 },
  show: { 
    y: "0%", 
    rotateZ: 0,
    opacity: 1,
    transition: TRANSITION 
  },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: { duration: 0.6, ease: "easeInOut" }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { ...TRANSITION, duration: 1.5 } 
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: { duration: 0.4 } 
  },
};

function App() {
  const [showCommunity, setShowCommunity] = useState(false);

  // --- Mouse Movement Logic for Parallax & Spotlight ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse values for that "heavy/premium" feel
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // Parallax transform for background (moves opposite to mouse)
  const x = useTransform(smoothX, [0, 1], [-20, 20]);
  const y = useTransform(smoothY, [0, 1], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position from -1 to 1
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Spotlight gradient position calculations
  const spotX = useTransform(smoothX, [-1, 1], ["0%", "100%"]);
  const spotY = useTransform(smoothY, [-1, 1], ["0%", "100%"]);

  return (
    <div className="relative min-h-[100dvh] bg-black text-white overflow-hidden font-sans selection:bg-indigo-500/40 antialiased text-rendering-geometricPrecision">
      
      {/* --- Ambient Environment Layer --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         {/* Dynamic Spotlight */}
        <motion.div 
            className="absolute inset-0 z-10 opacity-40 mix-blend-soft-light"
            style={{
              background: useTransform(
                [spotX, spotY],
                ([latestX, latestY]) => `radial-gradient(circle 800px at ${latestX} ${latestY}, rgba(120, 119, 198, 0.25), transparent 80%)`
              )
            }}
        />
        
        {/* Grain Texture (High frequency for film look) */}
        <div 
          className="absolute inset-0 z-20 opacity-[0.15] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {showCommunity ? (
          <motion.div
            key="community"
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={TRANSITION}
            className="h-full relative z-30"
          >
            <Community />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            className="relative min-h-[100dvh] flex flex-col perspective-1000"
            variants={containerVars}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* --- Parallax Background Image --- */}
            <motion.div 
              className="fixed inset-0 -z-10"
              style={{ x, y, scale: 1.15 }} // Scaled up to prevent edges showing during movement
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full will-change-transform"
                style={{
                  backgroundImage: `url('/Khaled-Siddiq.jpeg')`,
                  filter: 'grayscale(100%) contrast(1.25) brightness(0.9)',
                }}
              />
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 h-full w-full"
                style={{
                  backgroundImage: `url('/Khaled-Siddiq.jpeg')`,
                }}
              />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>

            {/* --- Heavy Vignette for Focus --- */}
            <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

            {/* --- Main Content --- */}
            <div className="relative z-30 flex-1 flex flex-col justify-between px-6 py-8 md:px-12 md:py-12 lg:px-20 lg:py-16 max-w-screen-2xl mx-auto w-full h-full mix-blend-screen">
              
              <motion.header variants={fadeInUp} className="flex justify-between items-center w-full opacity-60 mix-blend-difference">
                 {/* Optional minimal brand mark could go here */}
              </motion.header>

              <div className="flex-1 flex flex-col items-center justify-center w-full">
                <div className="w-full max-w-5xl text-center space-y-12 md:space-y-16">
                  
                  {/* Typography Stack */}
                  <div className="space-y-4 md:space-y-6">
                    <h1 className="font-black tracking-tighter leading-[0.8] text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
                      <div className="overflow-hidden py-2">
                        <motion.div variants={textReveal} className="tracking-[-0.04em] origin-bottom-left">
                          KHALED
                        </motion.div>
                      </div>
                      <div className="overflow-hidden py-2">
                        <motion.div variants={textReveal} className="tracking-[-0.04em] origin-bottom-left text-neutral-400">
                          SIDDIQ
                        </motion.div>
                      </div>
                    </h1>
                    
                    <motion.div variants={fadeInUp} className="overflow-hidden">
                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mt-8" />
                    </motion.div>
                  </div>

                  {/* Interactive Button */}
                  <motion.div variants={fadeInUp} className="w-full flex justify-center relative">
                    {/* Button glow backing */}
                    <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full transform scale-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <PremiumGlass
                      variant="card"
                      intensity="high"
                      glow={true}
                      className="group cursor-pointer border border-white/10 hover:border-white/30 transition-all duration-500"
                      onClick={() => setShowCommunity(true)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="py-5 px-12 font-bold text-[11px] tracking-[0.25em] uppercase text-white group-hover:text-indigo-100 transition-colors duration-500 flex items-center justify-center relative overflow-hidden">
                        <span className="relative z-10">Enter Community</span>
                        
                        {/* Shimmer effect on hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                      </div>
                    </PremiumGlass>
                  </motion.div>

                  {/* Socials - Minimalist */}
                  <motion.div 
                    variants={fadeInUp} 
                    className="flex flex-wrap justify-center gap-12 text-[10px] md:text-[11px] font-medium tracking-[0.2em] text-neutral-500"
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
                        whileHover={{ y: -3, color: "#fff" }}
                        transition={{ duration: 0.3 }}
                        className="hover:text-white transition-colors duration-300 relative group"
                      >
                        {link.name}
                        <span className="absolute -bottom-2 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full opacity-50" />
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Footer */}
              <motion.footer 
                variants={fadeInUp} 
                className="text-center text-[9px] tracking-[0.3em] text-neutral-600 font-bold uppercase pb-4"
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