package com.Verity.Controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.Verity.Constant.Constants.OK;
import com.Verity.DTO.AnalyticsDTO;
import com.Verity.Domain.Response;
import com.Verity.Service.AnalyticsService;
import static com.Verity.Utils.RequestUtils.getResponse;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/api/analytics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Response> getAnalytics(HttpServletRequest request) {
        AnalyticsDTO dto = analyticsService.getAnalytics();
        return ResponseEntity.ok(getResponse(request, Map.of("analytics", dto), "Comment retrieved", OK));
    }
}