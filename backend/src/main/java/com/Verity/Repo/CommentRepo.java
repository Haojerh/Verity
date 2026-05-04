package com.Verity.Repo;

import com.Verity.Entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepo extends JpaRepository<CommentEntity, String> {
    List<CommentEntity> findByPost_PostIDAndSYSISDELETEDFalse(String postID);
}
