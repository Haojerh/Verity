package com.Verity.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

import com.Verity.Constant.UserRole;
import com.Verity.Exceptions.ApiException;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.Verity.DTO.PostDTO;
import com.Verity.DTO.PostRequest;
import com.Verity.DTO.PostStanceDTO;
import com.Verity.Entity.CommentEntity;
import com.Verity.Entity.PostEntity;
import com.Verity.Entity.PostStanceEntity;
import com.Verity.Entity.ReportEntity;
import com.Verity.Entity.TopicEntity;
import com.Verity.Entity.UserEntity;
import com.Verity.Entity.VoteEntity;
import com.Verity.Repo.CommentRepo;
import com.Verity.Repo.FollowRepo;
import com.Verity.Repo.PostRepo;
import com.Verity.Repo.PostStanceRepo;
import com.Verity.Repo.ReportRepo;
import com.Verity.Repo.TopicRepo;
import com.Verity.Repo.UserFavTopicRepo;
import com.Verity.Repo.UserRepo;
import com.Verity.Repo.VoteRepo;
import com.Verity.Utils.FileUtil;

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
    private final PunishmentLogService punishmentLogService;
    private final FollowRepo followRepo;
    private final UserFavTopicRepo userFavTopicRepo;
    private final UserNotiService userNotiService;
    private final VoteRepo voteRepo;
    private final String uploadDir = System.getProperty("user.dir") + "/uploads/posts/";

    public PostDTO createPost(PostRequest request, MultipartFile image, String authorEmail) throws IOException {
        UserEntity author = userRepo.findUserByEmail(authorEmail)
        .orElseThrow(() -> new RuntimeException("Author not found"));

        if (punishmentLogService.isUserPunished(author.getUserID(), "MUTE")) {
            throw new RuntimeException("User is Currently Muted");
        }

        PostEntity post = new PostEntity();
        post.setTitle(request.getTitle());
        post.setDescription(request.getDescription());

        post.setProLabel(request.getProLabel() != null ? request.getProLabel() : "Pro");
        post.setConLabel(request.getConLabel() != null ? request.getConLabel() : "Con");

        if (image != null && !image.isEmpty()) {
            String fileName = FileUtil.saveFile(image, uploadDir, "PST");
            post.setImagePath(fileName);
        }

        TopicEntity topic = topicRepo.findByTopicIDAndSYSISDELETEDFalse(request.getTopicID())
                .orElseThrow(() -> new RuntimeException("Topic not found"));
        post.setTopic(topic);

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

    public Page<PostDTO> getPostsByUserID(String userID, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "SYSCREATEDDATE"));

        Page<PostEntity> posts = postRepo
            .findByAuthor_UserIDAndSYSISDELETEDFalse(userID, pageable);

        return posts.map(post -> {
            PostDTO dto = new PostDTO();
            BeanUtils.copyProperties(post, dto);

            dto.setAuthorID(post.getAuthor().getUserID());
            dto.setAuthorName(post.getAuthor().getName());
            dto.setAuthorAvatar(post.getAuthor().getAvatar());
            dto.setTopicName(post.getTopic() != null ? post.getTopic().getName() : null);

            PostStanceDTO stats = postStanceService.getPostStats(post.getPostID());
            dto.setStatistics(stats);

            return dto;
        });
    }

    public Page<PostDTO> getFollowedUsersPosts(String userID, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "SYSCREATEDDATE"));

        Page<PostEntity> posts = postRepo.findPostsByFollowedUsers(userID, pageable);

        return posts.map(post -> {
            PostDTO dto = new PostDTO();
            BeanUtils.copyProperties(post, dto);

            dto.setAuthorID(post.getAuthor().getUserID());
            dto.setAuthorName(post.getAuthor().getName());
            dto.setAuthorAvatar(post.getAuthor().getAvatar());
            dto.setTopicName(post.getTopic() != null ? post.getTopic().getName() : null);

            PostStanceDTO stats = postStanceService.getPostStats(post.getPostID());
            dto.setStatistics(stats);

            return dto;
        });
    }

    public Page<PostDTO> getFollowedTopicsPosts(String userID, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "SYSCREATEDDATE"));

        Page<PostEntity> posts =postRepo.findPostsByFollowedTopics(userID, pageable);

        return posts.map(post -> {
            PostDTO dto = new PostDTO();

            BeanUtils.copyProperties(post, dto);

            dto.setAuthorID(post.getAuthor().getUserID());
            dto.setAuthorName(post.getAuthor().getName());
            dto.setAuthorAvatar(post.getAuthor().getAvatar());
            dto.setTopicName(post.getTopic() != null ? post.getTopic().getName() : null);

            PostStanceDTO stats = postStanceService.getPostStats(post.getPostID());
            dto.setStatistics(stats);

            return dto;
        });
    }


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
        List<CommentEntity> comments = commentRepo.findByPost_PostID(postId);
        comments.forEach(c -> c.setSYSISDELETED(true));
        commentRepo.saveAll(comments);

        // delete comments votes under post
        List<VoteEntity> votes = voteRepo.findByComment_Post_PostIDAndSYSISDELETEDFalse(postId);
        votes.forEach(v -> v.setSYSISDELETED(true));
        voteRepo.saveAll(votes);

        // delete post stance under post
        List<PostStanceEntity> stances = postStanceRepo.findByPostID_PostIDAndSYSISDELETEDFalse(postId);
        stances.forEach(s -> s.setSYSISDELETED(true));
        postStanceRepo.saveAll(stances);

        // delete post reports
        List<ReportEntity> postReports = reportRepo.findByTargetPost_PostIDAndSYSISDELETEDFalse(postId);
        postReports.forEach(r -> r.setSYSISDELETED(true));
        reportRepo.saveAll(postReports);

        // delete comment reports under that post
        List<ReportEntity> commentReports = reportRepo.findByTargetComment_Post_PostIDAndSYSISDELETEDFalse(postId);
        commentReports.forEach(r -> r.setSYSISDELETED(true));
        reportRepo.saveAll(commentReports);

        for (ReportEntity r : postReports) {
            userNotiService.createNotification(
                r.getReporter(),
                "Your report on post '" + r.getTargetPost().getTitle() + "' has been resolved",
                "REPORT"
            );
        }

        for (ReportEntity r : commentReports) {
            userNotiService.createNotification(
                r.getReporter(),
                "Your report on comment in post with title'" + r.getTargetComment().getPost().getTitle() + "' has been resolved as the post has been removed",
                "REPORT"
            );
        }
    }

    public Page<PostDTO> getTopicPosts(String topicID, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "SYSCREATEDDATE"));

        Page<PostEntity> posts =postRepo.findByTopic_TopicIDAndSYSISDELETEDFalse(topicID, pageable);

        return posts.map(post -> {
            PostDTO dto = new PostDTO();

            BeanUtils.copyProperties(post, dto);

            dto.setAuthorID(post.getAuthor().getUserID());
            dto.setAuthorName(post.getAuthor().getName());
            dto.setAuthorAvatar(post.getAuthor().getAvatar());
            dto.setTopicName(post.getTopic() != null ? post.getTopic().getName() : null);

            PostStanceDTO stats = postStanceService.getPostStats(post.getPostID());
            dto.setStatistics(stats);

            return dto;
        });
    }

    public Page<PostDTO> getRecentPosts(int page, int size) {
        int maxPosts = 50;
        int start = page * size;

        if (start >= maxPosts) {
            return Page.empty();
        }

        int remaining = maxPosts - start;
        int pageSize = Math.min(size, remaining);
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, "SYSCREATEDDATE"));

        Page<PostEntity> posts = postRepo.findBySYSISDELETEDFalse(pageable);

        return posts.map(post -> {
            PostDTO dto = new PostDTO();
            BeanUtils.copyProperties(post, dto);

            dto.setAuthorID(post.getAuthor().getUserID());
            dto.setAuthorName(post.getAuthor().getName());
            dto.setAuthorAvatar(post.getAuthor().getAvatar());
            dto.setTopicName(post.getTopic() != null ? post.getTopic().getName() : null);

            dto.setStatistics(postStanceService.getPostStats(post.getPostID()));
            return dto;
        });
    }

    public Page<PostDTO> getPopularPosts(int page, int size) {
        int maxPosts = 50;
        int start = page * size;

        if (start >= maxPosts) {
            return Page.empty();
        }

        int remaining = maxPosts - start;
        int pageSize = Math.min(size, remaining);
        Pageable pageable = PageRequest.of(page, pageSize);

        Page<PostEntity> posts = postRepo.findPopularPosts(pageable);

        return posts.map(post -> {
            PostDTO dto = new PostDTO();
            BeanUtils.copyProperties(post, dto);

            dto.setAuthorID(post.getAuthor().getUserID());
            dto.setAuthorName(post.getAuthor().getName());
            dto.setAuthorAvatar(post.getAuthor().getAvatar());
            dto.setTopicName(post.getTopic() != null ? post.getTopic().getName() : null);

            dto.setStatistics(postStanceService.getPostStats(post.getPostID()));
            return dto;
        });
    }

    public Page<PostDTO> getSearchPosts(String q, int page, int size) {
        int maxPosts = 50;
        int start = page * size;

        if (start >= maxPosts) {
            return Page.empty();
        }

        int remaining = maxPosts - start;
        int pageSize = Math.min(size, remaining);
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, "SYSCREATEDDATE"));

        Page<PostEntity> posts = postRepo.searchPosts(q, pageable);

        return posts.map(post -> {
            PostDTO dto = new PostDTO();
            BeanUtils.copyProperties(post, dto);

            dto.setAuthorID(post.getAuthor().getUserID());
            dto.setAuthorName(post.getAuthor().getName());
            dto.setAuthorAvatar(post.getAuthor().getAvatar());
            dto.setTopicName(post.getTopic() != null ? post.getTopic().getName() : null);

            dto.setStatistics(postStanceService.getPostStats(post.getPostID()));
            return dto;
        });
    }

    public Page<PostDTO> getRecommendedPosts(String userID, int page, int size) {
        int maxSize = 50;
        int start = page * size;

        if (start >= maxSize) {
            return Page.empty();
        }

        int endLimit = Math.min(start + size, maxSize);

        // Followed users
        List<String> followedUserIds = followRepo
            .findByUserFollower_UserID(userID)
            .stream()
            .map(f -> f.getUserFollowing().getUserID())
            .toList();

        List<PostEntity> userPosts = followedUserIds.isEmpty()
            ? List.of()
            : postRepo.findByAuthor_UserIDInAndSYSISDELETEDFalse(
                followedUserIds,
                Pageable.unpaged()
            ).getContent();

        // Followed topics
        List<String> followedTopicIds = userFavTopicRepo
            .findByUser_UserID(userID)
            .stream()
            .map(f -> f.getTopic().getTopicID())
            .toList();

        List<PostEntity> topicPosts = followedTopicIds.isEmpty()
            ? List.of()
            : postRepo.findByTopic_TopicIDInAndSYSISDELETEDFalse(
                followedTopicIds,
                Pageable.unpaged()
            ).getContent();

        // Debug
        Set<String> usedIds = new HashSet<>();

        class DebugPost {
            PostEntity post;
            String source;

            DebugPost(PostEntity post, String source) {
                this.post = post;
                this.source = source;
            }
        }

        List<DebugPost> ordered = new ArrayList<>();

        for (PostEntity p : userPosts) {
            if (usedIds.add(p.getPostID())) {
                ordered.add(new DebugPost(p, "USER"));
            }
        }

        for (PostEntity p : topicPosts) {
            if (usedIds.add(p.getPostID())) {
                ordered.add(new DebugPost(p, "TOPIC"));
            }
        }

        // Get Random Posts
        int remainingSlots = maxSize - ordered.size();

        if (remainingSlots > 0) {

            List<PostEntity> randomPool =
                postRepo.findRandomPool(new ArrayList<>(usedIds));

            Collections.shuffle(randomPool, new Random(userID.hashCode()));

            for (PostEntity p : randomPool) {

                if (ordered.size() >= maxSize) break;

                if (usedIds.add(p.getPostID())) {
                    ordered.add(new DebugPost(p, "RANDOM"));
                }
            }
        }

        // Debug purpose
        System.out.println("\n========== RECOMMENDED FEED DEBUG ==========");
        for (DebugPost dp : ordered) {
            System.out.println(
                dp.source + " -> " + dp.post.getPostID()
            );
        }
        System.out.println("===========================================\n");

        // pagination slice
        List<DebugPost> pageSlice = ordered.subList(
            Math.min(start, ordered.size()),
            Math.min(endLimit, ordered.size())
        );

        List<PostDTO> content = pageSlice.stream()
            .map(dp -> mapToDTO(dp.post))
            .toList();

        return new PageImpl<>(
            content,
            PageRequest.of(page, size),
            Math.min(maxSize, ordered.size())
        );
    }

    public PostDTO updatePost(String postID, PostRequest request, MultipartFile image) throws IOException {
        // 1. Find existing post
        PostEntity post = postRepo.findById(postID)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // 2. Update basic fields
        post.setTitle(request.getTitle());
        post.setDescription(request.getDescription());
        post.setProLabel(request.getProLabel() != null ? request.getProLabel() : post.getProLabel());
        post.setConLabel(request.getConLabel() != null ? request.getConLabel() : post.getConLabel());

        // 3. Update Topic if it changed
        if (request.getTopicID() != null && !post.getTopic().getTopicID().equals(request.getTopicID())) {
            TopicEntity topic = topicRepo.findByTopicIDAndSYSISDELETEDFalse(request.getTopicID())
                    .orElseThrow(() -> new RuntimeException("Topic not found"));
            post.setTopic(topic);
        }

        // 4. Handle Image Update
        if (image != null && !image.isEmpty()) {
            // Optional: Delete the old file using post.getImagePath() before saving the new one
            String fileName = FileUtil.saveFile(image, uploadDir, "PST");
            post.setImagePath(fileName);
        }

        PostEntity updatedPost = postRepo.save(post);
        return mapToDTO(updatedPost);
    }

    public void deletePost(String postID) {
        PostEntity post = postRepo.findById(postID)
                .orElseThrow(() -> new ApiException("Post not found"));

        validateOwnership(post);

        post.setSYSISDELETED(true);
        postRepo.save(post);
    }

    private void validateOwnership(PostEntity post) {
        String currentEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity currentUser = userRepo.findUserByEmail(currentEmail)
                .orElseThrow(() -> new ApiException("User not found"));

        boolean isAuthor = post.getAuthor().getUserID().equals(currentUser.getUserID());
        boolean isAdmin = currentUser.getUserRole().equals(UserRole.ADMIN);

        if (!isAuthor && !isAdmin) {
            throw new ApiException("You do not have permission to modify this post.");
        }
    }
}
