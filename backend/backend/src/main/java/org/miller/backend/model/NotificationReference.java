package org.miller.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "notification_references")
public class NotificationReference {
    @Id
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "notification_id")
    private Notification notification;

    private String referencedEntityType;
    private String referencedEntityId;
}