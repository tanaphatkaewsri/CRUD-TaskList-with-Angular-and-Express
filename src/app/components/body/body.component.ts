import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {
  faTrash,
  faGear,
  faSquareCheck,
} from '@fortawesome/free-solid-svg-icons';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  tasks: any = {};

  faTrash = faTrash;
  faGear = faGear;
  faSquareCheck = faSquareCheck;

  // toggleForm: boolean = false;

  constructor(
    private dataService: DataService,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchData();
    this.eventService.emitAfterRequest$.subscribe((value) => {
      if (value) {
        this.fetchData();
      }
    });
  }

  fetchData() {
    this.dataService.getData().subscribe((value) => {
      if (value) {
        // console.log('data value: ', value);
        // console.log('access value with id 1: ', value[0].id);
        this.tasks = value;
        // console.log('data inside is:', typeof this.tasks);
      } else {
        console.log('Properties is not defined');
      }
    });
  }

  deleteTask(id: number) {
    // console.log(id);
    this.dataService.deleteTask(id).subscribe(
      (response) => {
        this.tasks = this.tasks.filter((task: any) => task.id !== id);
        // console.log(this.tasks);
        console.log('delete task done!: ', response);
      },
      (error) => {
        console.error('error deleting resource: ', error);
      }
    );
  }

  reminderTask(id: number, task: any) {
    // console.log('id', id);
    // console.log('task', task);

    task.reminder = !task.reminder;

    // console.log(task.reminder);
    console.log(typeof id)

    this.dataService.putTask(id, task).subscribe(
      (response) => {
        console.log('reminder checked: ', response);
      },
      (error) => {
        console.error('reminder not success: ', error);
      }
    );
  }

  editTask(task: any) {
    // this.toggleForm = !this.toggleForm;
    // console.log('emit update task', task);
    // console.log('task?', task)
    this.eventService.emitUpdateTask(task);
    // this.eventService.emitButtonClick(this.toggleForm);
    this.eventService.emitUpdateTask$.subscribe((value) => {
      // console.log('value come: go next: ', value);
      this.router.navigate(['/edit'], { state: { data: value } });
    });
  }
}
