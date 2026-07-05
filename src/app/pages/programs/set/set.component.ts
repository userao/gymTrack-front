import { Component, Input } from '@angular/core';
import { IDBSet } from '../../../model/exercise';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-set',
  imports: [MatExpansionModule, MatIconModule, ReactiveFormsModule, MatInputModule, MatIconModule],
  templateUrl: './set.component.html',
  styleUrl: './set.component.scss',
})
export class SetComponent {
  @Input() set: IDBSet;

  setForm = new FormGroup({
    weight: new FormControl(0),
    reps: new FormControl(0),
  }
  )
}
