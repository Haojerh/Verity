package com.Verity.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.Verity.DTO.PostDTO;
import com.Verity.DTO.PostRequest;
import com.Verity.DTO.PostStanceDTO;
import com.Verity.DTO.PostStanceRequest;
import com.Verity.Entity.CommentEntity;
import com.Verity.Entity.PostEntity;
import com.Verity.Entity.PostStanceEntity;
import com.Verity.Entity.ReportEntity;
import com.Verity.Entity.TopicEntity; // Using the new utility
import com.Verity.Entity.UserEntity;
import com.Verity.Repo.CommentRepo;
import com.Verity.Repo.PostRepo;
import com.Verity.Repo.PostStanceRepo;
import com.Verity.Repo.ReportRepo;
import com.Verity.Repo.TopicRepo;
import com.Verity.Repo.UserRepo;
import com.Verity.Utils.FileUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepo postRepo;
    private final TopicRepo topicRepo;
    private final UserRepo userRepo;
    private final ReportRepo reportRepo;
    private final CommentRepo commentRepo;
    private final PostStanceRepo postStanceRepo;
    private final PostStanceService postStanceService;
    private final String uploadDir = System.getProperty("user.dir") + "/uploads/posts/";

    public PostDTO createPost(PostRequest request, MultipartFile image, String authorEmail) throws IOException {
        PostEntity post = new PostEntity();
        post.setTitle(request.getTitle());
        post.setDescription(request.getDescription());

        post.setProLabel(request.getProLabel() != null ? request.getProLabel() : "Pro");
        post.setConLabel(request.getConLabel() != null ? request.getConLabel() : "Con");

        if (image != null && !image.isEmpty()) {
            String fileName = FileUtil.saveFile(image, uploadDir, "PST");
            post.setImagePath(fileName);
        }

        TopicEntity topic = topicRepo.findById(request.getTopicID())
                .orElseThrow(() -> new RuntimeException("Topic not found"));
        post.setTopic(topic);

        UserEntity author = userRepo.findUserByEmail(authorEmail)
                .orElseThrow(() -> new RuntimeException("Author not found"));
        post.setAuthor(author);

        PostEntity savedPost = postRepo.save(post);
        return mapToDTO(savedPost);
    }

    public List<PostDTO> getAllPosts() {
        return postRepo.findAll().stream()
                .filter(post -> !Boolean.TRUE.equals(post.getSYSISDELETED()))
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public PostDTO getPostById(String postID) {
        PostEntity post = postRepo.findByPostIDAndSYSISDELETEDFalse(postID)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return mapToDTO(post);
    }

    public PostStanceDTO getPostStats(String postID) {
        PostEntity post = postRepo.findByPostIDAndSYSISDELETEDFalse(postID)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        long pros = postStanceRepo.countByPostIDAndChosenStanceIgnoreCase(post, "PROS");
        long cons = postStanceRepo.countByPostIDAndChosenStanceIgnoreCase(post, "CONS");
        long participants = postStanceRepo.countUniqueParticipants(postID);

        return new PostStanceDTO(pros, cons, participants);
    }

    public List<PostDTO> getPostsByUserID(String userID) {
        List<PostEntity> posts = postRepo.findByAuthor_UserIDAndSYSISDELETEDFalse(userID);

        return posts.stream().map(post -> {
            PostDTO dto = new PostDTO();
            BeanUtils.copyProperties(post, dto);

            dto.setAuthorID(post.getAuthor().getUserID());
            dto.setAuthorName(post.getAuthor().getName());
            dto.setAuthorAvatar(post.getAuthor().getAvatar());
            dto.setTopicName(post.getTopic() != null ? post.getTopic().getName() : null);

            PostStanceDTO stats = getPostStats(post.getPostID());
            dto.setStatistics(stats);

            return dto;
        }).toList();
    }

//    @Transactional
//    public void saveOrUpdateStance(String postID, PostStanceRequest request) {
//        PostEntity post = postRepo.findByPostIDAndSYSISDELETEDFalse(postID)
//                .orElseThrow(() -> new RuntimeException("Post not found"));
//
//        UserEntity user = userRepo.findById(request.getUserID())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        PostStanceEntity stance = postStanceRepo.findByPostIDAndUser(post, user)
//                .orElse(new PostStanceEntity());
//
//        String normalizedStance = postStanceLabelService.normalizeStance(request.getChosenStance());
//
//        stance.setPostID(post);
//        stance.setUser(user);
//        stance.setChosenStance(normalizedStance);
//
//        postStanceRepo.save(stance);
//    }

    private PostDTO mapToDTO(PostEntity entity) {
        PostDTO dto = new PostDTO();

        dto.setPostID(entity.getPostID());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setProLabel(entity.getProLabel());
        dto.setConLabel(entity.getConLabel());
        dto.setImagePath(entity.getImagePath());

        dto.setSYSCREATEDDATE(entity.getSYSCREATEDDATE());

        if (entity.getTopic() != null) {
            dto.setTopicID(entity.getTopic().getTopicID());
            dto.setTopicName(entity.getTopic().getName());
        }

        if (entity.getAuthor() != null) {
            dto.setAuthorID(entity.getAuthor().getUserID());
            dto.setAuthorName(entity.getAuthor().getName());
        }

        long pros = postStanceRepo.countByPostIDAndChosenStanceIgnoreCase(entity, "PROS");
        long cons = postStanceRepo.countByPostIDAndChosenStanceIgnoreCase(entity, "CONS");

        dto.setStatistics(new PostStanceDTO(pros, cons, pros + cons));

        return dto;
    }

    public void takedownPost(String postId) {
        PostEntity post = postRepo.findByPostIDAndSYSISDELETEDFalse(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));

        post.setSYSISDELETED(true);
        postRepo.save(post);

        // delete comments under post
        List<CommentEntity> comments = commentRepo.findByPost_PostIDAndSYSISDELETEDFalse(postId);

        for (CommentEntity c : comments) {
            c.setSYSISDELETED(true);
        }
        commentRepo.saveAll(comments);

        // delete post reports
        List<ReportEntity> postReports = reportRepo.findByTargetPost_PostIDAndSYSISDELETEDFalse(postId);

        // delete comment reports under that post
        List<ReportEntity> commentReports = reportRepo.findByTargetComment_Post_PostIDAndSYSISDELETEDFalse(postId);

        postReports.forEach(r -> r.setSYSISDELETED(true));
        commentReports.forEach(r -> r.setSYSISDELETED(true));

        reportRepo.saveAll(postReports);
        reportRepo.saveAll(commentReports);
    }
}