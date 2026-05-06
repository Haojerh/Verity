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
    List<CommentEntity> findByPost_PostIDAndSYSISDELETEDFalse(String postID);
    Optional<CommentEntity> findByCommentIDAndSYSISDELETEDFalse(String commentID);
}
