import { ProgramsService } from './../../services/programs.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { GroupComponent } from './group/group.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IGroup } from '../../model/group';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-programs',
  imports: [GroupComponent, ReactiveFormsModule, AsyncPipe],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss',
})
export class Programs implements OnInit {
  private programsService = inject(ProgramsService);

  groupsSubject$: Observable<IGroup[]>;
  programName = new FormControl('');

  ngOnInit(): void {
    this.groupsSubject$ = this.programsService.groups$
    this.programsService.getUserGroups(1).subscribe();
  }

  handleCreateProgram(e: Event) {
    e.preventDefault();
    this.programsService.createGroup({ userId: 1, name: this.programName.value as string, parentId: null }).subscribe();
  }
}
