import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { EditSetModalComponent } from '../shared/components/edit-set-modal/edit-set-modal.component';
import { ModalService } from '../services/modal.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, MatIconModule, RouterLinkWithHref, AsyncPipe, EditSetModalComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  private modalService = inject(ModalService);
  isShown$ = this.modalService.isShown$;
}
