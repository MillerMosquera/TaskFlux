package org.miller.backend.controller;

import org.miller.backend.model.TaskSchedule;
import org.miller.backend.service.TaskScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/taskschedules")
public class TaskScheduleController {

    @Autowired
    private TaskScheduleService taskScheduleService;

    @GetMapping
    public List<TaskSchedule> getAllTaskSchedules() {
        return taskScheduleService.getAllTaskSchedules();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskSchedule> getTaskScheduleById(@PathVariable UUID id) {
        return taskScheduleService.getTaskScheduleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TaskSchedule> createTaskSchedule(@RequestBody TaskSchedule taskSchedule) {
        TaskSchedule createdTaskSchedule = taskScheduleService.createTaskSchedule(taskSchedule);
        return new ResponseEntity<>(createdTaskSchedule, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskSchedule> updateTaskSchedule(@PathVariable UUID id, @RequestBody TaskSchedule taskScheduleDetails) {
        try {
            TaskSchedule updatedTaskSchedule = taskScheduleService.updateTaskSchedule(id, taskScheduleDetails);
            return ResponseEntity.ok(updatedTaskSchedule);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskSchedule(@PathVariable UUID id) {
        taskScheduleService.deleteTaskSchedule(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/task/{taskId}")
    public List<TaskSchedule> getTaskSchedulesByTaskId(@PathVariable UUID taskId) {
        return taskScheduleService.getTaskSchedulesByTaskId(taskId);
    }
}