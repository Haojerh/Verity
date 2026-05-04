package com.Verity.Repo;

import com.Verity.Entity.PostEntity;
import com.Verity.Entity.PostStanceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostStanceRepo extends JpaRepository<PostStanceEntity, String> {
    long countByPostIDAndChosenStance(PostEntity post, String stance);
}