import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  ChevronDown, 
  CreditCard, 
  Wallet, 
  Sparkles,
  Music,
  Video,
  Heart
} from 'lucide-react';

// --- Utility: Class Name Merger ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// --- CONSTANTS & CONFIG ---
const TRANSITION = { duration: 0.8, ease: [0.6, 0.01, 0.05, 0.9] };
const EASE = [0.6, 0.01, 0.05, 0.95];

const themeConfig = {
  blue_glass: {
    accent: 'bg-indigo-500',
    glow: 'shadow-[0_0_50px_-12px_rgba(99,102,241,0.3)]',
    border: 'border-indigo-400/20',
    gradient: 'from-indigo-500/10 to-indigo-900/5',
    text: 'text-indigo-200',
    icon: 'text-indigo-400',
  },
  amethyst_glass: {
    accent: 'bg-fuchsia-500',
    glow: 'shadow-[0_0_50px_-12px_rgba(217,70,239,0.3)]',
    border: 'border-fuchsia-400/20',
    gradient: 'from-fuchsia-500/10 to-fuchsia-900/5',
    text: 'text-fuchsia-200',
    icon: 'text-fuchsia-400',
  },
  gold_glass: {
    accent: 'bg-amber-400',
    glow: 'shadow-[0_0_60px_-12px_rgba(251,191,36,0.4)]',
    border: 'border-amber-300/30',
    gradient: 'from-amber-400/10 to-amber-900/5',
    text: 'text-amber-200',
    icon: 'text-amber-400',
  },
};

interface Tier {
  id: string;
  name: string;
  price: string;
  perks: string[];
  theme: 'blue_glass' | 'amethyst_glass' | 'gold_glass';
  icon: React.ElementType;
}

const tiers: Tier[] = [
  {
    id: 'hear-it-first',
    name: 'hear it first',
    price: '£3.99',
    theme: 'blue_glass',
    icon: Music,
    perks: [
      'get access to songs before they drop',
      'exclusive access to the community group',
    ],
  },
  {
    id: 'see-it-first',
    name: 'see it first',
    price: '£7.99',
    theme: 'amethyst_glass',
    icon: Video,
    perks: [
      'all "hear it first" benefits',
      'watch the vlog before anyone else',
      'behind the scenes photo dump',
    ],
  },
  {
    id: 'feel-it-first',
    name: 'feel it first',
    price: '£10.99',
    theme: 'gold_glass',
    icon: Heart,
    perks: [
      'all previous benefits',
      '1 private q&a session',
      'heads up before tour dates',
    ],
  },
];

// --- SHARED COMPONENTS ---

// 1. Premium Brushed Metal Background
const MetalBackground = () => (
  <div className="fixed inset-0 -z-10 pointer-events-none">
    <div className="absolute inset-0 bg-[#050505]" />
    
    {/* Brushed Metal Texture (Directional Noise) */}
    <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8 0.01' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }} 
    />
    
    {/* Radial sheen for metallic reflection */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)]" />
    
    {/* Vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
  </div>
);

// 2. Premium Glass Card
const PremiumGlass = ({ 
  children, 
  className, 
  intensity = 'medium',
  active = false,
  glow = false,
  ...props 
}: any) => {
  return (
    <div 
      className={cn(
        "relative rounded-2xl backdrop-blur-xl border border-white/5 transition-all duration-500",
        intensity === 'heavy' ? 'bg-neutral-900/80' : 'bg-neutral-900/40',
        active ? 'border-white/20' : 'hover:border-white/10',
        glow ? 'shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]' : '',
        className
      )}
      {...props}
    >
      {/* Specular Highlight (Top Edge) */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
      
      {/* Inner Glow/Reflection */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 pointer-events-none" />
      
      {children}
    </div>
  );
};

// --- SUB-VIEWS ---

