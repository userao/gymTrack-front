import { inject, Injectable } from '@angular/core';
import { ProgramsApiService } from './api/programs.api.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IGroup } from '../model/group';
import { ITemplate } from '../model/tepmlate';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  private programsApiService = inject(ProgramsApiService);

  // private groups: IGroup[] = [];
  private groupsSubject = new BehaviorSubject<IGroup[]>([])
  readonly groups$ = this.groupsSubject.asObservable();


  getUserGroups(userId: number): Observable<IGroup[]> {
    return this.programsApiService.getUserGroups(userId)
  }

  getGroup(groupId: number): Observable<IGroup> {
    return this.programsApiService.getGroup(groupId);
  }

  updateGroupsSubject(groups: IGroup[]): void {
    this.groupsSubject.next(groups);
  }

  createGroup(groupDto: { userId: number, name: string, parentId: number | null }): Observable<IGroup> {
    return this.programsApiService.createGroup(groupDto);
  }

  getTemplate(templateId: number): Observable<ITemplate> {
    return this.programsApiService.getTemplate(templateId);
  }
}
