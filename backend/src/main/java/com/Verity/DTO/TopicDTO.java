package com.Verity.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TopicDTO {
    private String topicID;
    private String name;
    private String description;
    private String avatar;
    private String banner;
}