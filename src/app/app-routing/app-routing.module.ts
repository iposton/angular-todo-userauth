import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from '../modules/todo/todo.component';
import { LoginComponent } from '../modules/login/login.component';

const routes: Routes = [
  { 
        path: '', 
        component: TodoComponent 
  },
  { path: 'login', component: LoginComponent },
  {
        path: '**', 
        component: TodoComponent
  }
 
 ]

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
