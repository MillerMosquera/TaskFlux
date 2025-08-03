package org.miller.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tags")
public class Tag {
    @Id
    private UUID id;
    
    private String name;
    private String color;
    private String description;

    @ManyToMany(mappedBy = "tags")
    private Set<Task> tasks;
}