// View 1: The Community Page (Lowercase Aesthetic)
const CommunityView = () => {
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  const toggleTier = (id: string) => {
    setExpandedTier(expandedTier === id ? null : id);
  };

  return (
    <div className="lowercase font-sans antialiased text-zinc-100">
      <div className="px-6 py-20 pb-44 max-w-md mx-auto relative z-10">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center justify-center gap-4 mb-8 opacity-60">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <span className="text-[10px] tracking-[0.3em] font-medium text-zinc-400">
              khaled siddiq
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.85] mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40">
            join the<br />
            <span className="text-white/20 blur-[1px] absolute ml-1 mt-1 select-none -z-10">community</span>
            community
          </h1>

          <p className="text-sm text-zinc-500 leading-relaxed max-w-[280px] mx-auto font-medium">
            get closer to the music, the journey, and the soul behind it all.
          </p>
        </motion.header>

        {/* Tiers List */}
        <motion.div className="space-y-5">
          {tiers.map((tier, index) => {
            const isExpanded = expandedTier === tier.id;
            const theme = themeConfig[tier.theme];
            const isPremium = tier.theme === 'gold_glass';
            const Icon = tier.icon;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
              >
                <PremiumGlass
                  intensity={isPremium ? "heavy" : "medium"}
                  active={isExpanded}
                  className={cn(
                    "group overflow-hidden transition-all duration-500",
                    isExpanded ? theme.glow : "hover:border-white/10"
                  )}
                >
                  {/* Active Gradient Background */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-700",
                    theme.gradient,
                    isExpanded ? "opacity-100" : "group-hover:opacity-30"
                  )} />

                  {/* Premium Border Highlight for Gold Tier */}
                  {isPremium && (
                    <div className="absolute inset-0 border border-amber-500/10 rounded-[inherit]" />
                  )}

                  {/* --- Card Content --- */}
                  <motion.div 
                    className="relative z-10"
                    layout="position"
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleTier(tier.id)}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleTier(tier.id)}
                      className="w-full text-left p-6 md:p-7 flex flex-col cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-xl"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          {/* Tier Icon */}
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center border border-white/5 bg-white/5 backdrop-blur-md transition-colors duration-500",
                            isExpanded ? theme.icon : "text-zinc-500 group-hover:text-zinc-300"
                          )}>
                             <Icon size={18} strokeWidth={1.5} />
                          </div>
                          
                          <div>
                            <h2 className={cn(
                              "text-xl font-bold tracking-tight transition-colors duration-300",
                              isExpanded ? "text-white" : "text-zinc-300"
                            )}>
                              {tier.name}
                            </h2>
                            <div className={cn(
                              "h-0.5 w-0 bg-current transition-all duration-500 ease-out mt-1 opacity-50",
                              theme.text,
                              isExpanded ? "w-full" : "w-0"
                            )} />
                          </div>
                        </div>

                        <div className="text-right">
                          <span className={cn(
                            "text-lg font-medium tracking-tight block transition-colors duration-300",
                            isExpanded ? theme.text : "text-zinc-400"
                          )}>
                            {tier.price}
                          </span>
                        </div>
                      </div>

                      {/* --- Expanded Details --- */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                          >
                            <div className="pt-6 mt-6 border-t border-white/5 space-y-4">
                              <div className="space-y-3">
                                {tier.perks.map((perk, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + (i * 0.05) }}
                                    className="flex items-start gap-3"
                                  >
                                    <div className={cn(
                                      "mt-1 w-3.5 h-3.5 rounded-full flex items-center justify-center border flex-shrink-0",
                                      isPremium ? "border-amber-500/30 bg-amber-500/10" : "border-zinc-700 bg-zinc-800/50"
                                    )}>
                                      <Check className="w-2 h-2 text-white" />
                                    </div>
                                    <span className="text-sm text-zinc-400 leading-relaxed font-normal">
                                      {perk}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>

                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => e.stopPropagation()}
                                className={cn(
                                  "w-full mt-6 py-4 rounded-xl font-medium text-xs tracking-[0.2em] relative overflow-hidden transition-all duration-300",
                                  isPremium ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 border border-amber-500/20" : "bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/5"
                                )}
                              >
                                {isPremium && <Sparkles className="absolute top-1 right-1 w-20 h-20 text-amber-500/5 -rotate-12 pointer-events-none" />}
                                <span>join now</span>
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    {/* Expand Indicator */}
                    <motion.div 
                       animate={{ rotate: isExpanded ? 180 : 0 }}
                       className="absolute bottom-6 right-6 md:bottom-7 md:right-7 pointer-events-none opacity-30"
                    >
                       {!isExpanded && <ChevronDown size={14} />}
                    </motion.div>
                  </motion.div>
                </PremiumGlass>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* --- Glass Footer / Checkout Bar --- */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
        className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent h-40" />
        
        <div className="relative pointer-events-auto">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="bg-[#050505]/60 backdrop-blur-xl border-t border-white/5 py-6">
            <div className="max-w-md mx-auto px-6">
              <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] tracking-[0.2em] text-zinc-600 font-medium">
                  secure checkout
                </span>
                <div className="flex items-center gap-6 opacity-30 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
                  <div className="flex items-center gap-2">
                     <Wallet size={16} /> 
                     <span className="text-xs font-semibold tracking-tighter">Apple Pay</span>
                  </div>
                  <div className="w-px h-3 bg-white/20" />
                  <div className="flex items-center gap-2">
                     <CreditCard size={16} />
                     <span className="text-xs font-semibold tracking-tighter">Visa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

