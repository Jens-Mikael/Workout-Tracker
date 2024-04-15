export type TSet = {
  id: string;
  user_id: string;
  created: Date | null;
  movement: string;
  exercise_id: string;
  weight: number | null;
  reps: number | null;
};

export type TExercise = {
  id: string;
  created: Date | null;
  workout_id: string;
  movement: string | null;
  set: TSet[];
};

export type TWorkout = {
  id: string;
  type: string;
  user_id: string;
  isCompleted: boolean;
  isReviewed: boolean;
  description: string | null;
  rating: number | null;
  duration: number | null;
  created: Date | null;
  exercise: TExercise[];
};
