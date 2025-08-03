package org.miller.backend.service;

import org.miller.backend.model.CommentMention;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CommentMentionService {
    List<CommentMention> getAllCommentMentions();

    Optional<CommentMention> getCommentMentionById(UUID id);

    CommentMention createCommentMention(CommentMention commentMention);

    CommentMention updateCommentMention(UUID id, CommentMention commentMentionDetails);

    void deleteCommentMention(UUID id);

    List<CommentMention> getCommentMentionsByCommentId(UUID commentId);

    List<CommentMention> getCommentMentionsByMentionedUserId(UUID mentionedUserId);
}