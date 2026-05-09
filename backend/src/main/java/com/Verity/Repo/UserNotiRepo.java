package com.Verity.Repo;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Verity.Entity.UserNotiEntity;

@Repository
public interface UserNotiRepo extends JpaRepository<UserNotiEntity, String> {
    List<UserNotiEntity> findByUserIdOrderByCreatedDateDesc(String userID, Pageable pageable);
}
