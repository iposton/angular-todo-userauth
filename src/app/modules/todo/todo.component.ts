import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { first } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public todos?: any;
  public task = new FormControl('', Validators.maxLength(40));
  public isCompleted?: boolean = false;
  constructor(private todoService: TodoService) {

  }

  // public get f() { return this.task; }

  public onChange(event: any, isCompleted: boolean) {
    console.log(event.target.value, 'todo selected');
    let index = event.target.value;
    //build data object
    let todoStatus = this.todos[index].completed = isCompleted;
    let taskVal = this.todos[index].task;
    let todoID = this.todos[index].id;
    let data = {task: taskVal, completed: todoStatus};

    this.todoService.updateTodo(todoID, data).subscribe(res => {
      console.log(res, 'res from node api');
      if (res != null && (res as any).status === 200)
        this.getAll();
      else 
       console.log('something went wrong');
    });
  }

  public getAll() {
    this.todoService.getTodos().pipe(first()).subscribe(todos => {
      this.todos = todos;
      console.log(todos, 'todos from nodejs API');
    });
  }

  public createTask() {
    if (this.task.hasError('maxlength')) {
      console.log('task too many characters, it can only be 40 characters long. summarize your task.')
      return
    }
    console.log(this.task.value, 'send this task to server')
    let data = {task: this.task.value, completed: false};
    this.todoService.createTodo(data).subscribe((res) => {
      console.log(res, 'res from node api');
      //get updated list of todos after a new one is succesfully created
      if (res != null && (res as any).status === 200)
        this.getAll();
      else 
       console.log('something went wrong')
    });
  }

  public deleteTask(todo: any) {
    console.log(`delete task: ${todo.task} by id: ${todo.id}`)
    this.todoService.deleteTodo(todo.id, todo).subscribe(res => {
      console.log(res, 'res from node api');
      if (res != null && (res as any).status === 200)
        this.getAll();
      else 
       console.log('something went wrong')
    });
  }

  ngOnInit(): void {
    //Loading all todos from server onInit
    this.getAll();
  }
}
