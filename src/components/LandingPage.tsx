import { motion } from 'framer-motion';
import PremiumGlass from './ui/premium-glass';

// --- Animation Constants ---
// Faster, smoother transition (0.8s - 1.0s is the sweet spot for UI)
const TRANSITION = { duration: 0.9, ease: [0.16, 1, 0.3, 1] };

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Faster stagger for a snappier load
      delayChildren: 0.1,
    },
  },
};

const textReveal = {
  // Removed rotateZ. Vertical reveal is more professional/subtle.
  hidden: { y: "100%", opacity: 0 },
  show: { 
    y: "0%", 
    opacity: 1,
    transition: TRANSITION 
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(5px)' }, // Less blur, less distance
  show: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { ...TRANSITION, duration: 1.1 } 
  },
};

interface LandingPageProps {
  onEnterCommunity: () => void;
}

export default function LandingPage({ onEnterCommunity }: LandingPageProps) {
  return (
    <motion.div
      className="relative min-h-[100dvh] flex flex-col perspective-1000 bg-black"
      variants={containerVars}
      initial="hidden"
      animate="show"
    >
      {/* --- Background Image --- */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full scale-[1.02]"
          style={{
            backgroundImage: `url('/Khaled-Siddiq.jpeg')`,
            opacity: 0.75,
            filter: 'grayscale(100%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
      </div>

      {/* --- Static Background Image --- */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full scale-[1.02]" // Slight scale to avoid edge artifacts
          style={{
            backgroundImage: `url('/Khaled-Siddiq.jpeg')`,
            opacity: 0.65, // Increased slightly from 0.6 for visibility
            filter: 'grayscale(40%)' // Reduced from 100% to 40% to bring back subtle skin tones
          }}
        />
        {/* Lighter gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-30 flex-1 flex flex-col justify-between px-6 py-8 md:px-12 md:py-10 lg:px-20 lg:py-14 max-w-screen-2xl mx-auto w-full h-full mix-blend-screen">
        
        {/* Minimal Header */}
        <motion.header variants={fadeInUp} className="flex justify-center md:justify-between items-center w-full opacity-70">
           {/* Placeholder for stability */}
           <div className="hidden md:block w-4" /> 
        </motion.header>

        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <div className="w-full max-w-5xl text-center space-y-10 md:space-y-14">
            
            {/* Typography Stack */}
            <div className="space-y-2 md:space-y-4">
              <h1 className="font-black tracking-tighter leading-[0.85] text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50">
                <div className="overflow-hidden py-2">
                  <motion.div variants={textReveal} className="tracking-[-0.04em] origin-bottom-left" style={{ fontVariantCaps: 'small-caps' }}>
                    khaled
                  </motion.div>
                </div>
                <div className="overflow-hidden py-2">
                  <motion.div variants={textReveal} className="tracking-[-0.04em] origin-bottom-left text-white/60" style={{ fontVariantCaps: 'small-caps' }}>
                    siddiq
                  </motion.div>
                </div>
              </h1>
              
              <motion.div variants={fadeInUp} className="overflow-hidden">
                  <div className="h-px w-16 bg-white/30 mx-auto mt-8" />
              </motion.div>
            </div>

            {/* Interactive Button */}
            <motion.div variants={fadeInUp} className="w-full flex justify-center relative z-20">
              {/* Subtle glow, reduced blur radius */}
              <div className="absolute inset-0 bg-indigo-500/10 blur-2xl rounded-full transform scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <PremiumGlass
                variant="card"
                intensity="heavy"
                glow={true}
                className="group cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-500"
                onClick={onEnterCommunity}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="py-4 px-10 font-bold text-[10px] tracking-[0.3em] text-zinc-300 group-hover:text-white transition-colors duration-500 flex items-center justify-center relative overflow-hidden uppercase">
                  <span className="relative z-10">enter community</span>
                </div>
              </PremiumGlass>
            </motion.div>

            {/* Socials - Tighter Spacing */}
            <motion.div 
              variants={fadeInUp} 
              className="flex flex-wrap justify-center gap-8 text-[9px] md:text-[10px] font-semibold tracking-[0.25em] text-neutral-400"
              style={{ fontVariantCaps: 'small-caps' }}
            >
              {[
                { name: 'spotify', url: 'https://open.spotify.com/artist/2XYgHUbsmab6VT4a3FF9mX' },
                { name: 'apple', url: 'https://music.apple.com/my/artist/kh%C4%81led-sidd%C4%ABq/1170959386' },
                { name: 'instagram', url: 'https://www.instagram.com/khxledsiddiq/?hl=en' }
              ].map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, color: "#fff" }}
                  transition={{ duration: 0.2 }}
                  className="hover:text-white transition-colors duration-300 relative group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-1 left-0 w-0 h-[1px] bg-white/50 transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.footer 
          variants={fadeInUp} 
          className="text-center text-[9px] tracking-[0.3em] text-neutral-600 font-bold pb-2 uppercase"
        >
          © 2025 khaled siddiq
        </motion.footer>
      </div>
    </motion.div>
  );
}