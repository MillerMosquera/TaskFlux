package org.miller.backend.repository;

import org.miller.backend.model.TimeEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface TimeEntryRepository extends JpaRepository<TimeEntry, UUID> {
    List<TimeEntry> findByTaskId(UUID taskId);
    List<TimeEntry> findByUserId(UUID userId);
}