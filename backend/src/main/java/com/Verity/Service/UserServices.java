package com.Verity.Service;

import com.Verity.DTO.UserRequest;
import com.Verity.Entity.UserEntity;
import com.Verity.Repo.UserRepo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class UserServices {

    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Autowired
    private UserRepo userRepo;

//    @Bean
//    public String  test (){
//        UserRequest userRequest = new UserRequest();
//        userRequest.setEmail("siayu@gamil.com");
//        userRequest.setPassword("123");
//        userRequest.setUserRole("Administator");
//        createUser(userRequest);
//        return"";
//    }

    public void createUser(UserRequest userRequest) {
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(userRequest, userEntity);
        userEntity.setPassword(bCryptPasswordEncoder().encode(userRequest.getPassword()));
        userRepo.save(userEntity);
    }

    public void updateUser (UserRequest userRequest){
        UserEntity userEntity = getUserByEmail(userRequest.getEmail());
        BeanUtils.copyProperties(userRequest, userEntity);
        userRepo.save(userEntity);
    }

    public UserEntity getUserByEmail(String email){
        return userRepo.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found."));
    }

    public UserEntity getUserByName(String username) {
        return userRepo.findUserByName(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    private UserEntity getUserByID(String id) {
        return userRepo.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found."));
    }
}
