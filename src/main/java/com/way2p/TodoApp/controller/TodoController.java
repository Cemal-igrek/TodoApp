package com.way2p.TodoApp.controller;

import com.way2p.TodoApp.entity.Todo;
import com.way2p.TodoApp.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @PostMapping
    public Todo createTodo(@RequestBody Todo todo){
        todo.setDateCreated(new Date());
        todo.setLastUpdated(new Date());
        return todoRepository.save(todo);
    }
    @GetMapping
    public List<Todo> getTodos() {
        return todoRepository.findAll();
    }

}
