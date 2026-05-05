package com.Verity.Service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.Verity.Entity.FollowEntity;
import com.Verity.Entity.UserEntity;
import com.Verity.Repo.FollowRepo;
import com.Verity.Repo.UserFavTopicRepo;
import com.Verity.Repo.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final UserFavTopicRepo userFavTopicRepo;
    private final UserServices userServices;
    private final UserRepo userRepo;
    private final FollowRepo followRepo;

    public void toggleFollow(String targetId) {
        UserEntity currentUser = userServices.getCurrentUser();
        UserEntity target = userRepo.findById(targetId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<FollowEntity> existing = followRepo
            .findByUserFollowerAndUserFollowing(currentUser, target);

        if (existing.isPresent()) {
            followRepo.delete(existing.get()); // unfollow
        } else {
            FollowEntity f = new FollowEntity();
            f.setUserFollower(currentUser);
            f.setUserFollowing(target);
            followRepo.save(f); // follow
        }
    }

    public boolean isFollowing(String targetId) {
        UserEntity currentUser = userServices.getCurrentUser();

        return followRepo.existsByUserFollowerAndUserFollowing(
            currentUser,
            userRepo.findById(targetId)
                .orElseThrow(() -> new RuntimeException("User not found"))
        );
    }

    public long getFollowerCount(String userId) {
        return followRepo.countByUserFollowing_UserID(userId);
    }
}
