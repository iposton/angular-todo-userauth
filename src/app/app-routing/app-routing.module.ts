import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from '../modules/todo/todo.component';
import { LoginComponent } from '../modules/login/login.component';
import { AuthGuard } from '../utilities/auth.guard';

const routes: Routes = [
  { 
        path: '', 
        component: TodoComponent, 
        canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  {
        path: '**', 
        redirectTo: ''
  }
 
 ]

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
