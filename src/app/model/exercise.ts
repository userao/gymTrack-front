export interface IExercise {
  id: number,
  name: string,
  muscleGroup: IMuscleGroup,
}

export interface IMuscleGroup {
  id: number,
  name: string,
}

export interface ISet {
  id: number,
  weight: number,
  reps: number,
  exerciseId: number,
  trainingId: number | null,
  templateId: number | null,
}
