import { motion } from 'framer-motion';
import PremiumGlass from './ui/premium-glass';

const VIDEO_BASE = 'https://res.cloudinary.com/ds4zaokcg/video/upload';
const VIDEO_ID = 'v1764672902/SnapInsta.to_AQMpeN6rzwY7zA0fIoUQAgnvRjZXjvL5cZqY1JLnRIImVapjZ285AfTMXKMj0tP7RLBfahK94oiMHGGVcrNxAkApQDykaGoEbTk28mg_ukflxv';

const ASSETS = {
  poster: `${VIDEO_BASE}/q_auto,f_auto,w_720,so_0/${VIDEO_ID}.jpg`,
  video: `${VIDEO_BASE}/q_auto,f_auto,w_720/${VIDEO_ID}.mp4`,
};

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
    className="flex flex-wrap justify-center gap-[clamp(1.75rem,4vw,3rem)] text-[10px] font-semibold tracking-[0.25em] text-neutral-300"
    style={{ fontVariantCaps: 'small-caps' }}
  >
    {SOCIAL_LINKS.map((link) => (
      <a
        key={link.name}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-amber-300 active:text-amber-300 transition-colors duration-500 relative group py-2"
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
      {/* --- Background Video: full-frame, centered, undimmed --- */}
      <div className="fixed inset-0 -z-20">
        <video
          className="absolute inset-0 w-full h-full object-cover object-center"
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

        {/* Subtle bottom vignette only — keeps button legible without dimming the subject. */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* --- Layout: CTA + socials anchored to the lower third --- */}
      <main className="relative z-30 flex-1 flex flex-col justify-end p-[clamp(1.5rem,5vw,5rem)] pb-[clamp(2.5rem,6vw,5rem)] max-w-screen-2xl mx-auto w-full">
        <section className="flex flex-col items-center w-full">
          <div className="w-full max-w-4xl text-center space-y-[clamp(1.75rem,4vw,3rem)]">
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
                  className="py-5 px-10 font-bold text-[11px] tracking-[0.3em] text-neutral-100 group-hover:text-amber-300 group-active:text-amber-300 transition-colors duration-500 flex items-center justify-center relative overflow-hidden"
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
          className="text-center text-[9px] tracking-[0.3em] text-neutral-400 font-bold mt-[clamp(2rem,5vw,3.5rem)]"
          style={{ fontVariantCaps: 'small-caps' }}
        >
          © 2025 khaled siddiq
        </motion.footer>
      </main>
    </motion.div>
  );
}
