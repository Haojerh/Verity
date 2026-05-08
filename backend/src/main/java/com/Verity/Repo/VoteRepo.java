package com.Verity.Repo;

import com.Verity.Entity.VoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoteRepo extends JpaRepository<VoteEntity, String> {

    Optional<VoteEntity> findByComment_CommentIDAndVoter_UserID(String commentID, String voterID);

    @Query("SELECT COALESCE(SUM(v.voteValue), 0) FROM VoteEntity v WHERE v.comment.commentID = :commentID")
    int sumVoteValueByCommentID(@Param("commentID") String commentID);
}