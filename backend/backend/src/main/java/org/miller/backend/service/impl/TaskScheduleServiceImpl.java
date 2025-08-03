package org.miller.backend.service.impl;

import org.miller.backend.model.TaskSchedule;
import org.miller.backend.repository.TaskScheduleRepository;
import org.miller.backend.service.TaskScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskScheduleServiceImpl implements TaskScheduleService {

    @Autowired
    private TaskScheduleRepository taskScheduleRepository;

    @Override
    public List<TaskSchedule> getAllTaskSchedules() {
        return taskScheduleRepository.findAll();
    }

    @Override
    public Optional<TaskSchedule> getTaskScheduleById(UUID id) {
        return taskScheduleRepository.findById(id);
    }

    @Override
    public TaskSchedule createTaskSchedule(TaskSchedule taskSchedule) {
        taskSchedule.setId(UUID.randomUUID());
        return taskScheduleRepository.save(taskSchedule);
    }

    @Override
    public TaskSchedule updateTaskSchedule(UUID id, TaskSchedule taskScheduleDetails) {
        return taskScheduleRepository.findById(id)
                .map(taskSchedule -> {
                    taskSchedule.setTask(taskScheduleDetails.getTask());
                    taskSchedule.setStartTime(taskScheduleDetails.getStartTime());
                    taskSchedule.setEndTime(taskScheduleDetails.getEndTime());
                    taskSchedule.setRecurrenceRule(taskScheduleDetails.getRecurrenceRule());
                    taskSchedule.setTimezone(taskScheduleDetails.getTimezone());
                    return taskScheduleRepository.save(taskSchedule);
                }).orElseThrow(() -> new RuntimeException("TaskSchedule not found with id " + id));
    }

    @Override
    public void deleteTaskSchedule(UUID id) {
        taskScheduleRepository.deleteById(id);
    }

    @Override
    public List<TaskSchedule> getTaskSchedulesByTaskId(UUID taskId) {
        return taskScheduleRepository.findByTaskId(taskId);
    }
}