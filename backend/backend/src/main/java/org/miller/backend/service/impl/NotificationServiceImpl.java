package org.miller.backend.service.impl;

import org.miller.backend.model.Notification;
import org.miller.backend.repository.NotificationRepository;
import org.miller.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    @Override
    public Optional<Notification> getNotificationById(UUID id) {
        return notificationRepository.findById(id);
    }

    @Override
    public Notification createNotification(Notification notification) {
        notification.setId(UUID.randomUUID());
        notification.setCreatedAt(LocalDateTime.now());
        if (notification.getIsRead() == null) {
            notification.setIsRead(false); // Default to unread
        }
        return notificationRepository.save(notification);
    }

    @Override
    public Notification updateNotification(UUID id, Notification notificationDetails) {
        return notificationRepository.findById(id)
                .map(notification -> {
                    notification.setUser(notificationDetails.getUser());
                    notification.setType(notificationDetails.getType());
                    notification.setMessage(notificationDetails.getMessage());
                    notification.setIsRead(notificationDetails.getIsRead());
                    // CreatedAt is usually set on creation, but if you want to update it, uncomment below
                    // notification.setCreatedAt(notificationDetails.getCreatedAt());
                    return notificationRepository.save(notification);
                }).orElseThrow(() -> new RuntimeException("Notification not found with id " + id));
    }

    @Override
    public void deleteNotification(UUID id) {
        notificationRepository.deleteById(id);
    }

    @Override
    public List<Notification> getNotificationsByUserId(UUID userId) {
        return notificationRepository.findByUserId(userId);
    }

    @Override
    public List<Notification> getUnreadNotificationsByUserId(UUID userId) {
        return notificationRepository.findByUserIdAndIsRead(userId, false);
    }

    @Override
    public Notification markNotificationAsRead(UUID id) {
        return notificationRepository.findById(id)
                .map(notification -> {
                    notification.setIsRead(true);
                    return notificationRepository.save(notification);
                }).orElseThrow(() -> new RuntimeException("Notification not found with id " + id));
    }
}