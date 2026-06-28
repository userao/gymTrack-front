import { Component, inject, Input, OnInit } from '@angular/core';
import { ProgramsService } from '../../../services/programs.service';
import { IDBTemplate } from '../../../model/template';
import { BehaviorSubject, forkJoin, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ModalService } from '../../../services/modal.service';
import { IDBExercise, IDBMuscleGroup } from '../../../model/exercise';

@Component({
  selector: 'app-template',
  imports: [AsyncPipe],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
})

export class TemplateComponent implements OnInit {
  @Input() template: IDBTemplate;
  withExercises$ = new BehaviorSubject<IDBTemplate>({} as IDBTemplate);

  private modalService = inject(ModalService);

  modalShown: boolean = false;
  modalShown$: Observable<boolean>;
  modalData$: Observable<{
    exercises: IDBExercise[],
    muscleGroups: IDBMuscleGroup[],
  }>;

  private programsService = inject(ProgramsService);

  ngOnInit(): void {
    this.modalData$ = this.modalService.data$;
    this.modalShown$ = this.modalService.isShown$;
    this.programsService.getTemplate(this.template.id).subscribe((withExercises) => this.withExercises$.next(withExercises))
  }

  handleShowModal() {
    forkJoin({
      muscleGroups: this.programsService.getMuscleGroups(),
      // тут надо передавать userId из localStorage
      exercises: this.programsService.getExercises(1),
    }).subscribe((data) => {
      this.modalService.openModal(data);
    })
  }

  handleAddExercise(exerciseId: number) {
    this.programsService.addExerciseToTemplate(this.template.id, exerciseId)
      .subscribe((nextTemplate) => this.withExercises$.next(nextTemplate))
    this.handleCloseModal();
  }

  handleCloseModal() {
    this.modalService.closeModal();
  }

  handleAddSet(exerciseId: number) {
    this.programsService.addSetsToTemplateExercise(this.template.id, exerciseId, [{ weight: 0, reps: 0 }])
      .subscribe((nextTemplate) => {
        this.withExercises$.next(nextTemplate)
      })
  }
}
