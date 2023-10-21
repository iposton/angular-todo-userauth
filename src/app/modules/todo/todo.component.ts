import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public todos?: Todo[]
  constructor(private todoService: TodoService) {

  }

  ngOnInit(): void {
    this.todoService.getTodos().pipe(first()).subscribe(todos => {
      this.todos = todos
      console.log(todos, 'todos from nodejs API')
  });
  }
}
