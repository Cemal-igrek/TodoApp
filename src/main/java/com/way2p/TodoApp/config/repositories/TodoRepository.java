package com.way2p.TodoApp.config.repositories;

import com.way2p.TodoApp.config.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo,Integer> {

}
