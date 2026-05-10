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
import com.Verity.Repo.VoteRepo;
import com.Verity.Utils.FileUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServices {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final PunishmentLogService punishmentLogService;
    private final VoteRepo voteRepo;
    private final String uploadDir = System.getProperty("user.dir") + "/uploads/users/";

    public void createUser(UserRequest userRequest) {
        boolean emailExists = userRepo.findUserByEmail(userRequest.getEmail()).isPresent();
        if (emailExists) {
            throw new ApiException("Email already in use");
        }

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

    public void deleteUser (String email) {
        UserEntity user = userRepo.findUserByEmail(email)
            .orElseThrow(() -> new ApiException("User not found"));

        user.setSYSISDELETED(true);
        userRepo.save(user);
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
            .filter(user -> "MODERATOR".equalsIgnoreCase(user.getUserRole().getAuthority()))
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

    public void changePassword(String email, String currentPassword, String newPassword) {
        var user = userRepo.findUserByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new ApiException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);
    }

    public void updateUser(String email, UserRequest req) {
        UserEntity user = userRepo.findUserByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));

        // Only check for duplicate email if the email is actually changing
        if (!user.getEmail().equals(req.getEmail())) {
            boolean emailExists = userRepo.findUserByEmail(req.getEmail()).isPresent();
            if (emailExists) {
                throw new ApiException("Email already in use");
            }
        }

        user.setName(req.getName());
        user.setEmail(req.getEmail());
        userRepo.save(user);
    }

    public void updateAvatar(String email, UserRequest request) {
        UserEntity user = userRepo.findUserByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));

        try {
            if (request.getAvatar() != null && !request.getAvatar().isEmpty()) {
                String oldAvatar = user.getAvatar();
                
                // Save new file first
                String filename = FileUtil.saveFile(request.getAvatar(), uploadDir, "AVT");
                
                // Update user with new avatar
                user.setAvatar(filename);
                userRepo.save(user);

                // Delete old file after successful save
                if (oldAvatar != null && !oldAvatar.isBlank()) {
                    FileUtil.deleteFile(uploadDir, oldAvatar);
                }
            }

        } catch (Exception e) {
            throw new ApiException("Failed to upload avatar: " + e.getMessage());
        }
    }

    public UserDTO getUserByIdDTO(String id) {
        UserEntity user = getUserByID(id);

        UserDTO dto = new UserDTO();
        BeanUtils.copyProperties(user, dto);

        dto.setBanned(punishmentLogService.isUserPunished(user.getUserID(), "BAN"));
        dto.setMuted(punishmentLogService.isUserPunished(user.getUserID(), "MUTE"));

        return dto;
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

        userDTO.setBanned(punishmentLogService.isUserPunished(userEntity.getUserID(), "BAN"));
        userDTO.setMuted(punishmentLogService.isUserPunished(userEntity.getUserID(), "MUTE"));
        return userDTO;
    }

    public UserEntity getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        return userRepo.findUserByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));
    }

    public int getUserReputation(String userID) {
        return voteRepo.sumReputationByUserID(userID);
    }
}
