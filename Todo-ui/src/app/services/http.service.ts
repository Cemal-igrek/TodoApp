import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  todoApi = '/api/todos';
  constructor(private httpClient:HttpClient) { }
  createTodo(todo:Todo):Observable<Todo>
  {
    return this.httpClient.post<Todo>(this.todoApi,todo);

  }
}
