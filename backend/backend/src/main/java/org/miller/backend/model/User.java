package org.miller.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String username;
    private String email;
    private String passwordHash;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToOne(mappedBy = "user")
    private UserProfile profile;

    @OneToMany(mappedBy = "user")
    private Set<UserSkill> skills;

    @OneToMany(mappedBy = "user")
    private Set<UserRole> roles;

    @OneToMany(mappedBy = "createdBy")
    private Set<Task> createdTasks;

    @OneToMany(mappedBy = "assignedTo")
    private Set<Task> assignedTasks;

    @OneToMany(mappedBy = "user")
    private Set<TaskComment> comments;

    @OneToMany(mappedBy = "uploadedBy")
    private Set<TaskAttachment> uploads;

    @OneToMany(mappedBy = "assignedTo")
    private Set<Subtask> assignedSubtasks;

    @OneToMany(mappedBy = "user")
    private Set<TimeEntry> timeEntries;

    @OneToMany(mappedBy = "user")
    private Set<TaskHistory> taskHistory;

    @OneToMany(mappedBy = "user")
    private Set<Notification> notifications;

    @OneToMany(mappedBy = "mentionedUser")
    private Set<CommentMention> mentions;

    @OneToMany(mappedBy = "createdBy")
    private Set<Space> createdSpaces;

    @OneToMany(mappedBy = "createdBy")
    private Set<TaskList> createdLists;

    @OneToMany(mappedBy = "createdBy")
    private Set<Goal> createdGoals;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(); // Devolver una lista vac��a si no se usan roles
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
