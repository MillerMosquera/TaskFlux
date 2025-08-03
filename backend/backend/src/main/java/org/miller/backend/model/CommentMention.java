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
@Table(name = "comment_mentions")
public class CommentMention {
    @Id
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private TaskComment comment;

    @ManyToOne
    @JoinColumn(name = "mentioned_user_id")
    private User mentionedUser;
}