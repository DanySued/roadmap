// Shared animation variants for FitPath

export const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];
export const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_OUT },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const stagger = (delay = 0.08, delayChildren = 0.05) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: delay, delayChildren },
  },
});

export const SPRING = { type: "spring", stiffness: 400, damping: 30 } as const;
export const SPRING_GENTLE = { type: "spring", stiffness: 200, damping: 28 } as const;
