package com.Verity.Controller;

import java.io.IOException;
import java.net.URI;
import static java.util.Collections.emptyMap;
import java.util.Map;

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
import com.Verity.Domain.Response;
import com.Verity.Security.Utils.UserPrincipal;
import com.Verity.Service.CommentService;
import com.Verity.Service.PostService;
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
    @DeleteMapping("/takedown/{id}")
    public ResponseEntity<Response> takedownComment(@PathVariable String id, HttpServletRequest request) {
        postService.takedownPost(id);
        return ResponseEntity.ok(getResponse(request, emptyMap(), "Post taken down", OK));
    }

    @GetMapping("/user/{userID}")
    public ResponseEntity<Response> getUserPosts(
            @PathVariable String userID,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            HttpServletRequest request) {

        var posts = postService.getPostsByUserID(userID, page, size);

        return ResponseEntity.ok(
            getResponse(
                request,
                Map.of(
                    "posts", posts.getContent(),
                    "totalPages", posts.getTotalPages(),
                    "currentPage", posts.getNumber()
                ),
                "Posts Retrieved",
                OK
            )
        );
    }

    @GetMapping("/followedUsers/{userID}")
    public ResponseEntity<Response> getFollowedUsersPosts(
            @PathVariable String userID,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            HttpServletRequest request) {
        var posts = postService.getFollowedUsersPosts(userID, page, size);

        return ResponseEntity.ok(
            getResponse(
                request,
                Map.of(
                    "posts", posts.getContent(),
                    "totalPages", posts.getTotalPages(),
                    "currentPage", posts.getNumber()
                ),
                "Posts Retrieved",
                OK
            )
        );
    }

    @GetMapping("/followedTopics/{userID}")
    public ResponseEntity<Response> getFollowedTopicsPosts(
            @PathVariable String userID,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            HttpServletRequest request) {
        var posts = postService.getFollowedTopicsPosts(userID, page, size);

        return ResponseEntity.ok(
            getResponse(
                request,
                Map.of(
                    "posts", posts.getContent(),
                    "totalPages", posts.getTotalPages(),
                    "currentPage", posts.getNumber()
                ),
                "Posts Retrieved",
                OK
            )
        );
    }

    @GetMapping("/topic/{topicID}")
    public ResponseEntity<Response> getTopicPosts(
            @PathVariable String topicID,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            HttpServletRequest request) {
        var posts = postService.getTopicPosts(topicID, page, size);

        return ResponseEntity.ok(
            getResponse(
                request,
                Map.of(
                    "posts", posts.getContent(),
                    "totalPages", posts.getTotalPages(),
                    "currentPage", posts.getNumber()
                ),
                "Posts Retrieved",
                OK
            )
        );
    }

    @GetMapping("/recent")
    public ResponseEntity<Response> getRecentPosts(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "6") int size, HttpServletRequest request) {
        var posts = postService.getRecentPosts(page, size);

        return ResponseEntity.ok(
            getResponse(
                request,
                Map.of(
                    "posts", posts.getContent(),
                    "totalPages", posts.getTotalPages(),
                    "currentPage", posts.getNumber()
                ),
                "Posts Retrieved",
                OK
            )
        );
    }

    @GetMapping("/recommended/{userID}")
    public ResponseEntity<Response> getRecommendedPosts(
        @PathVariable String userID,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "6") int size,
        HttpServletRequest request) {
        var posts = postService.getRecommendedPosts(userID, page, size);

        return ResponseEntity.ok(
            getResponse(
                request,
                Map.of(
                    "posts", posts.getContent(),
                    "totalPages", posts.getTotalPages(),
                    "currentPage", posts.getNumber()
                ),
                "Posts Retrieved",
                OK
            )
        );
    }

    @GetMapping("/popular")
    public ResponseEntity<Response> getPopularPosts(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "6") int size, HttpServletRequest request) {
        var posts = postService.getPopularPosts(page, size);

        return ResponseEntity.ok(
            getResponse(
                request,
                Map.of(
                    "posts", posts.getContent(),
                    "totalPages", posts.getTotalPages(),
                    "currentPage", posts.getNumber()
                ),
                "Posts Retrieved",
                OK
            )
        );
    }

    @GetMapping("/search")
    public ResponseEntity<Response> getSearchPosts(@RequestParam String q, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "6") int size, HttpServletRequest request) {
        var posts = postService.getSearchPosts(q, page, size);

        return ResponseEntity.ok(
            getResponse(
                request,
                Map.of(
                    "posts", posts.getContent(),
                    "totalPages", posts.getTotalPages(),
                    "currentPage", posts.getNumber()
                ),
                "Posts Retrieved",
                OK
            )
        );
    }
}