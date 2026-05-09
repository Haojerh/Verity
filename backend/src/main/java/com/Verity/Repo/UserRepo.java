package com.Verity.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.Verity.Entity.UserEntity;

@Repository
public interface UserRepo extends JpaRepository<UserEntity,String> {

    @Query("SELECT u FROM UserEntity u WHERE u.email = :email AND u.SYSISDELETED = false")
    Optional<UserEntity> findUserByEmail(String email);

    @Query("""
        SELECT u
        FROM UserEntity u
        LEFT JOIN CommentEntity c ON c.author = u
        LEFT JOIN VoteEntity v ON v.comment = c
        GROUP BY u
        ORDER BY COALESCE(SUM(v.voteValue), 0) DESC
    """)
    List<UserEntity> findTopUsersByReputation(Pageable pageable);

    @Query("""
        SELECT FUNCTION('MONTH', u.SYSCREATEDDATE), COUNT(u)
        FROM UserEntity u
        WHERE u.SYSCREATEDDATE IS NOT NULL
        GROUP BY FUNCTION('MONTH', u.SYSCREATEDDATE)
        ORDER BY FUNCTION('MONTH', u.SYSCREATEDDATE)
    """)
    List<Object[]> getUserGrowthByMonth();

    @Query(value = """
        SELECT COALESCE(AVG(follow_count), 0)
        FROM (
            SELECT u.userID AS userID, COUNT(f.followerID) AS follow_count
            FROM system_user u
            LEFT JOIN follow f ON f.followingID = u.userID
            GROUP BY u.userID
        ) t
    """, nativeQuery = true)
    Double avgFollowersPerUser();
}
