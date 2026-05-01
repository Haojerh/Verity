package com.Verity.DTO;


import com.Verity.Entity.UserFavTopicEntity;
import com.Verity.Entity.UserNotiEntity;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author : Eugene
 * @version : 1.0
 * @license :  Internation Business Solution (<a href="https://www.ibs.com">IBS</a>)
 * @mailto : eugene_ong@yahoo.com
 * @created : 29/04/2026
 * @description
 **/
@Data
public class UserDTO {
    private String SYSUNID;

    private String SYSCREATEDBY;

    private String SYSMODIFIEDBY;

    private LocalDateTime SYSCREATEDDATE;

    private LocalDateTime SYSMODIFIEDDATE;

    private Boolean SYSISDELETED;

    private String userID;

    private String email;

    private String userRole;

    private List<UserNotiEntity> userNotiEntityList;

    private List<UserFavTopicEntity> userFavTopicEntityList;
}
