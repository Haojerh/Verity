package com.Verity.DTO;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

import jakarta.validation.constraints.NotBlank;

@Data
public class CommentRequest {
    @NotBlank(message = "Comment text is required")
    private String text;

/*    @NotBlank(message = "Comment side is required")
    private String side;*/

    @JsonAlias({"parentId", "parentCommentId"})
    private String parentCommentID;
}
