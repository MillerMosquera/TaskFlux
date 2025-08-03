package org.miller.backend.service.impl;

import org.miller.backend.model.Subtask;
import org.miller.backend.repository.SubtaskRepository;
import org.miller.backend.service.SubtaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SubtaskServiceImpl implements SubtaskService {

    @Autowired
    private SubtaskRepository subtaskRepository;

    @Override
    public List<Subtask> getAllSubtasks() {
        return subtaskRepository.findAll();
    }

    @Override
    public Optional<Subtask> getSubtaskById(UUID id) {
        return subtaskRepository.findById(id);
    }

    @Override
    public Subtask createSubtask(Subtask subtask) {
        subtask.setId(UUID.randomUUID());
        subtask.setCreatedAt(LocalDateTime.now());
        subtask.setUpdatedAt(LocalDateTime.now());
        return subtaskRepository.save(subtask);
    }

    @Override
    public Subtask updateSubtask(UUID id, Subtask subtaskDetails) {
        return subtaskRepository.findById(id)
                .map(subtask -> {
                    subtask.setParentTask(subtaskDetails.getParentTask());
                    subtask.setTitle(subtaskDetails.getTitle());
                    subtask.setDescription(subtaskDetails.getDescription());
                    subtask.setStatus(subtaskDetails.getStatus());
                    subtask.setAssignedTo(subtaskDetails.getAssignedTo());
                    subtask.setDueDate(subtaskDetails.getDueDate());
                    subtask.setUpdatedAt(LocalDateTime.now());
                    return subtaskRepository.save(subtask);
                }).orElseThrow(() -> new RuntimeException("Subtask not found with id " + id));
    }

    @Override
    public void deleteSubtask(UUID id) {
        subtaskRepository.deleteById(id);
    }

    @Override
    public List<Subtask> getSubtasksByParentTaskId(UUID parentTaskId) {
        return subtaskRepository.findByParentTaskId(parentTaskId);
    }

    @Override
    public List<Subtask> getSubtasksByAssignedTo(UUID assignedToUserId) {
        return subtaskRepository.findByAssignedTo_Id(assignedToUserId);
    }
}