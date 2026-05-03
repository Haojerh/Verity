package com.Verity.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.Verity.Entity.PunishmentLogEntity;

@Repository
public interface PunishmentLogRepo extends JpaRepository<PunishmentLogEntity,String> {

    @Query("""
    SELECT p FROM PunishmentLogEntity p
    WHERE p.punishedUser.userID = :userID
    AND p.type = :type
    AND p.SYSISDELETED = false
    """)
    List<PunishmentLogEntity> findByUserAndType(String userID, String type);

    @Query("""
    SELECT p FROM PunishmentLogEntity p
    WHERE p.punishedUser.userID = :userID
    AND p.SYSISDELETED = false
    """)
    List<PunishmentLogEntity> findByUserID(String userID);

}
