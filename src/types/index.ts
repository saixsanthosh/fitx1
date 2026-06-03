export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  secondaryMuscles: MuscleGroup[];
  equipment: Equipment[];
  difficulty: Difficulty;
  type: ExerciseType;
  forceType: ForceType;
  instructions: string[];
  tips: string[];
  commonMistakes: string[];
  videoUrl: string;
  gifUrl: string;
  thumbnailUrl: string;
  alternatives: string[];
  musclesWorked: string[];
}

export type MuscleGroup =
  | "Chest" | "Back" | "Legs" | "Shoulders" | "Arms" | "Core" | "Cardio" | "Full Body";

export type Equipment =
  | "Barbell" | "Dumbbell" | "Cable" | "Machine" | "Bodyweight" | "Kettlebell"
  | "Bands" | "Pull-up Bar" | "Bench" | "EZ Bar" | "Smith Machine" | "None";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type ExerciseType = "Compound" | "Isolation" | "Isometric" | "Cardio";
export type ForceType = "Push" | "Pull" | "Hinge" | "Squat" | "Carry" | "Rotation";

export type DietMode = "Bulking" | "Cutting" | "Maintenance" | "Performance";
export type WorkoutMode = "Gym" | "Home" | "Outdoor";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  goals: string[];
  experience: Difficulty;
  dietMode: DietMode;
  workoutMode: WorkoutMode;
}

export interface WorkoutSession {
  id: string;
  name: string;
  date: string;
  duration: number;
  exercises: WorkoutExercise[];
  totalVolume: number;
  caloriesBurned: number;
}

export interface WorkoutExercise {
  exerciseId: string;
  exerciseName: string;
  sets: ExerciseSet[];
}

export interface ExerciseSet {
  setNumber: number;
  weight: number;
  reps: number;
  rpe?: number;
  completed: boolean;
  isPersonalRecord?: boolean;
}

export interface NutritionEntry {
  id: string;
  date: string;
  meal: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: "pending" | "in_progress" | "completed" | "overdue";
  dueDate?: string;
  dueTime?: string;
  recurring?: RecurrencePattern;
  subtasks?: Subtask[];
  linkedWorkoutId?: string;
  linkedMealId?: string;
  tags: string[];
  createdAt: string;
}

export type TaskCategory = "Fitness" | "Nutrition" | "Recovery" | "Habit" | "Personal" | "Goal";
export type TaskPriority = "Critical" | "High" | "Medium" | "Low";
export type RecurrencePattern = "None" | "Daily" | "Weekdays" | "Weekends" | "Weekly" | "Custom";

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Habit {
  id: string;
  name: string;
  category: TaskCategory;
  frequency: "Daily" | "Weekdays" | "Weekly";
  currentStreak: number;
  bestStreak: number;
  completionLog: Record<string, boolean>;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  category: string;
  unlockedAt?: string;
  progress?: number;
  target?: number;
}

export interface PricingTier {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
  cta: string;
}
