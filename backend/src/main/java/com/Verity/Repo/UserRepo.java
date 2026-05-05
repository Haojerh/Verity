package com.Verity.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.Verity.Entity.UserEntity;

@Repository
public interface UserRepo extends JpaRepository<UserEntity,String> {

    @Query("SELECT u FROM UserEntity u WHERE u.email = :email AND u.SYSISDELETED = false")
    Optional<UserEntity> findUserByEmail(String email);
}
