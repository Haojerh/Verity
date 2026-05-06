package com.Verity.Controller;

import com.Verity.DTO.CommentDTO;
import com.Verity.DTO.CommentRequest;
import com.Verity.Domain.Response;
import com.Verity.Security.Utils.UserPrincipal;
import com.Verity.Service.CommentService;
import jakarta.servlet.http.HttpServletRequest;
import com.Verity.Entity.UserEntity;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

import static com.Verity.Constant.Constants.OK;
import static com.Verity.Utils.RequestUtils.getResponse;
import static org.springframework.http.HttpStatus.CREATED;package com.Verity.Controller;
import static java.util.Collections.emptyMap;

@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/{id}")
    public ResponseEntity<Response> getCommentByID(@PathVariable String id, HttpServletRequest request) {
        CommentDTO comment = commentService.getCommentByID(id);

        return ResponseEntity.ok(getResponse(request, Map.of("comment", comment), "Comment retrieved", OK));
    }

    @DeleteMapping("/takedown/{id}")
    public ResponseEntity<Response> takedownComment(@PathVariable String id, HttpServletRequest request) {
        commentService.takedownComment(id);
        return ResponseEntity.ok(getResponse(request, emptyMap(), "Comment taken down", OK));
    }

    @GetMapping("/post/{postID}")
    public ResponseEntity<Response> getComments(@PathVariable String postID, HttpServletRequest request) {
        var comments = commentService.getCommentsByPostID(postID);
        return ResponseEntity.ok().body(getResponse(request, Map.of("comments", comments), "Comments retrieved", HttpStatus.OK));
    }

    @PostMapping("/post/{postID}")
    public ResponseEntity<Response> createComment(
            @PathVariable String postID,
            @Valid @RequestBody CommentRequest commentRequest,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            HttpServletRequest request) {

        CommentDTO comment = commentService.createComment(postID, commentRequest, userPrincipal.getUsername());
        return ResponseEntity.status(CREATED)
                .body(getResponse(request, Map.of("comment", comment), "Comment posted successfully", CREATED));
    }
}