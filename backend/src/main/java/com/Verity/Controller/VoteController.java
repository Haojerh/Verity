package com.Verity.Controller;

import com.Verity.DTO.VoteRequest;
import com.Verity.Service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class VoteController {
    private final VoteService voteService;

    @PostMapping("/{commentID}/vote")
    public ResponseEntity<Integer> voteOnComment(
            @PathVariable String commentID,
            @RequestBody VoteRequest request) {

        int newTotal = voteService.handleVote(commentID, request);
        return ResponseEntity.ok(newTotal);
    }

    @GetMapping("/{commentID}/vote-status")
    public ResponseEntity<Integer> getVoteStatus(
            @PathVariable String commentID,
            @RequestParam String userID) {

        int status = voteService.getUserVoteStatus(commentID, userID);
        return ResponseEntity.ok(status);
    }
}