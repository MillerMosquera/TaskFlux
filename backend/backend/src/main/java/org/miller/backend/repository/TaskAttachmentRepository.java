package org.miller.backend.repository;

import org.miller.backend.model.TaskAttachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface TaskAttachmentRepository extends JpaRepository<TaskAttachment, UUID> {
    List<TaskAttachment> findByTaskId(UUID taskId);
    List<TaskAttachment> findByUploadedBy_Id(UUID uploadedByUserId);
}