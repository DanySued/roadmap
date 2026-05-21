export type Path = {
  id: string;
  title: string;
  icon: string; // lucide icon name
  color: string;
  desc: string;
  popular?: boolean;
  isNew?: boolean;
};

export type PathCategory = "role" | "skill" | "bestpractices";

export const PATHS: Record<PathCategory, Path[]> = {
  role: [
    { id: "strength-training", title: "Strength Training", icon: "dumbbell", color: "#aaa8ff", desc: "Build muscle and progressive strength through resistance training", popular: true },
    { id: "running", title: "Running", icon: "activity", color: "#7f9ef8", desc: "Training progression from beginner to marathon runner", popular: true },
    { id: "yoga", title: "Yoga", icon: "leaf", color: "#c1cff8", desc: "Yoga journey from basics to advanced asanas and mindfulness", popular: true },
    { id: "cycling", title: "Cycling", icon: "bike", color: "#fad0f3", desc: "Path to becoming a strong, efficient cyclist" },
    { id: "nutrition", title: "Nutrition Coaching", icon: "apple", color: "#7f9ef8", desc: "Master nutrition science and meal planning" },
    { id: "crossfit", title: "CrossFit", icon: "flame", color: "#fffba5", desc: "Training foundation for functional fitness and competition" },
    { id: "pilates", title: "Pilates", icon: "target", color: "#aaa8ff", desc: "Core strength and body control through pilates" },
    { id: "swimming", title: "Swimming", icon: "waves", color: "#c1cff8", desc: "Learn proper technique and endurance for swimming" },
    { id: "boxing", title: "Boxing", icon: "shield", color: "#7f9ef8", desc: "Master stance, technique, and boxing fundamentals", isNew: true },
    { id: "martial-arts", title: "Martial Arts", icon: "award", color: "#fad0f3", desc: "Progress through belts and master martial arts discipline", isNew: true },
    { id: "pt-certification", title: "Personal Training Cert", icon: "clipboard-list", color: "#aaa8ff", desc: "Become a certified personal trainer and coach" },
    { id: "rehab-therapy", title: "Rehab & Recovery", icon: "heart-pulse", color: "#fffba5", desc: "Learn injury recovery and rehabilitation techniques" },
  ],
  skill: [
    { id: "strength-building", title: "Strength Building", icon: "trending-up", color: "#aaa8ff", desc: "Programs to build muscle and increase max strength", popular: true },
    { id: "cardio-endurance", title: "Cardio Endurance", icon: "heart", color: "#7f9ef8", desc: "Build cardiovascular health and aerobic capacity" },
    { id: "flexibility", title: "Flexibility & Mobility", icon: "move", color: "#c1cff8", desc: "Increase range of motion and prevent injuries" },
    { id: "weight-loss", title: "Weight Loss", icon: "scale", color: "#7f9ef8", desc: "Science-backed program for sustainable weight loss", popular: true },
    { id: "muscle-building", title: "Muscle Building", icon: "dumbbell", color: "#aaa8ff", desc: "Hypertrophy training to maximize muscle growth" },
    { id: "nutrition-basics", title: "Nutrition Fundamentals", icon: "leaf", color: "#fad0f3", desc: "Learn macros, calories, and nutrition science", popular: true },
    { id: "5k-training", title: "5K Training", icon: "medal", color: "#aaa8ff", desc: "8-week program to run a strong 5K" },
    { id: "marathon-training", title: "Marathon Training", icon: "trophy", color: "#fffba5", desc: "16-week program to complete your first marathon" },
    { id: "core-strength", title: "Core Strength", icon: "target", color: "#c1cff8", desc: "Build a stronger, more stable core" },
    { id: "athletic-performance", title: "Athletic Performance", icon: "zap", color: "#aaa8ff", desc: "Enhance speed, power, and athletic ability", isNew: true },
    { id: "recovery-protocols", title: "Recovery Protocols", icon: "moon", color: "#fad0f3", desc: "Optimize recovery with sleep, stretching, and nutrition" },
    { id: "injury-prevention", title: "Injury Prevention", icon: "shield", color: "#7f9ef8", desc: "Prevent common injuries through smart training" },
  ],
  bestpractices: [
    { id: "recovery-techniques", title: "Recovery Techniques", icon: "sparkles", color: "#aaa8ff", desc: "Best practices for active and passive recovery" },
    { id: "nutrition-strategy", title: "Nutrition Strategy", icon: "apple", color: "#7f9ef8", desc: "Best practices for sports nutrition and meal timing" },
    { id: "training-programming", title: "Training Programming", icon: "calendar", color: "#c1cff8", desc: "Best practices for periodization and program design" },
    { id: "sleep-wellness", title: "Sleep & Wellness", icon: "moon", color: "#fad0f3", desc: "Best practices for sleep quality and recovery" },
  ],
};

export const ALL_PATHS: Path[] = [
  ...PATHS.role,
  ...PATHS.skill,
  ...PATHS.bestpractices,
];

export const STATS = [
  { value: "24+", label: "Training Paths", color: "#aaa8ff" },
  { value: "500K+", label: "Active Users", color: "#7f9ef8" },
  { value: "2.5M+", label: "Workouts Logged", color: "#c1cff8" },
  { value: "100%", label: "Free Forever", color: "#fad0f3" },
];

export const CATEGORY_LABELS: Record<PathCategory, string> = {
  role: "By Sport",
  skill: "By Goal",
  bestpractices: "Best Practices",
};
