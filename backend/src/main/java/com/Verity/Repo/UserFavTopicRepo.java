package com.Verity.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Verity.Entity.TopicEntity;
import com.Verity.Entity.UserEntity;
import com.Verity.Entity.UserFavTopicEntity;


@Repository
public interface UserFavTopicRepo extends JpaRepository<UserFavTopicEntity, String> {
    List<UserFavTopicEntity> findByUser(UserEntity user);

    boolean existsByUserAndTopic(UserEntity user, TopicEntity topic);

    Optional<UserFavTopicEntity> findByUserAndTopic(UserEntity user, TopicEntity topic);

    List<UserFavTopicEntity> findByUser_UserID(String userId);
}