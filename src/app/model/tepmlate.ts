import { IExercise, ISet } from "./exercise"

export interface ITemplate {
  id: number,
  name: number,
  parentId: number,
  templateExercises?: {
    exercise: IExercise,
    sets: ISet[]
  }
}
