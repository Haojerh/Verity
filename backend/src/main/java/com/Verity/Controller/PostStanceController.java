package com.Verity.Controller;

import com.Verity.DTO.PostStanceDTO;
import com.Verity.DTO.PostStanceRequest;
import com.Verity.Entity.PostEntity;
import com.Verity.Entity.UserEntity;
import com.Verity.Service.PostStanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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

        // We use the service method to get the final resolved label (e.g., "PROS")
        String stanceLabel = postStanceService.resolveLabel(userID, postID);

        // Return 200 OK with the string, or an empty string if not found
        return ResponseEntity.ok(stanceLabel != null ? stanceLabel : "");
    }
}