package com.Verity.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {
    private String postID;
    private String title;
    private String description;
    private String proLabel;
    private String conLabel;
    private String imagePath;
    private LocalDateTime SYSCREATEDDATE;
    private String topicName;
    private String topicID;
    private String authorID;
    private String authorName;
    private String authorAvatar;
    private PostStanceDTO statistics;
}
