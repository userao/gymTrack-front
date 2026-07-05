import { ProgramsService } from './../../services/programs.service';
import { Component, inject, OnInit } from '@angular/core';
import { GroupComponent } from './group/group.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IDBGroup } from '../../model/group';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatAnchor } from "@angular/material/button";
import { UserService } from '../../services/user.service';
import { IUserLoginResponse } from '../../model/user';
import { RouterOutlet } from "../../../../node_modules/@angular/router/types/_router_module-chunk";

@Component({
  selector: 'app-programs',
  imports: [GroupComponent, ReactiveFormsModule, AsyncPipe, MatAnchor, MatButtonModule, MatIconModule],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss',
})
export class ProgramsComponent implements OnInit {
  private programsService = inject(ProgramsService);
  private userService = inject(UserService);

  groupsSubject$: Observable<IDBGroup[]>;

  user: IUserLoginResponse

  ngOnInit(): void {
    this.user = this.userService.getSavedUser() as IUserLoginResponse;
    this.groupsSubject$ = this.programsService.groups$
    this.programsService.getUserGroups(this.user.id).subscribe();
  }

  handleCreateProgram() {
    this.programsService.createGroup({ userId: this.user.id, name: "Новая программа", parentId: null }).subscribe();
  }
}
