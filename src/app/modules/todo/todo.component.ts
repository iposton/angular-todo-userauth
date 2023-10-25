import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ListService } from '../../services/list.service';
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
  public lists?: any;
  public task = new FormControl('', Validators.maxLength(40));
  public list = new FormControl('', Validators.maxLength(40));
  public updatedList = new FormControl('', Validators.maxLength(40));
  public isCompleted?: boolean = false;
  public edited?: string;
  public selectedList?: any;
  public selectedListID?: any;
  public updateText?: boolean = false;

  constructor(private todoService: TodoService, private listService: ListService) {

  }

  public onSelect(event: any) {
    console.log(event.target.value, 'list selected');
    let index = event.target.value;
    //build data object
    this.selectedList = this.lists[index];
    this.selectedListID = this.lists[index].id;
    let data = {name: this.selectedList.name};
  }

  public getLists() {
    this.listService.getLists().pipe(first()).subscribe(lists => {
      this.lists = lists;
      this.daysSinceEdited();

      this.selectedList = this.lists.length > 0 ? this.lists[0] : [];
      this.selectedListID = this.lists.length > 0 ? this.lists[0].id : '';
      console.log(lists, 'lists from nodejs API');
    });
  }

  public updateList() {
    if (this.updatedList.hasError('maxlength')) {
      console.log('List has too many characters, it can only be 40 characters long. summarize your task.')
      return
    }
    this.listService.updateList(this.selectedListID, {name: this.updatedList.value}).subscribe(res => {
      console.log(res, 'res from node api');
      if (res != null && (res as any).status === 200) {
        this.updateText = false;
        this.updatedList.reset();
        this.getLists();
      } else {
        console.log('something went wrong');
      }  
    });
  }

  public createList() {
    if (this.list.hasError('maxlength')) {
      console.log('List has too many characters, it can only be 40 characters long. summarize your task.')
      return
    }
    console.log(this.list.value, 'send this List name to server')
    let data = {name: this.list.value};
    this.listService.createList(data).subscribe((res) => {
      console.log(res, 'res from node api');
      //get updated list of todos after a new one is succesfully created
      if (res != null && (res as any).status === 200) {
        this.getLists();
        this.list.reset();
      } else {
        console.log('something went wrong')
      }
    });
  }

  public deleteList(list: any) {
    console.log(`delete task: ${list.task} by id: ${list.id}`)
    this.listService.deleteList(list.id, list).subscribe(res => {
      console.log(res, 'res from node api');
      if (res != null && (res as any).status === 200)
        this.getLists();
      else 
       console.log('something went wrong')
    });
  }


  public onChange(event: any, isCompleted: boolean) {
    console.log(event.target.value, 'todo selected');
    let index = event.target.value;
    //build data object
    let todoStatus = this.todos[index].completed = isCompleted;
    let taskVal = this.todos[index].task;
    let todoID = this.todos[index].id;
    let blID = this.todos[index].belongsToID;
    let data = {task: taskVal, completed: todoStatus, belongsToID: blID};

    this.todoService.updateTodo(todoID, data).subscribe(res => {
      console.log(res, 'res from node api');
      if (res != null && (res as any).status === 200)
        this.getTodos();
      else 
       console.log('something went wrong');
    });
  }

  public getTodos() {
    this.todoService.getTodos().pipe(first()).subscribe(todos => {
      this.todos = todos;
      this.daysSinceEdited();
      console.log(todos, 'todos from nodejs API');
    });
  }

  public createTask() {
    if (this.task.hasError('maxlength')) {
      console.log('task has too many characters, it can only be 40 characters long. summarize your task.')
      return
    }
    console.log(this.task.value, 'send this task to server')
    let data = {task: this.task.value, completed: false, belongsToID: this.selectedListID};
    this.todoService.createTodo(data).subscribe((res) => {
      console.log(res, 'res from node api');
      //get updated list of todos after a new one is succesfully created
      if (res != null && (res as any).status === 200) {
        this.getTodos();
        this.task.reset();
      } else {
        console.log('something went wrong')
      }
       
    });
  }

  public deleteTask(todo: any) {
    console.log(`delete task: ${todo.task} by id: ${todo.id}`)
    this.todoService.deleteTodo(todo.id, todo).subscribe(res => {
      console.log(res, 'res from node api');
      if (res != null && (res as any).status === 200)
        this.getTodos();
      else 
       console.log('something went wrong')
    });
  }

  ngOnInit(): void {
    //Loading all todos from server onInit
    this.getTodos();
    this.getLists();
  }

  public daysSinceEdited() {
    if (this.todos != null && this.todos.length === 0) {
      return
    }
    let datePipe = new DatePipe("en-US");
    let today = datePipe.transform(new Date(), 'dd/MM/yyyy');
    let arrayVal = datePipe.transform(this.todos[0].lastEdited, 'dd/MM/yyyy');
    let Difference_In_Time = new Date().getTime() - new Date(this.todos[0].lastedited).getTime(); 
    console.log(today, 'today', arrayVal, 'arrayVal')
    if (arrayVal === today) {
      this.edited = 'Today';
    } else {
      
      //how many days since last edited compared to today
      //get time passed from lastedited compared to new date()
      this.edited = `${Difference_In_Time} days ago.`
    }
  }
}
