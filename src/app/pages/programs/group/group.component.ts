import { Component, inject, Input, OnInit } from '@angular/core';
import { ProgramsService } from '../../../services/programs.service';
import { TemplateComponent } from '../template/template.component';
import { IDBGroup } from '../../../model/group';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-group',
  imports: [TemplateComponent, GroupComponent, AsyncPipe],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
})
export class GroupComponent implements OnInit {
  @Input() group: IDBGroup;
  withChildren$ = new BehaviorSubject<IDBGroup>({} as IDBGroup);

  private programsService = inject(ProgramsService);

  ngOnInit(): void {
    this.programsService.getGroup(this.group.id).subscribe(group => {
      this.withChildren$.next(group);
    });
  }

  handleCreateGroup() {
    this.programsService.createGroup({ name: "new group", userId: 1, parentId: this.group.id }).subscribe((newGroup) => {
      const currentGroup = this.withChildren$.getValue();
      this.withChildren$.next({
        ...currentGroup,
        childrenGroups: [...currentGroup.childrenGroups ?? [], newGroup]
      })
    });
  }

  handleCreateTemplate() {
    this.programsService.createTemplate({ name: "new template", parentId: this.group.id }).subscribe((newTemplate) => {
      const currentGroup = this.withChildren$.getValue();
      this.withChildren$.next({
        ...currentGroup,
        childrenTemplates: [...currentGroup.childrenTemplates ?? [], newTemplate]
      })
    });
  }
}
