// Realistic demo seed data — powers the API and ensures every page looks complete.

export const demoUser = {
  id: "user-demo-001",
  name: "Alex Knight",
  email: "alex@fitx.app",
  avatar: "AK",
  level: 24,
  xp: 38450,
  xpToNext: 50000,
  rank: "Elite",
  streak: 14,
  bestStreak: 21,
  goals: ["Build Muscle", "Gain Strength"],
  experience: "Intermediate",
  dietMode: "Maintenance",
  workoutMode: "Gym",
  bodyMetrics: { gender: "Male", age: 28, height: 178, weight: 75, targetWeight: 73, bmr: 1750, tdee: 2400 },
  joinedAt: "2025-12-01",
};

export const demoPrograms = [
  { id: "prog-001", name: "PPL — Push Pull Legs", weeks: 12, level: "Intermediate", rating: 4.8, enrolled: 12500, coach: "Coach Alex", description: "The classic 6-day Push/Pull/Legs split for hypertrophy and strength." },
  { id: "prog-002", name: "Starting Strength", weeks: 8, level: "Beginner", rating: 4.9, enrolled: 28000, coach: "Mark R.", description: "A proven beginner program built on the big compound lifts." },
  { id: "prog-003", name: "PHUL — Power Hypertrophy", weeks: 16, level: "Advanced", rating: 4.7, enrolled: 8200, coach: "Priya S.", description: "Power and hypertrophy upper/lower split for advanced lifters." },
  { id: "prog-004", name: "Full Body 3x/Week", weeks: 8, level: "Beginner", rating: 4.6, enrolled: 15000, coach: "Marcus J.", description: "Efficient full-body training three times per week." },
];

export const demoWorkoutHistory = [
  { id: "wk-001", name: "Pull Day", date: "2026-05-31", duration: 58, volume: 14200, exercises: 7, prs: 1, caloriesBurned: 420 },
  { id: "wk-002", name: "Push Day", date: "2026-05-30", duration: 62, volume: 12800, exercises: 8, prs: 0, caloriesBurned: 460 },
  { id: "wk-003", name: "Leg Day", date: "2026-05-28", duration: 72, volume: 18500, exercises: 9, prs: 2, caloriesBurned: 540 },
  { id: "wk-004", name: "Pull Day", date: "2026-05-27", duration: 55, volume: 13900, exercises: 7, prs: 0, caloriesBurned: 410 },
  { id: "wk-005", name: "Push Day", date: "2026-05-25", duration: 60, volume: 12500, exercises: 8, prs: 1, caloriesBurned: 450 },
];

export const demoMeals = [
  { id: "meal-001", name: "High-Protein Oats Bowl", meal: "Breakfast", calories: 480, protein: 35, carbs: 52, fat: 10 },
  { id: "meal-002", name: "Grilled Chicken + Rice", meal: "Lunch", calories: 620, protein: 52, carbs: 68, fat: 8 },
  { id: "meal-003", name: "Salmon + Sweet Potato", meal: "Dinner", calories: 580, protein: 42, carbs: 48, fat: 18 },
  { id: "meal-004", name: "Greek Yogurt + Almonds", meal: "Snack", calories: 220, protein: 18, carbs: 12, fat: 10 },
  { id: "meal-005", name: "Beef Stir Fry + Veggies", meal: "Dinner", calories: 540, protein: 45, carbs: 38, fat: 16 },
  { id: "meal-006", name: "Whey Protein Shake", meal: "Pre-Workout", calories: 130, protein: 25, carbs: 3, fat: 2 },
];

export const demoTasks = [
  { id: "task-001", title: "Complete Push Day Workout", category: "Fitness", priority: "High", completed: false, dueTime: "18:00" },
  { id: "task-002", title: "Log all meals for today", category: "Nutrition", priority: "Medium", completed: false },
  { id: "task-003", title: "Take daily vitamins", category: "Habit", priority: "Low", completed: true },
  { id: "task-004", title: "Drink 3L water", category: "Habit", priority: "Medium", completed: false },
  { id: "task-005", title: "10-minute stretching session", category: "Recovery", priority: "Medium", completed: false, dueTime: "07:00" },
];

