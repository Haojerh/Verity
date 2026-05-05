package com.Verity.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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
    private PostStanceDTO statistics;
}
