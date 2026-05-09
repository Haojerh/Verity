package com.Verity.Service;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.Verity.DTO.CommentDTO;
import com.Verity.Entity.CommentEntity;
import com.Verity.Entity.PostEntity;
import com.Verity.Entity.UserEntity;
import com.Verity.Entity.VoteEntity;
import com.Verity.Repo.CommentRepo;
import com.Verity.Repo.PostRepo;
import com.Verity.Repo.VoteRepo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConsensusService {
    private final VoteRepo voteRepo;
    private final PostStanceService postStanceService;
    private final CommentRepo commentRepo;
    private final PostRepo postRepo;
    private final CommentService commentService;

    public int calculateConsensusScore(CommentEntity comment) {
        List<VoteEntity> votes = voteRepo.findByComment_CommentID(comment.getCommentID());
        String commentSide = postStanceService.resolveLabel(comment.getAuthor(), comment.getPost());

        return votes.stream()
                .mapToInt(vote -> evaluateVoteImpact(vote, commentSide))
                .sum();
    }

    private int evaluateVoteImpact(VoteEntity vote, String commentSide) {
        if (isDownvote(vote)) return -1;

        String voterSide = postStanceService.resolveLabel(vote.getVoter(), vote.getComment().getPost());

        return isConsensusVote(voterSide, commentSide) ? 3 : 1;
    }

    private boolean isDownvote(VoteEntity vote) {
        return vote.getVoteValue() == -1;
    }

    private boolean isConsensusVote(String voterSide, String commentSide) {
        return voterSide != null && !voterSide.equals(commentSide);
    }

    public String getCommentSide(CommentEntity comment) {
        return postStanceService.resolveLabel(comment.getAuthor(), comment.getPost());
    }

    public CommentDTO getLeadingCommentForSide(String postID, String sideLabel) {
        List<CommentEntity> allComments = commentRepo.findByPost_PostID(postID);

        return allComments.stream()
                .filter(c -> {
                    String actualSide = getCommentSide(c);
                    return actualSide != null && actualSide.equalsIgnoreCase(sideLabel);
                })
                .max(Comparator.comparingInt((CommentEntity c) -> this.calculateConsensusScore(c)))
                .map(winner -> commentService.mapToDTO(winner, 0))
                .orElse(null);
    }

    public Map<String, CommentDTO> getConsensusHighlights(String postID) {
        PostEntity post = postRepo.findById(postID)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Map<String, CommentDTO> highlights = new HashMap<>();
        highlights.put("pros", getLeadingCommentForSide(postID, post.getProLabel()));
        highlights.put("cons", getLeadingCommentForSide(postID, post.getConLabel()));

        return highlights;
    }

    public String getDebateMVP(String postID) {
        List<CommentEntity> allComments = commentRepo.findByPost_PostID(postID);

        if (allComments.isEmpty()) return "None";

        Map<UserEntity, Integer> userScores = allComments.stream()
                .filter(c -> c.getAuthor() != null)
                .collect(Collectors.groupingBy(
                        CommentEntity::getAuthor,
                        Collectors.summingInt(this::calculateConsensusScore)
                ));

        return userScores.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(entry -> entry.getKey().getName())
                .orElse("None");
    }
}
