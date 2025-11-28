import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';

interface Tier {
  id: string;
  name: string;
  price: string;
  perks: string[];
  accent: string;
}

const tiers: Tier[] = [
  {
    id: 'hear-it-first',
    name: 'hear it first',
    price: '£3.99/mo',
    accent: 'bg-zinc-500',
    perks: [
      'Get access to songs before they drop',
      'Exclusive access to the community group',
    ],
  },
  {
    id: 'see-it-first',
    name: 'see it first',
    price: '£7.99/mo',
    accent: 'bg-white',
    perks: [
      'All "Hear it First" benefits',
      'Watch the vlog before anyone else',
      'Behind the scenes photo dump',
    ],
  },
];

// Consistent easing with the landing page for brand feel
const EASE = [0.6, 0.01, 0.05, 0.9];

function Community() {
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  const toggleTier = (id: string) => {
    setExpandedTier(expandedTier === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-white selection:text-black">
      <div className="px-5 py-12 pb-40 max-w-lg mx-auto">
        
        {/* --- Header Section --- */}
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-zinc-700" />
            <span className="text-[10px] tracking-[0.2em] font-bold text-zinc-500 uppercase">Khaled Siddiq</span>
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
        <motion.div className="space-y-4">
          {tiers.map((tier, index) => {
            const isExpanded = expandedTier === tier.id;

            return (
              <motion.div
                layout
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
                className={`relative overflow-hidden border transition-colors duration-500 ${
                  isExpanded 
                    ? 'bg-zinc-900 border-zinc-700' 
                    : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <button
                  onClick={() => toggleTier(tier.id)}
                  className="w-full text-left p-6 md:p-8 relative z-10"
                >
                  <motion.div layout="position" className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <motion.div 
                          layout
                          className={`w-1 h-8 ${tier.accent}`} 
                        />
                        <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-white">
                          {tier.name}
                        </h2>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl md:text-2xl font-bold tracking-tight">{tier.price}</span>
                    </div>
                  </motion.div>

                  <motion.div layout="position" className="flex items-center justify-between mt-4">
                    <span className="text-xs text-zinc-500 font-bold tracking-widest uppercase">
                      {isExpanded ? 'Includes' : 'View Perks'}
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <ChevronDown className="w-4 h-4 text-zinc-600" />
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
                      <div className="px-6 pb-8 md:px-8">
                        <div className="space-y-4 pt-2">
                          {tier.perks.map((perk, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                              className="flex items-start gap-3 group"
                            >
                              <div className="mt-1 p-0.5 rounded-full bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
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
                          className="w-full mt-8 bg-white text-black py-4 font-black text-sm tracking-widest hover:bg-zinc-200 transition-colors uppercase"
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

        {/* --- Footer Note --- */}
      </div>

      {/* --- Floating Bottom Bar (Glass) --- */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
        className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent h-32" />
        <div className="relative bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800/50 p-6 pb-8 pointer-events-auto">
           <div className="max-w-lg mx-auto">
              <div className="text-center space-y-3">
                <span className="text-xs font-bold text-zinc-400 tracking-wider block">SECURE CHECKOUT</span>
                <div className="flex items-center justify-center gap-4 opacity-60">
                  <img src="/6570d668df4688e1970d40c4_Apple_Pay_logo 1.png" alt="Apple Pay" className="h-5" />
                  <div className="w-px h-4 bg-zinc-700" />
                  <img src="/6564c3a7eb11a45c6a488674_image 6 copy copy.png" alt="PayPal" className="h-5" />
                  <div className="w-px h-4 bg-zinc-700" />
                  <img src="/6570d0cdb567796fada15b49_Visa_Inc._logo 1 copy.svg" alt="Visa" className="h-5" />
                </div>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Community;