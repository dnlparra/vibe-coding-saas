import { AnimationProps } from 'framer-motion';

export const transitions = {
  // Transiciones base
  default: { type: 'tween', ease: 'easeInOut', duration: 0.3 },
  smooth: { type: 'tween', ease: [0.4, 0, 0.2, 1], duration: 0.5 },
  bounce: { type: 'spring', stiffness: 300, damping: 15 },
  gentle: { type: 'spring', stiffness: 100, damping: 20 },
};

export const animations = {
  // Animaciones predefinidas
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: transitions.default,
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: transitions.smooth,
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: transitions.bounce,
  },
  stagger: {
    container: {
      initial: { opacity: 1 },
      animate: { opacity: 1, transition: { staggerChildren: 0.07 } },
    },
    item: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
    },
  },
};

// Utility para manejar preferencias de movimiento reducido
export function getReducedMotionVariants(variants: AnimationProps) {
  return {
    ...variants,
    transition: { duration: 0 },
  };
} 