package com.Verity.Repo;

import com.Verity.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<UserEntity,String> {
    Optional<UserEntity> findUserByEmail(String email);
}