export const demoHabits = [
  { id: "habit-001", name: "Take Daily Vitamins", category: "Habit", frequency: "Daily", currentStreak: 28, bestStreak: 42 },
  { id: "habit-002", name: "Drink 3L Water", category: "Nutrition", frequency: "Daily", currentStreak: 14, bestStreak: 21 },
  { id: "habit-003", name: "Sleep 8 Hours", category: "Recovery", frequency: "Daily", currentStreak: 5, bestStreak: 18 },
  { id: "habit-004", name: "Stretch 10 Min", category: "Recovery", frequency: "Daily", currentStreak: 7, bestStreak: 15 },
  { id: "habit-005", name: "Log All Meals", category: "Nutrition", frequency: "Daily", currentStreak: 20, bestStreak: 35 },
  { id: "habit-006", name: "Meditate 5 Min", category: "Habit", frequency: "Daily", currentStreak: 3, bestStreak: 10 },
];

export const demoProgress = {
  totalWorkouts: 142,
  totalVolume: 845000,
  avgDuration: 58,
  streak: 14,
  personalRecords: [
    { exercise: "Barbell Bench Press", weight: 100, reps: 5, date: "2026-05-28" },
    { exercise: "Back Squat", weight: 140, reps: 3, date: "2026-05-20" },
    { exercise: "Conventional Deadlift", weight: 180, reps: 1, date: "2026-05-15" },
    { exercise: "Overhead Press", weight: 65, reps: 5, date: "2026-05-10" },
    { exercise: "Barbell Row", weight: 90, reps: 6, date: "2026-05-05" },
  ],
  weightHistory: [
    { date: "2026-01", weight: 78 }, { date: "2026-02", weight: 77.5 },
    { date: "2026-03", weight: 76.8 }, { date: "2026-04", weight: 76.2 },
    { date: "2026-05", weight: 75.5 }, { date: "2026-06", weight: 75.0 },
  ],
};

export const demoChallenges = [
  { id: "ch-001", name: "100 Push-Up Challenge", participants: 2400, daysLeft: 12, progress: 68 },
  { id: "ch-002", name: "30-Day Streak Warriors", participants: 5100, daysLeft: 16, progress: 47 },
  { id: "ch-003", name: "Protein King — Hit 180g Daily", participants: 1800, daysLeft: 8, progress: 72 },
];

export const demoLeaderboard = [
  { rank: 1, name: "Sarah Chen", xp: 48200, level: 31, streak: 45 },
  { rank: 2, name: "Marcus Johnson", xp: 42800, level: 28, streak: 32 },
  { rank: 3, name: "Alex Knight", xp: 38450, level: 24, streak: 14 },
  { rank: 4, name: "Elena Rodriguez", xp: 35100, level: 22, streak: 21 },
  { rank: 5, name: "Arjun Mehta", xp: 31500, level: 20, streak: 10 },
];

export const demoGymMembers = [
  { id: "m-001", name: "Rahul Verma", plan: "Elite", status: "Active", joined: "2026-01-15", attendance: 92 },
  { id: "m-002", name: "Ananya Gupta", plan: "Pro", status: "Active", joined: "2026-03-02", attendance: 88 },
  { id: "m-003", name: "Vikram Singh", plan: "Pro", status: "Active", joined: "2026-02-10", attendance: 76 },
  { id: "m-004", name: "Meera Patel", plan: "Elite", status: "Active", joined: "2026-04-05", attendance: 95 },
  { id: "m-005", name: "Karthik Reddy", plan: "Free", status: "At Risk", joined: "2026-05-20", attendance: 34 },
];

export const demoGymRevenue = {
  mrr: 420000,
  totalMembers: 342,
  churnRate: 3.2,
  avgAttendance: 78,
  mrrHistory: [
    { month: "Jan", value: 285000 }, { month: "Feb", value: 310000 },
    { month: "Mar", value: 345000 }, { month: "Apr", value: 372000 },
    { month: "May", value: 398000 }, { month: "Jun", value: 420000 },
  ],
};
