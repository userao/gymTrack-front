import { IDBExercise } from "./exercise"

export interface IDBTemplate {
  id: number,
  name: number,
  parentId: number,
  exercises: IDBExercise[]
}
