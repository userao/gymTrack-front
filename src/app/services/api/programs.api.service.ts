import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITemplate } from '../../model/tepmlate';
import { IGroup } from '../../model/group';

@Injectable({
  providedIn: 'root',
})
export class ProgramsApiService {
  private httpClient = inject(HttpClient);

  getUserGroups(userId: number): Observable<IGroup[]> {
    return this.httpClient.get<IGroup[]>(`http://localhost:3000/groups?userId=${userId}`)
  }

  getGroup(groupId: number): Observable<IGroup> {
    return this.httpClient.get<IGroup>(`http://localhost:3000/groups/${groupId}`)
  }

  createGroup(groupDto: { userId: number, name: string, parentId: number | null }): Observable<IGroup> {
    return this.httpClient.post<IGroup>("http://localhost:3000/groups", groupDto);
  }

  getTemplate(templateId: number): Observable<ITemplate> {
    return this.httpClient.get<ITemplate>(`http://localhost:3000/templates/${templateId}`);
  }

  createTemplate(templateDto: {name: string, parentId: number}) {
    return this.httpClient.post<ITemplate>("http://localhost:3000/templates", templateDto);
  }
}
