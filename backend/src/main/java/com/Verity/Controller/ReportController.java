package com.Verity.Controller;
import java.io.IOException;
import static java.net.URI.create;
import static java.util.Collections.emptyMap;
import java.util.Map;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Verity.DTO.ReportRequest;
import com.Verity.Domain.Response;
import com.Verity.Service.ReportService;
import static com.Verity.Utils.RequestUtils.getResponse;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;
    
    @PostMapping("/api/reports")
    public ResponseEntity<Response> createReport(@RequestBody ReportRequest reportRequest, HttpServletRequest request) throws IOException {
        reportService.createReport(reportRequest);
        return ResponseEntity.created(create("")).body(getResponse(request, emptyMap(), "Report Issued", CREATED));
    }

    @GetMapping("/api/reports")
    @PreAuthorize("hasAnyRole('MODERATOR', 'ADMIN')")
    public ResponseEntity<Response> getAllTopics(HttpServletRequest request) {
        var reports = reportService.getAllReports();
        return ResponseEntity.ok(getResponse(request, Map.of("reports", reports), "Reports Retrieved", OK));
    }
}
