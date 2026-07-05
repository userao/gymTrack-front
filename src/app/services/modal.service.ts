import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private dataSubject = new BehaviorSubject<any>(null);
  readonly data$ = this.dataSubject.asObservable();
  private isShownSubject = new BehaviorSubject<boolean>(false);
  readonly isShown$ = this.isShownSubject.asObservable();


  closeModal() {
    this.dataSubject.next(null);
    this.isShownSubject.next(false);
  }

  openModal(data: any) {
    this.dataSubject.next(data);
    this.isShownSubject.next(true);
  }
}
