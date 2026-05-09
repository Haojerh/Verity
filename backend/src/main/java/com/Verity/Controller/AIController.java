package com.Verity.Controller;

import com.Verity.Service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {
    private final AIService aiService;

    @GetMapping("/summary/{postID}")
    public ResponseEntity<String> getSummary(@PathVariable String postID) {
        String summary = aiService.generateDebateSummary(postID);
        return ResponseEntity.ok(summary);
    }
}