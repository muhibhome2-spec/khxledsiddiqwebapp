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
    // changed min-h-screen to min-h-[100dvh] for better mobile browser support
    <div className="min-h-[100dvh] bg-black text-white overflow-hidden font-sans selection:bg-white selection:text-black">
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
            {/* Background Image with Parallax-like Zoom Effect */}
            <motion.div 
              className="fixed inset-0 z-0"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10 pointer-events-none" />
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45 h-full w-full"
                style={{
                  backgroundImage: `url('/Khaled-Siddiq.jpeg')`,
                  filter: 'grayscale(100%) contrast(1.2)',
                }}
              />
            </motion.div>

            {/* Content Container */}
            {/* Added max-w-screen-2xl to prevent elements spreading too wide on ultra-wide monitors */}
            <div className="relative z-20 flex-1 flex flex-col justify-between px-6 py-8 md:px-12 md:py-12 lg:px-20 lg:py-16 max-w-screen-2xl mx-auto w-full h-full">
              
              {/* Header */}
              <motion.header variants={fadeInUp} className="flex justify-between items-center w-full">
              </motion.header>

              {/* Main Hero */}
              <div className="flex-1 flex flex-col items-center justify-center w-full py-8 md:py-0">
                <div className="w-full max-w-[90vw] md:max-w-2xl lg:max-w-4xl xl:max-w-5xl text-center space-y-8 md:space-y-12">
                  
                  <div className="space-y-4 md:space-y-6">
                    {/* Massive Responsive Typography */}
                    <h1 className="font-black tracking-tighter leading-[0.85] overflow-hidden
                                 text-6xl         
                                 sm:text-7xl      
                                 md:text-8xl      
                                 lg:text-9xl      
                                 xl:text-[10rem]  
                                 2xl:text-[12rem]">
                      <div className="overflow-hidden">
                        <motion.div variants={revealText}>KHALED</motion.div>
                      </div>
                      <div className="overflow-hidden">
                        <motion.div variants={revealText}>SIDDIQ</motion.div>
                      </div>
                    </h1>
                    
                    <motion.div variants={fadeInUp} className="h-0.5 md:h-1 w-16 md:w-32 bg-white mx-auto" />
                  </div>

                  {/* Interactive Button */}
                  <motion.div variants={fadeInUp} className="w-full flex justify-center">
                    <motion.button
                      onClick={() => setShowCommunity(true)}
                      whileHover={{ scale: 1.05, backgroundColor: "#e5e5e5" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      // Button is full width on mobile, auto width on tablet+
                      className="w-full sm:w-auto bg-white text-black py-4 px-8 md:py-5 md:px-12 
                                 font-black text-base md:text-xl tracking-[0.15em] 
                                 transition-colors duration-300 whitespace-nowrap"
                    >
                      JOIN THE COMMUNITY
                    </motion.button>
                  </motion.div>

                  {/* Social Links */}
                  <motion.div 
                    variants={fadeInUp} 
                    className="flex flex-wrap justify-center gap-6 md:gap-12 text-xs md:text-sm font-bold tracking-[0.2em]"
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
              <motion.footer 
                variants={fadeInUp} 
                className="text-center text-[10px] md:text-xs tracking-[0.25em] text-gray-500 font-bold uppercase pb-safe"
              >
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