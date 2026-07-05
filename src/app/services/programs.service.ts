import { inject, Injectable } from '@angular/core';
import { ProgramsApiService } from './api/programs.api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IDBGroup } from '../model/group';
import { IDBTemplate } from '../model/template';
import { SetCreateData } from '../model/exercise';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  private programsApiService = inject(ProgramsApiService);

  private groupsSubject = new BehaviorSubject<IDBGroup[]>([])
  readonly groups$ = this.groupsSubject.asObservable();

  private templateSubject = new BehaviorSubject<IDBTemplate[]>([]);
  readonly templates$ = this.templateSubject.asObservable();


  getUserGroups(userId: number) {
    return this.programsApiService.getUserGroups(userId).pipe(
      tap(groups => this.groupsSubject.next(groups)),
    )
  }

  getGroup(groupId: number): Observable<IDBGroup> {
    return this.programsApiService.getGroup(groupId);
  }

  createGroup(groupDto: { userId: number, name: string, parentId: number | null }): Observable<IDBGroup> {
    return this.programsApiService.createGroup(groupDto).pipe(
      tap((group) => {
        const currentGroups = this.groupsSubject.getValue();
        this.groupsSubject.next([...currentGroups, group]);
      })
    );
  }

  // removeGroup(groupId: number): Observable<IDBGroup> {
  //   return this.programsApiService.removeGroup(groupDto).pipe(
  //   );
  // }

  getTemplate(templateId: number | string): Observable<IDBTemplate> {
    return this.programsApiService.getTemplate(templateId);
  }

  createTemplate(templateDto: { name: string, parentId: number }) {
    return this.programsApiService.createTemplate(templateDto);
  }

  getMuscleGroups() {
    return this.programsApiService.getMuscleGroups();
  }

  getExercises(userId: number | string) {
    return this.programsApiService.getExercises(userId);
  }

  addExerciseToTemplate(templateId: number | string, exerciseId: number | string) {
    return this.programsApiService.addExerciseToTemplate(templateId, exerciseId);
  }

  addSetsToTemplateExercise(templateId: number | string, exerciseId: number | string, sets: SetCreateData[]) {
    return this.programsApiService.addSetsToTemplateExercise(templateId, exerciseId, sets);
  }

  removeSet(setId: number | string) {
    return this.programsApiService.removeSet(setId);
  }

  updateSet(setId: number | string, set: { weight: number, reps: number }) {
    return this.programsApiService.updateSet(setId, set)
  }
}
