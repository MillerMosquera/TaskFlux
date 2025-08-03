package org.miller.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "user_roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRole {
    
    @Id
    private String id;
    
    @Column(name = "user_id", nullable = false)
    private UUID userId;
    
    @Column(name = "role_name", nullable = false)
    private String roleName;
    
    @Column(name = "assigned_at")
    private LocalDateTime assignedAt;
    
    // Relationships
    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;
    
    @PrePersist
    protected void onCreate() {
        assignedAt = LocalDateTime.now();
    }
}
