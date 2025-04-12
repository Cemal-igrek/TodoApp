package com.way2p.TodoApp.repositories;

import com.way2p.TodoApp.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo,Integer> {

    @Query(value = "SELECT * FROM Todo", nativeQuery = true)
    List<Todo> findAll();
}
