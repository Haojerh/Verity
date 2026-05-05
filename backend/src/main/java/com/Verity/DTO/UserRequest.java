package com.Verity.DTO;
import java.time.LocalDateTime;
import java.util.List;

import com.Verity.Entity.UserFavTopicEntity;
import com.Verity.Entity.UserNotiEntity;

import lombok.Data;

@Data
public class UserRequest {
    private String SYSUNID;

    private String SYSCREATEDBY;

    private String SYSMODIFIEDBY;

    private LocalDateTime SYSCREATEDDATE;

    private LocalDateTime SYSMODIFIEDDATE;

    private Boolean SYSISDELETED;

    private String userID;

    private String email;

    private String password;

    private String userRole;

    private String name;

    private List<UserNotiEntity> userNotiEntityList;

    private List<UserFavTopicEntity> userFavTopicEntityList;
}
