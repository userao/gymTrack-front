import { IDBTemplate } from "./template";

export interface IDBGroup {
  id: number,
  name: string,
  parentId: number | null,
  childrenGroups?: IDBGroup[],
  childrenTemplates?:  IDBTemplate[],
}
