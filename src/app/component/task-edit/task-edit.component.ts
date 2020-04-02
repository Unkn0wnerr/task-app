import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Task } from './../../model/task';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {



  submitted = false;
  editForm: FormGroup;
  taskData: Task[];


  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateTask();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getTask(id);
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      priority: ['', [Validators.required, Validators.pattern('[0-9]')]]
    })
  }

  get myForm() {
    return this.editForm.controls;
  }
  getTask(id) {
    this.apiService.getTask(id).subscribe(data => {
      this.editForm.setValue({
        title: data['title'],
        description: data['description'],
        date: data['date'],
        priority: data['priority'],
      });
    });
  }

  
  updateTask() {
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      priority: ['', [Validators.required, Validators.pattern('[0-9]')]]
    })
  }

  
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateTask(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/tasks-list');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}
