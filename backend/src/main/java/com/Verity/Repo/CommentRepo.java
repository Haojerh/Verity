package com.Verity.Repo;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Verity.Entity.CommentEntity;

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

    @Query("""
        SELECT FUNCTION('DATE', c.SYSCREATEDDATE), COUNT(c)
        FROM CommentEntity c
        WHERE c.SYSCREATEDDATE >= :startDate
        GROUP BY FUNCTION('DATE', c.SYSCREATEDDATE)
        ORDER BY FUNCTION('DATE', c.SYSCREATEDDATE)
        """)
    List<Object[]> countCommentsLast5Days(@Param("startDate") LocalDateTime startDate);
    @Modifying
    @Query("UPDATE CommentEntity c SET c.SYSISDELETED = true WHERE c.post.postID = :postId")
    void softDeleteByPostID(String postId);
}
