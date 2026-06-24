import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ProgramsService } from '../../../services/programs.service';
import { TemplateComponent } from '../template/template.component';
import { IGroup } from '../../../model/group';
import { ITemplate } from '../../../model/tepmlate';

@Component({
  selector: 'app-group',
  imports: [TemplateComponent, GroupComponent],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
})
export class GroupComponent implements OnInit {
  @Input() group: any;

  private programsService = inject(ProgramsService);

  childrenTemplates = signal<ITemplate[]>([]);
  childrenGroups = signal<IGroup[]>([]);

  ngOnInit(): void {
    this.programsService.getGroup(this.group.id).subscribe((data) => {

      this.childrenTemplates.set(data.childrenTemplates ?? []);
      this.childrenGroups.set(data.childrenGroups ?? []);
    });
  }
}
