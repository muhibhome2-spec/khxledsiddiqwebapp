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
const TRANSITION = { duration: 0.6, ease: [0.22, 1, 0.36, 1] }; // Custom "Apple-like" ease
const EASE = [0.22, 1, 0.36, 1];

// --- Theme Configuration ---
// Refined for deeper, more "radioactive" glows and richer gradients
const themeConfig = {
  blue_glass: {
    accent: 'bg-indigo-500',
    // Using hex for the glow element to allow opacity manipulation
    glowColor: 'rgba(99, 102, 241, 0.6)', 
    border: 'border-indigo-400/30',
    gradient: 'from-indigo-500/10 via-indigo-500/5 to-transparent',
    text: 'text-indigo-200',
    icon: 'text-indigo-400',
    button: 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border-indigo-500/20'
  },
  amethyst_glass: {
    accent: 'bg-fuchsia-500',
    glowColor: 'rgba(217, 70, 239, 0.6)',
    border: 'border-fuchsia-400/30',
    gradient: 'from-fuchsia-500/10 via-fuchsia-500/5 to-transparent',
    text: 'text-fuchsia-200',
    icon: 'text-fuchsia-400',
    button: 'bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/20'
  },
  gold_glass: {
    accent: 'bg-amber-400',
    glowColor: 'rgba(251, 191, 36, 0.6)',
    border: 'border-amber-300/40',
    gradient: 'from-amber-400/10 via-amber-400/5 to-transparent',
    text: 'text-amber-200',
    icon: 'text-amber-400',
    button: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 border-amber-500/20'
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/5 blur-[120px] rounded-full opacity-20" />
        
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
          className="mb-10 group flex items-center gap-2 text-zinc-600 hover:text-zinc-200 transition-colors duration-300"
          style={{ fontVariantCaps: 'small-caps' }}
        >
          <div className="p-1.5 rounded-full border border-zinc-800 group-hover:border-zinc-600 transition-colors">
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
          <div className="inline-flex items-center justify-center gap-4 mb-6 opacity-60">
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
            <span className="text-[9px] tracking-[0.35em] font-medium text-zinc-500 uppercase">
              khaled siddiq
            </span>
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.85] mb-6 text-white mix-blend-screen">
            join the<br />
            <span className="text-white/30 blur-[1px] absolute ml-1 mt-1 select-none -z-10 lowercase">community</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-600 lowercase">
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
                {/* DYNAMIC GLOW LAYER 
                   This sits behind the glass card and provides the "premium" colored lighting 
                */}
                <div 
                  className="