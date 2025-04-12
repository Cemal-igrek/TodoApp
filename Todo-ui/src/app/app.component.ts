import { Component, OnInit } from '@angular/core';
import { MaterialModule } from './material.module';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';  // Burayı ekledik
import { Todo } from './models/todo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,   // Standalone olarak işaretlendi
  imports: [MaterialModule, ReactiveFormsModule, HttpClientModule,CommonModule],  // Buraya HttpClientModule ekledik
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  todoForm!: FormGroup;
  title = 'todo-fullstack';

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      completed: [false]
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
    const todoRequest: Todo = {
      name: formValue.name,
      description: formValue.description,
      completed: false,
    };
    this.httpService.createTodo(todoRequest).subscribe((data) => {});
  }
}
