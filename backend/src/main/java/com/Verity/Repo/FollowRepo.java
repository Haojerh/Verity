package com.Verity.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Verity.Entity.FollowEntity;
import com.Verity.Entity.UserEntity;

@Repository
public interface FollowRepo extends JpaRepository<FollowEntity, String> {

    long countByUserFollowing_UserID(String userId);

    long countByUserFollower_UserID(String userId);

    Optional<FollowEntity> findByUserFollowerAndUserFollowing(UserEntity follower, UserEntity following);

    boolean existsByUserFollowerAndUserFollowing(UserEntity follower, UserEntity following);
}
