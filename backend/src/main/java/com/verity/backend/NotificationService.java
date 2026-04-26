package com.verity.backend.service;

import com.verity.backend.model.Notification;
import com.verity.backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    public void sendNotification(Long userId, String message, String type, String relatedId) {
        Notification notification = new Notification(userId, message, type, relatedId);
        notificationRepository.save(notification);
    }
    
    // Trigger when someone votes on debate
    public void notifyVote(Long debateOwnerId, String debateTitle, Long debateId) {
        sendNotification(debateOwnerId, 
            "Someone voted on your debate: " + debateTitle, 
            "VOTE", 
            String.valueOf(debateId));
    }
    
    // Trigger when someone comments
    public void notifyComment(Long debateOwnerId, String debateTitle, Long debateId) {
        sendNotification(debateOwnerId,
            "New comment on your debate: " + debateTitle,
            "COMMENT",
            String.valueOf(debateId));
    }
    
    // Trigger for milestone
    public void notifyMilestone(Long userId, String debateTitle, int votes) {
        sendNotification(userId,
            "Congratulations! Your debate '" + debateTitle + "' reached " + votes + " votes!",
            "MILESTONE",
            null);
    }
}