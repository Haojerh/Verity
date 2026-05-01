package com.Verity.Repo;

import com.Verity.Entity.UserNotiEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotiRepo extends JpaRepository<UserNotiEntity, String> {

}