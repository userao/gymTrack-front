import { Component, inject, Input, OnInit } from '@angular/core';
import { ProgramsService } from '../../../services/programs.service';
import { ITemplate } from '../../../model/tepmlate';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-template',
  imports: [AsyncPipe],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
})
export class TemplateComponent implements OnInit {
  @Input() template: ITemplate;

  withExercises$ = new BehaviorSubject<ITemplate>({} as ITemplate);

  private programsService = inject(ProgramsService);

  ngOnInit(): void {
    this.programsService.getTemplate(this.template.id).subscribe((template) => {
      this.withExercises$.next(template);
    });
  }
}
