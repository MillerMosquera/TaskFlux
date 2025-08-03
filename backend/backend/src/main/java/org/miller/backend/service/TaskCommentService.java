package org.miller.backend.service;

import org.miller.backend.model.TaskComment;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskCommentService {
    List<TaskComment> getAllTaskComments();

    Optional<TaskComment> getTaskCommentById(UUID id);

    TaskComment createTaskComment(TaskComment taskComment);

    TaskComment updateTaskComment(UUID id, TaskComment taskCommentDetails);

    void deleteTaskComment(UUID id);

    List<TaskComment> getTaskCommentsByTaskId(UUID taskId);

    List<TaskComment> getTaskCommentsByUserId(UUID userId);
}