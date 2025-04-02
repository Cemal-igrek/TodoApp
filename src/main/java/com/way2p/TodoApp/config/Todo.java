package com.way2p.TodoApp.config;

import jakarta.persistence.*;
import lombok.Data;


import java.util.Date;

@Entity
@Table(name = "todo")
@Data
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "completed")
    private boolean completed;
    @Column(name = "date_created")
    private Date dateCreated;
    @Column(name = "last_updated")
    private Date  lastUpdated;

}
