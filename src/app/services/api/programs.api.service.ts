import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDBTemplate } from '../../model/template';
import { IDBGroup } from '../../model/group';
import { IDBExercise, IDBMuscleGroup, IDBSet, SetCreateData } from '../../model/exercise';

@Injectable({
  providedIn: 'root',
})
export class ProgramsApiService {
  private httpClient = inject(HttpClient);

  getUserGroups(userId: number): Observable<IDBGroup[]> {
    return this.httpClient.get<IDBGroup[]>(`http://localhost:3000/groups?userId=${userId}`)
  }

  getGroup(groupId: number): Observable<IDBGroup> {
    return this.httpClient.get<IDBGroup>(`http://localhost:3000/groups/${groupId}`)
  }

  createGroup(groupDto: { userId: number, name: string, parentId: number | null }): Observable<IDBGroup> {
    return this.httpClient.post<IDBGroup>("http://localhost:3000/groups", groupDto);
  }

  getTemplate(templateId: number | string): Observable<IDBTemplate> {
    return this.httpClient.get<IDBTemplate>(`http://localhost:3000/templates/${templateId}`);
  }

  getTemplateExercises(templateId: number | string): Observable<Partial<IDBTemplate>> {
    return this.httpClient.get<Partial<IDBTemplate>>(`http://localhost:3000/templates/${templateId}/exercises`);
  }

  createTemplate(templateDto: { name: string, parentId: number }) {
    return this.httpClient.post<IDBTemplate>("http://localhost:3000/templates", templateDto);
  }

  getMuscleGroups(): Observable<IDBMuscleGroup[]> {
    return this.httpClient.get<IDBMuscleGroup[]>("http://localhost:3000/muscle-groups");
  }

  getExercises(userId: number | string): Observable<IDBExercise[]> {
    return this.httpClient.get<IDBExercise[]>(`http://localhost:3000/exercises?userId=${userId}`);
  }

  addExerciseToTemplate(templateId: number | string, exerciseId: number | string): Observable<IDBTemplate> {
    return this.httpClient.get<IDBTemplate>(`http://localhost:3000/templates/${templateId}/exercises/${exerciseId}`);
  }

  addSetsToTemplateExercise(templateId: number | string, exerciseId: number | string, sets: SetCreateData[]) {
    return this.httpClient.post<IDBTemplate>(`http://localhost:3000/templates/${templateId}/exercises/${exerciseId}/sets`, sets);
  }

  removeSet(setId: number | string) {
    return this.httpClient.delete<IDBTemplate>(`http://localhost:3000/sets/${setId}`);
  }

  updateSet(setId: number | string, set: { weight: number, reps: number }) {
    return this.httpClient.patch<IDBTemplate>(`http://localhost:3000/sets/${setId}`, set);
  }
}
