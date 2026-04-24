import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Music, Video, Wallet } from 'lucide-react';
import PremiumGlass from './ui/premium-glass';

const EASE = [0.22, 1, 0.36, 1] as const;

const PERKS = [
  {
    icon: Music,
    title: 'unreleased music',
    body: 'full access to tracks before they ever drop publicly.',
  },
  {
    icon: Video,
    title: 'members-only vlogs',
    body: 'raw, unfiltered video from the studio, the road, and everything between.',
  },
];

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <motion.button
    initial={{ opacity: 0, x: -8 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, ease: EASE }}
    onClick={onClick}
    className="mb-10 group flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors duration-300"
    style={{ fontVariantCaps: 'small-caps' }}
  >
    <span className="p-1.5 rounded-full border border-white/5 bg-white/5 group-hover:bg-white/10 transition-colors">
      <ArrowLeft size={12} />
    </span>
    <span className="text-xs tracking-widest font-medium">back</span>
  </motion.button>
);

const PageHeader = () => (
  <motion.header
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: EASE }}
    className="mb-12 text-center"
  >
    <div className="inline-flex items-center justify-center gap-4 mb-6 opacity-50">
      <div className="h-px w-8 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
      <span className="text-[9px] tracking-[0.35em] font-medium text-zinc-500 uppercase">
        khaled siddiq
      </span>
      <div className="h-px w-8 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
    </div>

    <h1 className="text-[clamp(2rem,7vw,4rem)] font-black tracking-tighter leading-[0.9] mb-4 text-zinc-200 lowercase">
      <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-300 to-zinc-600">
        join the community
      </span>
    </h1>

    <p className="text-[12px] sm:text-sm text-zinc-400 leading-relaxed max-w-[320px] mx-auto font-normal lowercase tracking-wide">
      one subscription. everything straight from khaled — first.
    </p>
  </motion.header>
);

const CheckoutBar = () => (
  <motion.div
    initial={{ y: 80, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
    className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent h-32" />
    <div className="relative pointer-events-auto">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="bg-[#020202]/80 backdrop-blur-xl border-t border-white/[0.03] py-6">
        <div className="max-w-md mx-auto px-6 flex flex-col items-center gap-3">
          <span className="text-[9px] tracking-[0.25em] text-zinc-600 font-semibold uppercase">
            secure checkout
          </span>
          <div className="flex items-center gap-6 opacity-40">
            <span className="flex items-center gap-2">
              <Wallet size={13} />
              <span className="text-[10px] font-bold tracking-wider uppercase">apple pay</span>
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="flex items-center gap-2">
              <CreditCard size={13} />
              <span className="text-[10px] font-bold tracking-wider uppercase">visa</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

interface CommunityPageProps {
  onBack: () => void;
}

export default function CommunityPage({ onBack }: CommunityPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-white/20">
      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[#020202]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[320px] bg-indigo-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,1)_110%)]" />
      </div>

      <div className="w-full max-w-md mx-auto px-[clamp(1rem,4vw,1.5rem)] py-[clamp(2rem,7vw,5rem)] pb-40 relative z-10">
        <BackButton onClick={onBack} />
        <PageHeader />

        {/* The single offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-1 rounded-3xl blur-2xl bg-indigo-500/10" />

          <PremiumGlass
            intensity="medium"
            glow
            className="relative rounded-3xl border border-white/[0.06] p-[clamp(1.5rem,5vw,2.25rem)]"
          >
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <div className="text-[10px] tracking-[0.3em] text-zinc-500 font-semibold uppercase mb-2">
                  membership
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 lowercase"
                  style={{ fontVariantCaps: 'small-caps' }}
                >
                  the community
                </h2>
              </div>
              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-white lowercase">
                  $4.99
                </div>
                <div className="text-[10px] tracking-[0.25em] text-zinc-500 font-semibold uppercase mt-1">
                  / month
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-7" />

            <ul className="space-y-5 mb-8">
              {PERKS.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex items-start gap-4">
                  <span className="w-9 h-9 rounded-full flex items-center justify-center border border-white/[0.06] bg-white/[0.03] text-zinc-300 shrink-0">
                    <Icon size={15} strokeWidth={1.5} />
                  </span>
                  <div>
                    <div
                      className="text-sm font-semibold text-zinc-100 lowercase"
                      style={{ fontVariantCaps: 'small-caps' }}
                    >
                      {title}
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed font-normal lowercase mt-0.5">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <motion.a
              href="https://buy.stripe.com/3cIcN56AIcnjakoaAPcjS01"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="block w-full py-4 rounded-xl font-semibold text-[11px] tracking-[0.3em] text-black bg-white hover:bg-zinc-100 transition-colors duration-300 relative overflow-hidden text-center"
              style={{ fontVariantCaps: 'small-caps' }}
            >
              <span className="lowercase">join for $4.99 / month</span>
            </motion.a>

            <p className="text-[10px] text-zinc-600 text-center mt-4 lowercase tracking-wide">
              cancel anytime.
            </p>
          </PremiumGlass>
        </motion.div>
      </div>

      <CheckoutBar />
    </div>
  );
}
