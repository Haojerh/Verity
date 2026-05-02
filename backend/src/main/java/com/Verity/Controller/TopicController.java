package com.Verity.Controller;
import java.io.IOException;
import static java.net.URI.create;
import static java.util.Collections.emptyMap;
import java.util.Map;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Verity.DTO.TopicDTO;
import com.Verity.DTO.TopicRequest;
import com.Verity.Domain.Response;
import com.Verity.Service.TopicService;
import static com.Verity.Utils.RequestUtils.getResponse;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class TopicController {

    private final TopicService topicService;
    
    @PostMapping("/api/topics")
    public ResponseEntity<Response> createTopic(@ModelAttribute TopicRequest topicRequest, HttpServletRequest request) throws IOException {
        topicService.createTopic(topicRequest);
        return ResponseEntity.created(create("")).body(getResponse(request, emptyMap(), "Topic Created", CREATED));
    }

    @GetMapping("/api/topics")
    public ResponseEntity<Response> getAllTopics(HttpServletRequest request) {
        var topics = topicService.getAllTopics();
        return ResponseEntity.ok(getResponse(request, Map.of("topics", topics), "Topics Retrieved", OK));
    }

    @DeleteMapping("/api/topics/{id}")
    public ResponseEntity<Response> deleteTopic(@PathVariable String id, HttpServletRequest request) {
        topicService.deleteTopic(id);
        return ResponseEntity.ok(getResponse(request, emptyMap(), "Topic Deleted", OK));
    }

    @PutMapping("/api/topics/{id}")
    public ResponseEntity<Response> updateTopic(@PathVariable String id, @ModelAttribute TopicRequest topicRequest, HttpServletRequest request) throws IOException {
        TopicDTO updatedTopic = topicService.updateTopic(id, topicRequest);
        return ResponseEntity.ok(getResponse(request, Map.of("topic", updatedTopic), "Topic Updated", OK));
    }
}
