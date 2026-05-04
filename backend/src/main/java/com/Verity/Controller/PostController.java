package com.Verity.Controller;

import com.Verity.DTO.PostDTO;
import com.Verity.DTO.PostRequest;
import com.Verity.Domain.Response;
import com.Verity.Security.Utils.UserPrincipal;
import com.Verity.Service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import static org.springframework.http.HttpStatus.OK;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.util.Map;

import static com.Verity.Utils.RequestUtils.getResponse;
import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("api/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

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
}
