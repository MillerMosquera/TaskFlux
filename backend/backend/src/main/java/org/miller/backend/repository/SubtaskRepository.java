package org.miller.backend.repository;

import org.miller.backend.model.Subtask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SubtaskRepository extends JpaRepository<Subtask, UUID> {
    List<Subtask> findByParentTaskId(UUID parentTaskId);

    List<Subtask> findByAssignedTo_Id(UUID assignedToUserId);
}