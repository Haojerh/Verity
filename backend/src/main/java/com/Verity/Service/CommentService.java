package com.Verity.Service;

import com.Verity.DTO.CommentDTO;
import com.Verity.DTO.CommentRequest;
import com.Verity.Entity.CommentEntity;
import com.Verity.Entity.PostEntity;
import com.Verity.Entity.UserEntity;
import com.Verity.Repo.CommentRepo;
import com.Verity.Repo.PostRepo;
import com.Verity.Repo.PostStanceRepo;
import com.Verity.Repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepo commentRepo;
    private final PostRepo postRepo;
    private final UserRepo userRepo;
    private final PostStanceService postStanceService;

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

    private CommentDTO mapToDTO(CommentEntity entity) {
        CommentDTO dto = new CommentDTO();
        dto.setId(entity.getCommentID());
        dto.setText(entity.getText());
        dto.setSide(postStanceService.resolveLabel(entity.getAuthor(), entity.getPost()));
        dto.setUser(entity.getAuthor() != null ? entity.getAuthor().getName() : null);
        dto.setAuthorID(entity.getAuthor() != null ? entity.getAuthor().getUserID() : null);
        dto.setPostID(entity.getPost() != null ? entity.getPost().getPostID() : null);
        dto.setParentId(entity.getParentComment() != null ? entity.getParentComment().getCommentID() : null);
        dto.setSYSCREATEDDATE(entity.getSYSCREATEDDATE());
        return dto;
    }
}
