import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public headers: any;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
   }

  public createTodo(data: object) {
    return this.http.post(`${environment.apiUrl}/todos`, data, {headers: this.headers});
  }

  public getTodos() {
    return this.http.get<Todo[]>(`${environment.apiUrl}/todos?sort=desc`);
  }

  public updateTodo(id: string, data: object) {
    return this.http.post(`${environment.apiUrl}/todos/${id}`, data, {headers: this.headers});
  }

  public deleteTodo(id: string, data: object) {
    return this.http.delete(`${environment.apiUrl}/todos/${id}`, data);
  }
}
