package com.Verity.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import com.Verity.DTO.CommentDTO;
import com.Verity.DTO.CommentRequest;
import com.Verity.Entity.CommentEntity;
import com.Verity.Entity.PostEntity;
import com.Verity.Entity.ReportEntity;
import com.Verity.Entity.UserEntity;
import com.Verity.Entity.VoteEntity;
import com.Verity.Exceptions.ApiException;
import com.Verity.Repo.CommentRepo;
import com.Verity.Repo.PostRepo;
import com.Verity.Repo.ReportRepo;
import com.Verity.Repo.UserRepo;
import com.Verity.Repo.VoteRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepo commentRepo;
    private final ReportRepo reportRepo;
    private final PostRepo postRepo;
    private final UserRepo userRepo;
    private final PostStanceService postStanceService;
    private final VoteRepo voteRepo;
    private final VoteService voteService;
    private final UserServices userServices;
    private final UserNotiService userNotiService;

    private static final Pattern BAD_WORDS = Pattern.compile(
    "(?i)\\b(fuck|shit|damn|ass|faggot|cunt|fk|fuc|sht|asshole|bitch)\\b"
    );

    public CommentDTO createComment(String postID, CommentRequest request, String authorEmail) {

        String normalized = request.getText()
            .toLowerCase()
            .replaceAll("[^a-z0-9\\s]", "");
        
        if (BAD_WORDS.matcher(normalized).find()) {
            throw new ApiException("Your comment contains inappropriate language!");
        }

        PostEntity post = postRepo.findById(postID)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        UserEntity author = userRepo.findUserByEmail(authorEmail)
                .orElseThrow(() -> new RuntimeException("Author not found"));

        CommentEntity comment = new CommentEntity();
        comment.setText(request.getText());
        comment.setPost(post);
        comment.setAuthor(author);

        if (request.getParentCommentID() != null && !request.getParentCommentID().isBlank()) {
            CommentEntity parentComment = commentRepo.findByCommentID(request.getParentCommentID())
                    .orElseThrow(() -> new RuntimeException("Parent comment not found"));

            if (!parentComment.getPost().getPostID().equals(postID)) {
                throw new RuntimeException("Parent comment does not belong to the same post");
            }
            comment.setParentComment(parentComment);
        }

        CommentEntity savedComment = commentRepo.save(comment);

        long updatedCount = commentRepo.countByPost_PostID(postID);

        if (!post.getAuthor().getUserID().equals(author.getUserID())) {
            userNotiService.createNotification(
                post.getAuthor(),
                author.getName() + " has commented on your post with title " + "'" + post.getTitle() + "'", 
                "POST", 
                post.getPostID()
            );
        }

        return mapToDTO(savedComment, updatedCount);
    }

    public List<CommentDTO> getCommentsByPostID(String postID) {
        List<CommentEntity> entities = commentRepo.findByPost_PostID(postID);
        long totalCount = entities.size();

        Map<String, CommentDTO> dtoMap = new HashMap<>();
        for (CommentEntity entity : entities) {
            dtoMap.put(entity.getCommentID(), mapToDTO(entity, totalCount));
        }

        List<CommentDTO> rootComments = new ArrayList<>();
        for (CommentEntity entity : entities) {
            CommentDTO currentDto = dtoMap.get(entity.getCommentID());

            if (entity.getParentComment() != null) {
                CommentDTO parentDto = dtoMap.get(entity.getParentComment().getCommentID());
                if (parentDto != null) {
                    parentDto.getReplies().add(currentDto);
                }
            } else {
                rootComments.add(currentDto);
            }
        }

        rootComments.sort(Comparator.comparing(CommentDTO::getSYSCREATEDDATE));

        return rootComments;
    }

    public CommentDTO getCommentByID(String id) {
        CommentEntity comment = commentRepo.findByCommentID(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        CommentDTO dto = new CommentDTO();
        dto.setId(comment.getCommentID());
        dto.setText(comment.getText());

        if (comment.getAuthor() != null && comment.getPost() != null) {
            String stanceLabel = postStanceService.resolveLabel(comment.getAuthor(), comment.getPost());
            dto.setSide(stanceLabel);
        }
        dto.setPostID(comment.getPost() != null ? comment.getPost().getPostID() : null);
        dto.setParentId(comment.getParentComment() != null ? comment.getParentComment().getCommentID() : null);
        dto.setSYSCREATEDDATE(comment.getSYSCREATEDDATE());

        if (comment.getAuthor() != null) {
            dto.setUser(comment.getAuthor().getName());
            dto.setUserAvatar(comment.getAuthor().getAvatar());
            dto.setAuthorID(comment.getAuthor().getUserID());
        }

        return dto;
    }

    public void takedownComment(String id) {
        CommentEntity comment = commentRepo.findByCommentID(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        // Deletion Logic and Replies too
        deleteCommentTree(comment);

        // Delete Reports Related to Comments
        List<ReportEntity> reports = reportRepo.findByTargetComment_CommentIDAndSYSISDELETEDFalse(id);
        reports.forEach(r -> r.setSYSISDELETED(true));
        reportRepo.saveAll(reports);

        for (ReportEntity r : reports) {
            userNotiService.createNotification(
                r.getReporter(),
                "Your report on comment in post with title'" + r.getTargetComment().getPost().getTitle() + "' has been resolved",
                "REPORT"
            );
        }
    }

    private void deleteCommentTree(CommentEntity comment) {
        comment.setSYSISDELETED(true);
        commentRepo.save(comment);

        // Delete Related Votes
        List<VoteEntity> votes = voteRepo.findByComment_CommentIDAndSYSISDELETEDFalse(comment.getCommentID());
        votes.forEach(v -> v.setSYSISDELETED(true));
        voteRepo.saveAll(votes);

        if (comment.getReplies() != null) {
            for (CommentEntity reply : comment.getReplies()) {
                deleteCommentTree(reply);
            }
        }
    }

    public CommentDTO mapToDTO(CommentEntity entity, long totalCount) {
        CommentDTO dto = new CommentDTO();
        UserEntity currentUser;
        currentUser = userServices.getCurrentUser();

        dto.setId(entity.getCommentID());
        dto.setAuthorID(entity.getAuthor() != null ? entity.getAuthor().getUserID() : null);
        dto.setPostID(entity.getPost() != null ? entity.getPost().getPostID() : null);
        dto.setParentId(entity.getParentComment() != null ? entity.getParentComment().getCommentID() : null);

        dto.setText(entity.getText());
        if (entity.getAuthor() != null && entity.getPost() != null) {
            String stanceLabel = postStanceService.resolveLabel(entity.getAuthor(), entity.getPost());
            dto.setSide(stanceLabel);
        }
        dto.setUser(entity.getAuthor() != null ? entity.getAuthor().getName() : null);
        dto.setUserAvatar(entity.getAuthor() != null ? entity.getAuthor().getAvatar() : null);
        dto.setSYSCREATEDDATE(entity.getSYSCREATEDDATE());

        dto.setTotalComments(totalCount);

        dto.setVotes(voteRepo.sumVoteValueByCommentID(entity.getCommentID()));

        int userVoteStatus = voteRepo.findByComment_CommentIDAndVoter_UserID(
                entity.getCommentID(),
                currentUser.getUserID()
        ).map(VoteEntity::getVoteValue).orElse(0);

        dto.setUserVote(userVoteStatus);

        dto.setReplies(new ArrayList<>());

        return dto;
    }
}
