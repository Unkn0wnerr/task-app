import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskCreateComponent } from './component/task-create/task-create.component';
import { TaskEditComponent } from './component/task-edit/task-edit.component';
import { TaskListComponent } from './component/task-list/task-list.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-task' },
  { path: 'create-task', component:TaskCreateComponent },
  { path: 'edit-task/:id', component:TaskEditComponent },
  { path: 'tasks-list', component:TaskListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
