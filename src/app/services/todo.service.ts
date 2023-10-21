import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  public createTodo() {
  
  }

  public getTodos() {
    return this.http.get<Todo[]>(`${environment.apiUrl}/todos`);
  }

  public updateTodo() {

  }

  public deleteTodo() {

  }
}
