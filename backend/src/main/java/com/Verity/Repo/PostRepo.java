package com.Verity.Repo;

import com.Verity.Entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostRepo extends JpaRepository<PostEntity, String> {
    Optional<PostEntity> findByTitle(String title);
}
