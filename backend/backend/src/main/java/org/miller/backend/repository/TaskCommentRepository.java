package org.miller.backend.repository;

import org.miller.backend.model.TaskComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface TaskCommentRepository extends JpaRepository<TaskComment, UUID> {
    List<TaskComment> findByTaskId(UUID taskId);
    List<TaskComment> findByUserId(UUID userId);
}