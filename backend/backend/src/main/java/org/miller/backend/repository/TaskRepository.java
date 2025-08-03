package org.miller.backend.repository;

import org.miller.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {
    List<Task> findByCreatedBy_Id(UUID createdByUserId);

    List<Task> findByAssignedTo_Id(UUID assignedToUserId);

    List<Task> findBySpaceId(UUID spaceId);

    List<Task> findByListId(UUID listId);

    List<Task> findByGoalId(UUID goalId);

    List<Task> findByStatus(String status);

    List<Task> findByPriority(String priority);
}