// --- ANIMATION VARIANTS (Landing Page) ---
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
  hidden: { y: "110%" },
  show: { 
    y: "0%", 
    transition: TRANSITION 
  },
  exit: {
    y: "-110%",
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [showCommunity, setShowCommunity] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans antialiased selection:bg-white/20 selection:text-white overflow-hidden">
      
      {/* Global Background (Metal + Ambient) */}
      <MetalBackground />

      <AnimatePresence mode="wait">
        {showCommunity ? (
          <motion.div
            key="community"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={TRANSITION}
            className="h-full overflow-y-auto"
          >
            <CommunityView />
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
            {/* Background Image - Sharpened via CSS Filters */}
            <motion.div 
              className="fixed inset-0 z-0"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black z-10 pointer-events-none" />
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 h-full w-full"
                style={{
                  backgroundImage: `url('/Khaled-Siddiq.jpeg')`,
                  filter: 'grayscale(100%) contrast(1.25) brightness(0.9)',
                }}
              />
            </motion.div>

            {/* Content Container */}
            <div className="relative z-20 flex-1 flex flex-col justify-between px-6 py-8 md:px-12 md:py-12 lg:px-20 lg:py-16 max-w-screen-2xl mx-auto w-full h-full">
              
              {/* Header */}
              <motion.header variants={fadeInUp} className="flex justify-between items-center w-full opacity-80">
                 {/* Empty header for spacing balance */}
              </motion.header>

              {/* Main Hero */}
              <div className="flex-1 flex flex-col items-center justify-center w-full py-8 md:py-0">
                <div className="w-full max-w-4xl text-center space-y-10 md:space-y-12">
                  
                  <div className="space-y-6 md:space-y-8">
                    {/* Refined Typography: Smaller Size, Wider Tracking */}
                    <h1 className="font-black tracking-tighter leading-[0.85] overflow-hidden
                                     text-5xl          
                                     sm:text-6xl       
                                     md:text-7xl       
                                     lg:text-8xl antialiased">
                      <div className="overflow-hidden">
                        <motion.div variants={revealText} className="tracking-tight text-white">KHALED</motion.div>
                      </div>
                      <div className="overflow-hidden">
                        <motion.div variants={revealText} className="tracking-tight text-zinc-500">SIDDIQ</motion.div>
                      </div>
                    </h1>
                    
                    <motion.div variants={fadeInUp} className="h-px w-12 bg-white/50 mx-auto" />
                  </div>

                  {/* Sharper Button */}
                  <motion.div variants={fadeInUp} className="w-full flex justify-center">
                    <PremiumGlass
                      intensity="medium"
                      glow={true}
                      className="group cursor-pointer hover:border-white/20"
                      onClick={() => setShowCommunity(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="py-4 px-10 font-bold text-sm tracking-widest uppercase text-white group-hover:text-indigo-200 transition-colors duration-300 flex items-center justify-center min-h-[20px] leading-none antialiased">
                        <span className="leading-none">Enter Community</span>
                      </div>
                    </PremiumGlass>
                  </motion.div>

                  {/* Social Links - Smaller & Sharper */}
                  <motion.div 
                    variants={fadeInUp} 
                    className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] md:text-xs font-bold tracking-widest text-zinc-500 leading-none antialiased uppercase"
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
                        whileHover={{ y: -2, color: "#ffffff" }}
                        className="hover:text-indigo-300 transition-colors inline-block border-b border-transparent hover:border-indigo-400/50 pb-0.5 leading-none"
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
                className="text-center text-[9px] tracking-widest text-zinc-700 font-bold uppercase pb-safe leading-none antialiased"
              >
                © 2025 Khaled Siddiq
              </motion.footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}