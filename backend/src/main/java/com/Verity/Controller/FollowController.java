package com.Verity.Controller;

import static java.util.Collections.emptyMap;
import java.util.Map;

import static org.springframework.http.HttpStatus.OK;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Verity.Domain.Response;
import com.Verity.Service.FollowService;
import static com.Verity.Utils.RequestUtils.getResponse;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    @PostMapping("/api/follow/{id}")
    public ResponseEntity<Response> toggleFollow(@PathVariable String id, HttpServletRequest request) {
        followService.toggleFollow(id);
        return ResponseEntity.ok().body(getResponse(request, emptyMap(), "Follow Added", OK));
    }

    @GetMapping("/api/follow/{id}")
    public ResponseEntity<Response> getFollowStatus(@PathVariable String id, HttpServletRequest request) {
        boolean isFollowing = followService.isFollowing(id);
        return ResponseEntity.ok().body(getResponse(request, Map.of("following", isFollowing), "Follow Added", OK));
    }

    @GetMapping("/api/follow/count/{id}")
    public ResponseEntity<Long> getFollowerCount(@PathVariable String id, HttpServletRequest request) {
        return ResponseEntity.ok(followService.getFollowerCount(id));
    }
}