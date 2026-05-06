package com.Verity.DTO;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ReportDTO {
    private String reportID;
    private String reason;
    private String type;
    private String reporterID;
    private String reporterName;
    private String targetPostID;
    private String targetCommentID;
    private LocalDateTime datetime;
}
