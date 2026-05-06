package com.Verity.Controller;

import java.io.IOException;
import java.net.URI;
import static java.util.Collections.emptyMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.Verity.DTO.CommentDTO;
import com.Verity.DTO.CommentRequest;
import com.Verity.DTO.PostDTO;
import com.Verity.DTO.PostRequest;
import com.Verity.DTO.PostStanceDTO;
import com.Verity.DTO.PostStanceRequest;
import com.Verity.Domain.Response;
import com.Verity.Entity.PostEntity;
import com.Verity.Entity.PostStanceEntity;
import com.Verity.Entity.UserEntity;
import com.Verity.Repo.PostRepo;
import com.Verity.Repo.PostStanceRepo;
import com.Verity.Repo.UserRepo;
import com.Verity.Security.Utils.UserPrincipal;
import com.Verity.Service.CommentService;
import com.Verity.Service.PostService;
import com.Verity.Service.PostStanceLabelService;
import static com.Verity.Utils.RequestUtils.getResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final CommentService commentService;
    private final PostStanceLabelService postStanceLabelService;
    private final PostRepo postRepo;
    private final UserRepo userRepo;
    private final PostStanceRepo postStanceRepo;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Response> createPost(
            @Valid @ModelAttribute PostRequest postRequest,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            HttpServletRequest request) throws IOException {

        PostDTO newPost = postService.createPost(postRequest, image, userPrincipal.getUsername());

        return ResponseEntity.created(URI.create(""))
                .body(getResponse(request, Map.of("post", newPost), "Post created successfully", CREATED));
    }

    @GetMapping
    public ResponseEntity<Response> getAllPosts(HttpServletRequest request) {
        var posts = postService.getAllPosts();
        return ResponseEntity.ok().body(getResponse(request, Map.of("posts", posts), "Posts retrieved", OK));
    }

    @GetMapping("/{postID}")
    public ResponseEntity<Response> getPostById(@PathVariable String postID, HttpServletRequest request) {
        PostDTO post = postService.getPostById(postID);
        return ResponseEntity.ok().body(getResponse(request, Map.of("post", post), "Post retrieved", OK));
    }

    @GetMapping("/{postID}/comments")
    public ResponseEntity<Response> getComments(@PathVariable String postID, HttpServletRequest request) {
        var comments = commentService.getCommentsByPostID(postID);
        return ResponseEntity.ok().body(getResponse(request, Map.of("comments", comments), "Comments retrieved", OK));
    }

    @PostMapping("/{postID}/comments")
    public ResponseEntity<Response> createComment(
            @PathVariable String postID,
            @Valid @RequestBody CommentRequest commentRequest,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            HttpServletRequest request) {

        CommentDTO comment = commentService.createComment(postID, commentRequest, userPrincipal.getUsername());
        return ResponseEntity.status(CREATED)
                .body(getResponse(request, Map.of("comment", comment), "Comment posted successfully", CREATED));
    }

    @GetMapping("/{postID}/stats")
    public ResponseEntity<PostStanceDTO> getPostStats(@PathVariable String postID) {
        PostStanceDTO stats = postService.getPostStats(postID);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/{postID}/stance")
    public ResponseEntity<Response> getUserStance(@PathVariable String postID, @AuthenticationPrincipal UserPrincipal userPrincipal, HttpServletRequest request) {
        String userEmail = userPrincipal.getUsername();
        UserEntity user = userRepo.findUserByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));
        PostEntity post = postRepo.findById(postID).orElseThrow(() -> new RuntimeException("Post not found"));
        Optional<PostStanceEntity> stance = postStanceRepo.findByPostIDAndUser(post, user);
        String chosenStance = stance.map(PostStanceEntity::getChosenStance).orElse(null);
        String stanceLabel = postStanceLabelService.resolveLabel(post, chosenStance);
        return ResponseEntity.ok(getResponse(request, Map.of(
                "stance", chosenStance,
                "stanceLabel", stanceLabel
        ), "User stance retrieved", OK));
    }

    @PostMapping("/{postID}/stance")
    public ResponseEntity<Void> updateStance(
            @PathVariable String postID,
            @RequestBody PostStanceRequest request
    ) {
        postService.saveOrUpdateStance(postID, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/takedown/{id}")
    public ResponseEntity<Response> takedownComment(@PathVariable String id, HttpServletRequest request) {
        postService.takedownPost(id);
        return ResponseEntity.ok(getResponse(request, emptyMap(), "Post taken down", OK));
    }

    @GetMapping("/user/{userID}")
    public ResponseEntity<Response> getPostByuserID(@PathVariable String userID, HttpServletRequest request) {
        List<PostDTO> posts = postService.getPostsByUserID(userID);
        return ResponseEntity.ok().body(getResponse(request, Map.of("posts", posts), "Post retrieved", OK));
    }
}
