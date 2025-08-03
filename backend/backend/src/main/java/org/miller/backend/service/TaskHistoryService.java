package org.miller.backend.service;

import org.miller.backend.model.TaskHistory;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskHistoryService {
    List<TaskHistory> getAllTaskHistoryEntries();

    Optional<TaskHistory> getTaskHistoryById(UUID id);

    TaskHistory createTaskHistory(TaskHistory taskHistory);

    TaskHistory updateTaskHistory(UUID id, TaskHistory taskHistoryDetails);

    void deleteTaskHistory(UUID id);

    List<TaskHistory> getTaskHistoryByTaskId(UUID taskId);

    List<TaskHistory> getTaskHistoryByUserId(UUID userId);
}