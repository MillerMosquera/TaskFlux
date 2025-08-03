package org.miller.backend.repository;

import org.miller.backend.model.TaskHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskHistoryRepository extends JpaRepository<TaskHistory, UUID> {
    List<TaskHistory> findByTaskId(UUID taskId);

    List<TaskHistory> findByUserId(UUID userId);
}