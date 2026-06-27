import { inject, Injectable } from '@angular/core';
import { ProgramsApiService } from './api/programs.api.service';
import { BehaviorSubject, finalize, map, Observable, Subject, tap } from 'rxjs';
import { IGroup } from '../model/group';
import { ITemplate } from '../model/tepmlate';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  private programsApiService = inject(ProgramsApiService);

  private groupsSubject = new BehaviorSubject<IGroup[]>([])
  readonly groups$ = this.groupsSubject.asObservable();

  private templateSubject = new BehaviorSubject<ITemplate[]>([]);
  readonly templates$ = this.templateSubject.asObservable();


  getUserGroups(userId: number) {
    return this.programsApiService.getUserGroups(userId).pipe(
      tap(groups => this.groupsSubject.next(groups)),
    )
  }

  getGroup(groupId: number): Observable<IGroup> {
    return this.programsApiService.getGroup(groupId);
  }

  createGroup(groupDto: { userId: number, name: string, parentId: number | null }): Observable<IGroup> {
    return this.programsApiService.createGroup(groupDto).pipe(
      tap((group) => {
        const currentGroups = this.groupsSubject.getValue();
        this.groupsSubject.next([...currentGroups, group]);
      })
    );
  }

  // removeGroup(groupId: number): Observable<IGroup> {
  //   return this.programsApiService.removeGroup(groupDto).pipe(
  //   );
  // }

  getTemplate(templateId: number): Observable<ITemplate> {
    return this.programsApiService.getTemplate(templateId);
  }

  createTemplate(templateDto: {name: string, parentId: number}) {
    return this.programsApiService.createTemplate(templateDto);
  }
}
