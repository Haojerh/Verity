package com.Verity.Security.Utils;


import com.Verity.Entity.UserEntity;
import com.Verity.Service.UserServices;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@NoArgsConstructor
@Service
@AllArgsConstructor
public class MyUserServiceDetail implements UserDetailsService{

    private UserServices userServices;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userServices.getUserByEmail(username);
        if (user == null){
            throw new UsernameNotFoundException(("This user does not exist in the database"));
        }
        return new UserPrincipal(user);
    }
}
