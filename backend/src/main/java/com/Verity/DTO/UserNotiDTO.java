package com.Verity.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserNotiDTO {
    private String notiID;
    private String message;
    private String type;
    private boolean isRead;
    private String sourceID;

}
