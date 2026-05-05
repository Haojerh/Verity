package com.Verity.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    private String parentId;
    private List<CommentDTO> replies = new ArrayList<>();
    private LocalDateTime SYSCREATEDDATE;
}
