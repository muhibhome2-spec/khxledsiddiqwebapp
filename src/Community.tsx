import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import PremiumGlass from './components/ui/premium-glass';
import { cn } from './lib/utils';

interface Tier {
  id: string;
  name: string;
  price: string;
  perks: string[];
  accent: string;      
  glowColor: string;   
  highlight: string;   
}

const tiers: Tier[] = [
  {
    id: 'hear-it-first',
    name: 'hear it first',
    price: '£3.99',
    accent: 'bg-zinc-400',
    glowColor: 'rgba(255, 255, 255, 0.15)',
    highlight: 'ring-zinc-500',
    perks: [
      'Get access to songs before they drop',
      'Exclusive access to the community group',
    ],
  },
  {
    id: 'see-it-first',
    name: 'see it first',
    price: '£7.99',
    accent: 'bg-indigo-400',
    glowColor: 'rgba(129, 140, 248, 0.25)',  
    highlight: 'ring-indigo-500',
    perks: [
      'All "Hear it First" benefits',
      'Watch the vlog before anyone else',
      'Behind the scenes photo dump',
    ],
  },
];

const EASE = [0.25, 0.4, 0.25, 1];

function Community() {
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  const toggleTier = (id: string) => {
    setExpandedTier(expandedTier === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 font-sans antialiased subpixel-antialiased overflow-hidden relative">
      
      {/* --- Environment: High Contrast for Glass Visibility --- */}
      <div className="fixed inset-0 -z-10">
        {/* 1. Deep Base */}
        <div className="absolute inset-0 bg-neutral-950" />
        
        {/* 2. CENTER SPOTLIGHT: Critical for Glass Effect. 
               This puts light BEHIND the cards so the blur is visible. */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[150%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(50,50,80,0.6),transparent_70%)] blur-[80px] pointer-events-none" />
        
        {/* 3. Top Rim Light (White/Blue) */}
        <div className="absolute top-[-10%] inset-x-0 h-[50%] bg-[radial-gradient(ellipse_at_top,rgba(120,130,255,0.15),transparent_70%)] blur-[100px] pointer-events-none" />

        {/* 4. Moving Sheen (Subtle) */}
        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-[0.1] pointer-events-none"
            style={{
                background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.1) 180deg, transparent 360deg)',
                filter: 'blur(60px)',
            }}
        />

        {/* 5. Texture */}
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </div>

      <div className="px-5 py-10 pb-40 max-w-md mx-auto relative z-10 flex flex-col min-h-screen">
        
        {/* --- Header --- */}
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-10 text-center relative"
        >
          <div className="inline-flex items-center gap-3 mb-5 opacity-80">
            <div className="h-px w-6 bg-gradient-to-r from-transparent to-white/60" />
            <span className="text-[10px] tracking-[0.3em] font-bold text-zinc-400 uppercase leading-none">
              Khaled Siddiq
            </span>
            <div className="h-px w-6 bg-gradient-to-l from-transparent to-white/60" />
          </div>

          <h1 className="text-4xl font-black tracking-tighter leading-[0.9] mb-3 text-white drop-shadow-2xl">
            JOIN THE<br />
            <span className="inline-block relative text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 pb-1">
              COMMUNITY
              {/* Text Highlight */}
              <div className="absolute -top-1 left-0 w-full h-[1px] bg-white/50 blur-[1px]" />
            </span>
          </h1>

          <p className="text-sm text-zinc-400 leading-[1.5] max-w-[280px] font-medium tracking-wide mx-auto">
            Get closer to the music, the journey, and the soul behind it all.
          </p>
        </motion.header>

        {/* --- Tiers List --- */}
        <motion.div className="space-y-6 flex-1">
          {tiers.map((tier, index) => {
            const isExpanded = expandedTier === tier.id;
            const isPremium = tier.id === 'see-it-first';

            return (
              <PremiumGlass
                as={motion.div}
                layout
                key={tier.id}
                variant="card"
                // Overriding intensity manually for maximum frost
                className={cn(
                  "cursor-pointer group relative overflow-hidden transition-all duration-500",
                  "backdrop-blur-2xl", // Heavy Blur
                  "border border-white/10", // Sharp Border
                  isPremium 
                    ? "bg-gradient-to-b from-indigo-500/20 to-indigo-900/10 shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)] border-indigo-400/30" 
                    : "bg-gradient-to-b from-white/10 to-white/5 hover:bg-white/15" // Standard Frost
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: EASE }}
              >
                {/* 1. Top Edge Highlight (The "Glass Edge") */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent z-20" />
                
                {/* 2. Inner Glow/Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* 3. Active Background Glow */}
                <motion.div 
                    className="absolute inset-0 -z-10 transition-opacity duration-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isExpanded ? 1 : 0 }}
                    style={{
                      background: `radial-gradient(600px circle at 50% 0%, ${tier.glowColor}, transparent 70%)`
                    }}
                />

                <motion.button
                  onClick={() => toggleTier(tier.id)}
                  className="w-full text-left p-6 relative z-20 min-h-[80px] flex flex-col justify-center"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <motion.div layout="position" className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        {/* Status Dot */}
                        <motion.div 
                          layout
                          className={cn(
                            "w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]",
                            isPremium ? "bg-indigo-400" : "bg-zinc-400"
                          )}
                        />
                        <h2 className="text-lg font-bold tracking-tight leading-none text-white group-hover:text-indigo-100 transition-colors uppercase">
                          {tier.name}
                        </h2>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end justify-center">
                      <span className="text-xl font-bold tracking-tight leading-none text-white drop-shadow-md">{tier.price}</span>
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1">/mo</span>
                    </div>
                  </motion.div>

                  <motion.div layout="position" className="flex items-center justify-between mt-4">
                    <span className={cn(
                        "text-[9px] font-bold tracking-[0.2em] uppercase leading-none transition-colors duration-300",
                        isPremium ? "text-indigo-300" : "text-zinc-500 group-hover:text-zinc-300"
                    )}>
                      {isExpanded ? 'Includes' : 'View Perks'}
                    </span>
                    <motion.div
                      className="flex items-center justify-center bg-white/10 rounded-full w-5 h-5"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <ChevronDown className={cn(
                          "w-3 h-3 transition-colors flex-shrink-0",
                          isPremium ? "text-indigo-300" : "text-zinc-400"
                      )} />
                    </motion.div>
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <div className="px-6 pb-6 relative z-20">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />
                        
                        <div className="space-y-3">
                          {tier.perks.map((perk, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.05 }}
                              className="flex items-start gap-3 group/perk"
                            >
                              <div className={cn(
                                "mt-0.5 p-[1px] rounded-full border flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                                isPremium 
                                  ? "border-indigo-400/50 bg-indigo-500/20" 
                                  : "border-zinc-600 bg-zinc-800/50"
                              )}>
                                <Check className="w-2 h-2 text-white flex-shrink-0" strokeWidth={3} />
                              </div>
                              <span className="text-xs text-zinc-300 font-medium tracking-wide leading-relaxed group-hover/perk:text-white transition-colors">
                                {perk}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        <PremiumGlass
                          as={motion.button}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.4 }}
                          variant="card"
                          intensity="light"
                          glow={isPremium}
                          className={cn(
                            "w-full mt-6 py-3.5 cursor-pointer group/btn relative overflow-hidden rounded-xl",
                            isPremium 
                              ? "bg-indigo-500 hover:bg-indigo-400 border-indigo-400/50 shadow-lg shadow-indigo-500/20" 
                              : "bg-white/10 hover:bg-white/20 border-white/10"
                          )}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center justify-center relative z-10">
                            <span className={cn(
                              "font-bold text-[10px] tracking-[0.2em] uppercase leading-none text-white"
                            )}>
                              Join {tier.name}
                            </span>
                          </div>
                        </PremiumGlass>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </PremiumGlass>
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
        
        <PremiumGlass
          variant="default"
          intensity="heavy"
          className="relative border-t border-white/10 py-3 px-4 pb-8 pointer-events-auto rounded-none backdrop-blur-3xl bg-black/60"
        >
           <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />
           
           <div className="max-w-md mx-auto relative z-10">
              <div className="text-center space-y-3">
                <span className="text-[8px] font-bold text-zinc-500 tracking-[0.2em] leading-none block uppercase">
                  Secure Checkout
                </span>
                <div className="flex items-center justify-center gap-5 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <img src="/6570d668df4688e1970d40c4_Apple_Pay_logo 1.png" alt="Apple Pay" className="h-4 object-contain" />
                  <div className="w-px h-3 bg-zinc-800" />
                  <img src="/6564c3a7eb11a45c6a488674_image 6 copy copy.png" alt="PayPal" className="h-4 object-contain" />
                  <div className="w-px h-3 bg-zinc-800" />
                  <img src="/6570d0cdb567796fada15b49_Visa_Inc._logo 1 copy.svg" alt="Visa" className="h-2.5 object-contain" />
                </div>
              </div>
           </div>
        </PremiumGlass>
      </motion.div>
    </div>
  );
}

export default Community;