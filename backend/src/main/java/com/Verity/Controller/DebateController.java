//package com.Verity.Controller;
//
//import java.util.List;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//
//@RestController
//@RequestMapping("/api/debates")
//@CrossOrigin(origins = "http://localhost:5173")
//public class DebateController {
//    private static final Logger logger = LoggerFactory.getLogger(DebateController.class);
//
//
//    @Autowired
//    private DebateRepository debateRepository;
//
//
//    @GetMapping
////    public List<Debate> getAllDebates() {
////        return debateRepository.findAll();
////    }
//
//
//    @GetMapping("/search")
//    public ResponseEntity<?> searchDebates(@RequestParam(value = "q", defaultValue = "") String q) {
//        logger.info("Search query: '{}'", q);
//
//        // If empty, return empty list
//        if (q == null || q.trim().isEmpty()) {
//            return ResponseEntity.ok(List.of());
//        }
//
//        // Simply limit length - no character validation
//        String searchTerm = q;
//        if (searchTerm.length() > 100) {
//            searchTerm = searchTerm.substring(0, 100);
//        }
//
//        // Direct search - let the database handle it
//        List<Debate> results = debateRepository.searchDebates(searchTerm);
//        logger.info("Found {} results", results.size());
//
//        return ResponseEntity.ok(results);
//    }
//
//
//    @GetMapping("/search/paginated")
//    public Page<Debate> searchDebatesPaginated(
//            @RequestParam String q,
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        return debateRepository.searchDebatesPaginated(q, pageable);
//    }
//}
