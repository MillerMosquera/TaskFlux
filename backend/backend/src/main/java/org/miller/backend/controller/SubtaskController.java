package org.miller.backend.controller;

import org.miller.backend.model.Subtask;
import org.miller.backend.service.SubtaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/subtasks")
public class SubtaskController {

    private final SubtaskService subtaskService;

    public SubtaskController(SubtaskService subtaskService) {
        this.subtaskService = subtaskService;
    }

    @GetMapping
    public List<Subtask> getAllSubtasks() {
        return subtaskService.getAllSubtasks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subtask> getSubtaskById(@PathVariable String id) {
        try {
            UUID uuid = UUID.fromString(id);
            return subtaskService.getSubtaskById(uuid)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<Subtask> createSubtask(@RequestBody Subtask subtask) {
        Subtask createdSubtask = subtaskService.createSubtask(subtask);
        return new ResponseEntity<>(createdSubtask, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subtask> updateSubtask(@PathVariable UUID id, @RequestBody Subtask subtaskDetails) {
        try {
            Subtask updatedSubtask = subtaskService.updateSubtask(id, subtaskDetails);
            return ResponseEntity.ok(updatedSubtask);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubtask(@PathVariable UUID id) {
        subtaskService.deleteSubtask(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/parenttask/{parentTaskId}")
    public List<Subtask> getSubtasksByParentTaskId(@PathVariable UUID parentTaskId) {
        return subtaskService.getSubtasksByParentTaskId(parentTaskId);
    }

    @GetMapping("/assignedto/{assignedToUserId}")
    public List<Subtask> getSubtasksByAssignedTo(@PathVariable UUID assignedToUserId) {
        return subtaskService.getSubtasksByAssignedTo(assignedToUserId);
    }
}