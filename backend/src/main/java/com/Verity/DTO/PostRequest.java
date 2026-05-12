package com.Verity.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PostRequest {
    private String title;
    private String description;
    private String proLabel;
    private String conLabel;
    private String topicID;
}
