package com.Verity.Repo;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Verity.Entity.PostEntity;

@Repository
public interface PostRepo extends JpaRepository<PostEntity, String> {

    long countBySYSISDELETEDFalse();
    
    Optional<PostEntity> findByTitle(String title);

    Optional<PostEntity> findByPostIDAndSYSISDELETEDFalse(String postID);

    List<PostEntity> findByAuthor_UserIDAndSYSISDELETEDFalse(String userID);

    Page<PostEntity> findByAuthor_UserIDAndSYSISDELETEDFalse(String userID, Pageable pageable);

    Page<PostEntity> findByTopic_TopicIDAndSYSISDELETEDFalse(String topicID, Pageable pageable);

    long countByTopic_TopicIDAndSYSISDELETEDFalse(String topicID);

    Page<PostEntity> findBySYSISDELETEDFalse(Pageable pageable);

    @Query("""
        SELECT p FROM PostEntity p
        WHERE p.author.userID IN :userIds
        AND p.SYSISDELETED = false
        ORDER BY p.SYSCREATEDDATE DESC
    """)
    Page<PostEntity> findByAuthor_UserIDInAndSYSISDELETEDFalse(
        @Param("userIds") List<String> userIds,
        Pageable pageable
    );

    @Query("""
        SELECT p FROM PostEntity p
        WHERE p.topic.topicID IN :topicIds
        AND p.author.userID <> :userID
        AND p.SYSISDELETED = false
        ORDER BY p.SYSCREATEDDATE DESC
    """)
    Page<PostEntity> findByTopic_TopicIDInAndSYSISDELETEDFalse(
        @Param("topicIds") List<String> topicIds,
        @Param("userID") String userID,
        Pageable pageable
    );
    
    @Query("""
        SELECT p
        FROM PostEntity p
        WHERE p.author.userID IN (
            SELECT f.userFollowing.userID
            FROM FollowEntity f
            WHERE f.userFollower.userID = :userID
        )
        AND p.SYSISDELETED = false
        ORDER BY p.SYSCREATEDDATE DESC
    """)
    Page<PostEntity> findPostsByFollowedUsers(@Param("userID") String userID, Pageable pageable);

    @Query("""
        SELECT p
        FROM PostEntity p
        WHERE p.topic.topicID IN (
            SELECT f.topic.topicID
            FROM UserFavTopicEntity f
            WHERE f.user.userID = :userID
        )
        AND p.author.userID <> :userID
        AND p.SYSISDELETED = false
        ORDER BY p.SYSCREATEDDATE DESC
    """)
    Page<PostEntity> findPostsByFollowedTopics(@Param("userID") String userID, Pageable pageable);

    @Query("""
        SELECT p
        FROM PostEntity p
        LEFT JOIN PostStanceEntity ps ON ps.postID = p
        WHERE p.SYSISDELETED = false
        GROUP BY p
        ORDER BY COUNT(ps) DESC
    """)
    Page<PostEntity> findPopularPosts(Pageable pageable);

    @Query("""
        SELECT p FROM PostEntity p
        WHERE p.SYSISDELETED = false
        AND p.author.userID <> :userID
        AND (:excludedIds IS NULL OR p.postID NOT IN :excludedIds)
    """)
    List<PostEntity> findRandomPool(@Param("excludedIds") List<String> excludedIds, @Param("userID") String userID);

    @Query("""
        SELECT p FROM PostEntity p
        WHERE p.SYSISDELETED = false
        AND (
            LOWER(p.title) LIKE LOWER(CONCAT('%', :q, '%'))
            OR LOWER(p.description) LIKE LOWER(CONCAT('%', :q, '%'))
    )
    """)
    Page<PostEntity> searchPosts(@Param("q") String q, Pageable pageable);

    @Query("""
        SELECT FUNCTION('DATE', p.SYSCREATEDDATE), COUNT(p)
        FROM PostEntity p
        WHERE p.SYSCREATEDDATE >= :startDate
        GROUP BY FUNCTION('DATE', p.SYSCREATEDDATE)
        ORDER BY FUNCTION('DATE', p.SYSCREATEDDATE)
        """)
    List<Object[]> countPostsLast5Days(@Param("startDate") LocalDateTime startDate);

    @Query("""
        SELECT FUNCTION('HOUR', p.SYSCREATEDDATE), COUNT(p)
        FROM PostEntity p
        WHERE p.SYSISDELETED = false
        GROUP BY FUNCTION('HOUR', p.SYSCREATEDDATE)
        ORDER BY FUNCTION('HOUR', p.SYSCREATEDDATE)
    """)
    List<Object[]> countPostsByHour();
 }
