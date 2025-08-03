package org.miller.backend.service;

import org.miller.backend.model.Notification;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NotificationService {
    List<Notification> getAllNotifications();

    Optional<Notification> getNotificationById(UUID id);

    Notification createNotification(Notification notification);

    Notification updateNotification(UUID id, Notification notificationDetails);

    void deleteNotification(UUID id);

    List<Notification> getNotificationsByUserId(UUID userId);

    List<Notification> getUnreadNotificationsByUserId(UUID userId);

    Notification markNotificationAsRead(UUID id);
}