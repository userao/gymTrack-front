import { Component, inject, OnInit } from '@angular/core';
import { ProgramsService } from '../../services/programs.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { IDBExercise, IDBMuscleGroup } from '../../model/exercise';
import { UserService } from '../../services/user.service';
import { IUserLoginResponse } from '../../model/user';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-exercises',
  imports: [AsyncPipe, MatButtonModule, MatIconModule],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss',
})
export class ExercisesComponent implements OnInit {
  private programsService = inject(ProgramsService);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  muscleGroups$ = new Subject<IDBMuscleGroup[]>();
  exercises$ = new Subject<IDBExercise[]>();
  activeMuscleGroup$ = new BehaviorSubject<number | null>(null);
  allExercises: IDBExercise[] = [];
  templateId: number;

  ngOnInit(): void {
    const templateIdParam = this.route.snapshot.queryParamMap.get('templateId');

    if (templateIdParam) {
      this.templateId = +templateIdParam;
    }

    this.activeMuscleGroup$.subscribe((muscleGroupId) => {
      if (!muscleGroupId) {
        this.exercises$.next(this.allExercises);
      } else {
        const filteredExercises = this.allExercises.filter((exercise) => exercise.muscleGroupId === muscleGroupId);
        this.exercises$.next(filteredExercises);
      }
    })

    const user = this.userService.getSavedUser() as IUserLoginResponse;
    this.programsService.getMuscleGroups().subscribe((muscleGroups: IDBMuscleGroup[]) => {
      this.muscleGroups$.next(muscleGroups);
    });
    this.programsService.getExercises(user.id).subscribe((exercises: IDBExercise[]) => {
      this.allExercises = exercises;
      this.exercises$.next(this.allExercises);
    })
  }

  handleAddExercise(exerciseId: number) {
    this.programsService.addExerciseToTemplate(this.templateId, exerciseId).subscribe(() => {
      this.location.back();
    });
  }

  setActiveMuscleGroup(muscleGroupId: number) {
    const nextMuscleGroupId = this.activeMuscleGroup$.value === muscleGroupId ? null : muscleGroupId;
    this.activeMuscleGroup$.next(nextMuscleGroupId);
  }
}
