package org.miller.backend.repository;

import org.miller.backend.model.TaskList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskListRepository extends JpaRepository<TaskList, UUID> {
    List<TaskList> findBySpaceId(UUID spaceId);

    List<TaskList> findByCreatedBy_Id(UUID createdByUserId);
}