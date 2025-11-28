import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Community from './Community';

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
  hidden: { y: "100%" },
  show: { 
    y: "0%", 
    transition: TRANSITION 
  },
  exit: {
    y: "-100%",
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};

function App() {
  const [showCommunity, setShowCommunity] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-sans selection:bg-white selection:text-black">
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
            className="relative min-h-screen flex flex-col"
            variants={containerVars}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* Background Image with Parallax-like Zoom Effect */}
            <motion.div 
              className="fixed inset-0 z-0"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10 pointer-events-none" />
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45 min-h-screen"
                style={{
                  backgroundImage: `url('/Khaled-Siddiq.jpeg')`,
                  filter: 'grayscale(100%) contrast(1.2)',
                }}
              />
            </motion.div>

            {/* Content Container */}
            <div className="relative z-20 flex-1 flex flex-col px-6 py-8 md:px-12 md:py-16 min-h-screen">
              
              {/* Header */}
              <motion.header variants={fadeInUp} className="mb-auto">
              </motion.header>

              {/* Main Hero */}
              <div className="flex-1 flex items-center justify-center min-h-[60vh]">
                <div className="w-full max-w-md space-y-10 text-center md:max-w-lg">
                  
                  <div className="space-y-6">
                    {/* Masked Text Reveal for Name */}
                    <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] overflow-hidden">
                      <div className="overflow-hidden">
                        <motion.div variants={revealText}>KHALED</motion.div>
                      </div>
                      <div className="overflow-hidden">
                        <motion.div variants={revealText}>SIDDIQ</motion.div>
                      </div>
                    </h1>
                    
                    <motion.div variants={fadeInUp} className="h-1 w-24 md:w-32 bg-white mx-auto" />
                  </div>

                  {/* Interactive Button */}
                  <motion.div variants={fadeInUp}>
                    <motion.button
                      onClick={() => setShowCommunity(true)}
                      whileHover={{ scale: 1.05, backgroundColor: "#e5e5e5" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="w-full md:max-w-sm md:mx-auto bg-white text-black py-5 px-8 font-black text-lg md:text-xl tracking-widest transition-colors duration-300"
                    >
                      JOIN THE COMMUNITY
                    </motion.button>
                  </motion.div>

                  {/* Social Links */}
                  <motion.div 
                    variants={fadeInUp} 
                    className="pt-2 flex justify-center gap-8 md:gap-12 text-sm md:text-base font-bold tracking-widest"
                  >
                    {[
                      { name: 'SPOTIFY', url: 'https://open.spotify.com/artist/2XYgHUbsmab6VT4a3FF9mX' },
                      { name: 'APPLE', url: 'https://music.apple.com/my/artist/kh%C4%81led-sidd%C4%ABq/1170959386' },
                      { name: 'IG', url: 'https://www.instagram.com/khxledsiddiq/?hl=en' }
                    ].map((link) => (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3, color: "#9ca3af" }}
                        className="hover:text-gray-400 transition-colors inline-block"
                      >
                        {link.name}
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Footer */}
              <motion.footer variants={fadeInUp} className="mt-auto text-center text-[10px] md:text-xs tracking-[0.2em] text-gray-500 font-bold uppercase">
                © 2025 All Rights Reserved
              </motion.footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;