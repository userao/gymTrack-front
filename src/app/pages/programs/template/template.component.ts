import { Component, inject, Input, OnInit } from '@angular/core';
import { ProgramsService } from '../../../services/programs.service';

@Component({
  selector: 'app-template',
  imports: [],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
})
export class TemplateComponent implements OnInit {
  @Input() template: any;

  private programsService = inject(ProgramsService);

  ngOnInit(): void {
    this.programsService.getTemplate(this.template.id).subscribe((data) => {
      this.template = data;
    })
  }
}
