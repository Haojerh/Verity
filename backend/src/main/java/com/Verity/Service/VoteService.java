package com.Verity.Service;

import com.Verity.DTO.VoteRequest;
import com.Verity.Entity.CommentEntity;
import com.Verity.Entity.UserEntity;
import com.Verity.Entity.VoteEntity;
import com.Verity.Repo.CommentRepo;
import com.Verity.Repo.UserRepo;
import com.Verity.Repo.VoteRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VoteService {
    private final VoteRepo voteRepo;
    private final CommentRepo commentRepo;
    private final UserRepo userRepo;

    @Transactional
    public int handleVote(String commentID, VoteRequest request) {
        Optional<VoteEntity> existingVote = voteRepo
                .findByComment_CommentIDAndVoter_UserID(commentID, request.getVoterID());

        if (isRemovalRequest(request)) {
            removeVote(existingVote);
        } else if (existingVote.isPresent()) {
            updateVote(existingVote.get(), request.getVoteValue());
        } else {
            createNewVote(commentID, request);
        }

        return calculateTotalScore(commentID);
    }

    public Integer getUserVoteStatus(String commentID, String userID) {
        return voteRepo.findByComment_CommentIDAndVoter_UserID(commentID, userID)
                .map(VoteEntity::getVoteValue)
                .orElse(0);
    }

    private boolean isRemovalRequest(VoteRequest request) {
        return request.getVoteValue() == 0;
    }

    private void removeVote(Optional<VoteEntity> existingVote) {
        existingVote.ifPresent(voteRepo::delete);
    }

    private void updateVote(VoteEntity vote, int newValue) {
        vote.setVoteValue(newValue);
        voteRepo.save(vote);
    }

    private void createNewVote(String commentID, VoteRequest request) {
        CommentEntity comment = commentRepo.findById(commentID)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        UserEntity user = userRepo.findById(request.getVoterID())
                .orElseThrow(() -> new RuntimeException("User not found"));

        VoteEntity newVote = new VoteEntity();
        newVote.setComment(comment);
        newVote.setVoter(user);
        newVote.setVoteValue(request.getVoteValue());
        voteRepo.save(newVote);
    }

    private int calculateTotalScore(String commentID) {
        return voteRepo.sumVoteValueByCommentID(commentID);
    }
}