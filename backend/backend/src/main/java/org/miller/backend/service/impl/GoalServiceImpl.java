package org.miller.backend.service.impl;

import org.miller.backend.model.Goal;
import org.miller.backend.repository.GoalRepository;
import org.miller.backend.service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class GoalServiceImpl implements GoalService {

    @Autowired
    private GoalRepository goalRepository;

    @Override
    public List<Goal> getAllGoals() {
        return goalRepository.findAll();
    }

    @Override
    public Optional<Goal> getGoalById(UUID id) {
        return goalRepository.findById(id);
    }

    @Override
    public Goal createGoal(Goal goal) {
        goal.setId(UUID.randomUUID());
        goal.setCreatedAt(LocalDateTime.now());
        return goalRepository.save(goal);
    }

    @Override
    public Goal updateGoal(UUID id, Goal goalDetails) {
        return goalRepository.findById(id)
                .map(goal -> {
                    goal.setSpace(goalDetails.getSpace());
                    goal.setName(goalDetails.getName());
                    goal.setDescription(goalDetails.getDescription());
                    goal.setDueDate(goalDetails.getDueDate());
                    goal.setCreatedBy(goalDetails.getCreatedBy());
                    // CreatedAt is usually set on creation, but if you want to update it, uncomment below
                    // goal.setCreatedAt(goalDetails.getCreatedAt());
                    return goalRepository.save(goal);
                }).orElseThrow(() -> new RuntimeException("Goal not found with id " + id));
    }

    @Override
    public void deleteGoal(UUID id) {
        goalRepository.deleteById(id);
    }

    @Override
    public List<Goal> getGoalsBySpaceId(UUID spaceId) {
        return goalRepository.findBySpaceId(spaceId);
    }

    @Override
    public List<Goal> getGoalsByCreatedBy(UUID createdByUserId) {
        return goalRepository.findByCreatedBy_Id(createdByUserId);
    }
}