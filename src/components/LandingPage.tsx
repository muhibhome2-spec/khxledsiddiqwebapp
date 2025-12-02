import { useEffect } from 'react';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import PremiumGlass from './ui/premium-glass';



// --- Animation Constants ---

const TRANSITION = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };



const containerVars = {

  hidden: { opacity: 0 },

  show: {

    opacity: 1,

    transition: {

      staggerChildren: 0.15,

      delayChildren: 0.2,

    },

  },

};



const textReveal = {

  hidden: { y: "120%", rotateZ: 3, opacity: 0 },

  show: { 

    y: "0%", 

    rotateZ: 0,

    opacity: 1,

    transition: TRANSITION 

  },

};



const fadeInUp = {

  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },

  show: { 

    opacity: 1, 

    y: 0, 

    filter: 'blur(0px)',

    transition: { ...TRANSITION, duration: 1.5 } 

  },

};



interface LandingPageProps {

  onEnterCommunity: () => void;

}



export default function LandingPage({ onEnterCommunity }: LandingPageProps) {

  return (

    <motion.div

      className="relative min-h-[100dvh] flex flex-col perspective-1000"

      variants={containerVars}

      initial="hidden"

      animate="show"

    >

      {/* --- Static Background Image --- */}

      <div className="fixed inset-0 -z-10">

        <div 

          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full opacity-60 grayscale"

          style={{

            backgroundImage: `url('/Khaled-Siddiq.jpeg')`,

          }}

        />

        <div className="absolute inset-0 bg-black/40" />

      </div>



      {/* --- Heavy Vignette for Focus --- */}

      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />



      {/* --- Main Content --- */}

      <div className="relative z-30 flex-1 flex flex-col justify-between px-6 py-8 md:px-12 md:py-12 lg:px-20 lg:py-16 max-w-screen-2xl mx-auto w-full h-full mix-blend-screen">

        

        <motion.header variants={fadeInUp} className="flex justify-between items-center w-full opacity-60 mix-blend-difference">

           {/* Optional minimal brand mark could go here */}

        </motion.header>



        <div className="flex-1 flex flex-col items-center justify-center w-full">

          <div className="w-full max-w-5xl text-center space-y-12 md:space-y-16">

            

            {/* Typography Stack */}

            <div className="space-y-4 md:space-y-6">

              <h1 className="font-black tracking-tighter leading-[0.8] text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500">

                <div className="overflow-hidden py-2">

                  <motion.div variants={textReveal} className="tracking-[-0.04em] origin-bottom-left" style={{ fontVariantCaps: 'small-caps' }}>

                    khaled

                  </motion.div>

                </div>

                <div className="overflow-hidden py-2">

                  <motion.div variants={textReveal} className="tracking-[-0.04em] origin-bottom-left text-neutral-400" style={{ fontVariantCaps: 'small-caps' }}>

                    siddiq

                  </motion.div>

                </div>

              </h1>

              

              <motion.div variants={fadeInUp} className="overflow-hidden">

                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mt-8" />

              </motion.div>

            </div>



            {/* Interactive Button */}

            <motion.div variants={fadeInUp} className="w-full flex justify-center relative">

              {/* Button glow backing */}

              <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full transform scale-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              

              <PremiumGlass

                variant="card"

                intensity="heavy"

                glow={true}

                className="group cursor-pointer border border-white/10 hover:border-white/30 transition-all duration-500"

                onClick={onEnterCommunity}

                whileHover={{ scale: 1.03 }}

                whileTap={{ scale: 0.98 }}

              >

                <div className="py-5 px-12 font-bold text-[11px] tracking-[0.25em] text-white group-hover:text-indigo-100 transition-colors duration-500 flex items-center justify-center relative overflow-hidden" style={{ fontVariantCaps: 'small-caps' }}>

                  <span className="relative z-10">enter community</span>

                  

                  {/* Shimmer effect on hover */}

                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />

                </div>

              </PremiumGlass>

            </motion.div>



            {/* Socials - Minimalist */}

            <motion.div 

              variants={fadeInUp} 

              className="flex flex-wrap justify-center gap-12 text-[10px] md:text-[11px] font-medium tracking-[0.2em] text-neutral-500"

              style={{ fontVariantCaps: 'small-caps' }}

            >

              {[

                { name: 'spotify', url: 'https://open.spotify.com/artist/2XYgHUbsmab6VT4a3FF9mX' },

                { name: 'apple', url: 'https://music.apple.com/my/artist/kh%C4%81led-sidd%C4%ABq/1170959386' },

                { name: 'instagram', url: 'https://www.instagram.com/khxledsiddiq/?hl=en' }

              ].map((link) => (

                <motion.a

                  key={link.name}

                  href={link.url}

                  target="_blank"

                  rel="noopener noreferrer"

                  whileHover={{ y: -3, color: "#fff" }}

                  transition={{ duration: 0.3 }}

                  className="hover:text-white transition-colors duration-300 relative group"

                >

                  {link.name}

                  <span className="absolute -bottom-2 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full opacity-50" />

                </motion.a>

              ))}

            </motion.div>

          </div>

        </div>



        {/* Footer */}

        <motion.footer 

          variants={fadeInUp} 

          className="text-center text-[9px] tracking-[0.3em] text-neutral-600 font-bold pb-4"

          style={{ fontVariantCaps: 'small-caps' }}

        >

          © 2025 khaled siddiq

        </motion.footer>

      </div>

    </motion.div>

  );

}