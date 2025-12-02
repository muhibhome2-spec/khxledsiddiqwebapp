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
  theme: 'blue_glass' | 'amethyst_glass' | 'gold_glass';
}

const tiers: Tier[] = [
  {
    id: 'hear-it-first',
    name: 'Hear It First',
    price: '£3.99',
    theme: 'blue_glass',
    perks: [
      'Get access to songs before they drop',
      'Exclusive access to the community group',
    ],
  },
  {
    id: 'see-it-first',
    name: 'See It First',
    price: '£7.99',
    theme: 'amethyst_glass',
    perks: [
      'All "Hear it First" benefits',
      'Watch the vlog before anyone else',
      'Behind the scenes photo dump',
    ],
  },
  {
    id: 'feel-it-first',
    name: 'Feel It First',
    price: '£10.99',
    theme: 'gold_glass',
    perks: [
      'All previous benefits',
      '1 Private Q&A',
      'Heads up before tour dates',
    ],
  },
];

const themeConfig = {
  blue_glass: {
    accent: 'bg-blue-500',
    glow: 'rgba(59, 130, 246, 0.2)',
    border: 'border-blue-400/20',
    gradient: 'from-blue-500/10 to-blue-900/5',
    text: 'text-blue-300',
    hoverText: 'group-hover:text-blue-200',
  },
  amethyst_glass: {
    accent: 'bg-purple-500',
    glow: 'rgba(168, 85, 247, 0.2)',
    border: 'border-purple-400/20',
    gradient: 'from-purple-500/10 to-purple-900/5',
    text: 'text-purple-300',
    hoverText: 'group-hover:text-purple-200',
  },
  gold_glass: {
    accent: 'bg-amber-400',
    glow: 'rgba(251, 191, 36, 0.15)',
    border: 'border-amber-300/30',
    gradient: 'from-amber-400/10 to-amber-900/5',
    text: 'text-amber-200',
    hoverText: 'group-hover:text-amber-100',
  },
};

const EASE = [0.6, 0.01, 0.05, 0.9];

