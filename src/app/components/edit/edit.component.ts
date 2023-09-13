import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  // check_task_come: boolean = false;
  new_task = {
    id: '',
    task: '',
    date: '',
    reminder: '',
  };

  id: number;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): any {
    // console.log('still on time?');

    // this.runCode();
    // console.log(this.new_task);

    const navigationState = window.history.state;
    if (navigationState && navigationState.data) {
      this.new_task = navigationState.data;
      // console.log('new task', this.new_task);
    }

    // this.route.params.subscribe((params) => {
    //   const data = params['data'];
    //   console.log(data);
    // });
  }

  // runCode() {
  //   console.log('come runCode');
  //   this.eventService.emitUpdateTask$.subscribe((value) => {
  //     this.new_task = value;

  //     console.log(JSON.stringify(this.new_task, null, 2));
  //   });
  // }

  onSubmit() {
    // console.log('onSubmit');
    this.id = parseInt(this.new_task.id);
    // console.log(typeof this.id);
    // console.log(this.new_task);
    this.dataService.putTask(this.id, this.new_task).subscribe(
      (response) => {
        console.log('Update Success', response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Update not success', error);
      }
    );
  }
}
