package com.Verity.DTO;
import com.Verity.Entity.UserFavTopicEntity;
import com.Verity.Entity.UserNotiEntity;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserRequest {

    private String SYSUNID;

    private String SYSCREATEDBY;

    private String SYSMODIFIEDBY;

    private LocalDateTime SYSCREATEDDATE;

    private LocalDateTime SYSMODIFIEDDATE;

    private Boolean SYSISDELETED;

    private String userID;

    private String username;

    private String email;

    private String userRole;

    private String password;

    private List<UserNotiEntity> userNotiEntityList;

    private List<UserFavTopicEntity> userFavTopicEntityList;
}
