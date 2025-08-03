package org.miller.backend.controller;

import org.miller.backend.model.Goal;
import org.miller.backend.service.GoalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping
    public List<Goal> getAllGoals() {
        return goalService.getAllGoals();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Goal> getGoalById(@PathVariable String id) {
        try {
            UUID uuid = UUID.fromString(id);
            return goalService.getGoalById(uuid)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<Goal> createGoal(@RequestBody Goal goal) {
        Goal createdGoal = goalService.createGoal(goal);
        return new ResponseEntity<>(createdGoal, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Goal> updateGoal(@PathVariable UUID id, @RequestBody Goal goalDetails) {
        try {
            Goal updatedGoal = goalService.updateGoal(id, goalDetails);
            return ResponseEntity.ok(updatedGoal);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable UUID id) {
        goalService.deleteGoal(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/space/{spaceId}")
    public List<Goal> getGoalsBySpaceId(@PathVariable UUID spaceId) {
        return goalService.getGoalsBySpaceId(spaceId);
    }

    @GetMapping("/createdby/{createdByUserId}")
    public List<Goal> getGoalsByCreatedBy(@PathVariable UUID createdByUserId) {
        return goalService.getGoalsByCreatedBy(createdByUserId);
    }
}