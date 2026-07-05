import { Component, inject, Input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ProgramsService } from '../../../services/programs.service';
import { IDBTemplate } from '../../../model/template';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IDBExercise, IDBMuscleGroup } from '../../../model/exercise';
import { UserService } from '../../../services/user.service';
import { IUserLoginResponse } from '../../../model/user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-template',
  imports: [AsyncPipe, MatExpansionModule, MatIconModule, RouterLink],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
})

export class TemplateComponent implements OnInit {
  @Input() template: IDBTemplate;
  withExercises$ = new BehaviorSubject<IDBTemplate>({} as IDBTemplate);

  private userService = inject(UserService);
  private programsService = inject(ProgramsService);
  private router = inject(Router);

  user: IUserLoginResponse;
  modalShown: boolean = false;
  modalShown$: Observable<boolean>;
  modalData$: Observable<{
    exercises: IDBExercise[],
    muscleGroups: IDBMuscleGroup[],
  }>;


  ngOnInit(): void {
    this.user = this.userService.getSavedUser() as IUserLoginResponse;
    this.programsService.getTemplate(this.template.id).subscribe((withExercises) => this.withExercises$.next(withExercises))
  }

  handleToExercises(e: Event) {
    e.stopPropagation();
    this.router.navigate(['/exercises'], {
      queryParams: {
        templateId: this.template.id
      }
    })
  }

  handleAddSet(exerciseId: number) {
    this.programsService.addSetsToTemplateExercise(this.template.id, exerciseId, [{ weight: 0, reps: 0 }])
      .subscribe((nextTemplate) => {
        this.withExercises$.next(nextTemplate)
      })
  }
}
