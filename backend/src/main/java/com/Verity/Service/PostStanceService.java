package com.Verity.Service;

import com.Verity.DTO.PostStanceDTO;
import com.Verity.DTO.PostStanceRequest;
import com.Verity.Entity.PostEntity;
import com.Verity.Entity.PostStanceEntity;
import com.Verity.Entity.UserEntity;
import com.Verity.Repo.PostRepo;
import com.Verity.Repo.PostStanceRepo;
import com.Verity.Repo.UserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostStanceService {
    private final PostStanceRepo postStanceRepo;
    private final PostRepo postRepo;
    private final UserRepo userRepo;

    public String resolveLabel(UserEntity user, PostEntity post) {
        if (user == null || post == null) return null;

        return postStanceRepo.findByUser_UserIDAndPostID_PostID(user.getUserID(), post.getPostID())
                .map(stance -> {
                    String chosen = stance.getChosenStance();
                    String label = "pros".equalsIgnoreCase(chosen)
                            ? post.getProLabel()
                            : post.getConLabel();
                    return label.toUpperCase();
                })
                .orElse(null);
    }

    public String resolveLabel(String userID, String postID) {
        UserEntity user = userRepo.findById(userID).orElse(null);
        PostEntity post = postRepo.findById(postID).orElse(null);

        return resolveLabel(user, post);
    }

    @Transactional
    public void saveOrUpdateStance(String postID, PostStanceRequest request) {
        Optional<PostStanceEntity> existingStance = postStanceRepo
                .findByUser_UserIDAndPostID_PostID(request.getUserID(), postID);

        if (existingStance.isPresent()) {
            PostStanceEntity stance = existingStance.get();
            stance.setChosenStance(request.getChosenStance());
            postStanceRepo.save(stance);
        } else {
            PostStanceEntity newStance = new PostStanceEntity();

            PostEntity post = postRepo.findById(postID)
                    .orElseThrow(() -> new RuntimeException("Post not found"));
            UserEntity user = userRepo.findById(request.getUserID())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            newStance.setPostID(post);
            newStance.setUser(user);
            newStance.setChosenStance(request.getChosenStance());

            postStanceRepo.save(newStance);
        }
    }

    public PostStanceDTO getPostStats(String postID) {
        PostEntity post = postRepo.findById(postID)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        long pros = postStanceRepo.countByPostIDAndChosenStanceIgnoreCase(post, "PROS");
        long cons = postStanceRepo.countByPostIDAndChosenStanceIgnoreCase(post, "CONS");
        long participants = postStanceRepo.countUniqueParticipants(postID);

        return new PostStanceDTO(pros, cons, participants);
    }
}
