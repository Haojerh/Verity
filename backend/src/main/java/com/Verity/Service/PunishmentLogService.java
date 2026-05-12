package com.Verity.Service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.Verity.Constant.UserRole;
import com.Verity.DTO.PunishmentLogDTO;
import com.Verity.DTO.PunishmentLogRequest;
import com.Verity.Entity.PunishmentLogEntity;
import com.Verity.Entity.UserEntity;
import com.Verity.Exceptions.ApiException;
import com.Verity.Repo.PunishmentLogRepo;
import com.Verity.Repo.UserRepo;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class PunishmentLogService {

    private final PunishmentLogRepo punishmentLogRepo;
    private final UserRepo userRepo;
    private final UserNotiService userNotiService;

    public boolean isUserPunished(String userId, String type) {
        List<PunishmentLogEntity> logs = punishmentLogRepo.findByUserAndType(userId, type);
        return logs.stream().anyMatch(PunishmentLogEntity::isActive);
    }

    public int getRemainingBanMinutes(String userId) {
        List<PunishmentLogEntity> logs = punishmentLogRepo.findByUserAndType(userId, "BAN");

        return logs.stream()
            .filter(PunishmentLogEntity::isActive)
            .mapToInt(PunishmentLogEntity::getRemainingMinutes)
            .max()
            .orElse(0);
    }

    public List<PunishmentLogDTO> getAllPunishmentsByUser(String id) {
        return punishmentLogRepo.findByUserID(id)
            .stream()
            .map(log -> new PunishmentLogDTO(
                log.getLogID(),
                log.getType(),
                log.getReason(),
                log.getDuration(),
                log.getSYSCREATEDDATE(),
                log.getPunishedUser().getUserID(),
                log.getPunishedUser().getName(),
                log.getModerator().getName()
            ))
            .toList();
    }

    public List<PunishmentLogDTO> getAllPunishmentsByModerator(String id) {
        return punishmentLogRepo.findByModeratorID(id)
            .stream()
            .map(log -> new PunishmentLogDTO(
                log.getLogID(),
                log.getType(),
                log.getReason(),
                log.getDuration(),
                log.getSYSCREATEDDATE(),
                log.getPunishedUser().getUserID(),
                log.getPunishedUser().getName(),
                log.getModerator().getName()
            ))
            .toList();
    }

    public void createPunishment(PunishmentLogRequest request) {
        UserEntity punishedUser = userRepo.findById(request.getUserID())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String moderatorEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity moderator = userRepo.findUserByEmail(moderatorEmail)
                .orElseThrow(() -> new RuntimeException("Moderator not found"));

        validateHierarchy(moderator, punishedUser);

        PunishmentLogEntity log = new PunishmentLogEntity();
        log.setType(request.getType());
        log.setReason(request.getReason());
        log.setDuration(request.getDuration());
        log.setPunishedUser(punishedUser);
        log.setModerator(moderator);

        punishmentLogRepo.save(log);

        userNotiService.createNotification(
                punishedUser,
                buildPunishmentMessage(request),
                "PUNISHMENT"
        );
    }

    private void validateHierarchy(UserEntity moderator, UserEntity target) {
        UserRole modRole = moderator.getUserRole();
        UserRole targetRole = target.getUserRole();

        if (modRole == UserRole.ADMIN && targetRole == UserRole.ADMIN) {
            throw new ApiException("Administrators cannot punish other administrators.");
        }

        if (modRole == UserRole.MODERATOR) {
            if (targetRole == UserRole.MODERATOR || targetRole == UserRole.ADMIN) {
                throw new ApiException("Moderators cannot punish higher or equal staff members.");
            }
        }
    }

    private String buildPunishmentMessage(PunishmentLogRequest request) {
        if (request.getType().equalsIgnoreCase("WARN")) {
            return "You have been WARNED due to " + request.getReason();
        }

        return "You have been " + request.getType() +
            " for " + request.getDuration() +
            " minutes due to " + request.getReason();
    }

    public void unmuteUser(String userId) {
        List<PunishmentLogEntity> logs =
            punishmentLogRepo.findByUserAndType(userId, "MUTE");

        if (logs.isEmpty()) {
            throw new RuntimeException("No mute found");
        }

        for (PunishmentLogEntity log : logs) {
            if (log.isActive()) {
                log.setSYSISDELETED(true);
            }
        }

        punishmentLogRepo.saveAll(logs);

        UserEntity user = userRepo.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        userNotiService.createNotification(
            user,
            "Your account has been unmuted",
            "PUNISHMENT"
        );
    }

    public void unbanUser(String userId) {
        List<PunishmentLogEntity> logs =
            punishmentLogRepo.findByUserAndType(userId, "BAN");

        if (logs.isEmpty()) {
            throw new RuntimeException("No ban found");
        }

        for (PunishmentLogEntity log : logs) {
            if (log.isActive()) {
                log.setSYSISDELETED(true);
            }
        }

        punishmentLogRepo.saveAll(logs);

        UserEntity user = userRepo.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        userNotiService.createNotification(
            user,
            "Your account has been unbanned",
            "PUNISHMENT"
        );
    }

    public List<PunishmentLogDTO> getAllPunishments() {
        return punishmentLogRepo.findAll()
            .stream()
            .map(log -> new PunishmentLogDTO(
                log.getLogID(),
                log.getType(),
                log.getReason(),
                log.getDuration(),
                log.getSYSCREATEDDATE(),
                log.getPunishedUser().getUserID(),
                log.getPunishedUser().getName(),
                log.getModerator() != null ? log.getModerator().getName() : null
            ))
            .toList();
    }

    public void demoteModerator(String id) {
        UserEntity userEntity = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (userEntity.getUserRole() != UserRole.MODERATOR) {
            throw new ApiException("User is not a moderator.");
        }

        userEntity.setUserRole(UserRole.USER);
        userRepo.save(userEntity);

        userNotiService.createNotification(
                userEntity,
                "You have been DEMOTED by Administrator",
                "PUNISHMENT"
        );
    }
}
