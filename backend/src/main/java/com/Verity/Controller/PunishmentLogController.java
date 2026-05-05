package com.Verity.Controller;
import static java.util.Collections.emptyMap;
import java.util.Map;

import static org.springframework.http.HttpStatus.OK;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Verity.DTO.PunishmentLogRequest;
import com.Verity.Domain.Response;
import com.Verity.Service.PunishmentLogService;
import static com.Verity.Utils.RequestUtils.getResponse;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class PunishmentLogController {

    private final PunishmentLogService punishmentLogService;

    @GetMapping("/api/users/logs/{id}")
    public ResponseEntity<Response> getAllPunishmentLogs(@PathVariable String id,HttpServletRequest request) {
        var logs = punishmentLogService.getAllPunishmentsByUser(id);
        return ResponseEntity.ok(getResponse(request, Map.of("logs", logs), "Punishment Logs Retrieved", OK));
    }

    @PostMapping("/api/punishments")
    public ResponseEntity<Response> createPunishment(@RequestBody PunishmentLogRequest punishmentLogRequest, HttpServletRequest request) {
        punishmentLogService.createPunishment(punishmentLogRequest);
        return ResponseEntity.ok(getResponse(request, emptyMap(), "Punishment created", OK));
    }

    @DeleteMapping("/api/punishments/unmute/{id}")
    public ResponseEntity<Response> unmuteUser(@PathVariable String id, HttpServletRequest request) {
        punishmentLogService.unmuteUser(id);
        return ResponseEntity.ok(getResponse(request, emptyMap(), "User Unmuted", OK));
    }

    @DeleteMapping("/api/punishments/unban/{id}")
    public ResponseEntity<Response> unbanUser(@PathVariable String id, HttpServletRequest request) {
        punishmentLogService.unbanUser(id);
        return ResponseEntity.ok(getResponse(request, emptyMap(), "User Unbanned", OK));
    }

    @PostMapping("/api/moderators/demote/{id}")
    public ResponseEntity<Response> demoteModerator(@PathVariable String id, HttpServletRequest request) {
        punishmentLogService.demoteModerator(id);
        return ResponseEntity.ok(getResponse(request, emptyMap(), "Moderator demoted", OK));
    }
}
