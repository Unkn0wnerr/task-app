import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  submitted = false;
  taskForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
   }

  ngOnInit(): void {
  }

  mainForm() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      priority: ['', [Validators.required, Validators.pattern('[0-9]')]]
    })
  }

  get myForm(){
    return this.taskForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.taskForm.valid) {
      return false;
    } else {
      this.apiService.createTask(this.taskForm.value).subscribe(
        (res) => {
          console.log('Task created successfully!')
          this.ngZone.run(() => this.router.navigateByUrl('/tasks-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }
}
