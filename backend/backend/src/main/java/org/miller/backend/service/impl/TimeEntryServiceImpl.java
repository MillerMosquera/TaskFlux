package org.miller.backend.service.impl;

import org.miller.backend.model.TimeEntry;
import org.miller.backend.repository.TimeEntryRepository;
import org.miller.backend.service.TimeEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TimeEntryServiceImpl implements TimeEntryService {

    @Autowired
    private TimeEntryRepository timeEntryRepository;

    @Override
    public List<TimeEntry> getAllTimeEntries() {
        return timeEntryRepository.findAll();
    }

    @Override
    public Optional<TimeEntry> getTimeEntryById(UUID id) {
        return timeEntryRepository.findById(id);
    }

    @Override
    public TimeEntry createTimeEntry(TimeEntry timeEntry) {
        timeEntry.setId(UUID.randomUUID());
        return timeEntryRepository.save(timeEntry);
    }

    @Override
    public TimeEntry updateTimeEntry(UUID id, TimeEntry timeEntryDetails) {
        return timeEntryRepository.findById(id)
                .map(timeEntry -> {
                    timeEntry.setTask(timeEntryDetails.getTask());
                    timeEntry.setUser(timeEntryDetails.getUser());
                    timeEntry.setStartTime(timeEntryDetails.getStartTime());
                    timeEntry.setEndTime(timeEntryDetails.getEndTime());
                    timeEntry.setDurationMinutes(timeEntryDetails.getDurationMinutes());
                    timeEntry.setDescription(timeEntryDetails.getDescription());
                    return timeEntryRepository.save(timeEntry);
                }).orElseThrow(() -> new RuntimeException("TimeEntry not found with id " + id));
    }

    @Override
    public void deleteTimeEntry(UUID id) {
        timeEntryRepository.deleteById(id);
    }

    @Override
    public List<TimeEntry> getTimeEntriesByTaskId(UUID taskId) {
        return timeEntryRepository.findByTaskId(taskId);
    }

    @Override
    public List<TimeEntry> getTimeEntriesByUserId(UUID userId) {
        return timeEntryRepository.findByUserId(userId);
    }
}