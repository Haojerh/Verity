package com.Verity.Controller;

import com.Verity.DTO.PostStanceDTO;
import com.Verity.DTO.PostStanceRequest;
import com.Verity.Service.PostStanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/stances")
@RequiredArgsConstructor
public class PostStanceController {
    private final PostStanceService postStanceService;

    @PostMapping("/select-stance/{postID}")
    public ResponseEntity<String> selectStance(
            @PathVariable String postID,
            @RequestBody PostStanceRequest request) {

        postStanceService.saveOrUpdateStance(postID, request);
        return ResponseEntity.ok("Stance recorded successfully.");
    }

    @GetMapping("/stats/{postID}")
    public ResponseEntity<PostStanceDTO> getStats(@PathVariable String postID) {
        return ResponseEntity.ok(postStanceService.getPostStats(postID));
    }

    @GetMapping("/user-selection/{postID}/{userID}")
    public ResponseEntity<String> getUserStance(
            @PathVariable String postID,
            @PathVariable String userID) {

        String stanceLabel = postStanceService.resolveLabel(userID, postID);

        return ResponseEntity.ok(stanceLabel != null ? stanceLabel : "");
    }
}