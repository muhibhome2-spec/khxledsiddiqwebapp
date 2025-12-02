import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  ChevronDown, 
  CreditCard, 
  Wallet, 
  Sparkles,
  Music,
  Video,
  Heart,
  ArrowLeft
} from 'lucide-react';
import PremiumGlass from './ui/premium-glass';

// --- Animation Constants ---
const TRANSITION = { duration: 0.8, ease: [0.6, 0.01, 0.05, 0.9] };
const EASE = [0.6, 0.01, 0.05, 0.95];

// --- Theme Configuration ---
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

interface CommunityPageProps {
  onBack: () => void;
}

export default function CommunityPage({ onBack }: CommunityPageProps) {
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  const toggleTier = (id: string) => {
    setExpandedTier(expandedTier === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans antialiased">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[#050505]" />
        
        {/* Brushed Metal Texture */}
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

      <div className="px-6 py-20 pb-44 max-w-md mx-auto relative z-10">
        
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
          style={{ fontVariantCaps: 'small-caps' }}
        >
          <ArrowLeft size={16} />
          <span className="text-sm">back</span>
        </motion.button>

        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center justify-center gap-4 mb-8 opacity-60">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <span className="text-[10px] tracking-[0.3em] font-medium text-zinc-400" style={{ fontVariantCaps: 'small-caps' }}>
              khaled siddiq
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.85] mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40" style={{ fontVariantCaps: 'small-caps' }}>
            join the<br />
            <span className="text-white/20 blur-[1px] absolute ml-1 mt-1 select-none -z-10">community</span>
            community
          </h1>

          <p className="text-sm text-zinc-500 leading-relaxed max-w-[280px] mx-auto font-medium" style={{ fontVariantCaps: 'small-caps' }}>
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
                  className={`group overflow-hidden transition-all duration-500 ${
                    isExpanded ? theme.glow : "hover:border-white/10"
                  }`}
                >
                  {/* Active Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-700 ${
                    theme.gradient
                  } ${isExpanded ? "opacity-100" : "group-hover:opacity-30"}`} />

                  {/* Premium Border Highlight for Gold Tier */}
                  {isPremium && (
                    <div className="absolute inset-0 border border-amber-500/10 rounded-[inherit]" />
                  )}

                  {/* Card Content */}
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
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-white/5 bg-white/5 backdrop-blur-md transition-colors duration-500 ${
                            isExpanded ? theme.icon : "text-zinc-500 group-hover:text-zinc-300"
                          }`}>
                             <Icon size={18} strokeWidth={1.5} />
                          </div>
                          
                          <div>
                            <h2 className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                              isExpanded ? "text-white" : "text-zinc-300"
                            }`} style={{ fontVariantCaps: 'small-caps' }}>
                              {tier.name}
                            </h2>
                            <div className={`h-0.5 w-0 bg-current transition-all duration-500 ease-out mt-1 opacity-50 ${
                              theme.text
                            } ${isExpanded ? "w-full" : "w-0"}`} />
                          </div>
                        </div>

                        <div className="text-right">
                          <span className={`text-lg font-medium tracking-tight block transition-colors duration-300 ${
                            isExpanded ? theme.text : "text-zinc-400"
                          }`} style={{ fontVariantCaps: 'small-caps' }}>
                            {tier.price}
                          </span>
                        </div>
                      </div>

                      {/* Expanded Details */}
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
                                    <div className={`mt-1 w-3.5 h-3.5 rounded-full flex items-center justify-center border flex-shrink-0 ${
                                      isPremium ? "border-amber-500/30 bg-amber-500/10" : "border-zinc-700 bg-zinc-800/50"
                                    }`}>
                                      <Check className="w-2 h-2 text-white" />
                                    </div>
                                    <span className="text-sm text-zinc-400 leading-relaxed font-normal" style={{ fontVariantCaps: 'small-caps' }}>
                                      {perk}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>

                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => e.stopPropagation()}
                                className={`w-full mt-6 py-4 rounded-xl font-medium text-xs tracking-[0.2em] relative overflow-hidden transition-all duration-300 ${
                                  isPremium ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 border border-amber-500/20" : "bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/5"
                                }`}
                                style={{ fontVariantCaps: 'small-caps' }}
                              >
                                {isPremium && <Sparkles className="absolute top-1 right-1 w-20 h-20 text-amber-500/5 -rotate-12 pointer-events-none" />}
                                <span>join {tier.name}</span>
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

      {/* Glass Footer / Checkout Bar */}
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
                <span className="text-[10px] tracking-[0.2em] text-zinc-600 font-medium" style={{ fontVariantCaps: 'small-caps' }}>
                  secure checkout
                </span>
                <div className="flex items-center gap-6 opacity-30 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
                  <div className="flex items-center gap-2">
                     <Wallet size={16} /> 
                     <span className="text-xs font-semibold tracking-tighter" style={{ fontVariantCaps: 'small-caps' }}>apple pay</span>
                  </div>
                  <div className="w-px h-3 bg-white/20" />
                  <div className="flex items-center gap-2">
                     <CreditCard size={16} />
                     <span className="text-xs font-semibold tracking-tighter" style={{ fontVariantCaps: 'small-caps' }}>visa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}