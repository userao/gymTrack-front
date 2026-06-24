import { ProgramsService } from './../../services/programs.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { GroupComponent } from './group/group.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IGroup } from '../../model/group';

@Component({
  selector: 'app-programs',
  imports: [GroupComponent, ReactiveFormsModule],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss',
})
export class Programs implements OnInit {
  private programsService = inject(ProgramsService);

  allGroups: IGroup[] = [];
  rootGroups = signal<IGroup[]>([]);
  programName = new FormControl('');

  ngOnInit(): void {
    this.programsService.groups$.subscribe((groups: IGroup[]) => {
      this.allGroups = groups;
      const rootGroups = groups.filter((g) => g.parentId === null);
      this.rootGroups.set(rootGroups);
    });

    this.programsService.getUserGroups(1).subscribe((groups: IGroup[]) => {
      this.programsService.updateGroupsSubject(groups);
    });
  }

  handleCreateProgram(e: Event) {
    e.preventDefault();
    this.programsService.createGroup({ userId: 1, name: this.programName.value as string, parentId: null }).subscribe((group: IGroup) => {
      this.allGroups.push(group);
      this.programsService.updateGroupsSubject(this.allGroups);
    })
  }
}
