import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private buttonClickSubject = new Subject<void>();

  private emitAfterRequestSubject = new Subject<boolean>();

  // private showFormAfterEditSubject = new Subject<boolean>();

  private emitUpdateTaskSubject = new Subject<any>();

  emitUpdateTask$ = this.emitUpdateTaskSubject.asObservable();

  buttonClick$ = this.buttonClickSubject.asObservable();

  emitAfterRequest$ = this.emitAfterRequestSubject.asObservable();

  // showFormAfterEdit$ = this.showFormAfterEditSubject.asObservable();

  constructor() {}

  emitButtonClick(data: any) {
    // console.log('come from body');

    this.buttonClickSubject.next(data);
    this.buttonClick$.subscribe(() => {
      // console.log('can subscribe?')
    });
  }

  emitAfterRequest(data: any) {
    this.emitAfterRequestSubject.next(data);
  }

  // showFormAfterEdit(data: any) {
  //   this.showFormAfterEditSubject.next(data);
  // }

  emitUpdateTask(task: any) {
    // console.log('come first?')
    this.emitUpdateTaskSubject.next(task);
  }
}
