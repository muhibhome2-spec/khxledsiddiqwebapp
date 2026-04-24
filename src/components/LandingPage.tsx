import { motion } from 'framer-motion';
import PremiumGlass from './ui/premium-glass';

const VIDEO_BASE = 'https://res.cloudinary.com/ds4zaokcg/video/upload';
const VIDEO_ID = 'v1764672902/SnapInsta.to_AQMpeN6rzwY7zA0fIoUQAgnvRjZXjvL5cZqY1JLnRIImVapjZ285AfTMXKMj0tP7RLBfahK94oiMHGGVcrNxAkApQDykaGoEbTk28mg_ukflxv';

const ASSETS = {
  poster: `${VIDEO_BASE}/q_auto,f_auto,w_720,so_0/${VIDEO_ID}.jpg`,
  video: `${VIDEO_BASE}/q_auto,f_auto,w_720/${VIDEO_ID}.mp4`,
};

// Subtle film grain — masks compression, adds texture.
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const TRANSITION = { duration: 1.2, ease: [0.25, 1, 0.5, 1] as const };

const variants = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
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
    className="flex flex-wrap justify-center md:justify-start gap-x-[clamp(1.5rem,4vw,2.5rem)] gap-y-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-neutral-300"
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
      className="relative min-h-[100dvh] overflow-hidden bg-black"
      variants={variants.container}
      initial="hidden"
      animate="show"
      style={{
        // Width of the desktop video panel — exactly a 9:16 slice of viewport
        // height, capped so it never dominates on ultrawide monitors.
        ['--panel-w' as string]: 'min(56.25vh, 42vw)',
      }}
    >
      {/* Video — full-bleed on mobile, right panel on desktop. Single <video>, one decode.
          No mask on the video itself — any in-frame text/graphics stay intact. */}
      <video
        className="absolute top-0 left-0 h-full w-full md:left-auto md:right-0 md:w-[var(--panel-w)] object-cover z-0"
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

      {/* Desktop-only: mostly-black panel with a tiny portrait fragment.
          The <img> is a small, fixed-size element — NOT a full-panel background.
          object-position crops to just the face / upper torso of the source photo.
          A radial mask feathers its edges so it dissolves into the surrounding black. */}
      <div
        className="hidden md:block absolute top-0 left-0 h-full z-0 pointer-events-none bg-black overflow-hidden"
        style={{ right: 'var(--panel-w)' }}
        aria-hidden="true"
      >
        <img
          src="https://sufifestival.org/wp-content/uploads/2024/06/Khaled-Siddiq.jpeg"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute"
          style={{
            width: '24vh',
            height: '30vh',
            top: '14%',
            right: '8%',
            objectFit: 'cover',
            objectPosition: 'center 15%',
            opacity: 0.22,
            filter: 'grayscale(0.6) contrast(1.1)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, rgba(0,0,0,1) 25%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)',
            maskImage:
              'radial-gradient(ellipse at center, rgba(0,0,0,1) 25%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)',
          }}
        />
      </div>

      {/* Desktop-only: soft depth shadow on the content-panel side of the seam.
          Lives in the content panel only — the video is untouched. Creates the
          "fading into the video" feel without masking the video. */}
      <div
        className="hidden md:block absolute top-0 h-full w-40 z-10 pointer-events-none"
        style={{
          right: 'var(--panel-w)',
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.85) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Mobile-only: bottom vignette for CTA legibility. */}
      <div className="md:hidden absolute inset-x-0 bottom-0 h-2/3 z-10 pointer-events-none bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      {/* Grain — over the video area only. Keeps the content panel clean. */}
      <div
        className="absolute top-0 left-0 h-full w-full md:left-auto md:right-0 md:w-[var(--panel-w)] z-10 pointer-events-none opacity-[0.08] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: '180px 180px' }}
        aria-hidden="true"
      />

      {/* Content */}
      <main
        className="relative z-30 min-h-[100dvh] flex flex-col justify-end md:justify-between
                   px-[clamp(1.25rem,5vw,5rem)] pt-[clamp(1.5rem,5vw,3rem)] pb-[clamp(2rem,5vw,4rem)]
                   md:pl-[clamp(2.5rem,6vw,6rem)] md:py-[clamp(2rem,5vw,4rem)]"
        style={{
          // Reserve desktop right space so content doesn't slide under the video.
          paddingRight: 'max(var(--panel-w) + clamp(2rem, 4vw, 4rem), 1.25rem)',
        }}
      >
        {/* Desktop-only top row: artist mark */}
        <motion.div
          variants={variants.fadeInUp}
          className="hidden md:flex items-center gap-3 opacity-80"
        >
          <div className="h-px w-10 bg-white/30" />
          <span
            className="text-[10px] tracking-[0.4em] text-zinc-300 font-semibold uppercase"
            style={{ fontVariantCaps: 'small-caps' }}
          >
            khaled siddiq
          </span>
        </motion.div>

        {/* Bottom stack — full-width centered on mobile, left-anchored on desktop */}
        <section className="flex flex-col items-center md:items-start w-full max-w-4xl md:max-w-xl text-center md:text-left space-y-[clamp(1.5rem,4vw,2.25rem)] mx-auto md:mx-0">
          <motion.p
            variants={variants.fadeInUp}
            className="hidden md:block text-[13px] leading-relaxed text-zinc-400 max-w-sm lowercase tracking-wide"
          >
            unreleased music. members-only vlogs. everything, first — straight from khaled.
          </motion.p>

          <motion.div variants={variants.fadeInUp} className="flex justify-center md:justify-start relative">
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

          <motion.footer
            variants={variants.fadeInUp}
            className="text-[9px] tracking-[0.3em] text-neutral-500 font-bold pt-[clamp(1rem,3vw,2rem)] w-full text-center md:text-left"
            style={{ fontVariantCaps: 'small-caps' }}
          >
            © 2025 khaled siddiq
          </motion.footer>
        </section>
      </main>
    </motion.div>
  );
}
