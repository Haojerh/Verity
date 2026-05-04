package com.Verity.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private String id;
    private String text;
    private String side;
    private String user;
    private String authorID;
    private String postID;
    private LocalDateTime SYSCREATEDDATE;
}
