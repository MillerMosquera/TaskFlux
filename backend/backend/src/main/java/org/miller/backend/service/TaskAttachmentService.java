package org.miller.backend.service;

import org.miller.backend.model.TaskAttachment;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskAttachmentService {
    List<TaskAttachment> getAllTaskAttachments();

    Optional<TaskAttachment> getTaskAttachmentById(UUID id);

    TaskAttachment createTaskAttachment(TaskAttachment taskAttachment);

    TaskAttachment updateTaskAttachment(UUID id, TaskAttachment taskAttachmentDetails);

    void deleteTaskAttachment(UUID id);

    List<TaskAttachment> getTaskAttachmentsByTaskId(UUID taskId);

    List<TaskAttachment> getTaskAttachmentsByUploadedBy(UUID uploadedByUserId);
}