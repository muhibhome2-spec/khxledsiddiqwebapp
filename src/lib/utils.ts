import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface PremiumGlassProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "heavy";
  variant?: "default" | "card";
  glow?: boolean;
  as?: React.ElementType;
}

const PremiumGlass = React.forwardRef<HTMLDivElement, PremiumGlassProps>(
  ({ children, className, intensity = "medium", variant = "default", glow = false, as: Component = motion.div, ...props }, ref) => {
    
    // Aesthetic Configurations
    const intensityStyles = {
      light: "bg-white/[0.02] backdrop-blur-[8px] border-white/5",
      medium: "bg-white/[0.05] backdrop-blur-[16px] border-white/10",
      heavy: "bg-zinc-900/40 backdrop-blur-[24px] border-white/10",
    };

    const variantStyles = {
      default: "rounded-none",
      card: "rounded-3xl shadow-2xl",
    };

    const glowStyles = glow 
      ? "before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-tr before:from-white/0 before:via-white/[0.03] before:to-white/0 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500"
      : "";

    return (
      <Component
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          intensityStyles[intensity],
          variantStyles[variant],
          glowStyles,
          className
        )}
        {...props}
      >
        {/* Noise Texture for Realism */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0" 
             style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} 
        />

        {/* Top Highlight for 3D Edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 z-10" />
        
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