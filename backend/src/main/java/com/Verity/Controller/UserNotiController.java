package com.Verity.Controller;

import static java.util.Collections.emptyMap;
import java.util.Map;

import static org.springframework.http.HttpStatus.OK;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Verity.Domain.Response;
import com.Verity.Service.UserNotiService;
import static com.Verity.Utils.RequestUtils.getResponse;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserNotiController {

    private final UserNotiService userNotiService;

    @GetMapping("/api/notifications/{userID}")
    public ResponseEntity<Response> getUserNotifications(@PathVariable String userID, HttpServletRequest request) {
        var notis = userNotiService.getUserNotifications(userID);
        return ResponseEntity.ok( getResponse(request, Map.of("notifications", notis), "Notifications Retrieved", OK));
    }

    @PostMapping("/api/notification/{notiID}")
    public ResponseEntity<Response> markAsRead(@PathVariable String notiID, HttpServletRequest request) {
        userNotiService.setNotificationRead(notiID);
        return ResponseEntity.ok( getResponse(request, emptyMap(), "Notification Marked as Read", OK));
    }
}