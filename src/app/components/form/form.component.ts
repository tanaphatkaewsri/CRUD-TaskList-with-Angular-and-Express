import { Component, OnInit, NgZone } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private dataService: DataService
  ) {}

  toggleForm: boolean = true;

  new_task: any = {
    id: '',
    task: '',
    date: '',
    reminder: false,
  };

  // update_task: any = {
  //   id: '',
  //   task: '',
  //   date: '',
  //   reminder: false,
  // };

  tasks: any = {};

  fetch_after_post: boolean = true;

  click_edit: boolean = false;

  ngOnInit() {
    // if (typeof NgZone !== 'undefined') {
    //   console.log('Form Angular Component');
    // } else {
    //   console.log('Form Non Angular Component');
    // }

    this.eventService.buttonClick$.subscribe((value: any) => {
      this.toggleForm = !value;
      // console.log(value);
    });

    // this.eventService.showFormAfterEdit$.subscribe((value: any) => {
    //   this.click_edit = true;
    //   // this.new_task.id = value.id;
    //   this.new_task.task = value.task;
    //   this.new_task.date = value.date;
    //   this.new_task.reminder = value.reminder;
    // });
  }

  onSubmit() {
    if (!this.click_edit) {
      console.log('submit to receive data from form', this.new_task);
      // this.new_task.id = value.id;
      this.dataService.postTask(this.new_task).subscribe(
        (response) => {
          console.log('POST request successful: ', response);
          this.new_task.task = '';
          this.new_task.date = '';
          this.new_task.reminder = false;
          this.eventService.emitAfterRequest(this.fetch_after_post);
        },
        (error) => {
          console.error('POST request error: ', error);
        }
      );
    } else {
    }
  }
}
