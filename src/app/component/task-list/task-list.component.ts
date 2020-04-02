import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  Task:any = [];
  constructor(private apiService: ApiService) { 
    this.readTask();
  }

  ngOnInit(): void {
  }

  readTask(){
    this.apiService.getTasks().subscribe((data) => {
     this.Task = data;
    })    
  }

  removeTask(task, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteTask(task._id).subscribe((data) => {
          this.Task.splice(index, 1);
        }
      )    
    }
  }

}
