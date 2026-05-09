package com.Verity.Controller;

import com.Verity.DTO.CommentDTO;
import com.Verity.Service.ConsensusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/consensus")
@RequiredArgsConstructor
public class ConsensusController {
    private final ConsensusService consensusService;

    @GetMapping("/post/{postID}")
    public ResponseEntity<Map<String, Object>> getConsensusData(
            @PathVariable String postID) {

        Map<String, Object> response = new HashMap<>();

        Map<String, CommentDTO> highlights = consensusService.getConsensusHighlights(postID);
        response.put("highlights", highlights);

        String mvp = consensusService.getDebateMVP(postID);
        response.put("mvp", mvp);

        return ResponseEntity.ok(response);
    }
}
