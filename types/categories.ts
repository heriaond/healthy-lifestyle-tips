import { Moon, Apple, Dumbbell, Brain, LucideIcon } from "lucide-react";

export const CATEGORIES = {
  SLEEP: "SLEEP",
  NUTRITION: "NUTRITION",
  MOVEMENT: "MOVEMENT",
  STRESS: "STRESS",
} as const;

export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];

export const categoryArray = Object.values(CATEGORIES);

export const categoryIcons: Record<Category, LucideIcon> = {
  SLEEP: Moon,
  NUTRITION: Apple,
  MOVEMENT: Dumbbell,
  STRESS: Brain,
};

export const categoryDescriptions: Record<Category, string> = {
  SLEEP: "Improve your sleep quality and establish healthy sleep habits",
  NUTRITION: "Learn about balanced diet and healthy eating practices",
  MOVEMENT: "Discover exercises and physical activities for your wellbeing",
  STRESS: "Find effective ways to manage and reduce stress",
};
