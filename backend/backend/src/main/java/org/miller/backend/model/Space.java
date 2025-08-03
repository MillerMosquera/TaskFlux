package org.miller.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "spaces")
public class Space {
    @Id
    private UUID id;

    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "space")
    private Set<Task> tasks;

    @OneToMany(mappedBy = "space")
    private Set<TaskList> lists;

    @OneToMany(mappedBy = "space")
    private Set<Goal> goals;
}
