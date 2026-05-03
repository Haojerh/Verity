package com.Verity.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PunishmentLogDTO {
    private String logID;
    private String type;
    private String reason;
    private Integer duration;
    private LocalDateTime sysCreatedDate;
    private String punishedUserID;
    private String punishedUserName;
    private String moderatorName;
}