import { ProgramsService } from './../../services/programs.service';
import { Component, inject, OnInit } from '@angular/core';
import { GroupComponent } from './group/group.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IDBGroup } from '../../model/group';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-programs',
  imports: [GroupComponent, ReactiveFormsModule, AsyncPipe],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss',
})
export class ProgramsComponent implements OnInit {
  private programsService = inject(ProgramsService);

  groupsSubject$: Observable<IDBGroup[]>;
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
