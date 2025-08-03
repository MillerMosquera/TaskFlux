package org.miller.backend.repository;

import org.miller.backend.model.NotificationReference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface NotificationReferenceRepository extends JpaRepository<NotificationReference, UUID> {
    List<NotificationReference> findByNotificationId(UUID notificationId);
List<NotificationReference> findByReferencedEntityTypeAndReferencedEntityId(String referencedEntityType, String referencedEntityId);
}