function Community() {
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  const toggleTier = (id: string) => {
    setExpandedTier(expandedTier === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-zinc-100 selection:bg-indigo-500/30 font-sans antialiased text-rendering-geometricPrecision">
      {/* --- Optimized Static Background Environment --- */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-neutral-950" />
        {/* Static mesh gradient background - no animation for 60fps */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_120%_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        {/* High-contrast noise vignette - optimized for performance */}
        <div className="absolute inset-0 opacity-[0.08]" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
               backgroundSize: '256px 256px'
             }} />
        {/* Dark vignette for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_40%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      <div className="px-6 py-12 pb-44 max-w-lg mx-auto">
        
        {/* --- Header Section --- */}
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-10 text-center md:text-left relative z-10"
        >
          <div className="inline-flex md:flex items-center gap-3 mb-6 opacity-70">
            <div className="h-px w-8 bg-white/50 hidden md:block" />
            <span className="text-[9px] md:text-[10px] tracking-widest font-bold text-zinc-400 uppercase leading-none antialiased">
              Khaled Siddiq
            </span>
            <div className="h-px w-8 bg-white/50 md:hidden" />
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.85] mb-4 text-white antialiased">
            JOIN THE<br />
            <span className="inline-block relative text-transparent bg-clip-text bg-gradient-to-b from-indigo-300 via-indigo-400 to-indigo-600">
              COMMUNITY
            </span>
          </h1>

          <p className="text-xs md:text-sm text-zinc-400 leading-[1.5] max-w-xs font-medium tracking-[0.01em] mx-auto md:mx-0 antialiased">
            Get closer to the music, the journey, and the soul behind it all.
          </p>
        </motion.header>

        {/* --- Tiers List --- */}
        <motion.div className="space-y-4 relative z-10">
          {tiers.map((tier, index) => {
            const isExpanded = expandedTier === tier.id;
            const theme = themeConfig[tier.theme];
            const isPremium = tier.theme === 'gold_glass';

            return (
              <PremiumGlass
                as={motion.div}
                layout
                key={tier.id}
                variant="card"
                intensity={isPremium ? "heavy" : "medium"}
                className="cursor-pointer group relative overflow-hidden isolation-isolate will-change-transform translate-z-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
                style={{
                  boxShadow: isExpanded ? `0 0 40px -12px ${theme.glow}` : undefined,
                }}
              >
                {/* Themed gradient overlay */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-b opacity-50 rounded-[inherit]",
                  theme.gradient
                )} />
                
                {/* Themed border enhancement */}
                <div className={cn(
                  "absolute inset-0 rounded-[inherit] border",
                  theme.border
                )} />

                <motion.button
                  onClick={() => toggleTier(tier.id)}
                  className="w-full text-left p-6 md:p-7 relative z-20 min-h-[44px] flex flex-col justify-center"
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <motion.div layout="position" className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <motion.div 
                          layout
                          className={cn(
                            "w-0.5 h-6 shadow-[0_0_12px_currentColor] rounded-full",
                            theme.accent
                          )} 
                        />
                        <h2 className={cn(
                          "text-xl md:text-2xl font-black tracking-tighter leading-none text-white transition-colors antialiased",
                          theme.hoverText
                        )}>
                          {tier.name}
                        </h2>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end justify-center">
                      <span className="text-lg md:text-xl font-bold tracking-tight leading-none text-white antialiased">{tier.price}</span>
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none mt-0.5 antialiased">/mo</span>
                    </div>
                  </motion.div>

                  <motion.div layout="position" className="flex items-center justify-between mt-4">
                    <span className={cn(
                        "text-[9px] font-bold tracking-widest uppercase leading-none transition-colors duration-300 antialiased",
                        isPremium ? theme.text : "text-zinc-500 group-hover:text-zinc-300"
                    )}>
                      {isExpanded ? 'Includes' : 'View Perks'}
                    </span>
                    <motion.div
                      className="flex items-center justify-center"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <ChevronDown className={cn(
                          "w-3.5 h-3.5 transition-colors flex-shrink-0",
                          isPremium ? theme.text : "text-zinc-600"
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
                      <div className="px-6 pb-6 md:px-7 border-t border-white/5 pt-6 relative z-20">
                        <div className="space-y-3">
                          {tier.perks.map((perk, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.05 }}
                              className="flex items-start gap-3 min-h-[20px]"
                            >
                              <div className={cn(
                                "mt-0.5 p-[2px] rounded-full border flex items-center justify-center flex-shrink-0",
                                isPremium ? `border-amber-400 bg-amber-500/10` : 'border-zinc-700'
                              )}>
                                <Check className="w-2 h-2 text-white flex-shrink-0" strokeWidth={3} />
                              </div>
                              <span className="text-xs md:text-sm text-zinc-300 font-medium tracking-[0.01em] leading-relaxed antialiased">
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
                            "w-full mt-8 py-4 cursor-pointer group relative overflow-hidden",
                            isPremium ? "bg-amber-600/20 hover:bg-amber-600/30 border-amber-500/30" : "hover:bg-white/5"
                          )}
                        >
                          {/* Themed button gradient */}
                          <div className={cn(
                            "absolute inset-0 bg-gradient-to-b opacity-30 rounded-[inherit]",
                            theme.gradient
                          )} />
                          
                          <div className="flex items-center justify-center min-h-[20px] relative z-10">
                            <span className={cn(
                              "font-black text-[10px] tracking-widest uppercase leading-none transition-colors antialiased",
                              isPremium ? theme.text : "text-white group-hover:text-indigo-200"
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
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent h-32" />
        
        <PremiumGlass
          variant="default"
          intensity="heavy"
          className="relative border-t border-white/5 py-4 px-4 pb-8 pointer-events-auto rounded-none isolation-isolate will-change-transform translate-z-0"
        >
           <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
           
           <div className="max-w-lg mx-auto relative z-10">
              <div className="text-center space-y-4">
                <span className="text-[9px] font-bold text-zinc-500 tracking-widest leading-none block uppercase antialiased">
                  Secure Checkout
                </span>
                <div className="flex items-center justify-center gap-5 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 min-h-[20px]">
                  <img src="/6570d668df4688e1970d40c4_Apple_Pay_logo 1.png" alt="Apple Pay" className="h-5 object-contain" />
                  <div className="w-px h-3 bg-zinc-800" />
                  <img src="/6564c3a7eb11a45c6a488674_image 6 copy copy.png" alt="PayPal" className="h-5 object-contain" />
                  <div className="w-px h-3 bg-zinc-800" />
                  <img src="/6570d0cdb567796fada15b49_Visa_Inc._logo 1 copy.svg" alt="Visa" className="h-3 object-contain" />
                </div>
              </div>
           </div>
        </PremiumGlass>
      </motion.div>
    </div>
  );
}

export default Community;