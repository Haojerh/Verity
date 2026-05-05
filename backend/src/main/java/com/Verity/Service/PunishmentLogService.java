package com.Verity.Service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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

    public void createPunishment(PunishmentLogRequest request) {
        UserEntity punishedUser = userRepo.findById(request.getUserID())
            .orElseThrow(() -> new RuntimeException("User not found"));

        // get current logged-in moderator
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String moderatorEmail = auth.getName();

        UserEntity moderator = userRepo.findUserByEmail(moderatorEmail)
            .orElseThrow(() -> new RuntimeException("Moderator not found"));

        PunishmentLogEntity log = new PunishmentLogEntity();
        log.setType(request.getType());
        log.setReason(request.getReason());
        log.setDuration(request.getDuration());
        log.setPunishedUser(punishedUser);
        log.setModerator(moderator);

        punishmentLogRepo.save(log);
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

    public void demoteModerator (String id) {
        UserEntity userEntity = userRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if(!"MODERATOR".equalsIgnoreCase(userEntity.getUserRole())) {
            throw new ApiException("User is not a moderator.");
        } else {
            userEntity.setUserRole("BASIC");
            userRepo.save(userEntity);
        }
    }
}
