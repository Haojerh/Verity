package com.Verity.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.Verity.DTO.CommentDTO;
import com.Verity.DTO.CommentRequest;
import com.Verity.Entity.CommentEntity;
import com.Verity.Entity.PostEntity;
import com.Verity.Entity.ReportEntity;
import com.Verity.Entity.UserEntity;
import com.Verity.Repo.CommentRepo;
import com.Verity.Repo.PostRepo;
import com.Verity.Repo.ReportRepo;
import com.Verity.Repo.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepo commentRepo;
    private final ReportRepo reportRepo;
    private final PostRepo postRepo;
    private final UserRepo userRepo;

    public CommentDTO createComment(String postID, CommentRequest request, String authorEmail) {
        PostEntity post = postRepo.findById(postID)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        UserEntity author = userRepo.findUserByEmail(authorEmail)
                .orElseThrow(() -> new RuntimeException("Author not found"));

        CommentEntity comment = new CommentEntity();
        comment.setText(request.getText());
        comment.setSide(request.getSide());
        comment.setPost(post);
        comment.setAuthor(author);

        if (request.getParentCommentID() != null && !request.getParentCommentID().isBlank()) {
            CommentEntity parentComment = commentRepo.findByCommentIDAndSYSISDELETEDFalse(request.getParentCommentID())
                    .orElseThrow(() -> new RuntimeException("Parent comment not found"));

            if (!parentComment.getPost().getPostID().equals(postID)) {
                throw new RuntimeException("Parent comment does not belong to the same post");
            }
            comment.setParentComment(parentComment);
        }

        CommentEntity savedComment = commentRepo.save(comment);
        return mapToDTO(savedComment);
    }

    public List<CommentDTO> getCommentsByPostID(String postID) {
        postRepo.findById(postID).orElseThrow(() -> new RuntimeException("Post not found"));

        List<CommentEntity> commentEntities = commentRepo.findByPost_PostIDAndSYSISDELETEDFalse(postID);
        commentEntities.sort(Comparator.comparing(CommentEntity::getSYSCREATEDDATE));

        Map<String, CommentDTO> dtoMap = new HashMap<>();
        for (CommentEntity commentEntity : commentEntities) {
            dtoMap.put(commentEntity.getCommentID(), mapToDTO(commentEntity));
        }

        List<CommentDTO> rootComments = new ArrayList<>();
        for (CommentEntity commentEntity : commentEntities) {
            CommentDTO commentDto = dtoMap.get(commentEntity.getCommentID());
            if (commentEntity.getParentComment() != null) {
                CommentDTO parentDto = dtoMap.get(commentEntity.getParentComment().getCommentID());
                if (parentDto != null) {
                    parentDto.getReplies().add(commentDto);
                    continue;
                }
            }
            rootComments.add(commentDto);
        }

        return rootComments;
    }

    public CommentDTO getCommentByID(String id) {
        CommentEntity comment = commentRepo.findByCommentIDAndSYSISDELETEDFalse(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        CommentDTO dto = new CommentDTO();
        dto.setId(comment.getCommentID());
        dto.setText(comment.getText());
        dto.setSide(comment.getSide());
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
        CommentEntity comment = commentRepo.findByCommentIDAndSYSISDELETEDFalse(id)
            .orElseThrow(() -> new RuntimeException("Comment not found"));
        comment.setSYSISDELETED(true);
        commentRepo.save(comment);

        deleteCommentTree(comment);

        List<ReportEntity> reports = reportRepo.findByTargetComment_CommentIDAndSYSISDELETEDFalse(id);

        for (ReportEntity report : reports) {
            report.setSYSISDELETED(true);
        }

        reportRepo.saveAll(reports);
    }

    private void deleteCommentTree(CommentEntity comment) {
        comment.setSYSISDELETED(true);
        commentRepo.save(comment);

        if (comment.getReplies() != null) {
            for (CommentEntity reply : comment.getReplies()) {
                deleteCommentTree(reply);
            }
        }
    }

    private CommentDTO mapToDTO(CommentEntity entity) {
        CommentDTO dto = new CommentDTO();
        dto.setId(entity.getCommentID());
        dto.setText(entity.getText());
        dto.setSide(entity.getSide());
        dto.setUser(entity.getAuthor() != null ? entity.getAuthor().getName() : null);
        dto.setUserAvatar(entity.getAuthor() != null ? entity.getAuthor().getAvatar() : null);
        dto.setAuthorID(entity.getAuthor() != null ? entity.getAuthor().getUserID() : null);
        dto.setPostID(entity.getPost() != null ? entity.getPost().getPostID() : null);
        dto.setParentId(entity.getParentComment() != null ? entity.getParentComment().getCommentID() : null);
        dto.setSYSCREATEDDATE(entity.getSYSCREATEDDATE());
        return dto;
    }
}
