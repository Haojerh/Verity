package com.Verity.DTO;
import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class TopicRequest {
    private String name;
    private String description;
    private MultipartFile avatar;
    private MultipartFile banner;
}
