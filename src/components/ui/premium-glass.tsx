import { ReactNode, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PremiumGlassProps extends Omit<HTMLMotionProps<"div">, 'children'> {
  children: ReactNode;
  variant?: 'default' | 'card' | 'sidebar' | 'modal';
  intensity?: 'light' | 'medium' | 'heavy';
  glow?: boolean;
  noise?: boolean;
  as?: any;
}

const PremiumGlass = forwardRef<HTMLDivElement, PremiumGlassProps>(
  ({ 
    children, 
    className, 
    variant = 'default', 
    intensity = 'medium',
    glow = false,
    noise = true,
    as: Component = motion.div,
    ...props 
  }, ref) => {
    const baseClasses = "relative overflow-hidden border backdrop-blur-lg sm:backdrop-blur-xl antialiased isolation-isolate will-change-transform translate-z-0";
    
    const variantClasses = {
      default: "rounded-2xl",
      card: "rounded-2xl",
      sidebar: "rounded-3xl",
      modal: "rounded-3xl"
    };

    const intensityClasses = {
      light: "bg-gradient-to-b from-white/[0.06] to-transparent",
      medium: "bg-gradient-to-b from-white/[0.08] to-transparent", 
      heavy: "bg-gradient-to-b from-white/[0.12] to-transparent"
    };

    const glowClasses = glow 
      ? "shadow-[0_0_40px_-12px_rgba(120,119,198,0.2)]" 
      : "";

    return (
      <Component
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          intensityClasses[intensity],
          glowClasses,
          "group transition-all duration-300",
          className
        )}
        {...props}
      >
        {/* Specular highlight - the signature frosted glass top edge with inset shadow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" 
             style={{ boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.2)' }} />
        
        {/* Subtle inner glow on hover */}
        <div className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent" />
        
        {/* High-quality noise texture overlay INSIDE the card - 4% opacity */}
        {noise && (
          <div 
            className="absolute inset-0 opacity-[0.02] pointer-events-none rounded-[inherit] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.0' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '128px 128px'
            }}
          />
        )}
        
        {/* Content */}
        <div className="relative z-20">
          {children}
        </div>
      </Component>
    );
  }
);

PremiumGlass.displayName = "PremiumGlass";

export default PremiumGlass;