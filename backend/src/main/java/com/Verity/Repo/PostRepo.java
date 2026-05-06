package com.Verity.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Verity.Entity.PostEntity;

@Repository
public interface PostRepo extends JpaRepository<PostEntity, String> {
    Optional<PostEntity> findByTitle(String title);

    Optional<PostEntity> findByPostIDAndSYSISDELETEDFalse(String postID);

    List<PostEntity> findByAuthor_UserIDAndSYSISDELETEDFalse(String userID);
}
