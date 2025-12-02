import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PremiumGlass from './ui/premium-glass';

// --- Animation Physics ---
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
  // Parallax hook
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  // Mouse move effect (Subtle)
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
      // REVERTED: Explicitly setting Helvetica font stack
      className="relative min-h-[100dvh] flex flex-col overflow-hidden text-zinc-100 perspective-1000 selection:bg-indigo-500/30"
      style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
      variants={containerVars}
      initial="hidden"
      animate="show"
    >
      {/* --- LAYER 1: The Image (Visible & Living) --- */}
      {/* REVERTED: Removed the solid black background layers. 
          Increased opacity and reduced grayscale to make the image the hero again. */}
      <motion.div 
        className="fixed inset-0 -z-10"
        style={{ y: y1, scale: 1.1 }} 
        animate={{
            x: mousePosition.x * -15, 
            y: mousePosition.y * -15
        }}
        transition={{ type: "spring", stiffness: 40, damping: 30 }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/Khaled-Siddiq.jpeg')`,
            // Much clearer image settings
            opacity: 0.75, 
            filter: 'grayscale(30%) contrast(110%)'
          }}
        />
        {/* Lighter gradient just to ensure text readability at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      </motion.div>

      {/* --- LAYER 2: Film Grain (Texture) --- */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay z-0"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
           }}
      />

      {/* --- Main Layout --- */}
      <div className="relative z-10 flex-1 flex flex-col px-6 py-10 md:px-12 lg:px-20 max-w-[1800px] mx-auto w-full h-full">
        
        {/* Minimal Header */}
        <motion.header variants={fadeInSlow} className="flex justify-between items-center w-full">
           <span className="text-[10px] tracking-[0.4em] text-white/80 font-bold uppercase mix-blend-overlay">
             est. 2025
           </span>
        </motion.header>

        {/* Hero Center */}
        <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[60vh]">
          <div className="w-full text-center relative">
            
            {/* The Typography - Helvetica, Bold, Tight */}
            <div className="overflow-hidden mb-8">
              <motion.h1 
                variants={titleReveal}
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.85] text-white"
              >
                khaled siddiq
              </motion.h1>
            </div>

            <motion.p 
              variants={fadeInSlow}
              className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              artist & creative director
            </motion.p>

            <motion.button
              variants={fadeInSlow}
              onClick={onEnterCommunity}
              className="group relative px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium text-white border border-white/20 hover:border-white/40 transition-all duration-500 hover:bg-white/5"
            >
              <span className="relative z-10">enter community</span>
              <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}