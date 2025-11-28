import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';

interface Tier {
  id: string;
  name: string;
  price: string;
  perks: string[];
  accent: string;
  gradient: string;
  highlight: string;
}

const tiers: Tier[] = [
  {
    id: 'hear-it-first',
    name: 'hear it first',
    price: '£3.99',
    accent: 'bg-zinc-500',
    // Sharper Industrial Gradient
    gradient: 'from-zinc-900 via-zinc-800/80 to-black',
    highlight: 'ring-zinc-700',
    perks: [
      'Get access to songs before they drop',
      'Exclusive access to the community group',
    ],
  },
  {
    id: 'see-it-first',
    name: 'see it first',
    price: '£7.99',
    accent: 'bg-violet-400',
    // Deeper, darker Amethyst (More black, less washout)
    gradient: 'from-black via-[#1a0b2e] to-black', 
    highlight: 'ring-violet-900/50',
    perks: [
      'All "Hear it First" benefits',
      'Watch the vlog before anyone else',
      'Behind the scenes photo dump',
    ],
  },
];

const EASE = [0.6, 0.01, 0.05, 0.9];

function Community() {
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  const toggleTier = (id: string) => {
    setExpandedTier(expandedTier === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-white selection:text-black font-sans">
      <div className="px-6 py-12 pb-44 max-w-lg mx-auto">
        
        {/* --- Header Section (Sharpened) --- */}
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-10 text-center md:text-left"
        >
          <div className="inline-flex md:flex items-center gap-3 mb-6 opacity-70">
            <div className="h-px w-8 bg-white/50 hidden md:block" />
            <span className="text-[9px] md:text-[10px] tracking-[0.3em] font-bold text-zinc-400 uppercase">
              Khaled Siddiq
            </span>
            <div className="h-px w-8 bg-white/50 md:hidden" />
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] mb-4 text-white">
            JOIN THE<br />
            <span className="text-zinc-600">COMMUNITY</span>
          </h1>

          <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-xs font-medium tracking-wide mx-auto md:mx-0">
            Get closer to the music, the journey, and the soul behind it all.
          </p>
        </motion.header>

        {/* --- Tiers List --- */}
        <motion.div className="space-y-4">
          {tiers.map((tier, index) => {
            const isExpanded = expandedTier === tier.id;
            const isPremium = tier.id === 'see-it-first';

            return (
              <motion.div
                layout
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
                // Using 'ring' instead of border for sub-pixel sharp rendering
                className={`relative overflow-hidden rounded-sm transition-all duration-500 bg-gradient-to-br ${tier.gradient} 
                            ${isExpanded 
                              ? `shadow-2xl shadow-black ring-1 ${tier.highlight}` 
                              : `ring-1 ring-white/5 hover:ring-white/10`
                            }`}
              >
                 {/* Texture Overlay (Global for card) */}
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />

                <button
                  onClick={() => toggleTier(tier.id)}
                  className="w-full text-left p-6 md:p-7 relative z-10 group"
                >
                  <motion.div layout="position" className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-1">
                        <motion.div 
                          layout
                          className={`w-0.5 h-6 ${tier.accent} shadow-[0_0_10px_currentColor]`} 
                        />
                        <h2 className="text-xl md:text-2xl font-black tracking-tighter text-white group-hover:text-white/90 transition-colors">
                          {tier.name}
                        </h2>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-lg md:text-xl font-bold tracking-tight text-white">{tier.price}</span>
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">/mo</span>
                    </div>
                  </motion.div>

                  <motion.div layout="position" className="flex items-center justify-between mt-5">
                    <span className="text-[9px] text-zinc-500 font-bold tracking-[0.25em] uppercase group-hover:text-zinc-400 transition-colors">
                      {isExpanded ? 'Includes' : 'View Perks'}
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-colors" />
                    </motion.div>
                  </motion.div>
                </button>

                {/* --- Expanded Content --- */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <div className="px-6 pb-6 md:px-7 relative z-10 border-t border-white/5 pt-5">
                        <div className="space-y-3">
                          {tier.perks.map((perk, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.05 }}
                              className="flex items-start gap-3"
                            >
                              <div className={`mt-1 p-[2px] rounded-full border ${isPremium ? 'border-violet-500/50' : 'border-zinc-700'}`}>
                                <Check className="w-2 h-2 text-white" />
                              </div>
                              <span className="text-xs md:text-sm text-zinc-300 font-medium tracking-wide">
                                {perk}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        {/* ✨ THE SANDBLASTED BUTTON (Updated) ✨ */}
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.4 }}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="group relative w-full mt-8 overflow-hidden rounded-sm
                                     bg-white/10 backdrop-blur-md border border-white/20
                                     shadow-[0_0_20px_-5px_rgba(255,255,255,0.15)]
                                     hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.25)]
                                     hover:bg-white/20 hover:border-white/40
                                     transition-all duration-500
                                     py-4"
                        >
                           {/* Inner Noise Texture (Sandblast Effect) */}
                           <div 
                            className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            }}
                          />

                          {/* Moving Sheen Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

                          <span className="relative z-10 font-black text-[10px] tracking-[0.25em] text-white uppercase group-hover:text-white transition-colors">
                            Join {tier.name}
                          </span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* --- Floating Bottom Bar (Glass) --- */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
        className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent h-32" />
        <div className="relative bg-black/40 backdrop-blur-xl border-t border-white/5 p-4 pb-8 pointer-events-auto">
           <div className="max-w-lg mx-auto">
              <div className="text-center space-y-3">
                <span className="text-[9px] font-bold text-zinc-600 tracking-[0.25em] block uppercase">
                  Secure Checkout
                </span>
                <div className="flex items-center justify-center gap-5 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <img src="/6570d668df4688e1970d40c4_Apple_Pay_logo 1.png" alt="Apple Pay" className="h-5 object-contain" />
                  <div className="w-px h-3 bg-zinc-800" />
                  <img src="/6564c3a7eb11a45c6a488674_image 6 copy copy.png" alt="PayPal" className="h-5 object-contain" />
                  <div className="w-px h-3 bg-zinc-800" />
                  <img src="/6570d0cdb567796fada15b49_Visa_Inc._logo 1 copy.svg" alt="Visa" className="h-3 object-contain" />
                </div>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Community;