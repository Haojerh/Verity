package com.Verity.Service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Verity.DTO.Credential;
import com.Verity.DTO.UserDTO;
import com.Verity.DTO.UserRequest;
import com.Verity.Entity.UserEntity;
import com.Verity.Exceptions.ApiException;
import com.Verity.Repo.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServices {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final PunishmentLogService punishmentLogService;

    public void createUser(UserRequest userRequest) {
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(userRequest, userEntity);
        userEntity.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        userRepo.save(userEntity);
    }

    public void updateUser (UserRequest userRequest){
        UserEntity userEntity = getUserByEmail(userRequest.getEmail());
        BeanUtils.copyProperties(userRequest, userEntity);
        userRepo.save(userEntity);
    }

    public void deleteUser (UserRequest userRequest){
        UserEntity userEntity = getUserByEmail(userRequest.getEmail());
        userEntity.setSYSISDELETED(true);
        userRepo.save(userEntity);
    }

    public List<UserDTO> getAllUsers() {
        return userRepo.findAll()
            .stream()
            .filter(user -> !Boolean.TRUE.equals(user.getSYSISDELETED()))
            .map(user -> {
                UserDTO dto = new UserDTO();
                BeanUtils.copyProperties(user, dto);

                dto.setBanned(
                    punishmentLogService.isUserPunished(user.getUserID(), "BAN")
                );

                dto.setMuted(
                    punishmentLogService.isUserPunished(user.getUserID(), "MUTE")
                );

                return dto;
            })
            .toList();
    }

    public UserDTO getCurrentUserDTO() {
        UserEntity userEntity = getCurrentUser();

        UserDTO dto = new UserDTO();
        BeanUtils.copyProperties(userEntity, dto);

        dto.setBanned(
            punishmentLogService.isUserPunished(userEntity.getUserID(), "BAN")
        );

        dto.setMuted(
            punishmentLogService.isUserPunished(userEntity.getUserID(), "MUTE")
        );

        return dto;
    }

    public List<UserDTO> getAllModerators() {
        return userRepo.findAll()
            .stream()
            .filter(user -> !Boolean.TRUE.equals(user.getSYSISDELETED()))
            .filter(user -> "MODERATOR".equalsIgnoreCase(user.getUserRole()))
            .map(user -> {
                UserDTO dto = new UserDTO();
                BeanUtils.copyProperties(user, dto);

                dto.setBanned(
                    punishmentLogService.isUserPunished(user.getUserID(), "BAN")
                );

                dto.setMuted(
                    punishmentLogService.isUserPunished(user.getUserID(), "MUTE")
                );

                return dto;
            })
            .toList();
    }

    public UserEntity getUserByEmail(String email){
        return userRepo.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Error - User not found."));
    }

    private UserEntity getUserByID(String id) {
        return userRepo.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found."));
    }

    public boolean isUserBanned(String userId) {
        return punishmentLogService.isUserPunished(userId, "BAN");
    }

    public UserDTO authenticate(Credential credential) {
        UserEntity userEntity = getUserByEmail(credential.getUsername());
        if (!passwordEncoder.matches(credential.getPassword(), userEntity.getPassword())) {
            throw new ApiException("Invalid Password.");
        }
        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(userEntity, userDTO);
        return userDTO;
    }

    public UserEntity getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        return userRepo.findUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
