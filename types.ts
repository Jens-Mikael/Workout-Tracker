export type TSet = {
  id: string;
  user_id: string;
  created: Date | null;
  movement: string;
  exercise_id: string;
  weight: number;
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
  completed: boolean;
  duration: number | null;
  created: Date | null;
  exercise: TExercise[];
};
