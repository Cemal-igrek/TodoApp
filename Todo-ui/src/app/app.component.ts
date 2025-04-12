import {Component, OnInit} from '@angular/core';
import {MaterialModule} from './material.module';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpService} from './services/http.service';
import {HttpClientModule} from '@angular/common/http';
import {Todo} from './models/todo';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,   // Standalone olarak işaretlendi
  imports: [MaterialModule, ReactiveFormsModule, HttpClientModule, CommonModule, FormsModule],  // Buraya HttpClientModule ekledik
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  todoForm!: FormGroup;
  title = 'todo-fullstack';
  todos: Todo[] = [];
  isEditMode: boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {
  }

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      completed: [false]
    });
    this.getTodo();
  }

  getTodo() {
    this.httpService.getTodo().subscribe(data => {
      this.todos = data;
    });
  }

  deleteTodo(id: number) {
    this.httpService.deleteTodo(id).subscribe((data) => {
      this.getTodo();
    })
  }

  updateTodo(todo: Todo) {
    this.httpService.updateTodo(todo).subscribe((data) => {
      this.getTodo()
      this.todoForm.reset();
    })
  }

  handleEdit(todo: Todo) {
    this.isEditMode = true;
    delete todo.dataCreated // for new update
    delete todo.lastUpdated
    this.todoForm.setValue(todo);
  }
  patchTodoStatus(id:number,completedStatus:boolean){
    this.httpService.patchTodoStatus(id,completedStatus).subscribe((data) => {
      this.getTodo()
    });
  }


  openSnackBar() {
    this._snackBar.open('Test', 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
    });
  }

  onSubmit() {
    if (this.todoForm.invalid) {
      return;
    }
    const formValue: Todo = this.todoForm.value;
    if (this.isEditMode) {
      this.updateTodo(formValue)
    } else {
      const todoRequest: Todo = {
        name: formValue.name,
        description: formValue.description,
        completed: false,
      };
      this.httpService.createTodo(todoRequest).subscribe((data) => {
        this.getTodo();
      });
    }
  }
}
