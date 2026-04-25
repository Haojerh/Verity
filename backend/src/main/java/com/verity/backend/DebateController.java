package com.verity.backend.controller;

import com.verity.backend.model.Debate;
import com.verity.backend.repository.DebateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/debates")
@CrossOrigin(origins = "http://localhost:5173")
public class DebateController {
    private static final Logger logger = LoggerFactory.getLogger(DebateController.class);

    @Autowired
    private DebateRepository debateRepository;

    @GetMapping
    public List<Debate> getAllDebates() {
        return debateRepository.findAll();
    }

    // SINGLE search endpoint with proper validation
    @GetMapping("/search")
    public ResponseEntity<?> searchDebates(@RequestParam String q) {
        logger.info("Search query received - length: {}", q != null ? q.length() : 0);
        
        // Validate input
        if (q == null || q.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Search query cannot be empty");
        }
        
        // Limit length
        if (q.length() > 100) {
            return ResponseEntity.badRequest().body("Search query too long (max 100 chars)");
        }
        
        // Validate characters (only allow alphanumeric, spaces, and basic punctuation)
        if (!q.matches("^[a-zA-Z0-9\\s\\-_,.]+$")) {
            return ResponseEntity.badRequest().body("Invalid characters in search query");
        }
        
        // Sanitize - remove dangerous characters
        String sanitizedQ = q.replaceAll("[<>{}()]", "");
        
        List<Debate> results = debateRepository.searchDebates(sanitizedQ);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/search/paginated")
    public Page<Debate> searchDebatesPaginated(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return debateRepository.searchDebatesPaginated(q, pageable);
    }
}