import { ProgramsService } from './../../../services/programs.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { IDBExercise, IDBSet } from '../../../model/exercise';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { SetComponent } from '../set/set.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-exercise',
  imports: [MatExpansionModule, MatIconModule, SetComponent, AsyncPipe],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.scss',
})
export class ExerciseComponent implements OnInit {
  @Input() exercise: IDBExercise;
  @Input() parentId: number;

  private programsService = inject(ProgramsService);
  sets$ = new BehaviorSubject<IDBSet[]>([]);

  ngOnInit(): void {
    this.sets$.next(this.exercise.sets);
  }

  handleAddSet(e: Event) {
    e.stopPropagation();
    this.programsService.addSetsToTemplateExercise(this.parentId, this.exercise.id, [{ weight: 0, reps: 0 }])
      .subscribe((template) => {
        const nextSets = template.exercises.find((exercise) => exercise.id === this.exercise.id)?.sets;
        this.sets$.next(nextSets as IDBSet[]);
      })
  }
}
