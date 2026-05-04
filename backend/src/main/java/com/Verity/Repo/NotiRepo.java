package com.Verity.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Verity.Entity.UserNotiEntity;

@Repository
public interface NotiRepo extends JpaRepository<UserNotiEntity, String> {

}