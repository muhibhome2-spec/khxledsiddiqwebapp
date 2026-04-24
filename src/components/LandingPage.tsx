import { motion } from 'framer-motion';
import PremiumGlass from './ui/premium-glass';

const VIDEO_BASE = 'https://res.cloudinary.com/ds4zaokcg/video/upload';
const VIDEO_ID = 'v1764672902/SnapInsta.to_AQMpeN6rzwY7zA0fIoUQAgnvRjZXjvL5cZqY1JLnRIImVapjZ285AfTMXKMj0tP7RLBfahK94oiMHGGVcrNxAkApQDykaGoEbTk28mg_ukflxv';

const ASSETS = {
  poster: `${VIDEO_BASE}/q_auto,f_auto,w_720,so_0/${VIDEO_ID}.jpg`,
  // Server-side blurred, tiny — used purely as the ambient backdrop on desktop.
  posterBlur: `${VIDEO_BASE}/q_auto,f_auto,w_400,so_0,e_blur:2000/${VIDEO_ID}.jpg`,
  video: `${VIDEO_BASE}/q_auto,f_auto,w_720/${VIDEO_ID}.mp4`,
};

// Subtle film grain — masks compression artifacts without darkening the frame.
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const TRANSITION = { duration: 1.2, ease: [0.25, 1, 0.5, 1] as const };

const variants = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: TRANSITION },
  },
};

const SOCIAL_LINKS = [
  { name: 'spotify', url: 'https://open.spotify.com/artist/2XYgHUbsmab6VT4a3FF9mX' },
  { name: 'apple', url: 'https://music.apple.com/my/artist/kh%C4%81led-sidd%C4%ABq/1170959386' },
  { name: 'instagram', url: 'https://www.instagram.com/khxledsiddiq/?hl=en' },
];

const SocialLinks = () => (
  <motion.nav
    variants={variants.fadeInUp}
    className="flex flex-wrap justify-center gap-x-[clamp(1.5rem,4vw,3rem)] gap-y-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-neutral-300"
    style={{ fontVariantCaps: 'small-caps' }}
  >
    {SOCIAL_LINKS.map((link) => (
      <a
        key={link.name}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-amber-300 active:text-amber-300 transition-colors duration-500 relative group py-2 px-1"
      >
        {link.name}
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-amber-300/70 transition-all duration-500 group-hover:w-full group-active:w-full" />
      </a>
    ))}
  </motion.nav>
);

interface LandingPageProps {
  onEnterCommunity: () => void;
}

export default function LandingPage({ onEnterCommunity }: LandingPageProps) {
  return (
    <motion.div
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
      variants={variants.container}
      initial="hidden"
      animate="show"
    >
      {/* --- Background stack --- */}
      <div className="fixed inset-0 -z-20 bg-black">
        {/* Ambient backdrop: blurred poster behind the letterboxed video (desktop only).
            Mobile is portrait-on-portrait so this layer is hidden there. */}
        <div
          className="hidden md:block absolute inset-0 scale-110"
          style={{
            backgroundImage: `url(${ASSETS.posterBlur})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(1.1) brightness(0.55)',
          }}
          aria-hidden="true"
        />

        {/* The video itself:
              - mobile (portrait viewport): object-cover for a clean full-bleed fit
              - desktop (landscape viewport): object-contain so the native 9:16 plays
                at its real aspect ratio — no grainy upscaling, no dead zoom. */}
        <video
          className="absolute inset-0 w-full h-full object-cover md:object-contain"
          poster={ASSETS.poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={ASSETS.video} type="video/mp4" />
        </video>

        {/* Film grain — masks compression artifacts, adds texture. */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-overlay"
          style={{ backgroundImage: GRAIN, backgroundSize: '180px 180px' }}
          aria-hidden="true"
        />

        {/* Bottom vignette: lifts CTA legibility without darkening the subject. */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      </div>

      {/* --- Layout: CTA + socials anchored to the lower third --- */}
      <main className="relative z-30 flex-1 flex flex-col justify-end px-[clamp(1.25rem,5vw,5rem)] pt-[clamp(1.5rem,5vw,3rem)] pb-[clamp(2rem,5vw,4rem)] max-w-screen-2xl mx-auto w-full">
        <section className="flex flex-col items-center w-full">
          <div className="w-full max-w-4xl text-center space-y-[clamp(1.5rem,4vw,2.5rem)]">
            <motion.div variants={variants.fadeInUp} className="flex justify-center relative">
              <PremiumGlass
                variant="card"
                intensity="heavy"
                glow
                className="group cursor-pointer border border-white/15 hover:border-amber-300/60 active:border-amber-300/70 transition-colors duration-500"
                onClick={onEnterCommunity}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="py-[clamp(1rem,3vw,1.35rem)] px-[clamp(2rem,6vw,3rem)] font-bold text-[11px] sm:text-[12px] tracking-[0.3em] text-neutral-100 group-hover:text-amber-300 group-active:text-amber-300 transition-colors duration-500 flex items-center justify-center relative overflow-hidden"
                  style={{ fontVariantCaps: 'small-caps' }}
                >
                  <span className="relative z-10 drop-shadow-[0_0_12px_rgba(251,191,36,0)] group-hover:drop-shadow-[0_0_12px_rgba(251,191,36,0.5)] group-active:drop-shadow-[0_0_12px_rgba(251,191,36,0.6)] transition-all duration-500">
                    enter community
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full group-active:translate-x-full transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-amber-300/25 to-transparent skew-x-12" />
                </div>
              </PremiumGlass>
            </motion.div>

            <SocialLinks />
          </div>
        </section>

        <motion.footer
          variants={variants.fadeInUp}
          className="text-center text-[9px] tracking-[0.3em] text-neutral-400 font-bold mt-[clamp(1.5rem,4vw,2.5rem)]"
          style={{ fontVariantCaps: 'small-caps' }}
        >
          © 2025 khaled siddiq
        </motion.footer>
      </main>
    </motion.div>
  );
}
