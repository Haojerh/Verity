package com.verity.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long userId;  // Who receives the notification
    private String message;  // Notification content
    private String type;  // "VOTE", "COMMENT", "NEW_DEBATE", "MILESTONE"
    private String relatedId;  // Debate ID or Comment ID
    private boolean isRead = false;  // Read status
    private LocalDateTime createdAt;
    
    // Constructors
    public Notification() {}
    
    public Notification(Long userId, String message, String type, String relatedId) {
        this.userId = userId;
        this.message = message;
        this.type = type;
        this.relatedId = relatedId;
        this.createdAt = LocalDateTime.now();
        this.isRead = false;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public String getRelatedId() { return relatedId; }
    public void setRelatedId(String relatedId) { this.relatedId = relatedId; }
    
    public boolean isRead() { return isRead; }
    public void setRead(boolean read) { isRead = read; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
