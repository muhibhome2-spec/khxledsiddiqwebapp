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
}

const tiers: Tier[] = [
  {
    id: 'hear-it-first',
    name: 'hear it first',
    price: '£3.99/mo',
    accent: 'bg-zinc-500',
    // Gunmetal / Brushed Steel vibe
    gradient: 'from-zinc-900 via-zinc-800/60 to-zinc-950',
    perks: [
      'Get access to songs before they drop',
      'Exclusive access to the community group',
    ],
  },
  {
    id: 'see-it-first',
    name: 'see it first',
    price: '£7.99/mo',
    accent: 'bg-violet-400', // NEW: Amethyst accent bar
    // Amethyst/Dark Crystal gradient for a premium, luxurious feel
    gradient: 'from-zinc-950 via-violet-950/70 to-black', 
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
      <div className="px-5 py-12 pb-44 max-w-lg mx-auto">
        
        {/* --- Header Section --- */}
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-zinc-700" />
            <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-500 uppercase">Khaled Siddiq</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[0.9] mb-6 text-white">
            JOIN THE<br />
            <span className="text-zinc-500">COMMUNITY</span>
          </h1>

          <p className="text-base text-zinc-400 leading-relaxed max-w-xs font-medium">
            Get closer to the music, the journey, and the soul behind it all.
          </p>
        </motion.header>

        {/* --- Tiers List --- */}
        <motion.div className="space-y-5">
          {tiers.map((tier, index) => {
            const isExpanded = expandedTier === tier.id;
            const isPremium = tier.id === 'see-it-first';
            
            // Dynamic classes for border and shadow based on tier
            const borderClass = isPremium ? 'border-violet-900/80' : 'border-zinc-800';
            const shadowClass = isPremium ? 'shadow-violet-800/20' : 'shadow-black/50';

            return (
              <motion.div
                layout
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
                // Applied custom gradient here
                className={`relative overflow-hidden rounded-sm transition-all duration-500 bg-gradient-to-br ${tier.gradient} 
                            ${isExpanded 
                              ? `shadow-2xl ${shadowClass} ring-1 ring-white/10 ${borderClass}` 
                              : `border border-white/5 opacity-90 hover:opacity-100`
                            }`}
              >
                 {/* Subtle noise/texture overlay for "premium" feel */}
                 <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none mix-blend-overlay" />

                <button
                  onClick={() => toggleTier(tier.id)}
                  className="w-full text-left p-6 md:p-8 relative z-10"
                >
                  <motion.div layout="position" className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <motion.div 
                          layout
                          className={`w-1 h-8 shadow-[0_0_15px_rgba(255,255,255,0.1)] ${tier.accent}`} 
                        />
                        <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-white drop-shadow-sm">
                          {tier.name}
                        </h2>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl md:text-2xl font-bold tracking-tight text-white/90">{tier.price}</span>
                    </div>
                  </motion.div>

                  <motion.div layout="position" className="flex items-center justify-between mt-4">
                    <span className="text-[10px] text-zinc-400 font-bold tracking-[0.2em] uppercase">
                      {isExpanded ? 'Includes' : 'View Perks'}
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <ChevronDown className="w-4 h-4 text-zinc-500" />
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
                      <div className="px-6 pb-8 md:px-8 relative z-10 border-t border-white/5 pt-6">
                        <div className="space-y-4">
                          {tier.perks.map((perk, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                              className="flex items-start gap-3 group"
                            >
                              {/* Metallic Check Circle */}
                              <div className={`mt-1 p-0.5 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 border ${isPremium ? 'border-violet-600' : 'border-zinc-600'} shadow-sm group-hover:border-white transition-colors`}>
                                <Check className="w-3 h-3 text-white" />
                              </div>
                              <span className="text-sm text-zinc-300 leading-relaxed font-medium">
                                {perk}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full mt-8 bg-white text-black py-4 font-black text-xs tracking-[0.2em] hover:bg-gray-100 transition-colors uppercase shadow-lg shadow-white/5"
                        >
                          Join {tier.name}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent h-40" />
        <div className="relative bg-zinc-950/80 backdrop-blur-xl border-t border-white/10 p-6 pb-8 pointer-events-auto">
           <div className="max-w-lg mx-auto">
              <div className="text-center space-y-4">
                <span className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] block">SECURE CHECKOUT</span>
                <div className="flex items-center justify-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  <img src="/6570d668df4688e1970d40c4_Apple_Pay_logo 1.png" alt="Apple Pay" className="h-6 object-contain" />
                  <div className="w-px h-4 bg-zinc-700" />
                  <img src="/6564c3a7eb11a45c6a488674_image 6 copy copy.png" alt="PayPal" className="h-6 object-contain" />
                  <div className="w-px h-4 bg-zinc-700" />
                  <img src="/6570d0cdb567796fada15b49_Visa_Inc._logo 1 copy.svg" alt="Visa" className="h-4 object-contain" />
                </div>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Community;