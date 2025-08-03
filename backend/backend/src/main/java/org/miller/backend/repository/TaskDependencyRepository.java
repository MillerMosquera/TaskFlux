package org.miller.backend.repository;

import org.miller.backend.model.TaskDependency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskDependencyRepository extends JpaRepository<TaskDependency, UUID> {
    List<TaskDependency> findByTaskId(UUID taskId);
    List<TaskDependency> findByDependsOnTaskId(UUID dependsOnTaskId);
}