import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  public headers: any;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
   }

  public createList(data: object) {
    return this.http.post(`${environment.apiUrl}/lists`, data, {headers: this.headers});
  }

  public getLists() {
    return this.http.get<Todo[]>(`${environment.apiUrl}/lists`);
  }

  public updateList(id: string, data: object) {
    return this.http.post(`${environment.apiUrl}/lists/${id}`, data, {headers: this.headers});
  }

  public deleteList(id: string, data: object) {
    return this.http.delete(`${environment.apiUrl}/lists/${id}`, data);
  }
}
