package org.miller.backend.repository;

import org.miller.backend.model.CommentMention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommentMentionRepository extends JpaRepository<CommentMention, UUID> {
    List<CommentMention> findByCommentId(UUID commentId);

    List<CommentMention> findByMentionedUserId(UUID mentionedUserId);
}