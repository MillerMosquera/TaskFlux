package org.miller.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tasks")
public class Task {
    @Id
    private UUID id;

    private String title;
    private String description;
    private String status;
    private String priority;
    private LocalDate dueDate;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private User assignedTo;

    @ManyToOne
    @JoinColumn(name = "space_id")
    private Space space;

    @ManyToOne
    @JoinColumn(name = "list_id")
    private TaskList list;

    @ManyToOne
    @JoinColumn(name = "goal_id")
    private Goal goal;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "task")
    private Set<TaskSchedule> schedules;

    @ManyToMany
    @JoinTable(
            name = "task_tags",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags;

    @OneToMany(mappedBy = "task")
    private Set<TaskComment> comments;

    @OneToMany(mappedBy = "task")
    private Set<TaskAttachment> attachments;

    @OneToMany(mappedBy = "parentTask")
    private Set<Subtask> subtasks;

    @OneToMany(mappedBy = "task")
    private Set<TimeEntry> timeEntries;

    @OneToMany(mappedBy = "task")
    private Set<TaskHistory> history;

    @OneToMany(mappedBy = "task")
    private Set<TaskDependency> dependencies;

    @OneToMany(mappedBy = "dependsOnTask")
    private Set<TaskDependency> dependents;
}
