package com.Verity.Service;

import com.Verity.DTO.CommentDTO;
import com.Verity.DTO.CommentRequest;
import com.Verity.Entity.CommentEntity;
import com.Verity.Entity.PostEntity;
import com.Verity.Entity.UserEntity;
import com.Verity.Repo.CommentRepo;
import com.Verity.Repo.PostRepo;
import com.Verity.Repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepo commentRepo;
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

        CommentEntity savedComment = commentRepo.save(comment);
        return mapToDTO(savedComment);
    }

    public List<CommentDTO> getCommentsByPostID(String postID) {
        postRepo.findById(postID).orElseThrow(() -> new RuntimeException("Post not found"));

        return commentRepo.findByPost_PostIDAndSYSISDELETEDFalse(postID).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private CommentDTO mapToDTO(CommentEntity entity) {
        CommentDTO dto = new CommentDTO();
        dto.setId(entity.getCommentID());
        dto.setText(entity.getText());
        dto.setSide(entity.getSide());
        dto.setUser(entity.getAuthor() != null ? entity.getAuthor().getName() : null);
        dto.setAuthorID(entity.getAuthor() != null ? entity.getAuthor().getUserID() : null);
        dto.setPostID(entity.getPost() != null ? entity.getPost().getPostID() : null);
        dto.setSYSCREATEDDATE(entity.getSYSCREATEDDATE());
        return dto;
    }
}
