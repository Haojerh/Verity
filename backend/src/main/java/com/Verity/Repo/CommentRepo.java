package com.Verity.Repo;

import com.Verity.Entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepo extends JpaRepository<CommentEntity, String> {
    List<CommentEntity> findByPost_PostID(String postID);
    Optional<CommentEntity> findByCommentID(String commentID);
    long countByPost_PostID(String postID);
    @Query("SELECT DISTINCT c FROM CommentEntity c " +
            "LEFT JOIN FETCH c.replies " +
            "WHERE c.post.postID = :postID " +
            "AND c.parentComment IS NULL")
    List<CommentEntity> findRootCommentsWithReplies(@Param("postID") String postID);
}
