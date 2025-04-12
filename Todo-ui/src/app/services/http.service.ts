import {Injectable} from '@angular/core';
import {Todo} from '../models/todo';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  todoApi = '/api/todos';

  constructor(private httpClient: HttpClient) {
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>(this.todoApi, todo);

  }

  getTodo(): Observable<Todo[]> {
    return this.httpClient.get<GetTodoResponse>(this.todoApi).pipe(map((data) => {
      return data._embedded.todos;
    }));
  }
  deleteTodo(id:number):Observable<Todo>{
    const deleteUrl=`${this.todoApi}/${id}`
    return this.httpClient.delete<Todo>(deleteUrl);
  }
  updateTodo(todo:Todo){
    const updateUrl =`${this.todoApi}/${todo.id}`
    return this.httpClient.put<Todo>(updateUrl,todo);
  }
  patchTodoStatus(id:number,completedStatus:boolean):Observable<Todo>{
    const patchUrl = `${this.todoApi}/${id}`
    return this.httpClient.patch<Todo>(patchUrl,{
      completed: completedStatus
    });

  }
}


interface GetTodoResponse {
  _embedded: {
    todos: Todo[];
  }
}
