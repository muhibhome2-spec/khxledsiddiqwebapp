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
    accent: 'bg-zinc-500',
    glowColor: 'rgba(255, 255, 255, 0.1)', // Silvery/white glow for VIP metal feel
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
    glowColor: 'rgba(139, 92, 246, 0.2)',  
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
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-white/20 font-sans antialiased subpixel-antialiased overflow-hidden relative">
      
      {/* --- VIP "Brushed Titanium" + "Studio Light" Environment --- */}
      <div className="fixed inset-0 -z-10">
        
        {/* 1. Base Layer: Deep Zinc/Black Metal */}
        <div className="absolute inset-0 bg-neutral-950" />
        
        {/* 2. The "Sheen": An animated, rotating conic gradient for liquid metal feel */}
        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-[0.05] pointer-events-none"
            style={{
                background: 'conic-gradient(from 0deg at 50% 50%, #000000 0deg, #FFFFFF 180deg, #000000 360deg)',
                filter: 'blur(80px)',
            }}
        />

        {/* 3. STUDIO KEY LIGHT: Sharp, top-down white light (Softbox effect) */}
        <div className="absolute inset-x-0 top-[-20%] h-[70%] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_70%)] blur-[80px] pointer-events-none mix-blend-screen" />
        
        {/* 4. STUDIO RIM LIGHT: Subtle Indigo/Violet from bottom-right for 3D depth */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(79,70,229,0.08),transparent_70%)] blur-[60px] pointer-events-none mix-blend-screen" />

        {/* 5. Heavy Grain Texture: Essential for the "Physical" feel */}
        <div className="absolute inset-0 opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        
        {/* 6. Vignette to focus eyes on center */}
        <div className="absolute inset-0 bg-[radial-gradient(transparent_45%,#000000_100%)] pointer-events-none" />
      </div>

      <div className="px-6 py-12 pb-44 max-w-lg mx-auto relative z-10">
        
        {/* --- Header Section --- */}
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-12 text-center md:text-left relative"
        >
          <div className="inline-flex md:flex items-center gap-3 mb-6 opacity-60 mix-blend-difference">
            <div className="h-px w-8 bg-white hidden md:block" />
            <span className="text-[10px] tracking-[0.35em] font-bold text-zinc-400 uppercase leading-none">
              Khaled Siddiq
            </span>
            <div className="h-px w-8 bg-white md:hidden" />
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.85] mb-4 text-white drop-shadow-2xl">
            JOIN THE<br />
            {/* Updated Gradient: Chrome/Studio Reflection Style */}
            <span className="inline-block relative text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 pb-2">
              COMMUNITY
              {/* Refined Shine Effect on Text */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[1px] mix-blend-overlay" />
            </span>
          </h1>

          <p className="text-xs md:text-sm text-zinc-400 leading-[1.6] max-w-xs font-medium tracking-wide mx-auto md:mx-0">
            Get closer to the music, the journey, and the soul behind it all.
          </p>
        </motion.header>

        {/* --- Tiers List --- */}
        <motion.div className="space-y-5">
          {tiers.map((tier, index) => {
            const isExpanded = expandedTier === tier.id;
            const isPremium = tier.id === 'see-it-first';

            return (
              <PremiumGlass
                as={motion.div}
                layout
                key={tier.id}
                variant="card"
                intensity={isPremium ? "heavy" : "medium"}
                className={cn(
                  "cursor-pointer group relative overflow-hidden transition-all duration-500",
                  isPremium 
                    ? "shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] border-white/10" 
                    : "shadow-2xl hover:border-white/10"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: EASE }}
              >
                {/* Active State Radial Glow */}
                <motion.div 
                    className="absolute inset-0 -z-10 transition-opacity duration-700"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    animate={{ opacity: isExpanded ? 0.8 : 0 }}
                    style={{
                      background: `radial-gradient(800px circle at 50% 0%, ${tier.glowColor}, transparent 60%)`
                    }}
                />

                <motion.button
                  onClick={() => toggleTier(tier.id)}
                  className="w-full text-left p-6 md:p-8 relative z-20 min-h-[44px] flex flex-col justify-center"
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <motion.div layout="position" className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        {/* Status Indicator Pill */}
                        <motion.div 
                          layout
                          className={cn(
                            "w-1 h-8 rounded-full shadow-[0_0_15px_currentColor]",
                            tier.accent
                          )}
                        />
                        <h2 className="text-xl md:text-2xl font-black tracking-tighter leading-none text-white group-hover:text-indigo-100 transition-colors">
                          {tier.name}
                        </h2>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end justify-center">
                      <span className="text-xl md:text-2xl font-bold tracking-tight leading-none text-white drop-shadow-lg">{tier.price}</span>
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.25em] leading-none mt-1">/mo</span>
                    </div>
                  </motion.div>

                  <motion.div layout="position" className="flex items-center justify-between mt-6 border-t border-white/5 pt-4">
                    <span className={cn(
                        "text-[9px] font-bold tracking-[0.25em] uppercase leading-none transition-colors duration-300",
                        isPremium ? "text-indigo-300 group-hover:text-indigo-200" : "text-zinc-500 group-hover:text-zinc-300"
                    )}>
                      {isExpanded ? 'Includes' : 'View Perks'}
                    </span>
                    <motion.div
                      className="flex items-center justify-center bg-white/5 rounded-full p-1"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <ChevronDown className={cn(
                          "w-3 h-3 transition-colors flex-shrink-0",
                          isPremium ? "text-indigo-400" : "text-zinc-400"
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
                      <div className="px-6 pb-8 md:px-8 relative z-20">
                        <div className="space-y-4 pt-2">
                          {tier.perks.map((perk, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.05 }}
                              className="flex items-start gap-3 min-h-[20px] group/perk"
                            >
                              <div className={cn(
                                "mt-0.5 p-[2px] rounded-full border flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                                isPremium 
                                  ? "border-indigo-400/30 bg-indigo-500/10 group-hover/perk:border-indigo-400" 
                                  : "border-zinc-700 bg-zinc-800/50"
                              )}>
                                <Check className="w-2 h-2 text-white flex-shrink-0" strokeWidth={3} />
                              </div>
                              <span className="text-xs md:text-sm text-zinc-300 font-medium tracking-[0.01em] leading-relaxed group-hover/perk:text-white transition-colors">
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
                            "w-full mt-8 py-4 cursor-pointer group/btn relative overflow-hidden",
                            isPremium 
                              ? "bg-indigo-500/10 hover:bg-indigo-500/20 border-indigo-500/30" 
                              : "hover:bg-white/5 border-white/5"
                          )}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Inner Shine for Button */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                          
                          <div className="flex items-center justify-center min-h-[20px]">
                            <span className={cn(
                              "font-black text-[10px] tracking-[0.25em] uppercase leading-none transition-colors",
                              isPremium ? "text-indigo-100" : "text-white group-hover/btn:text-indigo-200"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent h-40" />
        
        <PremiumGlass
          variant="default"
          intensity="heavy"
          className="relative border-t border-white/10 py-4 px-4 pb-8 pointer-events-auto rounded-none backdrop-blur-3xl bg-black/40"
        >
           <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />
           
           <div className="max-w-lg mx-auto relative z-10">
              <div className="text-center space-y-4">
                <span className="text-[9px] font-bold text-zinc-500 tracking-[0.25em] leading-none block uppercase">
                  Secure Checkout
                </span>
                <div className="flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 min-h-[20px]">
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