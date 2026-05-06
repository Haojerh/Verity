package com.Verity.DTO;

import lombok.Data;

@Data
public class ReportRequest {
    private String reason;
    private String type;
    private String targetID;
    private String reporterID;
}