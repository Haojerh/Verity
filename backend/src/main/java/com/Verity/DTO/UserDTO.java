package com.Verity.DTO;


import java.time.LocalDateTime;
import java.util.List;

import com.Verity.Constant.UserRole;


import lombok.Data;


@Data
public class UserDTO {
    private LocalDateTime SYSCREATEDDATE;
    private Boolean SYSISDELETED;

    private String userID;
    private String email;
    private UserRole userRole;
    private String name;
    private String avatar;

    private boolean banned;
    private boolean muted;

    private List<UserNotiDTO> notifications;
    private List<TopicDTO> favoriteTopics;
}
