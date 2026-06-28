import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private dataSubject = new Subject<any>();
  readonly data$ = this.dataSubject.asObservable();

  private isShownSubject = new Subject<boolean>();
  readonly isShown$ = this.isShownSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }

  closeModal() {
    this.dataSubject.next(null);
    this.isShownSubject.next(false);
  }

  openModal(data: any) {
    this.setData(data);
    this.isShownSubject.next(true);
  }

}
