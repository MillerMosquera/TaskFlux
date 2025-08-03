package org.miller.backend.service;

import org.miller.backend.model.Goal;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GoalService {
    List<Goal> getAllGoals();

    Optional<Goal> getGoalById(UUID id);

    Goal createGoal(Goal goal);

    Goal updateGoal(UUID id, Goal goalDetails);

    void deleteGoal(UUID id);

    List<Goal> getGoalsBySpaceId(UUID spaceId);

    List<Goal> getGoalsByCreatedBy(UUID createdByUserId);
}