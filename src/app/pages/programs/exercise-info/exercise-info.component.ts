import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDBTemplate } from '../../../model/template';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProgramsService } from '../../../services/programs.service';
import { AsyncPipe } from '@angular/common';
import { IDBExercise, IDBSet } from '../../../model/exercise';
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-exercise-info',
  imports: [AsyncPipe, MatIcon, MatButtonModule],
  templateUrl: './exercise-info.component.html',
  styleUrl: './exercise-info.component.scss',
})
export class ExerciseInfoComponent implements OnInit {
  private programsService = inject(ProgramsService);
  private modalService = inject(ModalService);
  private route = inject(ActivatedRoute);
  templateId: string;
  exerciseId: string;

  template$ = new BehaviorSubject<IDBTemplate>({} as IDBTemplate);
  exercise$ = new BehaviorSubject<IDBExercise>({} as IDBExercise);

  ngOnInit(): void {
    this.templateId = this.route.snapshot.paramMap.get('templateId') as string;
    this.exerciseId = this.route.snapshot.paramMap.get('exerciseId') as string;

    this.programsService.getTemplate(this.templateId).subscribe((template) => {
      this.setNextExercises(template);
    });
  }

  setNextExercises(template: IDBTemplate) {
    this.template$.next(template);
    const exercise = template.exercises.find((exercise) => exercise.id === +this.exerciseId);
    this.exercise$.next(exercise as IDBExercise);
  }

  handleDeleteSet(setId: number) {
    this.programsService.removeSet(setId).subscribe((template) => {
      this.setNextExercises(template);
    })
  }

  handleAddSet() {
    this.programsService.addSetsToTemplateExercise(this.templateId, this.exerciseId, [{ reps: 0, weight: 0 }]).subscribe((template) => {
      this.setNextExercises(template);
    })
  }

  openEditSetModal(set: IDBSet) {
    this.modalService.openModal(set);
  }
}
