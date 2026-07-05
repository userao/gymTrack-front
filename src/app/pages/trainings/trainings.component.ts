import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-trainings',
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss',
})
export class TrainingsComponent {
  dateForm = new FormGroup({
    date: new FormControl(new Date())
  })
}
