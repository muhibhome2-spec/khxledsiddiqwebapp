import { ReactNode, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

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
    const baseClasses = "relative overflow-hidden border backdrop-blur-xl antialiased";
    
    const variantClasses = {
      default: "rounded-2xl",
      card: "rounded-2xl",
      sidebar: "rounded-3xl",
      modal: "rounded-3xl"
    };

    const intensityClasses = {
      light: "bg-gray-900/10 border-white/5",
      medium: "bg-gray-900/20 border-white/10",
      heavy: "bg-gray-900/40 border-white/15"
    };

    const glowClasses = glow 
      ? "shadow-[0_0_50px_-12px_rgba(120,119,198,0.25)] hover:shadow-[0_0_80px_-12px_rgba(120,119,198,0.4)]" 
      : "";

    return (
      <Component
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          intensityClasses[intensity],
          glowClasses,
          "group transition-all duration-500",
          "hover:border-white/20 hover:bg-gray-900/30",
          className
        )}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        {...props}
      >
        {/* Top border highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {/* Inner glow on hover */}
        <div className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
        
        {/* Noise texture overlay */}
        {noise && (
          <div 
            className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none rounded-[inherit]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </Component>
    );
  }
);

PremiumGlass.displayName = "PremiumGlass";

export default PremiumGlass;