package com.Verity.Repo;

import com.Verity.Entity.UserFavTopicEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavTopicRepo extends JpaRepository<UserFavTopicEntity, String> {

}
