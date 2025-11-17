export const CATEGORIES = {
  SLEEP: "SLEEP",
  NUTRITION: "NUTRITION",
  MOVEMENT: "MOVEMENT",
  STRESS: "STRESS",
} as const;

export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];

export const categoryArray = Object.values(CATEGORIES);
