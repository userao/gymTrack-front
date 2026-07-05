import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from '../../../services/modal.service';
import { IDBSet } from '../../../model/exercise';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { ProgramsService } from '../../../services/programs.service';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [MatFormField, ReactiveFormsModule, MatInput, MatButtonModule, AsyncPipe],
  selector: 'app-edit-set-modal',
  templateUrl: './edit-set-modal.component.html',
  styleUrl: './edit-set-modal.component.scss',
})
export class EditSetModalComponent implements OnInit, OnDestroy {
  private modalService = inject(ModalService);
  isShown$ = this.modalService.isShown$;
  private programsService = inject(ProgramsService);
  private unsubscriber = new Subject<void>();
  set: IDBSet;

  setForm = new FormGroup({
    weight: new FormControl(''),
    reps: new FormControl('')
  })

  ngOnInit(): void {
    this.modalService.data$.pipe(takeUntil(this.unsubscriber)).subscribe((set: IDBSet) => {
      if (set) {
        this.set = set;
        this.setForm.patchValue({
          weight: set.weight.toString(),
          reps: set.reps.toString()
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  closeModal() {
    this.modalService.closeModal();
  }

  updateSet() {
    const formWeight = this.setForm.value.weight as string;
    const formReps = this.setForm.value.reps as string;

    this.programsService.updateSet(this.set.id, { weight: +formWeight, reps: +formReps }).subscribe(() => {
      this.modalService.closeModal();
    });
  }
}
