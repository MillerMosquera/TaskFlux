package org.miller.backend.repository;

import org.miller.backend.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface GoalRepository extends JpaRepository<Goal, UUID> {
    List<Goal> findBySpaceId(UUID spaceId);

    List<Goal> findByCreatedBy_Id(UUID createdBy);
}