package com.verity.backend.controller;

import com.verity.backend.model.Notification;
import com.verity.backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    // Get notifications for current user (use userId=1 for now, replace with auth later)
    @GetMapping
    public ResponseEntity<?> getNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        // TODO: Replace 1L with actual logged-in user ID
        Page<Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(1L, pageable);
        return ResponseEntity.ok(notifications);
    }
    
    // Get unread count
    @GetMapping("/unread/count")
    public ResponseEntity<?> getUnreadCount() {
        // TODO: Replace 1L with actual logged-in user ID
        int count = notificationRepository.countByUserIdAndIsReadFalse(1L);
        Map<String, Integer> response = new HashMap<>();
        response.put("count", count);
        return ResponseEntity.ok(response);
    }
    
    // Mark all as read
    @PutMapping("/read-all")
    public ResponseEntity<?> markAllAsRead() {
        // TODO: Replace 1L with actual logged-in user ID
        notificationRepository.markAllAsReadByUserId(1L);
        return ResponseEntity.ok(Map.of("success", true));
    }
    
    // Mark single notification as read
    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {
        Notification notification = notificationRepository.findById(id).orElse(null);
        if (notification != null) {
            notification.setRead(true);
            notificationRepository.save(notification);
            return ResponseEntity.ok(Map.of("success", true));
        }
        return ResponseEntity.notFound().build();
    }
}