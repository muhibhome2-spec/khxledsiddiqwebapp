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
const TRANSITION = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };
const EASE = [0.22, 1, 0.36, 1];

// --- Theme Configuration ---
// UPDATED: Muted opacity, desaturated slightly, and removed harsh borders
const themeConfig = {
  blue_glass: {
    // Very subtle background tint
    accent: 'bg-indigo-900/20', 
    // Much lower opacity glow (0.15 instead of 0.6)
    glowColor: 'rgba(99, 102, 241, 0.15)', 
    // Barely there colored border
    border: 'border-indigo-500/10',
    // Very faint gradient
    gradient: 'from-indigo-900/10 to-transparent',
    // Softer text colors
    text: 'text-indigo-300',
    icon: 'text-indigo-400',
    // Darker, subtle button
    button: 'bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-300 border-indigo-500/10'
  },
  amethyst_glass: {
    accent: 'bg-fuchsia-900/20',
    glowColor: 'rgba(217, 70, 239, 0.15)',
    border: 'border-fuchsia-500/10',
    gradient: 'from-fuchsia-900/10 to-transparent',
    text: 'text-fuchsia-300',
    icon: 'text-fuchsia-400',
    button: 'bg-fuchsia-500/5 hover:bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/10'
  },
  gold_glass: {
    accent: 'bg-amber-900/20',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    border: 'border-amber-500/10',
    gradient: 'from-amber-900/10 to-transparent',
    text: 'text-amber-300',
    icon: 'text-amber-400',
    button: 'bg-amber-500/5 hover:bg-amber-500/10 text-amber-300 border-amber-500/10'
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
    <div className="min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-white/20">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[#020202]" />
        
        {/* Brushed Metal Texture */}
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8 0.01' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
               backgroundSize: '200px 200px'
             }} 
        />
        
        {/* Deep atmospheric glow at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/5 blur-[120px] rounded-full opacity-10" />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,1)_120%)]" />
      </div>

      <div className="w-full max-w-md mx-auto px-5 sm:px-6 py-16 pb-44 relative z-10">
        
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          onClick={onBack}
          className="mb-10 group flex items-center gap-2 text-zinc-600 hover:text-zinc-300 transition-colors duration-300"
          style={{ fontVariantCaps: 'small-caps' }}
        >
          <div className="p-1.5 rounded-full border border-white/5 bg-white/5 group-hover:bg-white/10 transition-colors">
            <ArrowLeft size={12} />
          </div>
          <span className="text-xs tracking-widest font-medium">back</span>
        </motion.button>

        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center justify-center gap-4 mb-6 opacity-40">
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
            <span className="text-[9px] tracking-[0.35em] font-medium text-zinc-500 uppercase">
              khaled siddiq
            </span>
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.85] mb-6 text-zinc-200">
            join the<br />
            <span className="text-white/10 blur-[2px] absolute ml-1 mt-1 select-none -z-10 lowercase">community</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-300 to-zinc-600 lowercase">
              community
            </span>
          </h1>

          <p className="text-xs md:text-sm text-zinc-500 leading-relaxed max-w-[280px] mx-auto font-normal lowercase tracking-wide">
            get closer to the music, the journey, and the soul behind it all.
          </p>
        </motion.header>

        {/* Tiers List */}
        <motion.div className="space-y-4">
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
                transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
                className="relative group"
              >
                {/* DYNAMIC GLOW LAYER - MUTED 
                   Opacity reduced to 0.15 for subtle ambience
                */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl blur-2xl transition-opacity duration-1000 opacity-0 group-hover:opacity-100" 
                  style={{ 
                    backgroundColor: theme.glowColor,
                    opacity: isExpanded ? 0.3 : undefined 
                  }}
                />

                <PremiumGlass
                  intensity="medium"
                  // BORDER REMOVAL: Using transparent/extremely low opacity border
                  className={`relative overflow-hidden transition-all duration-500 border rounded-2xl ${
                    isExpanded ? theme.border : "border-white/[0.03] hover:border-white/[0.08]"
                  }`}
                >
                  {/* Active Gradient Background Inside Card - Very Subtle */}
                  <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-700 ${
                    theme.gradient
                  } ${isExpanded ? "opacity-100" : "opacity-0"}`} />

                  {/* Card Content */}
                  <motion.div 
                    className="relative z-10"
                    layout="position"
                    transition={TRANSITION}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleTier(tier.id)}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleTier(tier.id)}
                      className="w-full text-left p-6 sm:p-7 flex flex-col cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-white/20 rounded-xl"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-5">
                          {/* Tier Icon - Muted Backgrounds */}
                          <div className={`w-11 h-11 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-500 ${
                            isExpanded 
                              ? `${theme.icon} border-white/5 bg-white/5` 
                              : "text-zinc-600 border-white/[0.02] bg-white/[0.02] group-hover:text-zinc-500 group-hover:bg-white/[0.04]"
                          }`}>
                             <Icon size={18} strokeWidth={1.5} />
                          </div>
                           
                          <div>
                            <h2 className={`text-xl font-bold tracking-tight transition-colors duration-300 lowercase ${
                              isExpanded ? "text-zinc-200" : "text-zinc-500 group-hover:text-zinc-400"
                            }`}>
                              {tier.name}
                            </h2>
                            {/* Line separator - Muted */}
                            <div className={`h-px w-0 bg-current transition-all duration-700 ease-[0.22,1,0.36,1] mt-1 opacity-30 ${
                              theme.text
                            } ${isExpanded ? "w-12" : "w-0"}`} />
                          </div>
                        </div>

                        <div className="text-right">
                          <span className={`text-lg font-medium tracking-tight block transition-colors duration-300 lowercase ${
                            isExpanded ? theme.text : "text-zinc-600"
                          }`}>
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
                            transition={TRANSITION}
                          >
                            <div className="pt-6 mt-6 border-t border-white/[0.04] space-y-5">
                              <div className="space-y-3 pl-1">
                                {tier.perks.map((perk, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + (i * 0.05), duration: 0.4 }}
                                    className="flex items-start gap-3.5"
                                  >
                                    <div className={`mt-[7px] w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-500 ${
                                       isPremium ? "bg-amber-500/50" : "bg-zinc-700"
                                    }`} />
                                    <span className="text-sm text-zinc-400 leading-relaxed font-normal lowercase">
                                      {perk}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>

                              <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => e.stopPropagation()}
                                // Muted button styling
                                className={`w-full mt-4 py-4 rounded-xl font-medium text-xs tracking-[0.2em] relative overflow-hidden transition-all duration-300 border backdrop-blur-sm ${theme.button}`}
                                style={{ fontVariantCaps: 'small-caps' }}
                              >
                                {isPremium && <Sparkles className="absolute top-1 right-1 w-20 h-20 text-amber-500/5 -rotate-12 pointer-events-none" />}
                                <span className="lowercase">join {tier.name}</span>
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    {/* Expand Indicator */}
                    <motion.div 
                       animate={{ rotate: isExpanded ? 180 : 0 }}
                       className="absolute top-9 right-6 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity"
                    >
                       {!isExpanded && <ChevronDown size={14} className="text-zinc-600" />}
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
        transition={{ delay: 1, duration: 1, ease: EASE }}
        className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent h-40" />
        
        <div className="relative pointer-events-auto">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
          <div className="bg-[#020202]/80 backdrop-blur-2xl border-t border-white/[0.02] py-6 pb-8">
            <div className="max-w-md mx-auto px-6">
              <div className="flex flex-col items-center gap-3">
                <span className="text-[9px] tracking-[0.25em] text-zinc-700 font-semibold uppercase">
                  secure checkout
                </span>
                <div className="flex items-center gap-6 opacity-30 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
                  <div className="flex items-center gap-2">
                     <Wallet size={14} /> 
                     <span className="text-[10px] font-bold tracking-wider uppercase">apple pay</span>
                  </div>
                  <div className="w-px h-3 bg-white/10" />
                  <div className="flex items-center gap-2">
                     <CreditCard size={14} />
                     <span className="text-[10px] font-bold tracking-wider uppercase">visa</span>
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