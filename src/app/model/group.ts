import { ITemplate } from "./tepmlate";

export interface IGroup {
  id: number,
  name: string,
  parentId: number | null,
  childrenGroups?: IGroup[],
  childrenTemplates?:  ITemplate[],
}
