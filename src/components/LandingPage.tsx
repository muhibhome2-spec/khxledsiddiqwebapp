import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import PremiumGlass from './ui/premium-glass';

// --- Animation Physics ---
// "Quart-out" easing for that snappy-yet-smooth Apple feel
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

const titleReveal = {
  hidden: { y: "110%", rotateZ: 2, opacity: 0, filter: 'blur(10px)' },
  show: { 
    y: "0%", 
    rotateZ: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: TRANSITION 
  },
};

const fadeInSlow = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { ...TRANSITION, duration: 1.8 } 
  },
};

interface LandingPageProps {
  onEnterCommunity: () => void;
}

export default function LandingPage({ onEnterCommunity }: LandingPageProps) {
  // Parallax hook for subtle depth without heavy libraries
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  // Mouse move effect for background (Subtle, expensive-feeling movement)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-black text-zinc-100 perspective-1000 selection:bg-indigo-500/30"
      variants={containerVars}
      initial="hidden"
      animate="show"
    >
      {/* --- LAYER 1: The Cinematic Base --- */}
      <div className="fixed inset-0 -z-20 bg-[#050505]" />

      {/* --- LAYER 2: The Image (Parallax + Mouse Move) --- */}
      <motion.div 
        className="fixed inset-0 -z-10"
        style={{ y: y1, scale: 1.1 }} // Scale to prevent edges showing on move
        animate={{
            x: mousePosition.x * -20, // Inverse mouse movement
            y: mousePosition.y * -20
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }} // Heavy physics
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 grayscale contrast-125"
          style={{
            backgroundImage: `url('/Khaled-Siddiq.jpeg')`,
          }}
        />
        {/* Gradient Map Overlay for "Editorial" Look */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-indigo-950/20 to-black/90 mix-blend-multiply" />
      </motion.div>

      {/* --- LAYER 3: Film Grain (The "Texture" Secret) --- */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.07] mix-blend-overlay z-0"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
           }}
      />

      {/* --- Main Layout --- */}
      <div className="relative z-10 flex-1 flex flex-col px-6 py-10 md:px-12 lg:px-20 max-w-[1800px] mx-auto w-full h-full">
        
        {/* Minimal Header */}
        <motion.header variants={fadeInSlow} className="flex justify-between items-center w-full">
           <span className="text-[10px] tracking-[0.4em] text-zinc-500 font-medium uppercase mix-blend-difference">
             est. 2025
           </span>
        </motion.header>

        {/* Hero Center */}
        <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[60vh]">
          <div className="w-full text-center relative">
            
            {/* The Typography - Fluid, Tight, Impactful */}
            <div className="relative z-20 mix-blend-overlay opacity-80 pointer-events-none select-none">
                <h1 className="font-black tracking-[-0.06em] leading-[0.8] flex flex-col items-center justify-center">
                    {/* FLUID TYPOGRAPHY using clamp() */}
                    <div className="overflow-hidden py-1">
                        <motion.span 
                            variants={titleReveal} 
                            className="block text-[clamp(4.5rem,14vw,13rem)] text-white"
                        >
                            khaled
                        </motion.span>
                    </div>
                    <div className="overflow-hidden py-1 -mt-[2vw] md:-mt-[1.5vw]">
                        <motion.span 
                            variants={titleReveal} 
                            className="block text-[clamp(4.5rem,14vw,13rem)] text-zinc-400"
                        >
                            siddiq
                        </motion.span>
                    </div>
                </h1>
            </div>

            {/* The "Anchor" Line */}
            <motion.div variants={fadeInSlow} className="mt-12 md:mt-16 mb-12 flex justify-center">
                <div className="h-px w-0 animate-[grow_1.5s_ease-out_forwards] bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent" style={{ width: '100px' }} />
            </motion.div>

            {/* Interactive Element */}
            <motion.div variants={fadeInSlow} className="relative z-30 inline-block">
              {/* Backlight Pulse */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/20 blur-[50px] rounded-full animate-pulse-slow" />
              
              <PremiumGlass
                variant="card"
                intensity="heavy"
                className="group cursor-pointer rounded-full border border-white/[0.05] hover:border-white/20 transition-all duration-500"
                onClick={onEnterCommunity}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <div className="py-4 px-10 md:py-5 md:px-14 flex items-center gap-3 relative overflow-hidden">
                   {/* Button inner glow */}
                   <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   
                   <span className="relative z-10 text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-zinc-300 group-hover:text-white transition-colors duration-300 uppercase">
                     enter community
                   </span>
                </div>
              </PremiumGlass>
            </motion.div>

          </div>
        </div>

        {/* Footer & Socials */}
        <motion.div 
            variants={fadeInSlow} 
            className="flex flex-col md:flex-row justify-between items-center gap-8 w-full border-t border-white/[0.03] pt-8"
        >
            {/* Socials - Interactive Underlines */}
            <div className="flex gap-8 md:gap-12">
              {[
                { name: 'spotify', url: '#' },
                { name: 'apple music', url: '#' },
                { name: 'instagram', url: '#' }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="group relative py-2"
                >
                  <span className="text-[9px] font-medium tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase">
                    {link.name}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-px bg-zinc-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </div>

            <div className="text-[9px] tracking-[0.2em] text-zinc-700 font-medium uppercase">
               london • worldwide
            </div>
        </motion.div>

      </div>
      
      <style jsx>{`
        @keyframes pulse-slow {
            0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
        }
      `}</style>
    </motion.div>
  );
}