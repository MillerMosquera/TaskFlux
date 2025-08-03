package org.miller.backend.service.impl;

import org.miller.backend.model.TaskDependency;
import org.miller.backend.repository.TaskDependencyRepository;
import org.miller.backend.service.TaskDependencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskDependencyServiceImpl implements TaskDependencyService {

    @Autowired
    private TaskDependencyRepository taskDependencyRepository;

    @Override
    public List<TaskDependency> getAllTaskDependencies() {
        return taskDependencyRepository.findAll();
    }

    @Override
    public Optional<TaskDependency> getTaskDependencyById(UUID id) {
        return taskDependencyRepository.findById(id);
    }

    @Override
    public TaskDependency createTaskDependency(TaskDependency taskDependency) {
        taskDependency.setId(UUID.randomUUID());
        return taskDependencyRepository.save(taskDependency);
    }

    @Override
    public TaskDependency updateTaskDependency(UUID id, TaskDependency taskDependencyDetails) {
        return taskDependencyRepository.findById(id)
                .map(taskDependency -> {
                    taskDependency.setTask(taskDependencyDetails.getTask());
                    taskDependency.setDependsOnTask(taskDependencyDetails.getDependsOnTask());
                    return taskDependencyRepository.save(taskDependency);
                }).orElseThrow(() -> new RuntimeException("TaskDependency not found with id " + id));
    }

    @Override
    public void deleteTaskDependency(UUID id) {
        taskDependencyRepository.deleteById(id);
    }

    @Override
    public List<TaskDependency> getTaskDependenciesByTaskId(UUID taskId) {
        return taskDependencyRepository.findByTaskId(taskId);
    }

    @Override
    public List<TaskDependency> getTaskDependenciesByDependsOnTaskId(UUID dependsOnTaskId) {
        return taskDependencyRepository.findByDependsOnTaskId(dependsOnTaskId);
    }
}