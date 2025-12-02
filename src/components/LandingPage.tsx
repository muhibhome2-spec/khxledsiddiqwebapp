import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import PremiumGlass from './ui/premium-glass';

// --- Animation Constants ---
// Switched to a Quartic ease for a "weightier", more luxurious feel
const TRANSITION = { duration: 1.4, ease: [0.25, 1, 0.5, 1] };

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const textReveal = {
  hidden: { y: "110%", rotateZ: 2, opacity: 0, filter: 'blur(8px)' },
  show: { 
    y: "0%", 
    rotateZ: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: TRANSITION 
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { ...TRANSITION, duration: 1.6 } 
  },
};

// Subtle noise texture for "film" look
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`;

interface LandingPageProps {
  onEnterCommunity: () => void;
}

export default function LandingPage({ onEnterCommunity }: LandingPageProps) {
  return (
    <motion.div
      className="relative min-h-[100dvh] flex flex-col perspective-1000 overflow-hidden"
      variants={containerVars}
      initial="hidden"
      animate="show"
    >
      {/* --- Static Background Image (Unchanged) --- */}
      <div className="fixed inset-0 -z-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full opacity-60 grayscale"
          style={{
            backgroundImage: `url('/Khaled-Siddiq.jpeg')`,
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* --- Heavy Vignette --- */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

      {/* --- UPGRADE 1: Film Grain Texture Overlay --- */}
      {/* This adds that subtle 'static' texture that makes digital design look like print */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: NOISE_SVG }}
      />

      {/* --- Main Content --- */}
      <div className="relative z-30 flex-1 flex flex-col justify-between px-6 py-8 md:px-12 md:py-12 lg:px-20 lg:py-16 max-w-screen-2xl mx-auto w-full h-full mix-blend-screen">
        
        <motion.header variants={fadeInUp} className="flex justify-between items-center w-full opacity-60 mix-blend-difference">
           {/* Space reserved for brand mark */}
        </motion.header>

        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <div className="w-full max-w-5xl text-center space-y-12 md:space-y-16">
            
            {/* Typography Stack */}
            <div className="space-y-4 md:space-y-6 relative">
              {/* Subtle ambient light behind text to lift it off background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

              <h1 className="font-black tracking-[-0.08em] leading-[0.85] text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-300 to-neutral-600 drop-shadow-2xl">
                <div className="overflow-hidden py-2">
                  <motion.div variants={textReveal} className="origin-bottom-left" style={{ fontVariantCaps: 'small-caps' }}>
                    khaled
                  </motion.div>
                </div>
                <div className="overflow-hidden py-2">
                  <motion.div variants={textReveal} className="origin-bottom-left text-neutral-400" style={{ fontVariantCaps: 'small-caps' }}>
                    siddiq
                  </motion.div>
                </div>
              </h1>
              
              <motion.div variants={fadeInUp} className="overflow-hidden flex justify-center">
                  {/* UPGRADE 2: Tapered Divider Line */}
                  <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent mt-8" />
              </motion.div>
            </div>

            {/* Interactive Button */}
            <motion.div variants={fadeInUp} className="w-full flex justify-center relative">
              {/* UPGRADE 3: Breathing Glow Effect */}
              <motion.div 
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.8, 1, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-indigo-500/30 blur-[40px] rounded-full" 
              />
              
              <PremiumGlass
                variant="card"
                intensity="heavy"
                glow={true}
                className="group cursor-pointer border border-white/10 hover:border-white/40 transition-all duration-700 backdrop-blur-xl"
                onClick={onEnterCommunity}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="py-5 px-12 font-bold text-[10px] md:text-[11px] tracking-[0.3em] text-neutral-200 group-hover:text-white transition-colors duration-500 flex items-center justify-center relative overflow-hidden" style={{ fontVariantCaps: 'small-caps' }}>
                  <span className="relative z-10 drop-shadow-md">enter community</span>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </div>
              </PremiumGlass>
            </motion.div>

            {/* Socials - Minimalist */}
            <motion.div 
              variants={fadeInUp} 
              className="flex flex-wrap justify-center gap-10 md:gap-14 text-[9px] md:text-[10px] font-semibold tracking-[0.25em] text-neutral-500"
              style={{ fontVariantCaps: 'small-caps' }}
            >
              {[
                { name: 'spotify', url: 'https://open.spotify.com/artist/2XYgHUbsmab6VT4a3FF9mX' },
                { name: 'apple', url: 'https://music.apple.com/my/artist/kh%C4%81led-sidd%C4%ABq/1170959386' },
                { name: 'instagram', url: 'https://www.instagram.com/khxledsiddiq/?hl=en' }
              ].map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + (i * 0.1) }}
                  whileHover={{ y: -2, color: "#fff" }}
                  className="hover:text-white transition-colors duration-500 relative group py-2"
                >
                  {link.name}
                  {/* Refined underline animation */}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white/60 transition-all duration-500 group-hover:w-full" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.footer 
          variants={fadeInUp} 
          className="text-center text-[9px] tracking-[0.3em] text-neutral-600/80 font-bold pb-4 mix-blend-plus-lighter"
          style={{ fontVariantCaps: 'small-caps' }}
        >
          © 2025 khaled siddiq
        </motion.footer>
      </div>
    </motion.div>
  );
}