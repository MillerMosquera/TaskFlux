package org.miller.backend.service;

import org.miller.backend.model.Task;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskService {
    List<Task> getAllTasks();

    Optional<Task> getTaskById(UUID id);

    Task createTask(Task task);

    Task updateTask(UUID id, Task taskDetails);

    void deleteTask(UUID id);

    List<Task> getTasksByCreatedBy(UUID createdByUserId);

    List<Task> getTasksByAssignedTo(UUID assignedToUserId);

    List<Task> getTasksBySpaceId(UUID spaceId);

    List<Task> getTasksByListId(UUID listId);

    List<Task> getTasksByGoalId(UUID goalId);

    List<Task> getTasksByStatus(String status);

    List<Task> getTasksByPriority(String priority);
}