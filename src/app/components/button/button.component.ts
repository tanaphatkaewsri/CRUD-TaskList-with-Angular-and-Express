import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  btn_name: string = 'Add';

  toggleForm: boolean = true;

  color: string = 'lightgreen';
  text: string = 'Add';

  // private buttonClickSubject = new Subject<void>();

  constructor(private eventService: EventService) {}

  // buttonClick$ = this.buttonClickSubject.asObservable();

  // onButtonClick() {
  //   this.buttonClickSubject.next();
  // }

  // ngOnInit() {
  //   this.buttonClickSubject.subscribe(() => {
  //     console.log('subscribe from subject button');
  //   });
  // }

  onButtonClick() {
    // console.log('you come button click?')
    this.eventService.emitButtonClick(this.toggleForm);
  }

  ngOnInit() {
    this.eventService.buttonClick$.subscribe(() => {
      // console.log('subscribe')
      this.toggleForm = !this.toggleForm;
      if (this.toggleForm) {
        this.text = 'Add';
        this.color = 'lightgreen';
      } else {
        this.text = 'Close';
        this.color = 'red';
      }
    });

    // this.eventService.showFormAfterEdit$.subscribe((value: any) => {
    //   // console.log(value);
    //   this.onButtonClick();
    // });
  }
}
