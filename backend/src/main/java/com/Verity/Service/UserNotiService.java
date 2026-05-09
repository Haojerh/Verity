package com.Verity.Service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.Verity.DTO.UserNotiDTO;
import com.Verity.Entity.UserEntity;
import com.Verity.Entity.UserNotiEntity;
import com.Verity.Repo.UserNotiRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserNotiService {

    private final UserNotiRepo userNotiRepo;

    public void createNotification(UserEntity user, String message, String type) {
        UserNotiEntity notification = new UserNotiEntity();
        notification.setRecipient(user);
        notification.setMessage(message);
        notification.setType(type);
        notification.setRead(false);
        userNotiRepo.save(notification);
    }

    public void createNotification(UserEntity user, String message, String type, String sourceID) {
        UserNotiEntity notification = new UserNotiEntity();
        notification.setRecipient(user);
        notification.setMessage(message);
        notification.setType(type);
        notification.setSourceID(sourceID);
        notification.setRead(false);

        userNotiRepo.save(notification);
    }

    public List<UserNotiDTO> getUserNotifications(String userID) {

        List<UserNotiEntity> notis = userNotiRepo.findByRecipient_UserIDOrderBySYSCREATEDDATEDesc(
            userID,
            PageRequest.of(0, 20)
        );

        return notis.stream().map(noti -> {
            UserNotiDTO dto = new UserNotiDTO();

            dto.setNotiID(noti.getNotiID());
            dto.setType(noti.getType());
            dto.setMessage(noti.getMessage());
            dto.setRead(noti.isRead());
            dto.setSYSCREATEDDATE(noti.getSYSCREATEDDATE());

            if ("POST".equals(noti.getType())) {
                dto.setSourceID(noti.getSourceID());
            } else {
                dto.setSourceID(null);
            }

            return dto;
        }).toList();
    }

    public void setNotificationRead(String notiID) {
        UserNotiEntity noti = userNotiRepo.findById(notiID)
            .orElseThrow(() -> new RuntimeException("Notification not found"));

        if (Boolean.TRUE.equals(noti.isRead())) {
            return;
        }

        noti.setRead(true);
        userNotiRepo.save(noti);
    }
}