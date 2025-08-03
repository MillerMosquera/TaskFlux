package org.miller.backend.repository;

import org.miller.backend.model.TaskSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface TaskScheduleRepository extends JpaRepository<TaskSchedule, UUID> {
    List<TaskSchedule> findByTaskId(UUID taskId);
}