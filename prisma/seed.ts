import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Seed tips for different categories
  const tips = [
    // Sleep tips
    {
      category: "SLEEP",
      title: "Maintain a Consistent Sleep Schedule",
      description:
        "Go to bed and wake up at the same time every day, even on weekends. This helps regulate your body's internal clock and improves sleep quality.",
    },
    {
      category: "SLEEP",
      title: "Create a Relaxing Bedtime Routine",
      description:
        "Develop a calming pre-sleep routine like reading, gentle stretching, or meditation. Avoid screens 30-60 minutes before bed as blue light can disrupt sleep.",
    },
    {
      category: "SLEEP",
      title: "Optimize Your Sleep Environment",
      description:
        "Keep your bedroom cool (60-67°F), dark, and quiet. Consider blackout curtains, earplugs, or a white noise machine for better sleep quality.",
    },

    // Nutrition tips
    {
      category: "NUTRITION",
      title: "Eat a Rainbow of Vegetables",
      description:
        "Include a variety of colorful vegetables in your diet. Different colors provide different nutrients and antioxidants essential for optimal health.",
    },
    {
      category: "NUTRITION",
      title: "Stay Hydrated Throughout the Day",
      description:
        "Drink at least 8 glasses of water daily. Start your day with a glass of water and keep a reusable bottle with you to maintain hydration.",
    },
    {
      category: "NUTRITION",
      title: "Practice Mindful Eating",
      description:
        "Eat slowly and without distractions. Pay attention to hunger and fullness cues, savoring each bite to improve digestion and prevent overeating.",
    },
    {
      category: "NUTRITION",
      title: "Limit Processed Foods",
      description:
        "Choose whole, unprocessed foods whenever possible. Minimize added sugars, excess sodium, and artificial ingredients for better overall health.",
    },

    // Movement tips
    {
      category: "MOVEMENT",
      title: "Take Short Walking Breaks",
      description:
        "Stand up and walk for 5 minutes every hour. This combats the negative effects of prolonged sitting and boosts energy and circulation.",
    },
    {
      category: "MOVEMENT",
      title: "Mix Cardio and Strength Training",
      description:
        "Aim for 150 minutes of moderate cardio per week plus 2 days of strength training. This combination supports heart health and maintains muscle mass.",
    },
    {
      category: "MOVEMENT",
      title: "Stretch Daily",
      description:
        "Spend 10-15 minutes stretching each day to improve flexibility, reduce muscle tension, and prevent injuries. Focus on major muscle groups.",
    },
    {
      category: "MOVEMENT",
      title: "Find Activities You Enjoy",
      description:
        "Choose physical activities you genuinely enjoy, whether it's dancing, hiking, swimming, or team sports. You're more likely to stay consistent.",
    },

    // Stress tips
    {
      category: "STRESS",
      title: "Practice Deep Breathing",
      description:
        "Try the 4-7-8 technique: inhale for 4 counts, hold for 7, exhale for 8. This activates your parasympathetic nervous system to reduce stress.",
    },
    {
      category: "STRESS",
      title: "Set Healthy Boundaries",
      description:
        "Learn to say no to commitments that overwhelm you. Protect your time and energy by setting clear boundaries in work and personal life.",
    },
    {
      category: "STRESS",
      title: "Connect with Others",
      description:
        "Maintain strong social connections. Regular interaction with friends and family provides emotional support and reduces feelings of stress and isolation.",
    },
    {
      category: "STRESS",
      title: "Practice Gratitude",
      description:
        "Write down three things you're grateful for each day. This simple practice shifts focus from stressors to positive aspects of life.",
    },
  ];

  for (const tip of tips) {
    await prisma.tip.create({
      data: tip,
    });
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
