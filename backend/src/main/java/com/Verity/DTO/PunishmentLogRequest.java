package com.Verity.DTO;

import lombok.Data;

@Data
public class PunishmentLogRequest {
    private String userID;
    private String type;
    private String reason;
    private Integer duration;
}