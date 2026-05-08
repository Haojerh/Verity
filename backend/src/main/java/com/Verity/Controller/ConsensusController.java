package com.Verity.Controller;

import com.Verity.DTO.CommentDTO;
import com.Verity.Service.ConsensusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/consensus")
@RequiredArgsConstructor
public class ConsensusController {
    private final ConsensusService consensusService;

    @GetMapping("/post/{postID}")
    public ResponseEntity<Map<String, CommentDTO>> getConsensusHighlights(
            @PathVariable String postID,
            @RequestParam String proLabel,
            @RequestParam String conLabel) {

        Map<String, CommentDTO> highlights = consensusService.getConsensusHighlights(postID, proLabel, conLabel);
        return ResponseEntity.ok(highlights);
    }
}
