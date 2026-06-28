export interface IDBExercise {
  id: number,
  name: string,
  muscleGroupId: number,
  sets: IDBSet[]
}

export interface IDBMuscleGroup {
  id: number,
  name: string,
}

export interface IDBSet {
  id: number,
  weight: number,
  reps: number,
  exerciseId: number,
  trainingId: number | null,
  templateId: number | null
}

export type SetCreateData = Pick<IDBSet, "weight" | "reps">
