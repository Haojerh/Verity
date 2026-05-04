package com.Verity.Controller;

import java.util.Map;

import static org.springframework.http.HttpStatus.OK;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Verity.Domain.Response;
import com.Verity.Service.UserFavTopicService;
import static com.Verity.Utils.RequestUtils.getResponse;
import static java.util.Collections.emptyMap;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequiredArgsConstructor
public class UserFavTopicController {

    private final UserFavTopicService userFavTopicService;

    @GetMapping("/api/favorites")
    public ResponseEntity<Response> getFavorites(HttpServletRequest request) {
        var favorites = userFavTopicService.getCurrentUserFavorites();
        return ResponseEntity.ok(getResponse(request, Map.of("favorites", favorites), "Favorites Retrieved", OK));
    }

    @PostMapping("/api/favorites/{topicID}")
    public ResponseEntity<Response> addFavorite(@PathVariable String topicID, HttpServletRequest request) {
        userFavTopicService.addFavorite(topicID);
       return ResponseEntity.ok().body(getResponse(request, emptyMap(), "Favorites Added", OK));
    }

    @DeleteMapping("/api/favorites/{topicID}")
    public ResponseEntity<Response> removeFavorite(@PathVariable String topicID, HttpServletRequest request) {
        userFavTopicService.removeFavorite(topicID);
       return ResponseEntity.ok().body(getResponse(request, emptyMap(), "Favorites Removed", OK));
    }
}