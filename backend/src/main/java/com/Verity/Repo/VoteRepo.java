package com.Verity.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Verity.Entity.VoteEntity;

import jakarta.transaction.Transactional;

@Repository
public interface VoteRepo extends JpaRepository<VoteEntity, String> {

    long countBySYSISDELETEDFalse();

    Optional<VoteEntity> findByComment_CommentIDAndVoter_UserID(String commentID, String voterID);

    @Query("SELECT COALESCE(SUM(v.voteValue), 0) FROM VoteEntity v WHERE v.comment.commentID = :commentID")
    int sumVoteValueByCommentID(@Param("commentID") String commentID);

    List<VoteEntity> findByComment_CommentID(String commentID);

    @Query("""
        SELECT COALESCE(SUM(v.voteValue), 0)
        FROM VoteEntity v
        JOIN v.comment c
        JOIN c.author a
        WHERE a.userID = :userID
    """)
    Integer sumReputationByUserID(@Param("userID") String userID);

    List<VoteEntity> findByComment_Post_PostIDAndSYSISDELETEDFalse(String postId);

    List<VoteEntity> findByComment_CommentIDAndSYSISDELETEDFalse(String commentId);

    @Modifying
    @Transactional
    @Query("UPDATE VoteEntity v SET v.SYSISDELETED = true WHERE v.comment.post.postID = :postID")
    void softDeleteByPostID(String postID);

    @Modifying
    @Transactional
    @Query("UPDATE VoteEntity v SET v.SYSISDELETED = true WHERE v.comment.id = :commentID")
    void softDeleteByCommentID(String commentID);
}