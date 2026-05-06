package com.Verity.Controller;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.Verity.Utils.RequestUtils.getResponse;
import static java.util.Collections.emptyMap;
import static org.springframework.http.HttpStatus.OK;

import java.util.Map;

import com.Verity.DTO.CommentDTO;
import com.Verity.Domain.Response;
import com.Verity.Entity.UserEntity;
import com.Verity.Service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/api/comment/{id}")
    public ResponseEntity<Response> getCommentByID(@PathVariable String id, HttpServletRequest request) {
        CommentDTO comment = commentService.getCommentByID(id);

        return ResponseEntity.ok(getResponse(request, Map.of("comment", comment), "Comment retrieved", OK));
    }

    @DeleteMapping("/api/comment/takedown/{id}")
    public ResponseEntity<Response> takedownComment(@PathVariable String id, HttpServletRequest request) {
        commentService.takedownComment(id);
        return ResponseEntity.ok(getResponse(request, emptyMap(), "Comment taken down", OK));
    }
}