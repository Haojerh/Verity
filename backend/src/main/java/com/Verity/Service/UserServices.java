package com.Verity.Service;

import com.Verity.DTO.Credential;
import com.Verity.DTO.UserDTO;
import com.Verity.DTO.UserRequest;
import com.Verity.Entity.UserEntity;
import com.Verity.Exceptions.ApiException;
import com.Verity.Repo.UserRepo;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServices {

    private final UserRepo userRepo;

    private final PasswordEncoder passwordEncoder;

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

    public UserEntity getUserByEmail(String email){
        return userRepo.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Error - User not found."));
    }

    private UserEntity getUserByID(String id) {
        return userRepo.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found."));
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
}
